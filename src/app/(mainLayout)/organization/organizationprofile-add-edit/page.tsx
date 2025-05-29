"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  StepperComponent,
  StepsDirective,
  StepDirective,
} from "@syncfusion/ej2-react-navigations";
import { useParams } from "next/navigation";
import { CompanyDetails } from "@/@/component/company-details";
import { TaxationDetails } from "@/@/component/Taxation-Details";
import { BankDetails } from "@/@/component/bank-details";
import { OrganizationSetup } from "@/@/component/organization-setup";
import {
  fetchCountries,
  fetchCurrencies,
  fetchLanguages,
} from "@/@/redux/slices/organizationProfileSlice";
import { AppDispatch } from "@/@/redux/store";

function OrganizationForm() {
  const stepperObj = useRef<StepperComponent>(null);
  const [stepIndex, setStepIndex] = useState(0);
  let stepperOptionsEle: Element;
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  // Fetch data from API
  useEffect(() => {
    // dispatch(fetchGstTypes());
    dispatch(fetchCountries());
    dispatch(fetchLanguages());
    dispatch(fetchCurrencies());
  }, []);

  const stepperOptionsRef = (element: HTMLDivElement | null) => {
    if (element) {
      stepperOptionsEle = element;
    }
  };

  const updateBack = () => {
    if (stepperObj.current) {
      stepperObj.current.activeStep = stepIndex;
      stepperObj.current.previousStep();
      // stepChange(stepperObj.current.activeStep);
      stepChange(stepIndex - 1);
    }
  };

  const updateNext = () => {
    if (stepperObj.current) {
      stepperObj.current.activeStep = stepIndex;
      stepperObj.current.nextStep();
      // stepChange(stepperObj.current.activeStep);
      stepChange(stepIndex + 1);
    }
  };

  const toggleNavigationButtons = (activeStep: number) => {
    const previousStepElement = stepperOptionsEle?.querySelector(
      "#previousStep"
    ) as HTMLElement | null;
    const nextStepElement = stepperOptionsEle?.querySelector(
      "#nextStep"
    ) as HTMLElement | null;
    if (previousStepElement) {
      previousStepElement.style.display = activeStep !== 0 ? "block" : "none";
    }
    if (nextStepElement) {
      nextStepElement.style.display = activeStep !== 3 ? "block" : "none";
    }
  };

  const stepChange = (index: number) => {
    setStepIndex(index);
    toggleNavigationButtons(index);
  };

  const updateContent = (): JSX.Element => {
    switch (stepIndex) {
      case 0:
        return <OrganizationSetup onNext={updateNext} />;
      case 1:
        return <CompanyDetails onNext={updateNext} onBack={updateBack} />;
      case 2:
        return <TaxationDetails onNext={updateNext} onBack={updateBack} />;
      case 3:
        return <BankDetails onBack={updateBack} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      {/* <div className=""> */}
      {/* <Container> */}
      {/* <div className="organization_card_main_div"> */}
      <div className="common_header_main_div">
        <h4 className="common_header_data_text">
          {id
            ? `Edit Organization Profile`
            : `Set Up Your Organization Profile`}
        </h4>
      </div>
      <div>
        <Row>
          <Col lg={12}>
            <div>
              <div className="Welcome_card_bg">
                <div className="organization_stepper_sec stepper-icon">
                  <StepperComponent ref={stepperObj}>
                    {" "}
                    <StepsDirective>
                      <StepDirective
                        iconCss={"sf-icon-form"}
                        label={"Organization Setup"}
                      />
                      <StepDirective
                        iconCss={"sf-icon-tasksheet"}
                        label={"Company Details"}
                      />
                      <StepDirective
                        iconCss={"sf-icon-progress"}
                        label={"Taxation Details"}
                      />
                      <StepDirective
                        iconCss={"sf-icon-submit"}
                        label={"Bank Details"}
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
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* </div> */}
      {/* </Container> */}
      {/* </div> */}
    </>
  );
}

export default OrganizationForm;
