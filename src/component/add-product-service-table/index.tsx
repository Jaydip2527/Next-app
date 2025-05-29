import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  TextAreaComponent,
  TextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import AddNewProductService from "./add-product-service-form";
import OffCanvasWrapper from "../off-canvas-wrapper";

const AddProductServiceTable = () => {
  const { control, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_or_service_details",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddRow = () => {
    append({
      product_category: "",
      product: "",
      description: "",
      unit: "",
      quantity: "",
      rate: "",
      tax: "",
      amount: "",
    });
  };

  const handleDeleteRow = (index: number) => {
    remove(index);
  };

  return (
    <>
      <h4
        className="add_product_or_service_text cursor-pointer"
        onClick={handleShow}
      >
        <Icon icon="carbon:add-filled" width="16" height="16" /> Add product or
        service
      </h4>
      <div className="add_product_or_service_table_main_div">
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Category</th>
              <th>Product</th>
              <th>Description</th>
              <th>Unit</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Tax</th>
              <th>Amount</th>
              <th>
                <Icon
                  icon="lets-icons:setting-fill"
                  width="20"
                  height="20"
                  style={{ color: "#25252580" }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="text_filed text_filed_dropdown">
                    <Controller
                      name={`product_or_service_details.${index}.product_category`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <TextBoxComponent
                            placeholder="Product Category"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            value={field.value}
                            onChange={(e: any) =>
                              setValue(
                                `product_or_service_details.${index}.product_category`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
                          />
                          {error && (
                            <p className="error-text">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </td>
                <td>
                  <div className="text_filed text_filed_dropdown">
                    <Controller
                      name={`product_or_service_details.${index}.product`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <TextBoxComponent
                            placeholder="Product"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            value={field.value}
                            onChange={(e: any) =>
                              setValue(
                                `product_or_service_details.${index}.product`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
                          />
                          {error && (
                            <p className="error-text">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </td>
                <td>
                  <div className="text_filed text_filed_dropdown">
                    <Controller
                      name={`product_or_service_details.${index}.description`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <TextAreaComponent
                            placeholder="Description"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            rows={1}
                            value={field.value}
                            onChange={(e: any) =>
                              setValue(
                                `product_or_service_details.${index}.description`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
                          />
                          {error && (
                            <p className="error-text">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </td>
                <td>
                  <div className="dropdown_common">
                    <Controller
                      name={`product_or_service_details.${index}.unit`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <DropDownListComponent
                            floatLabelType="Auto"
                            placeholder="Kg"
                            popupHeight="220px"
                            className="dropdown_filed"
                            cssClass="e-outline"
                            value={field.value}
                            onChange={(e: any) =>
                              setValue(
                                `product_or_service_details.${index}.unit`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
                          />
                          {error && (
                            <p className="error-text">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </td>
                <td>
                  <div className="dropdown_common">
                    <Controller
                      name={`product_or_service_details.${index}.quantity`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <DropDownListComponent
                            floatLabelType="Auto"
                            placeholder="1"
                            popupHeight="220px"
                            className="dropdown_filed"
                            cssClass="e-outline"
                            value={field.value}
                            onChange={(e: any) =>
                              setValue(
                                `product_or_service_details.${index}.quantity`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
                          />
                          {error && (
                            <p className="error-text">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </td>
                <td>
                  <div className="text_filed text_filed_dropdown">
                    <Controller
                      name={`product_or_service_details.${index}.rate`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <TextBoxComponent
                            placeholder="Rate"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            value={field.value}
                            onChange={(e: any) =>
                              setValue(
                                `product_or_service_details.${index}.rate`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
                          />
                          {error && (
                            <p className="error-text">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </td>
                <td>
                  <div className="dropdown_common">
                    <Controller
                      name={`product_or_service_details.${index}.tax`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <DropDownListComponent
                            floatLabelType="Auto"
                            placeholder="No Tax"
                            popupHeight="220px"
                            className="dropdown_filed"
                            cssClass="e-outline"
                            value={field.value}
                            onChange={(e: any) =>
                              setValue(
                                `product_or_service_details.${index}.tax`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
                          />
                          {error && (
                            <p className="error-text">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </td>
                <td>
                  <div className="text_filed text_filed_dropdown">
                    <Controller
                      name={`product_or_service_details.${index}.amount`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <TextBoxComponent
                            placeholder="Amount"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            value={field.value}
                            onChange={(e: any) =>
                              setValue(
                                `product_or_service_details.${index}.amount`,
                                e.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
                          />
                          {error && (
                            <p className="error-text">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </td>
                <td>
                  {index === 0 ? (
                    <button
                      type="button"
                      className="product_or_service_action_icon"
                      onClick={handleAddRow}
                    >
                      <Icon icon="ic:sharp-add" width="16" height="16" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="product_or_service_delete_icon"
                      onClick={() => handleDeleteRow(index)}
                    >
                      <Icon
                        icon="mingcute:delete-2-fill"
                        width="16"
                        height="16"
                      />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add New product /services modal */}

      <OffCanvasWrapper
        show={show}
        handleClose={handleClose}
        title="Add New Product/Services"
        placement="end"
      >
        <AddNewProductService />
      </OffCanvasWrapper>
    </>
  );
};

export default AddProductServiceTable;
