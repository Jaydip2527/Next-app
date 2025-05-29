import React from "react";
import { Col, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useAppDispatch } from "@/@/redux/redux-hooks";
import { convertTimestampToDate } from "@/@/utils/dateFormate";
import { deleteLeadContact } from "@/@/redux/slices/contactSlice";
import user_img from "../../../../public/Images/welcome_user_img.png";
import company_website_icon from "../../../../public/Images/compeny_website_icon.svg";

const ViewLeadProfile = ({
  lead,
  isIndividualLead,
  setIsRefresh,
  handleShow,
}: {
  lead: any;
  isIndividualLead: boolean;
  setIsRefresh: (value: boolean) => void;
  handleShow: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { id: lead_id } = useParams();

  const formatAddress = (lead: any) => {
    const leadAddress = lead?.contacts?.[0]?.address || {};

    return (
      [
        leadAddress.address_line_1,
        leadAddress.landmark,
        leadAddress.city?.city_name,
        leadAddress.state?.state_name,
        leadAddress.country?.country_name,
        leadAddress.pincode,
      ]
        .filter(Boolean)
        .join(", ") || "-"
    );
  };

  const handleDeleteContact = (contactId: string) => {
    // eslint-disable-next-line no-alert
    const confirmed = window?.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmed) {
      return;
    }
    dispatch(deleteLeadContact({ id: contactId, leadId: lead_id }))
      .unwrap()
      .then(() => {
        setIsRefresh(true);
      });
  };

  return (
    <Row>
      {/* Contact & Company Information */}
      <Col md={6}>
        <div className="common_card_main_div">
          {lead?.contacts?.[0]?.company?.company_id && (
            <section>
              <h2 className="lead-header">Company</h2>
              <div className="company_details_data_sec m-0">
                <div>
                  <Image
                    className="company_icon img-fluid"
                    src={company_website_icon}
                    alt="company_website_icon"
                  />
                </div>
                <div className="company-list">
                  <div className="company-item company_website_name">
                    {lead?.contacts[0].company?.company_name || "-"}
                  </div>
                  <div className="company-item">
                    {lead?.contacts[0].company?.website ||
                    lead?.contacts[0]?.website ? (
                      <a
                        className="company_website_data"
                        href={
                          lead?.contacts[0]?.company?.website ||
                          lead?.contacts[0]?.website
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {lead?.contacts[0]?.company?.website ||
                          lead?.contacts[0]?.website}
                      </a>
                    ) : (
                      "-"
                    )}
                  </div>
                  <div className="company-item company_gst_number">
                    {lead?.contacts[0].company?.gst_number ||
                      lead?.lead?.gst_number ||
                      "-"}
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="lead-company">
            <div className="company-header">
              <h2 className="lead-header">Contact</h2>
              {!isIndividualLead && (
                <button className="add-new" onClick={handleShow}>
                  <Icon icon="ic:sharp-add" width="16" height="16" /> Add New
                </button>
              )}
            </div>
            <div className="company-list">
              {lead?.contacts?.map((contact: any) => (
                <div
                  key={contact.contact_id}
                  className="company-item-wrapper w-100"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="company_contact_detaile_sizing">
                        <div className="company_details_data_sec">
                          <div className="d-flex align-items-center justify-content-center">
                            <Image
                              className="contact_user_img img-fluid"
                              src={user_img}
                              alt="side_img"
                            />
                          </div>
                          <div>
                            <span className="company-name contact_name">{`${contact.first_name || "-"} ${contact.last_name || "-"}`}</span>
                            {contact?.company?.position && (
                              <div className="company-item position_details">
                                {contact?.company?.position}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="company_details_data_sec">
                          <div className="company_detaile-icon">
                            <Icon icon="ri:phone-fill" width="14" height="14" />
                          </div>
                          <div className="company-item">
                            {contact?.phone?.phone_number ? (
                              <a
                                className="contect_number_email"
                                href={`tel:${contact.phone.phone_number}`}
                              >
                                {contact.phone.phone_number}
                              </a>
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>

                        <div className="company_details_data_sec">
                          <div className="company_detaile-icon">
                            <Icon
                              icon="ic:outline-email"
                              width="14"
                              height="14"
                            />
                          </div>
                          <div className="company-item">
                            {contact.email?.email ? (
                              <a
                                className="contect_number_email"
                                href={`mailto:${contact.email.email}`}
                              >
                                {contact.email.email}
                              </a>
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {lead.contacts.length > 1 && (
                        <button
                          type="button"
                          className="product_or_service_delete_icon"
                          onClick={() =>
                            handleDeleteContact(contact.contact_id)
                          }
                        >
                          <Icon
                            icon="mingcute:delete-2-fill"
                            width="16"
                            height="16"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="lead-company">
            <h2 className="lead-header">Address</h2>
            <div className="company_address_data_sec">
              <div className="company_detaile-icon">
                <Icon icon="mdi:address-marker" width="14" height="14" />
              </div>
              <div className="company-item single-line-address">
                {formatAddress(lead)}
              </div>
            </div>
          </section>
        </div>
      </Col>

      {/* Lead Information */}
      <Col md={6}>
        <div className="common_card_main_div">
          <h2 className="lead-header">Lead Information</h2>
          <div className="lead-info">
            <div className="info-item">
              <span className="info-label">Lead Type</span>
              <span className="info-value">
                {lead?.lead?.is_individual_lead ? "Person" : "Company"}
              </span>
            </div>
            {lead?.lead?.budget && (
              <div className="info-item">
                <span className="info-label">Budget</span>
                <span className="info-value highlight">
                  ₹ {lead.lead.budget}
                </span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Received Date</span>
              <span className="info-value">
                {convertTimestampToDate(
                  lead?.lead?.lead_receive_date,
                  "DD MMMM YYYY"
                ) || "-"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Contact Date</span>
              <span className="info-value">
                {convertTimestampToDate(
                  lead?.lead?.last_contact_date,
                  "DD MMMM YYYY"
                ) || "-"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Source</span>
              <span className="info-value">
                {lead?.lead?.lead_source || "-"}
              </span>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ViewLeadProfile;
