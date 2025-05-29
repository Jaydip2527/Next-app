"use client";

import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  DropDownListComponent,
  MultiSelectComponent,
} from "@syncfusion/ej2-react-dropdowns";
import {
  // TextAreaComponent,
  TextBoxComponent,
} from "@syncfusion/ej2-react-inputs";

import {
  DatePickerComponent,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";

import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import moment from "moment";

import { leadReminderValidationSchema } from "@/@/utils/validations";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import {
  createLeadReminder,
  deleteLeadReminder,
  updateLeadReminder,
} from "@/@/redux/slices/leadReminderSlice";
import { Frequency, ReminderMode } from "@/@/utils/constant";
import { convertToSystemTimeZone } from "@/@/utils/dateFormate";
import useDataManager from "@/@/hooks/useDataManager";
import { renderStatus } from "@/@/utils/dataGridCommonFunc";
import { fetchAllUser } from "@/@/redux/slices/userSlice";
import ToolbarEditor from "../../tool-bar";
import Switch from "../../toggle-switch";
import NewDataGrid from "../../new-data-grid";
import CommonProgressButton from "../../common-progress-button";
// import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";

const commands = () => [
  {
    type: "Edit",
    buttonOption: { cssClass: "e-info", iconCss: "e-icons e-edit" },
  },
  {
    type: "Delete",
    buttonOption: { cssClass: "e-danger", iconCss: "e-icons e-delete" },
  },
];

const startDateTemplate = (props: any) => {
  const startDate = props?.start_date ? props?.start_date : null;
  const startDates = startDate
    ? moment.unix(props?.start_date).format("MM/DD/YYYY")
    : "--";
  return (
    <div>
      <span>{startDates}</span>
    </div>
  );
};

const endDateTemplate = (props: any) => {
  const endDate = props?.end_date ? props?.end_date : null;
  const endDates = endDate
    ? moment.unix(props?.end_date).format("MM/DD/YYYY")
    : "--";
  return (
    <div>
      <span>{endDates}</span>
    </div>
  );
};

const columns = [
  // { type: "checkbox", allowSorting: false, allowFiltering: false, width: "50" },
  {
    field: "reminder_id",
    headerText: "Reminder ID",
    isPrimaryKey: true,
    visible: false,
    width: "130",
  },
  {
    field: "reminder_title",
    headerText: "Title",
    width: "170",
    clipMode: "EllipsisWithTooltip",
  },
  {
    field: "reminder_description",
    headerText: "Description",
    width: "170",
    clipMode: "EllipsisWithTooltip",
    template: (props: any) => {
      return (
        <div>
          <span
            dangerouslySetInnerHTML={{
              __html: props?.reminder_description,
            }}
          ></span>
        </div>
      );
    },
  },
  {
    field: "start_date",
    headerText: "Start Date",
    width: "170",
    clipMode: "EllipsisWithTooltip",
    template: startDateTemplate,
  },
  {
    field: "end_date",
    headerText: "End Date",
    width: "170",
    clipMode: "EllipsisWithTooltip",
    template: endDateTemplate,
  },
  {
    field: "frequency",
    headerText: "Frequency",
    width: "130",
    clipMode: "EllipsisWithTooltip",
  },
  {
    field: "Status",
    headerText: "Status",
    width: "130",
    template: (data: any) => renderStatus(data?.status),
  },
  {
    // headerText: "Manage Records",
    width: "160",
    commands: commands(),
  },
];

const defaultValues = {
  frequency: "",
  reminder_description: "",
  subject: "",
  time: "",
  // assigned_to: "",
  start_date: "",
  end_date: "",
  is_recurring: false,
  send_reminder: false,
  reminder_mode: [],
};

const RemindersPage = () => {
  const dispatch = useAppDispatch();
  const { id: lead_id } = useParams();
  const { loading } = useAppSelector((state) => state.leadReminder);
  const { users } = useAppSelector((state) => state.user);
  const methods = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(leadReminderValidationSchema),
    defaultValues,
  });
  // const router = useRouter();
  const minTime = new Date("9:00 AM");
  const maxTime = new Date("11:30 AM");
  const frequencyOptions = [
    { value: Frequency.DAY, text: "Day" },
    { value: Frequency.WEEK, text: "Week" },
    { value: Frequency.MONTH, text: "Month" },
  ];

  const reminderModeList = [
    { value: ReminderMode.EMAIL, text: "Email" },
    { value: ReminderMode.SMS, text: "SMS" },
    { value: ReminderMode.CALL, text: "Call" },
    { value: ReminderMode.TASK, text: "TASK" },
  ];
  const { handleSubmit, setValue, control, watch, reset } = methods;
  const reminderModeRef = useRef<any>(null);
  const assigneeRef = useRef<any>(null);

  useEffect(() => {
    dispatch(fetchAllUser({ page: 1, limit: 10, is_with_respect_branch: "0" }));
  }, []);

  const [editData, setEditData] = useState({
    reminder_id: "",
    // reminder_title: "",
    // reminder_description: "",
    // start_date: "",
    // end_date: "",
    // time: "",
    // frequency: "",
    // assigned_to: [],
    // is_recurring: false,
    // status: false,
    reminder_mode: [],
  });

  const GET_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/tnt-lead/${lead_id}/reminders`;

  const { dataManager, actionBegin, gridRef } = useDataManager(
    GET_API_ENDPOINT
    // {
    //   SourceId: lead_id,
    //   SourceType: LEAD_REMINDER.LEAD_SOURCE_TYPE,
    // }
  );

  const resetData = () => {
    reset({
      ...defaultValues,
      reminder_mode: [], // Explicitly clear reminder_mode
    });
    setEditData({
      reminder_id: "",
      // reminder_title: "",
      // reminder_description: "",
      // start_date: "",
      // end_date: "",
      // time: "",
      // frequency: "",
      // assigned_to: [],
      // is_recurring: false,
      // status: false,
      reminder_mode: [], // Also clear editData reminder_mode
    });
    setValue("reminder_mode", []);
    setValue("assigned_to", []);
    if (reminderModeRef.current) {
      reminderModeRef.current.value = [];
    }
    if (assigneeRef.current) {
      assigneeRef.current.value = [];
    }
  };

  const handleCommandClick = async (args: any) => {
    if (args.commandColumn.type === "Edit") {
      const selectedRow = args.rowData;
      setValue("subject", selectedRow.reminder_title);
      setValue("reminder_description", selectedRow.reminder_description);
      setValue("start_date", new Date(Number(selectedRow.start_date * 1000)));
      setValue("end_date", new Date(Number(selectedRow.end_date * 1000)));
      setValue(
        "time",
        new Date(
          new Date().setHours(
            Number(selectedRow.time.split(":")[0]),
            Number(selectedRow.time.split(":")[1].split(" ")[0]),
            0,
            0
          )
        )
      );
      setValue("frequency", selectedRow.frequency);
      setValue("assigned_to", selectedRow.assigned_to);
      setValue("is_recurring", selectedRow.is_recurring);
      setValue("send_reminder", selectedRow.status);
      setValue("reminder_mode", selectedRow.reminder_mode);
      setEditData(selectedRow);
    }

    if (args.commandColumn.type === "Delete") {
      if (typeof window !== "undefined") {
        const selectedRow = args.rowData;
        const reminderId = selectedRow.reminder_id;
        // eslint-disable-next-line no-alert
        const confirmed = window?.confirm(
          "Are you sure you want to delete this reminder?"
        );

        if (confirmed) {
          try {
            const response = await dispatch(
              deleteLeadReminder({
                id: lead_id,
                reminderId,
                // SourceId: lead_id || "",
                // SourceType: LEAD_REMINDER.LEAD_SOURCE_TYPE,
              })
            ).unwrap();
            if (response) {
              const grid = gridRef?.current;
              if (grid) {
                grid.refresh();
              }
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log("Delete Lead Reminder Error:", error);
          }
        }
      }
    }
  };

  const handleCancel = () => {
    resetData();
  };

  const onSubmit = async (data: any) => {
    // console.log("data :>> ", data);
    try {
      const formData = {
        reminder_title: data.subject,
        reminder_description: data.reminder_description,
        reminder_mode: data.reminder_mode,
        end_date: convertToSystemTimeZone(data.end_date),
        start_date: convertToSystemTimeZone(data.start_date),
        frequency: data.frequency || "day",
        time: data.time
          ? new Date(data.time).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          : null,
        template: "",
        person_data: {},
        status: data.send_reminder,
        is_recurring: data.is_recurring,
      };
      // const addFormData = {
      //   ...formData,
      //   source_id: lead_id || "", //5a223af3-10d0-4998-9bf1-81593953653f
      //   source_type: LEAD_REMINDER.LEAD_SOURCE_TYPE,
      // };

      // console.log("formData :>> ", formData);
      if (editData?.reminder_id) {
        await dispatch(
          updateLeadReminder({
            id: lead_id,
            reminderId: editData?.reminder_id,
            // SourceId: lead_id || "",
            // SourceType: LEAD_REMINDER.LEAD_SOURCE_TYPE,
            data: formData,
          })
        );
      } else {
        await dispatch(createLeadReminder({ id: lead_id, data: formData }));
      }
      const grid = gridRef?.current;
      if (grid) {
        grid.refresh();
      }
      resetData();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("onSubmit Error:", error);
    }
  };

  return (
    <>
      <div className="common_header_main_div">
        <h4 className="common_header_data_text">
          {" "}
          {editData?.reminder_id ? `Edit Reminder` : `Add New Reminder`}
        </h4>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="common_card_main_div">
            <Row>
              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <Controller
                    name="subject"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <TextBoxComponent
                          placeholder="Subject *"
                          cssClass="e-outline"
                          floatLabelType="Auto"
                          value={field.value}
                          onChange={(e: any) =>
                            setValue("subject", e.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                        {error && <p className="error-text">{error.message}</p>}
                      </>
                    )}
                  />
                </div>
                <div className="text_filed text_filed_dropdown">
                  <ToolbarEditor
                    name="reminder_description"
                    isControl={true}
                    // selectedValue={editData?.reminder_description || ""}
                  />
                </div>
                <div className="multi_select_common text_filed_dropdown text_filed">
                  <Controller
                    name="reminder_mode"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <MultiSelectComponent
                          floatLabelType="Auto"
                          cssClass="e-outline"
                          ref={reminderModeRef}
                          dataSource={reminderModeList}
                          fields={{ text: "text", value: "value" }}
                          placeholder="Reminder mode *"
                          value={
                            (editData?.reminder_mode &&
                              editData?.reminder_mode) ||
                            field.value ||
                            []
                          }
                          onChange={(e: { value: any[] }) => {
                            setValue("reminder_mode", e.value, {
                              shouldValidate: true,
                            });
                          }}
                          allowCustomValue={false} // Disables custom tag entry
                        />
                        {error && <p className="error-text">{error.message}</p>}
                      </>
                    )}
                  />
                </div>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                    <div className="send_reminder_switch_div">
                      <Controller
                        name="send_reminder"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field?.value ?? false}
                            onChange={(checked) => field.onChange(checked)}
                          />
                        )}
                      />
                      <p className="send_reminder_text m-0"> SEND REMINDER </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="recurring_reminders_sec">
                      <Controller
                        name="is_recurring"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field?.value ?? false}
                            onChange={(checked) => field.onChange(checked)}
                          />
                        )}
                      />
                      <p className="send_reminder_text ms-2 m-0 ">
                        {" "}
                        Recurring Reminders{" "}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="date_picker_div">
                      <div className="datetimepicker-control-section">
                        <Controller
                          name="start_date"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <DatePickerComponent
                                placeholder="Start Date *"
                                floatLabelType="Auto"
                                cssClass="e-outline"
                                min={new Date()}
                                value={field.value}
                                onChange={(e: any) =>
                                  setValue("start_date", e.value, {
                                    shouldValidate: true,
                                  })
                                }
                              ></DatePickerComponent>
                              {error && (
                                <p className="error-text">{error.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="date_picker_div">
                      <div className="datetimepicker-control-section">
                        <Controller
                          name="time"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <TimePickerComponent
                                placeholder="Time *"
                                cssClass="e-outline"
                                min={minTime}
                                max={maxTime}
                                value={field.value}
                                onChange={(e: any) =>
                                  setValue("time", e.value, {
                                    shouldValidate: true,
                                  })
                                }
                              ></TimePickerComponent>
                              {error && (
                                <p className="error-text">{error.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>

                {watch("is_recurring") && (
                  <Row>
                    <Col md={6}>
                      <div className="date_picker_div">
                        <div className="datetimepicker-control-section">
                          <Controller
                            name="end_date"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <DatePickerComponent
                                  placeholder="End Date"
                                  floatLabelType="Auto"
                                  cssClass="e-outline"
                                  min={watch("start_date")}
                                  // value={field.value}
                                  value={
                                    watch("is_recurring")
                                      ? field.value
                                      : new Date()
                                  }
                                  onChange={(e: any) =>
                                    setValue("end_date", e.value, {
                                      shouldValidate: true,
                                    })
                                  }
                                ></DatePickerComponent>
                                {error && (
                                  <p className="error-text">{error.message}</p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="dropdown_common">
                        <Controller
                          name="frequency"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <DropDownListComponent
                                floatLabelType="Auto"
                                dataSource={frequencyOptions}
                                fields={{ text: "text", value: "value" }}
                                placeholder="Recurring Frequency"
                                popupHeight="220px"
                                className="dropdown_filed"
                                cssClass="e-outline"
                                value={field.value}
                                onChange={(e: any) => {
                                  setValue("frequency", e.value, {
                                    shouldValidate: true,
                                  });
                                }}
                              />
                              {error && (
                                <p className="error-text">{error.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col md={12}>
                    <div className="multi_select_common text_filed_dropdown text_filed">
                      <Controller
                        name="assigned_to"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <MultiSelectComponent
                              floatLabelType="Auto"
                              cssClass="e-outline"
                              ref={assigneeRef}
                              dataSource={
                                users?.data?.map(
                                  (user: {
                                    first_name: any;
                                    last_name: any;
                                    user_id: any;
                                  }) => ({
                                    ...user,
                                    fullName: `${user.first_name} ${user.last_name}`, // Combine first and last name
                                  })
                                ) || []
                              }
                              fields={{
                                text: "fullName", // Use the concatenated field
                                value: "user_id",
                              }}
                              placeholder="Assigned To"
                              value={field.value || []}
                              onChange={(e: { value: any }) => {
                                setValue("assigned_to", e.value, {
                                  shouldValidate: true,
                                });
                              }}
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="quick_call_btn_sec">
                  <button
                    className="common_secondary_btn"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <CommonProgressButton
                    content={editData?.reminder_id ? "Save" : "Submit"}
                    loading={loading}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </form>
      </FormProvider>
      <div>
        <div className="recurring_reminders_sec">
          <h6 className="common_card_title mt-3"> Lead Reminder Overview </h6>
        </div>
        <NewDataGrid
          columns={columns}
          dataSource={dataManager}
          gridRef={gridRef}
          actionBegin={actionBegin}
          handleCommandClick={handleCommandClick}
          toolbar={["Search"]}
        />
      </div>
    </>
  );
};

export default RemindersPage;
