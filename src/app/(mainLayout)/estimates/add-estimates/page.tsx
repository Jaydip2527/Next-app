"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  DropDownListComponent,
  MultiSelectComponent,
} from "@syncfusion/ej2-react-dropdowns";
import {
  TextAreaComponent,
  TextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";

import ToolbarEditor from "@/@/component/tool-bar";
import AddProductServiceTable from "@/@/component/add-product-service-table";
import OffCanvasWrapper from "@/@/component/off-canvas-wrapper";
import CommonProgressButton from "@/@/component/common-progress-button";

/**
 * Renders the "Add New Estimates" page with various input fields and components for adding estimate details.
 * Includes sections for customer information, project details, billing and shipping addresses, and more.
 * The page also features modals for editing terms and conditions and billing details, as well as a pricing summary section.
 */
const AddEstimatesPage = () => {
  const sportsData = ["bug", "follow up", "important"];

  const methods = useForm<any>({
    mode: "onChange",
    // resolver: yupResolver(leadValidationSchema),
  });

  const [contactshow, contactsetShow] = useState(false);

  const handleClose = () => contactsetShow(false);
  const handleShow = () => contactsetShow(true);

  const [policycontactshow, policycontactsetShow] = useState(false);

  const policyhandleClose = () => policycontactsetShow(false);
  const policyhandleShow = () => policycontactsetShow(true);

  return (
    <>
      <div className="common_header_main_div">
        <h4 className="common_header_data_text"> Add New Estimates </h4>
        <div className="breadcrumb_main_div">
          <label className="breadcrumb_link_text">Sales</label>
          <label className="dots_icon"></label>
          <label className="breadcrumb_page_text">Estimates</label>
        </div>
      </div>

      <div>
        <FormProvider {...methods}>
          <Row>
            <Col md={7} className="mb-4">
              <div className="common_card_main_div">
                <Row>
                  <Col md={6}>
                    <div className="text_filed text_filed_dropdown">
                      <TextBoxComponent
                        placeholder="Estimate Number"
                        cssClass="e-outline"
                        floatLabelType="Auto"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="date_picker_div">
                      <div className="datetimepicker-control-section">
                        <DatePickerComponent
                          placeholder="Estimate Date"
                          cssClass="e-outline"
                          floatLabelType="Auto"
                          min={new Date()}
                        ></DatePickerComponent>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="text_filed text_filed_dropdown">
                      <TextBoxComponent
                        placeholder="Customer"
                        cssClass="e-outline"
                        floatLabelType="Auto"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="text_filed text_filed_dropdown">
                      <TextBoxComponent
                        placeholder="Contact Person"
                        cssClass="e-outline"
                        floatLabelType="Auto"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="text_filed text_filed_dropdown">
                      <TextBoxComponent
                        placeholder="Phone Number"
                        cssClass="e-outline"
                        floatLabelType="Auto"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="text_filed text_filed_dropdown">
                      <TextBoxComponent
                        placeholder="Email"
                        cssClass="e-outline"
                        floatLabelType="Auto"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="dropdown_common">
                      <DropDownListComponent
                        floatLabelType="Auto"
                        placeholder="Project Name"
                        popupHeight="220px"
                        className="dropdown_filed"
                        cssClass="e-outline"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="text_filed text_filed_dropdown">
                      <TextBoxComponent
                        placeholder="Subject"
                        cssClass="e-outline"
                        floatLabelType="Auto"
                      />
                    </div>
                  </Col>
                  <div className="text_filed_dropdown">
                    <Row>
                      <Col md={6} className="mb-2">
                        <div className="edit_box_border">
                          <div className="lead_contact_info_edit_div mb-2">
                            <div className="left_div">
                              <p className="edit_text">Bill To</p>
                              {/* <p className="edit_text">Marketing Manager</p>
                      <p className="edit_text">+1 (555) 123-4567</p>
                      <p className="edit_text">john.doe@example.com</p>
                      <p className="edit_text">www.abccorp.com</p> */}
                            </div>
                            <div className="right_div">
                              <Icon
                                icon="lucide:edit"
                                width="16"
                                height="16"
                                className="cursor-pointer"
                                style={{ color: "#133E87" }}
                                onClick={handleShow}
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="text_filed">
                          <TextAreaComponent
                            placeholder="Ship To"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            rows={2}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Col md={6} className="mb-2">
                    <div className="dropdown_common m-0">
                      <DropDownListComponent
                        floatLabelType="Auto"
                        placeholder="Customer Category"
                        popupHeight="220px"
                        className="dropdown_filed"
                        cssClass="e-outline"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="text_filed">
                      <TextBoxComponent
                        placeholder="Reference"
                        cssClass="e-outline"
                        floatLabelType="Auto"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={5} className="h-100">
              <div className="common_header_main_div m-0">
                <Row>
                  <Col md={6}>
                    <div className="text_filed text_filed_dropdown">
                      <TextBoxComponent
                        placeholder="GSTIN /VAT"
                        cssClass="e-outline"
                        floatLabelType="Auto"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="dropdown_common">
                      <DropDownListComponent
                        floatLabelType="Auto"
                        placeholder="Currency"
                        popupHeight="220px"
                        className="dropdown_filed"
                        cssClass="e-outline"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="dropdown_common">
                      <DropDownListComponent
                        floatLabelType="Auto"
                        placeholder="Status"
                        popupHeight="220px"
                        className="dropdown_filed"
                        cssClass="e-outline"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="dropdown_common">
                      <DropDownListComponent
                        floatLabelType="Auto"
                        placeholder="Discount Type"
                        popupHeight="220px"
                        className="dropdown_filed"
                        cssClass="e-outline"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="date_picker_div">
                      <div className="datetimepicker-control-section">
                        <DatePickerComponent
                          placeholder="Expiry Date"
                          min={new Date()}
                          cssClass="e-outline"
                          floatLabelType="Auto"
                        ></DatePickerComponent>
                      </div>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="multi_select_common text_filed_dropdown text_filed mt-3">
                      <MultiSelectComponent
                        cssClass="e-outline"
                        id="mtselement"
                        dataSource={sportsData}
                        placeholder="Select Information"
                        floatLabelType="Auto"
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-2 mt-2">
                      <ToolbarEditor />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={3}>
              <div className="dropdown_common">
                <DropDownListComponent
                  floatLabelType="Auto"
                  placeholder="Add Item"
                  popupHeight="220px"
                  className="dropdown_filed"
                  cssClass="e-outline"
                />
              </div>
            </Col>
            <Col md={12}>
              <AddProductServiceTable />
            </Col>
            <Col md={12}>
              <div className="mt-4 text-end">
                <button className="common_secondary_btn me-2" type="button">
                  Cancel
                </button>
                <CommonProgressButton content={"Submit"} />
              </div>
            </Col>
          </Row>

          <Row className="mt-3 mb-4 align-items-end">
            <Col md={9}>
              <div>
                <ToolbarEditor />
              </div>
            </Col>
            <Col md={3} className="mt-3">
              <div className="pricing_box_sec">
                <div className="pricing_box_data_part">
                  <div className="total_price_dataset mb-2">
                    <div className="text_fix_width">
                      <p className="total_data_text ">Sub Total</p>
                    </div>
                    <p className="price_text">₹800.00</p>
                  </div>
                  <div className="total_price_dataset mb-2">
                    <div className="Percentage_sec">
                      <div className="text_fix_width">
                        <p className="total_data_text">Discount</p>
                      </div>
                      <div className="Percentage_sec">
                        <p className="Percentage_text percentage_box"> 0 </p>
                        <p className="Percentage_text"> % </p>
                      </div>
                    </div>
                    <p className="price_text">₹0.00</p>
                  </div>
                  <div className="total_price_dataset mb-2">
                    <div className="Percentage_sec">
                      <div className="text_fix_width">
                        <p className="total_data_text">Tax</p>
                      </div>
                      <div className="Percentage_sec">
                        <p className="Percentage_text percentage_box">
                          {" "}
                          18.00{" "}
                        </p>
                        <p className="Percentage_text"> % </p>
                      </div>
                    </div>
                    <p className="price_text">₹0.00</p>
                  </div>
                  <div className="total_price_dataset mb-2">
                    <div className="text_fix_width">
                      <p className="total_data_text ">Additional Charge</p>
                    </div>
                    <p className="price_text">-</p>
                  </div>
                  <div className="total_price_dataset">
                    <div className="Percentage_sec">
                      <div className="text_fix_width">
                        <p className="total_data_text"> Roundoff </p>
                      </div>
                      <div className="Percentage_sec">
                        <p className="Percentage_text percentage_box"> 0 </p>
                      </div>
                    </div>
                    <p className="price_text">₹0.00</p>
                  </div>
                  <button className="common_btn pricing_btn_size">
                    <div className="total_price_dataset">
                      <div className="text_fix_width">
                        <p className="sub_total_btn_text">Sub Total</p>
                      </div>
                      <p className="total_btn_price_text">₹0.00</p>
                    </div>
                  </button>
                </div>
                <Icon icon="weui:setting-filled" width="20" height="20" />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={12} className="position-relative terms_conditions_sec">
              <div className="text_filed">
                <TextAreaComponent
                  placeholder="Terms & Conditions"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                  rows={3}
                />
              </div>
              <div className="terms_conditions_editbtn">
                <Icon
                  icon="lucide:edit"
                  width="16"
                  height="16"
                  className="cursor-pointer"
                  style={{ color: "#133E87" }}
                  onClick={policyhandleShow}
                />
              </div>
            </Col>
          </Row>

          <OffCanvasWrapper
            show={policycontactshow}
            handleClose={policyhandleClose}
            title="Edit terms & condition"
            className="modal_sec_main"
            placement={"end"}
          >
            <Row>
              <Col md={12}>
                <div className="text_filed">
                  <TextAreaComponent
                    placeholder="Terms & Conditions"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    rows={3}
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className="mt-3 terms_conditions_modal_btn">
                  <button className="common_secondary_btn me-2" type="button">
                    Cancel
                  </button>
                  <CommonProgressButton content={"Submit"} />
                </div>
              </Col>
            </Row>
          </OffCanvasWrapper>

          <OffCanvasWrapper
            show={contactshow}
            handleClose={handleClose}
            title="Add billing"
            className="modal_sec_main"
            placement={"end"}
          >
            <Row>
              <Col md={12}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    placeholder="House No / Flat / Building Name"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    placeholder="Area / Sector/ Locality"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="dropdown_common">
                  <DropDownListComponent
                    floatLabelType="Auto"
                    placeholder="City"
                    popupHeight="220px"
                    className="dropdown_filed"
                    cssClass="e-outline"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="dropdown_common">
                  <DropDownListComponent
                    floatLabelType="Auto"
                    placeholder="State"
                    popupHeight="220px"
                    className="dropdown_filed"
                    cssClass="e-outline"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    placeholder="Zip Code"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="dropdown_common">
                  <DropDownListComponent
                    floatLabelType="Auto"
                    placeholder="Country"
                    popupHeight="220px"
                    className="dropdown_filed"
                    cssClass="e-outline"
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className="billing_checkbox_sec">
                  <p className="billing_address_modal_sec">
                    {" "}
                    Is your shipping address the same as your billing
                    address?{" "}
                  </p>
                  <CheckBoxComponent checked={true}></CheckBoxComponent>
                </div>
              </Col>
              <Col md={12}>
                <div className="mt-3 text-end">
                  <button className="common_secondary_btn me-2" type="button">
                    Cancel
                  </button>
                  <CommonProgressButton content={"Submit"} />
                </div>
              </Col>
            </Row>
          </OffCanvasWrapper>
        </FormProvider>
      </div>
    </>
  );
};

export default AddEstimatesPage;
