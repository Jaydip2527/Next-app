import React from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Col, Row } from "react-bootstrap";

const CustomersTaxationDetails = () => {
  return (
    <>
      <div>
        <Row>
          <Col md={6}>
            <div className="add_remove_filed">
              <div className="text_filed text_filed_dropdown w-100">
                <TextBoxComponent
                  placeholder="Last Name"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                />
              </div>
              <button className="common_btn common_filed_side_btn">
                {" "}
                verify{" "}
              </button>
            </div>
          </Col>
          <Col md={6}>
            <div className="dropdown_common text_filed_dropdown">
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="Country"
                popupHeight="220px"
                className="dropdown_filed"
                cssClass="e-outline"
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
                placeholder="Phone Number"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="dropdown_common text_filed_dropdown">
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="Country"
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
            <button type="submit" className="common_btn">
              Save And Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomersTaxationDetails;
