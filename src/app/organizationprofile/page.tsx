"use client";

import { JSX, useEffect, useRef, useState } from "react";
// import Link from 'next/link';
// import data from '../../app/dataSource.json';
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  StepperComponent,
  StepsDirective,
  StepDirective,
} from "@syncfusion/ej2-react-navigations";
import Image from "next/image";
// import Link from 'next/link';
import { Icon } from "@iconify/react";
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
import Logo from "../../../public/Images/logo.png";
import DownloadIcon from "../../../public/Images/download_icon.png";
import Functionalities from "../../../public/Images/core_functionalities_img.png";
import LeftBgImg from "../../../public/Images/organization_left_bg_img.png";
import RightTopBg from "../../../public/Images/organization_right_bg_top.png";
import RightBottomBg from "../../../public/Images/organization_right_bg_bottom.png";

function OrganizationForm() {
  const stepperObj = useRef<StepperComponent>(null);
  const [stepIndex, setStepIndex] = useState(0);
  let stepperOptionsEle: Element;
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
      <div className="WelcomeForm_page_bg">
        <Image
          className="left_bg_img img-fluid"
          src={LeftBgImg}
          alt="LeftBgImg"
        />
        <Image
          className="right_top_bg img-fluid"
          src={RightTopBg}
          alt="RightTopBg"
        />
        <Container>
          <div className="card_sub_align">
            <div className="person_Welcome_main_div">
              <p className="person_Welcome_text"> Welcome Smith </p>
              <div>
                <Image
                  className="download_icon img-fluid"
                  src={DownloadIcon}
                  alt="DownloadIcon"
                />
              </div>
            </div>
            <div className="organization_card_main_div">
              <p className="profile_set_title">
                {" "}
                Set Up Your Organization Profile{" "}
              </p>
              <div className="Welcomeform_top_sec_div">
                <div>
                  <Image
                    className="Welcome_logo_img img-fluid"
                    src={Logo}
                    alt="logo"
                  />
                </div>
                <div className="line_div"></div>
                <p className="Welcomeform_top_info">
                  {" "}
                  LedgerX is your end to end online accounting software{" "}
                </p>
              </div>
              <div>
                <Row>
                  <Col lg={8}>
                    <div>
                      <div className="Welcome_card_bg organization_card_size">
                        <div className="organization_stepper_sec stepper-icon">
                          <StepperComponent ref={stepperObj}>
                            {" "}
                            {/* linear={true} stepChanged={(args) => stepChange(args.activeStep)} */}
                            {/* allowNext={false} */}
                            {/* <StepsDirective>
                                                            <StepDirective iconCss={'e-icons sf-icon-cart'} label={'Organization Setup'} />
                                                            <StepDirective iconCss={'e-icons e-chart-2d-clustered-column'} label={'Company Details'} />
                                                            <StepDirective iconCss={'e-icons e-chart-error-bars-percentage'} label={'Taxation Details'} />
                                                            <StepDirective iconCss={'e-icons e-home'} label={'Bank Details'} />
                                                        </StepsDirective> */}
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
                        {/* <div id="linear-stepper-content" className='stepper_content_sec' ref={stepperContentRef} /> */}
                        <div
                          className="linear-stepper-options"
                          style={{ display: "inline-flex" }}
                          ref={stepperOptionsRef}
                        >
                          {/* <button id="previousStep" style={{ marginRight: "15px", display: "none" }} onClick={updateBack} className="e-btn">Back</button>
                                                    <button id="nextStep" style={{ display: "block" }} onClick={updateNext} className="e-btn">Next</button> */}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="subdata_organization_form">
                      <div className="checkout_card">
                        <p className="check_out_title"> Check Out </p>
                        <p className="check_out_subtitle">
                          {" "}
                          Key Features Of LedgerX!{" "}
                        </p>
                        <div className="checkmark_card_subdataset">
                          <div className="checkmark_dataset">
                            <Icon
                              className="organiza_checkmark_icon"
                              icon="si:check-circle-line"
                              width="16"
                              height="16"
                            />
                            <p className="checkmark_data m-0">
                              {" "}
                              Advanced employee directory{" "}
                            </p>
                          </div>
                          <div className="checkmark_dataset">
                            <Icon
                              className="organiza_checkmark_icon"
                              icon="si:check-circle-line"
                              width="16"
                              height="16"
                            />
                            <p className="checkmark_data m-0">
                              {" "}
                              Project management{" "}
                            </p>
                          </div>
                          <div className="checkmark_dataset">
                            <Icon
                              className="organiza_checkmark_icon"
                              icon="si:check-circle-line"
                              width="16"
                              height="16"
                            />
                            <p className="checkmark_data m-0">
                              {" "}
                              Resource scheduling{" "}
                            </p>
                          </div>
                          <div className="checkmark_dataset">
                            <Icon
                              className="organiza_checkmark_icon"
                              icon="si:check-circle-line"
                              width="16"
                              height="16"
                            />
                            <p className="checkmark_data m-0">
                              {" "}
                              Version control{" "}
                            </p>
                          </div>
                          <div className="checkmark_dataset">
                            <Icon
                              className="organiza_checkmark_icon"
                              icon="si:check-circle-line"
                              width="16"
                              height="16"
                            />
                            <p className="checkmark_data m-0">
                              {" "}
                              Team collaboration{" "}
                            </p>
                          </div>
                          <div className="checkmark_dataset">
                            <Icon
                              className="organiza_checkmark_icon"
                              icon="si:check-circle-line"
                              width="16"
                              height="16"
                            />
                            <p className="checkmark_data m-0">
                              {" "}
                              Advanced analytics{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="Functionalities_card">
                        <p className="check_out_title">
                          {" "}
                          Core Functionalities{" "}
                        </p>
                        <div className="Functionalities_subdata_main">
                          <div>
                            <p className="checkmark_data m-0">
                              {" "}
                              Comprehensive Dashboard{" "}
                            </p>
                            <ul>
                              <li className="Functionalities_li_data">
                                {" "}
                                All business metrics in one place.{" "}
                              </li>
                            </ul>
                          </div>
                          <div>
                            <p className="checkmark_data m-0">
                              {" "}
                              Customizable Reports{" "}
                            </p>
                            <ul>
                              <li className="Functionalities_li_data">
                                {" "}
                                Generate detailed analytics tailored to your
                                needs.{" "}
                              </li>
                            </ul>
                          </div>
                          <div>
                            <p className="checkmark_data m-0">
                              {" "}
                              User Management{" "}
                            </p>
                            <ul>
                              <li className="Functionalities_li_data">
                                {" "}
                                Seamlessly add and manage team members.{" "}
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="functionalities_img_div">
                          <Image
                            className="functionalities_img img-fluid"
                            src={Functionalities}
                            alt="Functionalities"
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Container>
        <Image
          className="right_bottom_bg img-fluid"
          src={RightBottomBg}
          alt="RightBottomBg"
        />
      </div>
    </>
  );
}

export default OrganizationForm;
