import React from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";

import ToolbarEditor from "../tool-bar";
import CommonProgressButton from "../common-progress-button";

const AddNewProductService = () => {
  const methods = useForm<any>({
    mode: "onChange",
    // resolver: yupResolver(leadValidationSchema),
    defaultValues: {
      product_category: "",
      product: "",
      description: "",
      unit: "",
      quantity: "",
      rate: "",
      tax: "",
      amount: "",
    },
  });

  const { handleSubmit, setValue, control } = methods;

  const onSubmit = (data: any) => {
    console.log("data :>> ", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={12}>
            <div className="dropdown_common">
              <Controller
                name="product_category"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DropDownListComponent
                      floatLabelType="Auto"
                      placeholder="Product Category"
                      popupHeight="220px"
                      className="dropdown_filed"
                      cssClass="e-outline"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("product_category", e.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>
          <Col md={12}>
            <div className="dropdown_common">
              <Controller
                name="product"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DropDownListComponent
                      floatLabelType="Auto"
                      placeholder="Product"
                      popupHeight="220px"
                      className="dropdown_filed"
                      cssClass="e-outline"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("product", e.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>
          <Col md={12}>
            <div style={{ marginBottom: "18px" }}>
              <ToolbarEditor />
            </div>
          </Col>
          <Col md={6}>
            <div className="dropdown_common">
              <Controller
                name="unit"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DropDownListComponent
                      floatLabelType="Auto"
                      placeholder="Unit"
                      popupHeight="220px"
                      className="dropdown_filed"
                      cssClass="e-outline"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("unit", e.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="dropdown_common">
              <Controller
                name={`quantity`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DropDownListComponent
                      floatLabelType="Auto"
                      placeholder="Quantity"
                      popupHeight="220px"
                      className="dropdown_filed"
                      cssClass="e-outline"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("quantity", e.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="dropdown_common">
              <Controller
                name={`rate`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DropDownListComponent
                      floatLabelType="Auto"
                      placeholder="Rate"
                      popupHeight="220px"
                      className="dropdown_filed"
                      cssClass="e-outline"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue(`rate`, e.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="dropdown_common">
              <Controller
                name={`tax`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DropDownListComponent
                      floatLabelType="Auto"
                      placeholder="Tax"
                      popupHeight="220px"
                      className="dropdown_filed"
                      cssClass="e-outline"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue(`tax`, e.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>
          <Col md={12}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name={`amount`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextBoxComponent
                      placeholder="Amount"
                      cssClass="e-outline"
                      floatLabelType="Auto"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue(`amount`, e.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>
          <Col md={12}>
            <div className="mt-3 text-end">
              {/* <button
                className="common_btn"
                type="button"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button> */}
              <CommonProgressButton
                content="Save"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};

export default AddNewProductService;
