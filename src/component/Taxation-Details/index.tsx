import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Query } from "@syncfusion/ej2-data";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import type { FilteringEventArgs } from "@syncfusion/ej2-dropdowns";

import { AppDispatch, RootState } from "@/@/redux/store";
import {
  saveTaxationDetails,
  selectOrganizationProfile,
  updateOrganization,
} from "@/@/redux/slices/organizationProfileSlice";
import { taxationValidationSchema } from "@/@/utils/validations";
import data from "../../app/dataSource.json";
import DataSwitch from "../data-switch";
import CommonProgressButton from "../common-progress-button";

// define the JSON of data For Industry
const paninfo = "PANOrganization";
const PANOrganization = data[paninfo];

export const TaxationDetails = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    taxationDetails: formData,
    companyDetails,
    loading,
  } = useSelector((state: RootState) => selectOrganizationProfile(state));

  const [isOpen, setOpen] = useState(formData?.isGSTRegistered || false);
  // filtering event handler to filter a Country
  const onFiltering = (e: FilteringEventArgs, searchData: any) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== "" ? query.where("Type", "startswith", e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(searchData, query as any);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taxationValidationSchema as any),
    defaultValues: {
      panNumber: companyDetails?.pan_number || formData?.pan_number || null,
      organizationType:
        companyDetails?.organization_type_id ||
        formData?.organization_type_id ||
        null,
      corpRegisterNumber:
        companyDetails?.business_licenses?.corp_registration_number ||
        formData?.corpRegisterNumber ||
        null,
      tanNumber:
        companyDetails?.business_licenses?.tan_number ||
        formData?.tanNumber ||
        null,
      cinNumber:
        companyDetails?.business_licenses?.cin_number ||
        formData?.cinNumber ||
        null,
      iecCode: formData?.iecCode || "",
      isGSTRegistered: formData?.isGSTRegistered,
      msmeNumber: formData?.msme_number || "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const apiData = {
        logo: companyDetails?.logo || "",
        language_id: companyDetails?.language_id || "",
        country_id: companyDetails?.country_id || "",
        branch_name: companyDetails?.branch_name || "",
        organization_name: companyDetails?.organization_name || "",
        email: companyDetails?.email || "",
        phone_number: companyDetails?.phone_number || "",
        whatsapp: companyDetails?.whatsapp || "",
        website: companyDetails?.website || "",
        social_media: companyDetails?.social_media || {},
        contact_persons: companyDetails?.contact_persons || {},
        address_details: companyDetails?.address_details || {},
        address_type: "Shipping",
        address_name:
          companyDetails?.address_details.addresses[0]?.address_name || "",
        pincode: companyDetails?.address_details.addresses[0]?.pincode || "",
        address_line_1:
          companyDetails?.address_details.addresses[0]?.address_line || "",
        address_line_2:
          companyDetails?.address_details.addresses[0]?.address_line || "",
        landmark: "",
        address_contact_person_name:
          companyDetails?.contact_persons?.name || "",
        address_contact_person_number: companyDetails?.phone_number || "",
        state_id: companyDetails?.address_details.addresses[0]?.state || "",
        city_id: companyDetails?.address_details.addresses[0]?.city || "",
        currency_code_id: companyDetails?.currency_code_id || "",
        pan_number: data.panNumber || "",
        gst_id: companyDetails?.gst_id || "",
        gst_registration_type: companyDetails?.gst_registration_type || "",
        msme_number: data.msmeNumber || "",
        business_licenses: {
          corp_registration_number: data.corpRegisterNumber || "",
          tan_number: data.tanNumber || "",
          cin_number: data.cinNumber || "",
        },
        account_details: companyDetails?.account_details || {},
        updated_by: companyDetails?.updated_by || "",
      };
      dispatch(
        saveTaxationDetails({
          ...apiData,
          organization_type_id: data.organizationType,
          iecCode: data.iecCode,
          isGSTRegistered: data.isGSTRegistered,
          organization_id: companyDetails?.organization_id,
          branch_id: companyDetails?.branch_id,
        })
      ); // Save form data in Redux
      const result = await dispatch(
        updateOrganization({
          id: companyDetails?.organization_id,
          branch_id: companyDetails?.branch_id,
          data: apiData,
        })
      ).unwrap();
      if (result) {
        onNext();
      }
    } catch (error) {
      // console.error("Error submitting form:", error);
      window?.console.log("Error submitting form:", error);
    }
  };

  return (
    <>
      <div>
        <p className="organization_company_title">Taxation details</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <div className="text_filed text_filed_dropdown">
                <TextBoxComponent
                  placeholder="PAN Number *"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                  {...register("panNumber")}
                  value={watch("panNumber")}
                  onChange={(e: any) =>
                    setValue("panNumber", e.value, { shouldValidate: true })
                  }
                />
                {errors.panNumber && (
                  <p className="error-text">
                    {String(errors.panNumber.message)}
                  </p>
                )}
              </div>
            </Col>

            <Col md={6}>
              <div className="dropdown_common text_filed_dropdown">
                <DropDownListComponent
                  floatLabelType="Auto"
                  id="organizationType"
                  cssClass="e-outline"
                  dataSource={PANOrganization}
                  filtering={(e: FilteringEventArgs) =>
                    onFiltering(e, PANOrganization as any)
                  }
                  filterBarPlaceholder="Search a Organization Type"
                  allowFiltering={true}
                  fields={{ text: "Type", value: "Id" }}
                  placeholder="Organization type"
                  popupHeight="220px"
                  className="dropdown_filed"
                  {...register("organizationType")}
                  value={watch("organizationType")}
                  onChange={(e: any) =>
                    setValue("organizationType", e.value, {
                      shouldValidate: true,
                    })
                  }
                />
                {errors.organizationType && (
                  <p className="error-text">
                    {String(errors.organizationType.message)}
                  </p>
                )}
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="text_filed text_filed_dropdown">
                <TextBoxComponent
                  placeholder="CORP register number *"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                  {...register("corpRegisterNumber")}
                  value={watch("corpRegisterNumber")}
                  onChange={(e: any) =>
                    setValue("corpRegisterNumber", e.value, {
                      shouldValidate: true,
                    })
                  }
                />
                {errors.corpRegisterNumber && (
                  <p className="error-text">
                    {String(errors.corpRegisterNumber.message)}
                  </p>
                )}
              </div>
            </Col>

            <Col md={6}>
              <div className="text_filed text_filed_dropdown">
                <TextBoxComponent
                  placeholder="TAN Number *"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                  {...register("tanNumber")}
                  value={watch("tanNumber")}
                  onChange={(e: any) =>
                    setValue("tanNumber", e.value, { shouldValidate: true })
                  }
                />
                {errors.tanNumber && (
                  <p className="error-text">
                    {String(errors.tanNumber.message)}
                  </p>
                )}
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="text_filed text_filed_dropdown">
                <TextBoxComponent
                  placeholder="CIN Number *"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                  {...register("cinNumber")}
                  value={watch("cinNumber")}
                  onChange={(e: any) =>
                    setValue("cinNumber", e.value, { shouldValidate: true })
                  }
                />
                {errors.cinNumber && (
                  <p className="error-text">
                    {String(errors.cinNumber.message)}
                  </p>
                )}
              </div>
            </Col>

            <Col md={6}>
              <div className="text_filed text_filed_dropdown">
                <TextBoxComponent
                  placeholder="IEC Code"
                  cssClass="e-outline"
                  floatLabelType="Auto"
                  {...register("iecCode")}
                  value={watch("iecCode")}
                  onChange={(e: any) =>
                    setValue("iecCode", e.value, { shouldValidate: true })
                  }
                />
                {errors.iecCode && (
                  <p className="error-text">{String(errors.iecCode.message)}</p>
                )}
              </div>
            </Col>
          </Row>

          <div className="organization_Switch_sec">
            <p className="business_registered_title">
              Is your business registered for GST?
            </p>
            <div
              onClick={() => {
                setOpen(!isOpen);
                setValue("isGSTRegistered", !isOpen);
              }}
            >
              <DataSwitch checked={isOpen} />
            </div>
          </div>

          {isOpen && (
            <div className="show_hidden_sec_main">
              <div className="show_hidden_subdata">
                <div className="filed_width">
                  <div className="text_filed text_filed_dropdown">
                    <TextBoxComponent
                      placeholder="MSME number"
                      cssClass="e-outline"
                      floatLabelType="Auto"
                      {...register("msmeNumber")}
                      value={watch("msmeNumber")}
                      onChange={(e: any) =>
                        setValue("msmeNumber", e.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {errors.msmeNumber && (
                      <p className="error-text">
                        {String(errors.msmeNumber.message)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="company_form_btn_sec">
            <div className="company_btn_sec">
              <button
                type="button"
                className="common_secondary_btn"
                onClick={onNext}
              >
                Skip
              </button>
              <button
                type="button"
                className="common_secondary_btn"
                onClick={onBack}
              >
                Back
              </button>
              <CommonProgressButton
                content="Save And Continue"
                loading={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
