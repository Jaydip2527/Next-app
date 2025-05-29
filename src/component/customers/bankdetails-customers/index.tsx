import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import React from "react";
import { Col, Row } from "react-bootstrap";

const CustomersBankDetails = () => {
  return (
    <>
      <div>
        <Row>
          <Col md={6}>
            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Bank Name"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Branch"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>
          <Col md={12}>
            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Account Holder Name"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Account Number"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="IFSC Code"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Swift Code"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="MICR Code"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="dropdown_common text_filed_dropdown">
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="Currency"
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

export default CustomersBankDetails;
