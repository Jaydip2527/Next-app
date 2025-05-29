"use client";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import {
  DropDownListComponent,
  MultiSelectComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";

import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import "./tab.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import ToolbarEditor from "@/@/component/tool-bar";
import { leadTaskSchema } from "@/@/utils/validations";
import {
  createLeadTask,
  fetchTaskbyId,
  getLeadTaskStatus,
  updateLeadTask,
} from "@/@/redux/slices/leadTaskSlice";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import {
  generateTaskId,
  getNameInitials,
  getRandomColor,
  priorityColors,
} from "@/@/utils/common";
import { createTag, fetchTags } from "@/@/redux/slices/tagsSlice";
import {
  assigneeList,
  categoryOptions,
  departmentOptions,
  SOURCE_TYPE,
} from "@/@/utils/constant";
import { convertDateToTimestamp } from "@/@/utils/dateFormate";
import { fetchAllUser } from "@/@/redux/slices/userSlice";
import UploadFiles from "@/@/component/upload-files";
import CommonProgressButton from "@/@/component/common-progress-button";
import {
  priorityItemTemplate,
  priorityValueTemplate,
  statusItemTemplate,
  statusValueTemplate,
} from "@/@/utils/dataGridCommonFunc";
import Attachments from "../../attachments";
import ActivityLog from "../../activity-log";
import CommentsSection from "../comments";

const defaultTaskFormValues = {
  source_id: "",
  source_type: "",
  // project_lead: "",
  // project_name_lead_name: "",
  task_public_id: generateTaskId() || "",
  start_date: null, // Date picker expects null as default for empty value
  due_date: null, // Same as above
  department: "",
  category: "",
  status_id: null,
  priority: "",
  assigned_to: [],
  tag_ids: [],
  task_title: "",
  task_description: "",
  is_completed: false,
};

const AddTaskPage = ({
  task,
  onCancel,
  setIsRefresh,
}: {
  task: any;
  onCancel: () => void;
  setIsRefresh: any;
}) => {
  const task_id = task?.task_id;
  const today = new Date(); // Get today's date

  const dispatch = useAppDispatch();
  const { tagList } = useAppSelector((state) => state.tags);
  const { lead } = useAppSelector((state) => state.lead);
  const { users } = useAppSelector((state) => state.user);
  const { leadTaskStatus } = useAppSelector((state) => state.leadTask);

  const { leadTask, loading } = useAppSelector((state) => state.leadTask);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [activeTab, setActiveTab] = useState<string>("Comments");
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Handle Sorting for Comments Tab
  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));
  };

  const tabRender = (tabs: string) => {
    if (tabs === "Comments" && activeTab === "Comments") {
      return <CommentsSection sortOrder={sortOrder} leadTask={leadTask} />;
    } else if (tabs === "Attachments" && activeTab === "Attachments") {
      return <Attachments sortOrder={sortOrder} />;
    } else if (tabs === "History" && activeTab === "History") {
      return <ActivityLog sortOrder={sortOrder} />;
    }
    return null;
  };

  useEffect(() => {
    const params = {
      module: "task",
    };
    dispatch(fetchTags(params));
    dispatch(fetchAllUser({ page: 1, limit: 10, is_with_respect_branch: "0" }));
    dispatch(getLeadTaskStatus());
  }, []);

  useEffect(() => {
    if (!task_id) {
      return;
    }
    const params = {
      SourceId: lead?.lead?.lead_id,
      SourceType: SOURCE_TYPE?.LEAD,
    };
    dispatch(fetchTaskbyId({ id: task_id, params }));
  }, [task_id]);

  useEffect(() => {
    if (!lead) {
      return;
    }
    if (!task_id) {
      setValue("source_id", lead?.lead?.lead_id);
      setValue("source_type", SOURCE_TYPE?.LEAD);
    }
  }, [lead]);

  // Handle tag selection & new tag creation
  const handleTagChange = async (e: { value: any }, fieldValue: any) => {
    const selectedTags = Array.isArray(e.value) ? e.value : []; // Ensure selectedTags is an array
    let updatedTags = Array.isArray(fieldValue) ? [...fieldValue] : []; // Ensure updatedTags is an array

    for (const tag of selectedTags) {
      // Check if the tag exists by comparing both tag_id and name
      const existingTag = tagList.find(
        (t: { name: any; tag_id: any }) => t?.name === tag || t?.tag_id === tag
      );

      if (!existingTag) {
        const payload = {
          name: tag.trim(),
          color: getRandomColor(),
          module: "task",
        };

        try {
          const res = await dispatch(createTag(payload)).unwrap();
          if (res?.tag_id) {
            updatedTags.push(res.tag_id);
          }
        } catch (error) {
          // console.error("Error creating tag:", error);
          console.log("Error creating tag:", error);
        }
      } else {
        updatedTags.push(existingTag.tag_id || existingTag.name); // Ensure correct ID or name is added
      }
    }

    // Remove duplicates
    updatedTags = [...new Set(updatedTags)];
    setValue("tag_ids", updatedTags, { shouldValidate: true });
  };

  const headertext = [
    { text: "Comments", iconCss: "e-icons e-paste" },
    { text: "Attachments", iconCss: "e-icons e-paste" },
    { text: "History", iconCss: "e-icons e-paste" },
  ];

  const methods = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(leadTaskSchema),
    defaultValues: defaultTaskFormValues,
  });
  const { handleSubmit, control, setValue, watch, reset } = methods;

  // Reset form when `lead` data is available
  useEffect(() => {
    if (leadTask && task_id) {
      reset({
        task_public_id: leadTask?.task_public_id || "",
        start_date: leadTask?.start_date
          ? new Date(Number(leadTask.start_date) * 1000)
          : null,
        due_date: leadTask?.due_date
          ? new Date(Number(leadTask.due_date) * 1000)
          : null,
        department: leadTask?.department || "",
        category: leadTask?.category || "",
        status_id: leadTask?.status?.status_id || null, // Correctly mapping status ID
        priority: leadTask?.priority || "",
        assigned_to:
          leadTask?.assigned_to?.map((user: any) => user.user_id) || [], // Mapping assigned users
        tag_ids: leadTask?.tags?.map((tag: any) => tag.tag_id) || [], // Mapping tags correctly
        task_title: leadTask?.task_title || "",
        task_description: leadTask?.task_description || "",
        is_completed: leadTask?.is_completed || false,
      });
    }
  }, [leadTask, reset]); // Run effect when `leadTask` changes

  const assignedTo = watch("assigned_to") || []; // Watching assigned values
  // Filter selected assignee objects based on selected values
  const selectedAssignees = assigneeList.filter((assignee) =>
    assignedTo.includes(assignee.value)
  );

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      start_date: convertDateToTimestamp(data.start_date),
      due_date: convertDateToTimestamp(data.due_date),
    };

    const params = {
      SourceId: lead?.lead?.lead_id,
      SourceType: SOURCE_TYPE?.LEAD,
    };

    if (task_id) {
      dispatch(updateLeadTask({ id: task_id, data: payload, params }))
        .unwrap()
        .then(() => {
          onCancel();
          reset();
          setIsRefresh(true);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
      return;
    } else {
      dispatch(createLeadTask(payload))
        .unwrap()
        .then(() => {
          onCancel();
          reset();
          setIsRefresh(true);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
    }
  };

  return (
    <>
      <div className="common_header_main_div">
        <h4 className="common_header_data_text"> Add New Task </h4>
        <div className="breadcrumb_main_div">
          <label className="breadcrumb_link_text">Lead</label>
          <label className="dots_icon"></label>
          <label className="breadcrumb_page_text">Task</label>
        </div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <div className="lead_common_card_main_div">
                <h6 className="common_card_title">Task Info. </h6>
                <Row>
                  <Col md={12}>
                    <div className="text_filed text_filed_dropdown">
                      <Controller
                        name="task_public_id"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Task ID *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("task_public_id", e.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="text_filed text_filed_dropdown">
                      <Controller
                        name="task_title"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Title *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("task_title", e.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="date_picker_div">
                      <div className="datetimepicker-control-section">
                        <Controller
                          name="start_date"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <DatePickerComponent
                                placeholder="Start Date *"
                                min={task_id ? undefined : today} // Disable past dates
                                cssClass="e-outline"
                                floatLabelType="Auto"
                                value={field.value}
                                onChange={(e: any) =>
                                  setValue("start_date", e.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                              {error && (
                                <p className="error-text">{error.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="date_picker_div">
                      <div className="datetimepicker-control-section">
                        <Controller
                          name="due_date"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <DatePickerComponent
                                placeholder="End Date *"
                                min={watch("start_date") || today}
                                cssClass="e-outline"
                                floatLabelType="Auto"
                                value={field.value}
                                onChange={(e: any) =>
                                  setValue("due_date", e.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                              {error && (
                                <p className="error-text">{error.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col md={12}>
                    <div className="dropdown_common">
                      <Controller
                        name="department"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
                              floatLabelType="Auto"
                              dataSource={departmentOptions}
                              fields={{ text: "label", value: "value" }}
                              placeholder="Department *"
                              popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("department", e.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </Col>

                  <Col md={12}>
                    <div className="dropdown_common">
                      <Controller
                        name="category"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
                              floatLabelType="Auto"
                              dataSource={categoryOptions}
                              fields={{ text: "label", value: "value" }}
                              placeholder="Category *"
                              popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("category", e.value, {
                                  shouldValidate: true,
                                })
                              }
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
              </div>
            </Col>

            <Col md={6}>
              <div className="lead_common_card_main_div">
                <h6 className="common_card_title">General Info.</h6>
                <Row>
                  <Col md={12}>
                    <div className="dropdown_common">
                      <Controller
                        name="status_id"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
                              floatLabelType="Auto"
                              dataSource={leadTaskStatus?.data}
                              fields={{ text: "name", value: "status_id" }}
                              placeholder="Status *"
                              popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              itemTemplate={(data: any) =>
                                statusItemTemplate(data)
                              }
                              valueTemplate={(data: any) =>
                                statusValueTemplate(data)
                              }
                              onChange={(e: any) =>
                                setValue("status_id", e.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="dropdown_common">
                      <Controller
                        name="priority"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
                              floatLabelType="Auto"
                              placeholder="Priority *"
                              dataSource={priorityColors}
                              fields={{ text: "label", value: "value" }}
                              popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              itemTemplate={(data: any) =>
                                priorityItemTemplate(data)
                              }
                              valueTemplate={(data: any) =>
                                priorityValueTemplate(data)
                              }
                              onChange={(e: any) =>
                                setValue("priority", e.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div
                      className={`multi_select_common text_filed_dropdown text_filed ${selectedAssignees?.length > 0 ? "mb-3" : ""}`}
                    >
                      <Controller
                        name="assigned_to"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <MultiSelectComponent
                              floatLabelType="Auto"
                              cssClass="e-outline"
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
                  <Col
                    md={12}
                    className="d-flex align-items-center mb-3 assigned_user_icon"
                  >
                    {selectedAssignees?.map((assignee, index) => (
                      <span
                        key={index}
                        className="e-avatar e-avatar-xsmall e-avatar-circle"
                      >
                        {getNameInitials(assignee?.text)}
                      </span>
                    ))}
                  </Col>

                  <Col md={12}>
                    <div className="multi_select_common text_filed_dropdown text_filed">
                      <Controller
                        name="tag_ids"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <MultiSelectComponent
                              floatLabelType="Auto"
                              cssClass="e-outline"
                              dataSource={tagList}
                              fields={{ text: "name", value: "tag_id" }} // Ensure API returns { id, text }
                              allowCustomValue={true}
                              placeholder="Select or add tags"
                              value={field.value || []} // Ensure value is always an array
                              onChange={(e: any) =>
                                handleTagChange(e, field.value || [])
                              } // Ensure field.value is an array
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
              </div>
            </Col>

            {/* Tool Bar */}
            <Col md={12}>
              <div className="mb-3 mt-2">
                <ToolbarEditor name="task_description" isControl={true} />
              </div>
            </Col>

            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <UploadFiles name="files" multiple={true} />
                </div>
              </Col>
            </Row>

            <Col md={12}>
              <div className="add_contact_btn_sec">
                <button
                  type="button"
                  className="common_secondary_btn"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <CommonProgressButton
                  content={task_id ? "Save" : "Submit"}
                  loading={loading}
                />
              </div>
            </Col>
          </Row>
        </form>
      </FormProvider>

      {task_id && (
        <div className="leads_tab_main mt-3 position-relative">
          <label
            className="breadcrumb_page_text cursor-pointer fw-bold mb-2 task_breadcrumb"
            onClick={handleSort}
          >
            <Icon
              icon={
                sortOrder === "ASC"
                  ? "carbon:sort-ascending"
                  : "carbon:sort-descending"
              }
              className="common-icon"
              width="16"
              height="16"
            />{" "}
            {sortOrder === "ASC" ? "Oldest First" : "Newest First"}
          </label>
          <TabComponent
            cssClass="responsive-mode"
            heightAdjustMode="None"
            selectedItem={activeTabIndex} // Set active tab index
            selected={(e) => {
              setActiveTabIndex(e.selectedIndex); // Update active tab index
              setActiveTab(headertext[e.selectedIndex]?.text);
            }}
          >
            <TabItemsDirective>
              <TabItemDirective
                header={headertext[0]}
                content={() => tabRender("Comments")}
              />
              <TabItemDirective
                header={headertext[1]}
                content={() => tabRender("Attachments")}
              />
              <TabItemDirective
                header={headertext[2]}
                content={() => tabRender("History")}
              />
            </TabItemsDirective>
          </TabComponent>
        </div>
      )}
    </>
  );
};

export default AddTaskPage;
