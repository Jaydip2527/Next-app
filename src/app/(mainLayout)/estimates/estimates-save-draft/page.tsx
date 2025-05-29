"use client";
import * as React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import "../../../invoice.scss";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import invoice_organization from "../../../../../public/Images/invoice-header-organization-img.png";

const EstimatesSaveDraft = () => {
  const [position] = useState<any>("TopCenter");

  return (
    <>
      <div className="common_header_main_div">
        <h4 className="common_header_data_text"> Preview </h4>
        <div className="breadcrumb_main_div">
          <TooltipComponent
            content="Edit Template"
            position={position}
            tabIndex={0}
          >
            {/* Button element */}
            <Link href="#" className="icon_box_div">
              <Icon
                icon="lucide:edit"
                tabIndex={-1}
                width="20"
                height="20"
                className="cursor-pointer"
              />
            </Link>
          </TooltipComponent>
          <TooltipComponent
            content="Download Print"
            position={position}
            tabIndex={0}
          >
            {/* Button element */}
            <Link href="#" className="icon_box_div">
              <Icon
                tabIndex={-1}
                icon="solar:printer-linear"
                width="20"
                height="20"
              />
            </Link>
          </TooltipComponent>
          <TooltipComponent
            content="Download PDF"
            position={position}
            tabIndex={0}
          >
            {/* Button element */}
            <Link href="#" className="icon_box_div">
              <Icon
                tabIndex={-1}
                icon="fluent:document-pdf-20-regular"
                width="20"
                height="20"
              />
            </Link>
          </TooltipComponent>
          <div className="dropdown_common m-0 more_dropdown_size">
            <DropDownListComponent
              floatLabelType="Auto"
              placeholder="More"
              popupHeight="220px"
              className="dropdown_filed"
              cssClass="e-outline"
            />
          </div>
        </div>
      </div>

      <Container>
        <div className="invoice_one_main_div">
          <div className="invoice_one_bottom_line"></div>
          <Row>
            <Col md={6} className="mb-4">
              <div className="invoice_one_header_info">
                <div className="header_info_data_sec">
                  <Image
                    className="img-fluid"
                    src={invoice_organization}
                    alt="side_img"
                  />
                  <p className="header_organization_name">
                    {" "}
                    Bright Horizon Org{" "}
                  </p>
                </div>
                <div className="header_address_sec">
                  <div className="header_organization_address_icon">
                    <Icon icon="lucide:map-pin" width="20" height="20" />
                  </div>
                  <p className="header_organization_address">
                    {" "}
                    276 Shakira Light Suite 676, Port Lucienne Florida.{" "}
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="estimates_invoice_main_div">
                <h6 className="common_card_title">Estimates invoice</h6>
                <table className="estimates_invoice_table">
                  <tr>
                    <th className="estimates_invoice_table_title">
                      Estimates No.
                    </th>
                    <th className="estimates_invoice_table_title">
                      Estimate Date
                    </th>
                    <th className="estimates_invoice_table_title">
                      Expiry Date
                    </th>
                  </tr>
                  <tr>
                    <td className="estimates_invoice_table_data">#123456</td>
                    <td className="estimates_invoice_table_data">
                      05-March-2025
                    </td>
                    <td className="estimates_invoice_table_data">
                      27-March-2026
                    </td>
                  </tr>
                  <tr>
                    <td className="estimates_invoice_table_data">Gujrat</td>
                    <td className="estimates_invoice_table_data">India</td>
                    <td className="estimates_invoice_table_data">
                      abc@gmail.com
                    </td>
                  </tr>
                </table>
                <h5 className="estimates_invoice_table_subdata">
                  Subject: <span> Product Cost Estimate </span>
                </h5>
                <h5 className="estimates_invoice_table_subdata m-0">
                  Reference: <span> REF-20250220-001 </span>
                </h5>
              </div>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={4}>
              <h6 className="common_card_title">Billing Address</h6>
              <div className="invoice_gray_box">
                <table className="estimates_invoice_table m-0">
                  <tr className="mb-2">
                    <th className="estimates_subtable_data">M/S</th>
                    <td className="estimates_subtable_data">kevi motors</td>
                  </tr>
                  <tr>
                    <th className="estimates_subtable_data">Address</th>
                    <td className="estimates_subtable_data">
                      Chandni chowk, new Delhi, delhi-110014.
                    </td>
                  </tr>
                  <tr>
                    <th className="estimates_subtable_data">phone</th>
                    <td className="estimates_subtable_data">+123-456-7990</td>
                  </tr>
                  <tr>
                    <th className="estimates_subtable_data">vat number</th>
                    <td className="estimates_subtable_data">AT U45504724</td>
                  </tr>
                  <tr>
                    <th className="estimates_subtable_data">PAN Number</th>
                    <td className="estimates_subtable_data">AAAPL1234C</td>
                  </tr>
                </table>
              </div>
            </Col>
            <Col md={4}>
              <h6 className="common_card_title">Ship to</h6>
              <div className="invoice_gray_box">
                <table className="estimates_invoice_table m-0">
                  <tr>
                    <th className="estimates_subtable_data">M/S</th>
                    <td className="estimates_subtable_data">kevi motors</td>
                  </tr>
                  <tr>
                    <th className="estimates_subtable_data">Address</th>
                    <td className="estimates_subtable_data">
                      Chandni chowk, new Delhi, delhi-110014.
                    </td>
                  </tr>
                  <tr>
                    <th className="estimates_subtable_data">phone</th>
                    <td className="estimates_subtable_data">+123-456-7990</td>
                  </tr>
                  <tr>
                    <th className="estimates_subtable_data">vat number</th>
                    <td className="estimates_subtable_data">AT U45504724</td>
                  </tr>
                  <tr>
                    <th className="estimates_subtable_data">PAN Number</th>
                    <td className="estimates_subtable_data">AAAPL1234C</td>
                  </tr>
                </table>
              </div>
            </Col>
            <Col md={4}>
              <h6 className="common_card_title">Payment Method</h6>
              <div className="invoice_gray_box">
                <table className="estimates_invoice_table m-0">
                  <tr>
                    <th className="estimates_subtable_data">Bank Name</th>
                    <td className="estimates_subtable_data">
                      State bank of india
                    </td>
                  </tr>
                  <tr>
                    <th className="estimates_subtable_data">Branch Name</th>
                    <td className="estimates_subtable_data">RAF CAMP</td>
                  </tr>
                  <tr>
                    <th className="estimates_subtable_data">bank acc No</th>
                    <td className="estimates_subtable_data">2000000004512</td>
                  </tr>
                  <tr>
                    <th className="estimates_subtable_data">
                      bank branch IFSC
                    </th>
                    <td className="estimates_subtable_data">SBIN0000488</td>
                  </tr>
                </table>
              </div>
            </Col>
          </Row>

          <div className="estimates_invoice_main_div">
            <table className="estimates_invoice_table m-0">
              <tr>
                <th className="estimates_invoice_table_title table_info_padding">
                  {" "}
                  #{" "}
                </th>
                <th
                  className="estimates_invoice_table_title table_info_padding"
                  style={{ width: "40%" }}
                >
                  Item
                </th>
                <th className="estimates_invoice_table_title table_info_padding">
                  Unit
                </th>
                <th className="estimates_invoice_table_title table_info_padding">
                  Quantity
                </th>
                <th className="estimates_invoice_table_title table_info_padding">
                  rate
                </th>
                <th className="estimates_invoice_table_title table_info_padding">
                  tax
                </th>
                <th className="estimates_invoice_table_title table_info_padding">
                  Total
                </th>
              </tr>
              <tr className="estimates_table_border estimates_table_color">
                <td className="estimates_invoice_table_data table_info_padding">
                  1
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  Grey cloth 100 Mtr
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  Mtr
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  2
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  20,000
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  TAX 5.00%
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  40,000
                </td>
              </tr>
              <tr className="estimates_table_border estimates_table_color">
                <td className="estimates_invoice_table_data table_info_padding">
                  2
                </td>
                <td className="estimates_invoice_table_data table_info_padding table_info_padding">
                  Job work -5% for textile unit
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  Job
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  1
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  5,000
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  TAX 18.00%
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  5,000
                </td>
              </tr>
              <tr className="estimates_table_color">
                <td className="estimates_invoice_table_data table_info_padding">
                  3
                </td>
                <td className="estimates_invoice_table_data table_info_padding table_info_padding">
                  Annual Maintenance
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  Service
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  1
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  7,000
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  TAX 18.00%
                </td>
                <td className="estimates_invoice_table_data table_info_padding">
                  7,000
                </td>
              </tr>
            </table>
          </div>

          <div className="estimates_billing_detaile">
            <div className="estimates_billing_subsec">
              <h5 className="estimates_subtable_data m-0 p-0"> sub total </h5>
              <h6 className="estimates_subtable_data m-0 p-0"> ₹ 52,000 </h6>
            </div>
            <div className="estimates_billing_subsec">
              <h5 className="estimates_subtable_data m-0 p-0"> TAX(18.00%) </h5>
              <h6 className="estimates_subtable_data m-0 p-0"> ₹ 4,160 </h6>
            </div>
            <div className="final_estimates_total_data">
              <p className="total_in_words">
                {" "}
                Total In Words:{" "}
                <span> INR Fifty-Six Thousand One Hundred Sixty Only </span>
              </p>

              <div className="estimates_billing_subsec estimates_billing_total_info">
                <h5 className="estimates_subtable_data m-0 p-0">
                  {" "}
                  Grand Total{" "}
                </h5>
                <h6 className="estimates_subtable_data m-0 p-0"> ₹ 56,160 </h6>
              </div>
            </div>
          </div>

          <Row className="mt-3">
            <Col md={6}>
              <h6 className="common_card_title"> Terms & Conditions </h6>
              <div className="estimates_invoice_terms_sec">
                <ol className="estimates_invoice_terms_list">
                  <li className="estimates_invoice_terms_data">
                    Improve his shining tail, And pour the waters.
                  </li>
                  <li className="estimates_invoice_terms_data">
                    Improve his shining tail, And pour the waters of the pack.
                  </li>
                  <li className="estimates_invoice_terms_data m-0">
                    Improve his shining tail.
                  </li>
                </ol>
              </div>
            </Col>
            <Col md={6}>
              <h6 className="common_card_title">Notes:</h6>
              <div className="estimates_invoice_terms_sec">
                <p className="estimates_invoice_terms_data">
                  {" "}
                  looking forward to your business
                </p>
              </div>
            </Col>
          </Row>

          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EstimatesSaveDraft;
