"use client";

import { JSX, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import {
  TextAreaComponent,
  TextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import { Col, Row } from "react-bootstrap";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  StepperComponent,
  StepsDirective,
  StepDirective,
} from "@syncfusion/ej2-react-navigations";
// import { FormProvider } from "react-hook-form";
import CustomersTaxationDetails from "../taxation-details-customers";
import BillingShipping from "../billing-shipping";
import CustomersBankDetails from "../bankdetails-customers";
import CustomersOtherDetails from "../otherdetails-customers";
import CustomerAdmins from "../admins-form";
// import ToolbarEditor from "../../tool-bar";

const CustomerDetail = () => {
  const stepperObj = useRef<StepperComponent>(null);
  let stepperOptionsEle: Element;
  const [stepIndex] = useState(1);

  const stepperOptionsRef = (element: HTMLDivElement | null) => {
    if (element) {
      stepperOptionsEle = element;
    }
  };

  // const { handleSubmit, setValue, control } = methods;

  const updateContent = (): JSX.Element => {
    switch (stepIndex) {
      case 0:
        return <CustomersTaxationDetails />;
      case 1:
        return <BillingShipping />;
      case 2:
        return <CustomersBankDetails />;
      case 3:
        return <CustomersOtherDetails />;
      case 4:
        return <CustomerAdmins />;
      default:
        return <></>;
    }
  };

  return (
    <>
      {/* <FormProvider {...methods}> */}
      <div>
        <h6 className="common_card_title"> Customer Detail </h6>
        <Row>
          <Col md={12}>
            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Company/ Account Name"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="First Name"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="text_filed text_filed_dropdown">
              <TextBoxComponent
                placeholder="Last Name"
                cssClass="e-outline"
                floatLabelType="Auto"
              />
            </div>
          </Col>

          <div className="customer_check_sec">
            <div>
              <CheckBoxComponent checked={true}></CheckBoxComponent>
            </div>
            <p className="customer_number_check_text">
              {" "}
              Same as WhatsApp number?{" "}
            </p>
          </div>

          <Col md={6}>
            <div className="add_remove_filed">
              <div className="text_filed text_filed_dropdown w-100">
                <TextBoxComponent
                  placeholder="Phone Number"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                />
              </div>
              <button className="add_filed_btn">
                {" "}
                <Icon icon="ic:baseline-plus" width="16" height="16" />{" "}
              </button>
            </div>
          </Col>
          <Col md={6}>
            <div className="add_remove_filed">
              <div className="text_filed text_filed_dropdown w-100">
                <TextBoxComponent
                  placeholder="Email Address"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                />
              </div>
              <button className="add_filed_btn">
                {" "}
                <Icon icon="ic:baseline-plus" width="16" height="16" />{" "}
              </button>
            </div>
          </Col>
          <Col md={6}>
            <div className="add_remove_filed">
              <div className="text_filed text_filed_dropdown w-100">
                <TextBoxComponent
                  placeholder="Phone Number"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                />
              </div>
              <button className="remove_filed_btn">
                {" "}
                <Icon icon="meteor-icons:minus" width="16" height="16" />{" "}
              </button>
            </div>
          </Col>
          <Col md={6}>
            <div className="add_remove_filed">
              <div className="text_filed text_filed_dropdown w-100">
                <TextBoxComponent
                  placeholder="Email Address"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                />
              </div>
              <button className="remove_filed_btn">
                {" "}
                <Icon icon="meteor-icons:minus" width="16" height="16" />{" "}
              </button>
            </div>
          </Col>

          <Col md={12}>
            <div className="text_filed text_filed_dropdown">
              <TextAreaComponent
                placeholder="Address"
                cssClass="e-outline"
                floatLabelType="Auto"
                rows={3}
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="dropdown_common text_filed_dropdown">
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
            <div className="dropdown_common text_filed_dropdown">
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
                placeholder="Pincode"
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

          <Col md={6}>
            <div className="add_remove_filed">
              <div className="dropdown_common text_filed_dropdown w-100">
                <DropDownListComponent
                  floatLabelType="Auto"
                  placeholder="Groups"
                  popupHeight="220px"
                  className="dropdown_filed"
                  cssClass="e-outline"
                />
              </div>
              <button className="add_filed_btn">
                {" "}
                <Icon icon="ic:baseline-plus" width="16" height="16" />{" "}
              </button>
            </div>
          </Col>

          <Col md={12}>
            {/* <div className="mb-3 mt-2">
                <ToolbarEditor name="details" isControl={true} />
              </div> */}
          </Col>

          <Col md={12}>
            <div className="organization_stepper_sec stepper-icon w-100 mt-3">
              <StepperComponent ref={stepperObj}>
                {" "}
                <StepsDirective>
                  <StepDirective
                    iconCss={"sf-icon-progress"}
                    label={"Taxation Details"}
                  />
                  <StepDirective
                    iconCss={"sf-icon-tasksheet"}
                    label={"Billing & Shipping"}
                  />
                  <StepDirective
                    iconCss={"sf-icon-progress"}
                    label={"Bank Details"}
                  />
                  <StepDirective
                    iconCss={"sf-icon-submit"}
                    label={"Other Details"}
                  />
                  <StepDirective
                    iconCss={"sf-icon-submit"}
                    label={"Customer Admins"}
                  />
                </StepsDirective>
              </StepperComponent>
            </div>
            {updateContent()}
            <div
              className="linear-stepper-options"
              style={{ display: "inline-flex" }}
              ref={stepperOptionsRef}
            ></div>
          </Col>
        </Row>
      </div>
      {/* </FormProvider> */}
    </>
  );
};

export default CustomerDetail;
