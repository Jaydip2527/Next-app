import React from "react";
import { Icon } from "@iconify/react";
import { Col, Row } from "react-bootstrap";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";

const CustomersOtherDetails = () => {
  return (
    <>
      <div>
        <Row>
          <Col md={6}>
            <div className="dropdown_common text_filed_dropdown">
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="Select Agent/Reference Name"
                popupHeight="220px"
                className="dropdown_filed"
                cssClass="e-outline"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-start gap-2">
              <div className="text_filed text_filed_dropdown w-100">
                <TextBoxComponent
                  placeholder="Commission Percentage"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                />
              </div>
              <div>
                <Icon
                  icon="fluent-mdl2:calculator-percentage"
                  width="16"
                  height="16"
                />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="social_profile_box">
              <div className="social_icon_line">
                <div className="social_profile_icon">
                  <Icon icon="logos:facebook" width="18" height="18" />
                </div>
              </div>
              <div className="social_media_input">
                <div className="e-input-group">
                  <input className="e-input" type="text" placeholder="" />
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="social_profile_box">
              <div className="social_icon_line">
                <div className="social_profile_icon">
                  <Icon icon="devicon:linkedin" width="18" height="18" />
                </div>
              </div>
              <div className="social_media_input">
                <div className="e-input-group">
                  <input className="e-input" type="text" placeholder="" />
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="social_profile_box">
              <div className="social_icon_line">
                <div className="social_profile_icon">
                  <Icon icon="skill-icons:instagram" width="18" height="18" />
                </div>
              </div>
              <div className="social_media_input">
                <div className="e-input-group">
                  <input className="e-input" type="text" placeholder="" />
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="social_profile_box">
              <div className="social_icon_line">
                <div className="social_profile_icon">
                  <Icon
                    icon="fa6-brands:square-x-twitter"
                    width="18"
                    height="18"
                  />
                </div>
              </div>
              <div className="social_media_input">
                <div className="e-input-group">
                  <input className="e-input" type="text" placeholder="" />
                </div>
              </div>
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

export default CustomersOtherDetails;
