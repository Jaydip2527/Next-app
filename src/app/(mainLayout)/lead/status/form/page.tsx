"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  ColorPickerComponent,
  TextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import EmojiIconPicker from "../../../../../component/lead/status/EmojiIconPicker";
import {
  createLeadStatus,
  updateLeadStatus,
} from "../../../../../redux/slices/leadStatusSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/redux-hooks";
import { leadStatusSchema } from "../../../../../utils/validations";

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

const LeadStatusForm = () => {
  const dispatch = useAppDispatch();
  const { organization } = useAppSelector((state) => state.organization);
  const { leadStatus } = useAppSelector((state) => state.leadStatus);
  const { loading } = useAppSelector((state) => state.leadStatus);
  const searchParams = useSearchParams();
  const statusId = searchParams.get("id");
  const organizationId = useMemo(
    () => organization?.organization_id,
    [organization?.organization_id]
  );

  const [editData, setEditData] = useState(leadStatus?.data || initialEditData);

  const methods = useForm<any>({
    mode: "all",
    resolver: yupResolver(leadStatusSchema),
    defaultValues: initialEditData,
  });
  const { handleSubmit, setValue, control, reset, clearErrors } = methods;

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
      } else {
        await dispatch(createLeadStatus(addFormData));
      }
    },
    [editData, organizationId, organization?.organization_public_id]
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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="modal_title_text">New Lead Status</h5>
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
                        value={editData ? editData?.name : field.value}
                        onChange={(e: any) => {
                          setValue("name", e.value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                      {error && <p className="error-text">{error.message}</p>}
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
                      value={editData ? editData?.icon : field.value}
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
                        value={editData ? editData?.sequence : field.value}
                        onChange={(e: any) => {
                          setValue("sequence", e.value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                      {error && <p className="error-text">{error.message}</p>}
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
                        value={editData ? editData?.color : field.value}
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
                            backgroundColor: editData
                              ? editData?.color
                              : field.value,
                            borderRadius: "50%",
                            marginLeft: "10px",
                          }}
                        ></div>
                      </div>
                      {error && <p className="error-text">{error.message}</p>}
                    </>
                  )}
                />
              </div>
            </Col>
          </Row>
          <button
            className="common_secondary_btn"
            type="button"
            // onClick={handleClose}
          >
            Close
          </button>
          <button className="common_btn" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Save"}
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default LeadStatusForm;
