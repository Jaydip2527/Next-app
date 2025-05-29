"use client";

import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import TopRounds from "../../../public/Images/pricing_top_rounds.svg";
import ActiveTopRounds from "../../../public/Images/active_pricing_top_rounds.svg";
import ModalImg from "../../../public/Images/modal_inside_img.png";

export default function PricingCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  const redirectToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <Container>
        <div>
          <Row>
            <Col md={6} lg={4}>
              <div className="pricing_card_main">
                <div className="pricing_padding_main">
                  <div>
                    <div className="pricing_card_top_sec">
                      <div>
                        <div className="top_rounds_sec">
                          <Image
                            className="top_rounds_img img-fluid"
                            src={TopRounds}
                            alt="TopRounds"
                          />
                        </div>
                        <p className="pricing_card_title"> Basic </p>
                        <p className="pricing_card_subinfo">
                          {" "}
                          Best for personal use.{" "}
                        </p>
                      </div>
                      <p className="price_data">
                        {" "}
                        $29 <span> / per month </span>
                      </p>
                    </div>

                    <div>
                      <button
                        className="common_secondary_btn w-100"
                        onClick={handleShow}
                      >
                        Get Started
                      </button>
                    </div>

                    <div className="line_below_btn"></div>

                    <div>
                      <p className="Features_data_text"> Features </p>
                      <div className="checkmark_card_subdataset">
                        <div className="checkmark_dataset">
                          <Icon
                            className="checkmark_icon"
                            icon="si:check-circle-line"
                            width="16"
                            height="16"
                          />
                          <p className="checkmark_data"> Employee directory </p>
                        </div>
                        <div className="checkmark_dataset">
                          <Icon
                            className="checkmark_icon"
                            icon="si:check-circle-line"
                            width="16"
                            height="16"
                          />
                          <p className="checkmark_data"> Task management </p>
                        </div>
                        <div className="checkmark_dataset">
                          <Icon
                            className="checkmark_icon"
                            icon="si:check-circle-line"
                            width="16"
                            height="16"
                          />
                          <p className="checkmark_data">
                            {" "}
                            Calendar integration{" "}
                          </p>
                        </div>
                        <div className="checkmark_dataset">
                          <Icon
                            className="checkmark_icon"
                            icon="si:check-circle-line"
                            width="16"
                            height="16"
                          />
                          <p className="checkmark_data"> File storage </p>
                        </div>
                        <div className="checkmark_dataset">
                          <Icon
                            className="checkmark_icon"
                            icon="si:check-circle-line"
                            width="16"
                            height="16"
                          />
                          <p className="checkmark_data">
                            {" "}
                            Communication tools{" "}
                          </p>
                        </div>
                        <div className="checkmark_dataset">
                          <Icon
                            className="checkmark_icon"
                            icon="si:check-circle-line"
                            width="16"
                            height="16"
                          />
                          <p className="checkmark_data">
                            {" "}
                            Reporting and analytics{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="pricing_card_main active">
                <div className="pricing_padding_main">
                  <div className="pricing_card_top_sec">
                    <div>
                      <div className="top_rounds_sec">
                        <Image
                          className="top_rounds_img img-fluid"
                          src={ActiveTopRounds}
                          alt="ActiveTopRounds"
                        />
                      </div>
                      <p className="pricing_card_title"> Standard </p>
                      <p className="pricing_card_subinfo">
                        {" "}
                        For large teams & corporations.{" "}
                      </p>
                    </div>
                    <p className="price_data">
                      {" "}
                      $120 <span> / per month </span>
                    </p>
                  </div>

                  <div>
                    <button
                      className="common_secondary_btn w-100"
                      onClick={handleShow}
                    >
                      Get Started
                    </button>
                  </div>

                  <div className="line_below_btn"></div>

                  <div>
                    <p className="Features_data_text"> Features </p>
                    <div className="checkmark_card_subdataset">
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Employee directory </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Task management </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Calendar integration </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> File storage </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Communication tools </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data">
                          {" "}
                          Reporting and analytics{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="pricing_card_main">
                <div className="pricing_padding_main">
                  <div className="pricing_card_top_sec">
                    <div>
                      <div className="top_rounds_sec">
                        <Image
                          className="top_rounds_img img-fluid"
                          src={TopRounds}
                          alt="TopRounds"
                        />
                      </div>
                      <p className="pricing_card_title"> Professional </p>
                      <p className="pricing_card_subinfo">
                        {" "}
                        Best for business owners.{" "}
                      </p>
                    </div>
                    <p className="price_data">
                      {" "}
                      $39 <span> / per month </span>
                    </p>
                  </div>

                  <div>
                    <button
                      className="common_secondary_btn w-100"
                      onClick={handleShow}
                    >
                      Get Started
                    </button>
                  </div>

                  <div className="line_below_btn"></div>

                  <div>
                    <p className="Features_data_text"> Features </p>
                    <div className="checkmark_card_subdataset">
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Employee directory </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Task management </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Calendar integration </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> File storage </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Communication tools </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data">
                          {" "}
                          Reporting and analytics{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="pricing_card_main">
                <div className="pricing_padding_main">
                  <div className="pricing_card_top_sec">
                    <div>
                      <div className="top_rounds_sec">
                        <Image
                          className="top_rounds_img img-fluid"
                          src={TopRounds}
                          alt="TopRounds"
                        />
                      </div>
                      <p className="pricing_card_title"> Enterprise </p>
                      <p className="pricing_card_subinfo">
                        {" "}
                        Best for personal use.{" "}
                      </p>
                    </div>
                    <p className="price_data">
                      {" "}
                      $59 <span> / per month </span>
                    </p>
                  </div>

                  <div>
                    <button
                      className="common_secondary_btn w-100"
                      onClick={handleShow}
                    >
                      Get Started
                    </button>
                  </div>

                  <div className="line_below_btn"></div>

                  <div>
                    <p className="Features_data_text"> Features </p>
                    <div className="checkmark_card_subdataset">
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Employee directory </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Task management </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Calendar integration </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> File storage </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Communication tools </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data">
                          {" "}
                          Reporting and analytics{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="pricing_card_main">
                <div className="pricing_padding_main">
                  <div className="pricing_card_top_sec">
                    <div>
                      <div className="top_rounds_sec">
                        <Image
                          className="top_rounds_img img-fluid"
                          src={TopRounds}
                          alt="TopRounds"
                        />
                      </div>
                      <p className="pricing_card_title"> Customized </p>
                      <p className="pricing_card_subinfo">
                        {" "}
                        Best for business owners.{" "}
                      </p>
                    </div>
                    <p className="price_data">
                      {" "}
                      $99 <span> / per month </span>
                    </p>
                  </div>

                  <div>
                    <button
                      className="common_secondary_btn w-100"
                      onClick={handleShow}
                    >
                      Get Started
                    </button>
                  </div>

                  <Offcanvas
                    show={show}
                    onHide={handleClose}
                    className="modal_sec_main"
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <div>
                        <div className="modal_info_data">
                          <p className="inside_modal_title">
                            {" "}
                            Hey, wait a minute! Would you like to take LedgerX
                            for a test drive?{" "}
                          </p>
                          <p className="inside_modal_subdata">
                            {" "}
                            Sign up for the free plan or explore the free demo
                            account to experience smart.{" "}
                          </p>
                          <div className="btn_sec_inside_modal">
                            <button
                              className="common_btn"
                              onClick={redirectToDashboard}
                            >
                              Get started with the free plan
                            </button>
                            <button
                              className="common_secondary_btn"
                              onClick={redirectToDashboard}
                            >
                              Explore the free demo account
                            </button>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <Image
                            className="img-fluid"
                            src={ModalImg}
                            alt="Banner_Image"
                          />
                        </div>
                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>

                  <div className="line_below_btn"></div>

                  <div>
                    <p className="Features_data_text"> Features </p>
                    <div className="checkmark_card_subdataset">
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Employee directory </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Task management </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Calendar integration </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> File storage </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data"> Communication tools </p>
                      </div>
                      <div className="checkmark_dataset">
                        <Icon
                          className="checkmark_icon"
                          icon="si:check-circle-line"
                          width="16"
                          height="16"
                        />
                        <p className="checkmark_data">
                          {" "}
                          Reporting and analytics{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
