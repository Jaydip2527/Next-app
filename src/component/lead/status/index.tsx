"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  ColorPickerComponent,
  TextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import { yupResolver } from "@hookform/resolvers/yup";

import useDataManager from "@/@/hooks/useDataManager";
import EmojiIconPicker from "./EmojiIconPicker";
import {
  createLeadStatus,
  deleteLeadStatus,
  fetchSingleLeadStatus,
  updateLeadStatus,
} from "../../../redux/slices/leadStatusSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/redux-hooks";
import { leadStatusSchema } from "../../../utils/validations";
import NewDataGrid from "../../new-data-grid";
import CommonProgressButton from "../../common-progress-button";

const initialEditData = {
  status_id: "",
  name: "",
  color: "#b80000",
  icon: "",
  sequence: 0,
  module: "lead",
  organization_id: "",
  organization_public_id: "",
  status: "",
};

const LeadStatusCom = () => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const { organization } = useAppSelector((state) => state.organization);
  const { loading } = useAppSelector((state) => state.leadStatus);
  const GET_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/tnt-template/tnt_status-list`;

  const organizationId = useMemo(
    () => organization?.organization_id,
    [organization?.organization_id]
  );

  const options = useMemo(
    () => ({
      module: "lead",
      organizationId,
    }),
    [organizationId]
  );

  const { dataManager, actionBegin, gridRef } = useDataManager(
    GET_API_ENDPOINT,
    options
  );

  const [editData, setEditData] = useState(initialEditData);

  const methods = useForm<any>({
    mode: "all",
    resolver: yupResolver(leadStatusSchema),
    defaultValues: initialEditData,
  });
  const { handleSubmit, setValue, control, reset, clearErrors } = methods;

  const handleClose = useCallback(() => {
    setShow(false);
    setEditData(initialEditData);
    clearErrors();
    reset(initialEditData);
  }, [clearErrors, reset]);

  const handleAddStatus = useCallback(() => {
    reset(initialEditData);
    clearErrors();
    setShow(true);
  }, [clearErrors, reset]);

  const handleCommandClick = useCallback(
    async (args: any) => {
      if (args.commandColumn.type === "Edit") {
        dispatch(fetchSingleLeadStatus(args.rowData.status_id)).unwrap();
        setEditData(args.rowData);
        reset(args.rowData);
        setShow(true);
      }

      if (args.commandColumn.type === "Delete") {
        if (typeof window !== "undefined") {
          const selectedRow = args.rowData;
          const leadStatusId = selectedRow.status_id;
          // eslint-disable-next-line no-alert
          const confirmed = window?.confirm(
            "Are you sure you want to delete this LeadStatus?"
          );
          if (confirmed) {
            try {
              const response = await dispatch(
                deleteLeadStatus({
                  id: leadStatusId,
                  organizationId,
                  module: "lead",
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
              console.log("Delete LeadStatus Error:", error);
            }
          }
        }
      }
    },
    [organizationId, gridRef, reset]
  );

  const onSubmit = useCallback(
    async (formData: any) => {
      const addFormData = {
        name: formData?.name || "",
        color: formData?.color || "#b80000",
        icon: formData?.icon || "",
        sequence: Number(formData?.sequence) || 0,
        module: "lead",
        organization_id: organizationId,
        organization_public_id: organization?.organization_public_id,
      };
      const updateFormData = {
        ...addFormData,
        // name: formData?.name || "",
        // color: formData?.color || "#b80000",
        // icon: formData?.icon || "",
        // sequence: Number(formData?.sequence) || 0,
        // module: "lead",
        status: (editData && editData?.status) || "",
        // organization_id: organizationId,
        // organization_public_id: organization?.organization_public_id,
      };
      if (editData?.status_id) {
        await dispatch(
          updateLeadStatus({ id: editData?.status_id, data: updateFormData })
        );

        const grid = gridRef?.current;
        if (grid) {
          grid.refresh();
        }
        handleClose();
      } else {
        await dispatch(createLeadStatus(addFormData));
        const grid = gridRef?.current;
        if (grid) {
          grid.refresh();
        }
        handleClose();
      }
    },
    [
      editData,
      gridRef,
      handleClose,
      organizationId,
      organization?.organization_public_id,
    ]
  );

  const commands = useMemo(
    () => [
      {
        type: "Edit",
        buttonOption: { cssClass: "e-info", iconCss: "e-icons e-edit" },
      },
      {
        type: "Delete",
        buttonOption: { cssClass: "e-danger", iconCss: "e-icons e-delete" },
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      // {
      //   type: "checkbox",
      //   allowSorting: false,
      //   allowFiltering: false,
      //   width: "60",
      // },
      {
        field: "status_id",
        headerText: "ID",
        isPrimaryKey: true,
        visible: false,
      },
      {
        field: "name",
        headerText: "Status Name",
        width: "200",
        textAlign: "Left",
      },
      {
        field: "sequence",
        headerText: "Order",
        width: "200",
        textAlign: "Left",
      },
      {
        field: "status",
        headerText: "Status",
        width: "200",
        textAlign: "Left",
        template: (data: any) => {
          return data?.is_deleted ? "Inactive" : "Active";
        },
      },
      {
        field: "color",
        headerText: "Color",
        width: "200",
        textAlign: "Left",
        template: (data: any) => {
          return (
            <div
              style={{
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                backgroundColor: data?.color,
                color: data?.color,
              }}
            >
              {/* {data?.color} */}
            </div>
          );
        },
      },
      {
        // headerText: "Manage Records",
        width: "160",
        commands,
      },
    ],
    [commands]
  );

  const beforeSquareTileRender = useCallback((args: any): void => {
    args.element.classList.add("e-square-palette");
  }, []);

  const squarePaletteColors = useMemo(
    () => ({
      custom1: [
        "#b80000",
        "#db3e00",
        "#fccb00",
        "#008b02",
        "#006b76",
        "#1273de",
        "#004dcf",
        "#5300eb",
        "#eb9694",
        "#fad0c3",
        "#fef3bd",
        "#c1e1c5",
        "#bedadc",
        "#c4def6",
        "#bed3f3",
        "#d4c4fb",
      ],
    }),
    []
  );

  return (
    <>
      <div className="common_data_grid add_data_grid_action_bar">
        <div className="data_grid_action_bar_div">
          <div className="title_box_div">
            <h4 className="common_header_data_text">add new lead status</h4>
          </div>
          <div className="icon_box_flex_box justify-content-end">
            <button className="common_small_btn_icon" onClick={handleAddStatus}>
              New Lead Status
            </button>
          </div>
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

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-w600"
        centered
        className="common_modal_div"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton className="modal_header_sec">
              <h5 className="modal_title_text">
                {editData?.status_id ? "Edit Lead Status" : "New Lead Status"}
              </h5>
            </Modal.Header>
            <Modal.Body className="modal_body_sec pb-0">
              <Row>
                <Col md={12}>
                  <div className="text_filed text_filed_dropdown">
                    <Controller
                      name="name"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <TextBoxComponent
                            placeholder="Status Name *"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            value={field.value}
                            onChange={(e: any) => {
                              setValue("name", e.value, {
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
                <Col md={6}>
                  <div className="text_filed text_filed_dropdown">
                    <Controller
                      name="icon"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <EmojiIconPicker
                          value={field.value}
                          onChange={field.onChange}
                          error={error?.message}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="text_filed text_filed_dropdown">
                    <Controller
                      name="sequence"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <TextBoxComponent
                            placeholder="Order"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            value={field.value}
                            onChange={(e: any) => {
                              setValue("sequence", e.value, {
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
                <Col md={6}>
                  <div className="text_filed text_filed_dropdown">
                    <Controller
                      name="color"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <ColorPickerComponent
                            id="square-palette"
                            mode="Palette"
                            modeSwitcher={false}
                            inline={true}
                            showButtons={false}
                            columns={8}
                            presetColors={squarePaletteColors}
                            beforeTileRender={beforeSquareTileRender}
                            change={(e: any) => {
                              if (e.currentValue.hex) {
                                field.onChange(e.currentValue.hex);
                              }
                            }}
                            value={field.value}
                          ></ColorPickerComponent>
                          <div className="d-flex align-items-center mt-2">
                            <label
                              className="common_label_text"
                              style={{ fontSize: "12px" }}
                            >
                              Selected Color:
                            </label>
                            <div
                              id="e-shirt-preview"
                              style={{
                                width: 30,
                                height: 30,
                                backgroundColor: field.value,
                                borderRadius: "50%",
                                marginLeft: "10px",
                              }}
                            ></div>
                          </div>
                          {error && (
                            <p className="error-text">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="modal_footer_sec">
              <button
                className="common_secondary_btn"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
              <CommonProgressButton
                content={editData?.status_id ? "Save" : "Submit"}
                disabled={loading}
              />
            </Modal.Footer>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default LeadStatusCom;
