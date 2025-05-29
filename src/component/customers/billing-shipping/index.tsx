import React from "react";
import { Icon } from "@iconify/react";
import { Col, Row } from "react-bootstrap";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import {
  TextAreaComponent,
  TextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

const BillingShipping = () => {
  return (
    <>
      <div>
        <Row>
          <Col md={6}>
            <div className="billing_add_sec billing_shipping_topbar">
              <div>
                <h6 className="billing_sec_title m-0"> Billing Address </h6>
              </div>
              <div className="info_checkmark_sec">
                <CheckBoxComponent checked={true}></CheckBoxComponent>
                <p className="billing_sec_text m-0"> Same as Customer Info </p>
              </div>
            </div>

            <div className="text_filed text_filed_dropdown">
              <TextAreaComponent
                placeholder="Address"
                cssClass="e-outline"
                floatLabelType="Auto"
                rows={3}
              />
            </div>

            <div className="dropdown_common text_filed_dropdown">
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="City"
                popupHeight="220px"
                className="dropdown_filed"
                cssClass="e-outline"
              />
            </div>

            <div className="dropdown_common text_filed_dropdown">
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="State"
                popupHeight="220px"
                className="dropdown_filed"
                cssClass="e-outline"
              />
            </div>

            <Row className="mb-3">
              <Col md={6} lg={6} xl={4}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    placeholder="Zip Code"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                  />
                </div>
              </Col>
              <Col md={6} lg={6} xl={5}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    placeholder="Distance"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                  />
                </div>
              </Col>
              <Col md={8} lg={6} xl={3}>
                <button className="common_btn common_filed_side_btn">
                  get distance
                </button>
              </Col>
            </Row>

            <div className="dropdown_common text_filed_dropdown">
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="Currency"
                popupHeight="220px"
                className="dropdown_filed"
                cssClass="e-outline"
              />
            </div>

            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Website"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>

            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Email"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="shipping_add_sec billing_shipping_topbar">
              <div className="info_title_top_sec">
                <Icon
                  icon="eva:question-mark-circle-outline"
                  width="16"
                  height="16"
                />
                <h6 className="shipping_sec_title m-0"> Shipping Address</h6>
              </div>
              <div className="info_checkmark_sec">
                <CheckBoxComponent checked={true}></CheckBoxComponent>
                <p className="shipping_sec_text m-0"> Copy Billing Address </p>
              </div>
            </div>

            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="GST Number"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>

            <div className="text_filed text_filed_dropdown">
              <TextAreaComponent
                placeholder="Address"
                cssClass="e-outline"
                floatLabelType="Auto"
                rows={3}
              />
            </div>

            <div className="dropdown_common text_filed_dropdown">
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="City"
                popupHeight="220px"
                className="dropdown_filed"
                cssClass="e-outline"
              />
            </div>

            <div className="dropdown_common text_filed_dropdown">
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="State"
                popupHeight="220px"
                className="dropdown_filed"
                cssClass="e-outline"
              />
            </div>

            <Row className="mb-3">
              <Col md={6} lg={6} xl={4}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    placeholder="Zip Code"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                  />
                </div>
              </Col>
              <Col md={6} lg={6} xl={5}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    placeholder="Distance"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                  />
                </div>
              </Col>
              <Col md={8} lg={6} xl={3}>
                <button className="common_btn common_filed_side_btn">
                  get distance
                </button>
              </Col>
            </Row>

            <div className="dropdown_common text_filed_dropdown">
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="Currency"
                popupHeight="220px"
                className="dropdown_filed"
                cssClass="e-outline"
              />
            </div>

            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Website"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>

            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Email"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>

            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Name Of Transport"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>

            <div className="dropdown_common text_filed_dropdown">
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="Way Of Transition "
                popupHeight="220px"
                className="dropdown_filed"
                cssClass="e-outline"
              />
            </div>
          </Col>
        </Row>

        <div className="company_form_btn_sec">
          <div className="company_btn_sec">
            <button type="button" className="common_secondary_btn">
              Skip
            </button>
            <button type="button" className="common_secondary_btn">
              Back
            </button>
            <button type="submit" className="common_btn">
              Save And Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingShipping;
