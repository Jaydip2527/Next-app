"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams, usePathname } from "next/navigation";
import {
  UploaderComponent,
  TextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import type { FileInfo } from "@syncfusion/ej2-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import type { FilteringEventArgs } from "@syncfusion/ej2-dropdowns";
import { yupResolver } from "@hookform/resolvers/yup";
import { Query } from "@syncfusion/ej2-data";
import Image from "next/image";
import Cookies from "js-cookie";

import { companyDetailsValidationSchema } from "@/@/utils/validations";
import { AppDispatch, RootState } from "@/@/redux/store";
import {
  createOrganization,
  fetchCities,
  saveCompanyDetails,
  selectOrganizationProfile,
  updateOrganization,
} from "@/@/redux/slices/organizationProfileSlice";
import { cookiesOptions } from "@/@/utils/constant";
import data from "../../app/dataSource.json";
import DataSwitch from "../data-switch";
import CommonProgressButton from "../common-progress-button";

export const CompanyDetails = ({ onNext, onBack }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    currencies,
    states,
    cities,
    companyDetails,
    organizationSetup,
    taxationDetails,
    loading,
  } = useSelector((state: RootState) => selectOrganizationProfile(state));
  const [imageUrl, setImageUrl] = useState<any>(null);
  const { id } = useParams();
  const pathname = usePathname();

  const {
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companyDetailsValidationSchema as any),
    defaultValues: {
      organizationName: companyDetails?.organization_name || null,
      alias: companyDetails?.alias || null,
      currency: companyDetails?.currency_code_id || null,
      contactPerson: companyDetails?.contact_persons?.name || null,
      phoneNumber: companyDetails?.phone_number || null,
      houseNo:
        companyDetails?.address_details?.addresses[0]?.address_line || null,
      area: companyDetails?.address_details?.addresses[0]?.address_name || null,
      state: companyDetails?.address_details?.addresses[0]?.state || null,
      city: companyDetails?.address_details?.addresses[0]?.city || null,
      pincode: companyDetails?.address_details?.addresses[0]?.pincode || null,
      gstType: companyDetails?.gst_registration_type || "",
      gstId: companyDetails?.gst_id || "",
      email: companyDetails?.email || null,
      website: companyDetails?.website || null,
      isGSTRegistered: companyDetails?.isGSTRegistered || false,
    },
  });

  const path = {
    removeUrl:
      "https://services.syncfusion.com/react/production/api/FileUploader/Remove",
    saveUrl:
      "https://services.syncfusion.com/react/production/api/FileUploader/Save",
  };

  useEffect(() => {
    if (companyDetails?.logo) {
      setImageUrl(companyDetails?.logo);
    }
  }, [companyDetails]);

  function onUploadSuccess(args: {
    file: FileInfo;
    operation: string;
    e: ProgressEvent;
  }) {
    if (args.operation === "upload") {
      setImageUrl(URL.createObjectURL(args.file.rawFile as File));
      window.console.log("File uploaded successfully");
    }
  }

  function onUploadFailure(args: {
    file: FileInfo;
    operation: string;
    e: ProgressEvent;
  }) {
    window.console.log("File failed to upload", args);
  }

  function onDeleteFile(args: {
    file: FileInfo;
    operation: string;
    e: ProgressEvent;
  }) {
    setImageUrl(null);
    window.console.log("File deleted successfully", args);
  }

  const [isOpen, setOpen] = useState(companyDetails?.isGSTRegistered || false);

  // define the JSON of data For Language
  const Curreinfo = "Currency";
  const Currency = data[Curreinfo];

  // define the JSON of data For Industry
  const stateinfo = "State";
  const State = data[stateinfo];

  // define the JSON of data For Country
  const cityinfo = "City";
  const City = data[cityinfo];

  const GSTType = "GSTType";
  const GST = data[GSTType];

  // filtering event handler to filter a Country
  const onFiltering = (e: FilteringEventArgs, searchData: any) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== "" ? query.where("Type", "startswith", e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(searchData, query as any);
  };

  // Submit handler
  const onSubmit = async (data: any) => {
    try {
      const {
        organizationName,
        alias,
        currency,
        contactPerson,
        phoneNumber,
        houseNo,
        area,
        state,
        city,
        pincode,
        email,
        website,
        isGSTRegistered,
        gstId,
        gstType,
      } = data;
      const formData = {
        ...organizationSetup,
        organization_name: organizationName,
        branch_name: organizationName,
        phone_number: phoneNumber,
        email,
        address_details: {
          addresses: [
            {
              address_name: area,
              address_line: houseNo,
              state,
              city,
              pincode,
              country: organizationSetup?.country_id,
            },
          ],
        },
        address_type: "Shipping",
        address_name: area,
        pincode,
        address_line_1: area,
        address_line_2: houseNo,
        landmark: "",
        address_contact_person_name: contactPerson,
        address_contact_person_number: phoneNumber,
        state_id: state,
        city_id: city,
        gst_id: isGSTRegistered ? gstId : "1234567890",
        gst_registration_type: isGSTRegistered ? gstType : "Regular Taxpayer",
        currency_code_id: currency,
        contact_persons: { name: contactPerson },
        website,
        isGSTRegistered,
        logo: imageUrl || "/defaultLogoUrl",
        pan_number: "",
        msme_number: "",
        business_licenses: {},
        whatsapp: "",
        social_media: {},
        account_details: {},
        alias,
      };

      const newFormData = { ...formData };
      delete newFormData.alias;
      delete newFormData.isGSTRegistered;
      let result: any;

      if (companyDetails || id) {
        const apiData = {
          logo: imageUrl || "/defaultLogoUrl",
          language_id: organizationSetup?.language_id || "",
          country_id: organizationSetup?.country_id || "",
          branch_name: organizationName || "",
          organization_name: organizationName || "",
          email,
          phone_number: phoneNumber || "",
          whatsapp: companyDetails?.whatsapp || "",
          website,
          social_media: companyDetails?.social_media || {},
          contact_persons: { name: contactPerson },
          address_details: {
            addresses: [
              {
                address_name: area,
                address_line: houseNo,
                state,
                city,
                pincode,
                country: organizationSetup?.country_id,
              },
            ],
          },
          address_type: "Shipping",
          address_name: area,
          pincode,
          address_line_1: area,
          address_line_2: houseNo,
          landmark: "",
          address_contact_person_name: contactPerson,
          address_contact_person_number: phoneNumber,
          state_id: state,
          city_id: city,
          currency_code_id: currency || "",
          pan_number: id
            ? companyDetails?.pan_number
            : taxationDetails?.pan_number || "",
          gst_id: isGSTRegistered ? gstId : "1234567890",
          gst_registration_type: isGSTRegistered ? gstType : "Regular Taxpayer",
          msme_number: id
            ? companyDetails?.msme_number
            : taxationDetails?.msme_number || "",
          business_licenses: {
            corp_registration_number: id
              ? companyDetails?.business_licenses.corp_registration_number
              : taxationDetails?.corpRegisterNumber || "",
            tan_number: id
              ? companyDetails?.business_licenses.tan_number
              : taxationDetails?.tanNumber || "",
            cin_number: id
              ? companyDetails?.business_licenses.cin_number
              : taxationDetails?.cinNumber || "",
          },
          account_details: companyDetails?.account_details || {},
          updated_by: companyDetails?.updated_by || "",
        };
        dispatch(
          saveCompanyDetails({
            ...apiData,
            alias,
            organization_id: companyDetails?.organization_id,
            branch_id: companyDetails?.branch_id,
          })
        ); // Save form data in Redux
        result = await dispatch(
          updateOrganization({
            id: companyDetails?.organization_id,
            branch_id: companyDetails?.branch_id,
            data: apiData,
          })
        ).unwrap();
      } else {
        result = await dispatch(createOrganization(newFormData)).unwrap();
        if (result) {
          if (!pathname.includes("organizationprofile-add-edit")) {
            localStorage.setItem("curAddress", result?.xCurAdd);
            Cookies.set("curAddress", result?.xCurAdd, {
              ...cookiesOptions,
              sameSite: "Strict",
            });
          }
        }
        dispatch(saveCompanyDetails(formData)); // Save form data in Redux
      }
      if (result) {
        onNext(); // Move to next step
      }
    } catch (error) {
      // console.log("Error submitting form:", error);
      window?.console.log("Error submitting form:", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className="organization_company_title"> Company Details </p>
            <div className="organization_Switch_sec">
              <p className="business_registered_title">
                {" "}
                Is your business registered for GST?{" "}
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

            <div>
              <div>
                {isOpen ? (
                  <div className="show_hidden_sec_main">
                    <div className="show_hidden_subdata">
                      <div className="filed_width">
                        <div className="text_filed text_filed_dropdown">
                          <TextBoxComponent
                            name="gstEmail"
                            placeholder="GST ID *"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            value={watch("gstId")}
                            onChange={(e: any) =>
                              setValue("gstId", e.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                          {errors.gstId && (
                            <p className="error-text">
                              {String(errors.gstId.message)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <button type="button" className="common_btn verify_btn">
                          Verify
                        </button>
                      </div>
                    </div>
                    <div className="dropdown_common">
                      <DropDownListComponent
                        floatLabelType="Auto"
                        id="Types"
                        name="gstType"
                        cssClass="e-outline"
                        className="dropdown_filed"
                        dataSource={GST}
                        filtering={(e: FilteringEventArgs) =>
                          onFiltering(e, GST as any)
                        }
                        filterBarPlaceholder="Search a GST Registration Type"
                        allowFiltering={true}
                        value={watch("gstType")}
                        fields={{ text: "Type", value: "Id" }}
                        onChange={(e: any) => {
                          setValue("gstType", e.value);
                          if (errors.gstType) {
                            clearErrors("gstType");
                          }
                        }}
                        placeholder="Select GST Registration Type *"
                      />
                      {errors.gstType && (
                        <p className="error-text">
                          {String(errors.gstType.message)}
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="Alias_grid_sec">
                <Row>
                  <Col md={8}>
                    <div className="text_filed text_filed_dropdown">
                      <TextBoxComponent
                        name="organizationName"
                        placeholder="Organization name *"
                        cssClass="e-outline"
                        floatLabelType="Auto"
                        value={watch("organizationName")}
                        onChange={(e: any) =>
                          setValue("organizationName", e.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                      {errors.organizationName && (
                        <p className="error-text">
                          {String(errors.organizationName.message)}
                        </p>
                      )}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text_filed text_filed_dropdown">
                      <TextBoxComponent
                        name="alias"
                        placeholder="Alias"
                        cssClass="e-outline"
                        floatLabelType="Auto"
                        value={watch("alias")}
                        onChange={(e: any) =>
                          setValue("alias", e.value, { shouldValidate: true })
                        }
                      />
                      {errors.alias && (
                        <p className="error-text">
                          {String(errors.alias.message)}
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="Currency_sec">
                <Row>
                  <Col md={6}>
                    <div className="dropdown_common">
                      <DropDownListComponent
                        floatLabelType="Auto"
                        id="Types"
                        name="currency"
                        cssClass="e-outline"
                        className="dropdown_filed"
                        dataSource={
                          currencies.length > 0 ? currencies : Currency
                        }
                        value={watch("currency")}
                        fields={
                          currencies.length > 0
                            ? { text: "currency_code", value: "currency_id" }
                            : { text: "Type", value: "Id" }
                        }
                        onChange={(e: any) => {
                          setValue("currency", e.value);
                          if (errors.currency) {
                            clearErrors("currency");
                          }
                        }}
                        placeholder="Currency *"
                        // popupHeight="220px"
                      />
                      {errors.currency && (
                        <p className="error-text">
                          {String(errors.currency.message)}
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="control-pane">
              <div className="control-section" id="uploadpreview">
                <div>
                  <div className="imagepreview">
                    <div id="dropArea" className="dropTarget">
                      <div className="fileuploadbtn">
                        <UploaderComponent
                          id="previewfileupload"
                          type="file"
                          allowedExtensions=".jpg, .jpeg, .png"
                          autoUpload={false}
                          asyncSettings={path}
                          success={onUploadSuccess}
                          failure={onUploadFailure}
                          multiple={false}
                          removing={onDeleteFile}
                        />
                        {imageUrl && imageUrl !== "/defaultLogoUrl" && (
                          <div className="mb-2">
                            <Image
                              src={imageUrl}
                              alt="Uploaded"
                              width={200}
                              height={100}
                              className="rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="AddressDetails_sec_main">
            <p className="organization_company_title"> Legal Address </p>
            <Row>
              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="contactPerson"
                    placeholder="Contact Person *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("contactPerson")}
                    onChange={(e: any) =>
                      setValue("contactPerson", e.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                  {errors.contactPerson && (
                    <p className="error-text">
                      {String(errors.contactPerson.message)}
                    </p>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="phoneNumber"
                    placeholder="Phone Number *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("phoneNumber")}
                    onChange={(e: any) =>
                      setValue("phoneNumber", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.phoneNumber && (
                    <p className="error-text">
                      {String(errors.phoneNumber.message)}
                    </p>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="houseNo"
                    placeholder="House No / Flat / Building Name *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("houseNo")}
                    onChange={(e: any) =>
                      setValue("houseNo", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.houseNo && (
                    <p className="error-text">
                      {String(errors.houseNo.message)}
                    </p>
                  )}
                </div>
              </Col>

              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="area"
                    placeholder="Area / Sector / Locality *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("area")}
                    onChange={(e: any) =>
                      setValue("area", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.area && (
                    <p className="error-text">{String(errors.area.message)}</p>
                  )}
                </div>
              </Col>

              <Col md={6}>
                <div className="dropdown_common">
                  <DropDownListComponent
                    floatLabelType="Auto"
                    id="stateDropdown"
                    name="state"
                    cssClass="e-outline"
                    className="dropdown_filed"
                    dataSource={states.length > 0 ? states : State}
                    value={watch("state")}
                    fields={
                      states.length > 0
                        ? { text: "state_name", value: "state_id" }
                        : { text: "Type", value: "Id" }
                    }
                    onChange={(e: any) => {
                      const stateId = e.value;
                      setValue("state", stateId);

                      if (errors.state) {
                        clearErrors("state");
                      }

                      if (stateId) {
                        dispatch(fetchCities(stateId));
                      }

                      // Reset city selection when state changes
                      setValue("city", "");
                    }}
                    placeholder="State *"
                  />
                  {errors.state && (
                    <p className="error-text">{String(errors.state.message)}</p>
                  )}
                </div>
              </Col>

              <Col md={6}>
                <div className="dropdown_common">
                  <DropDownListComponent
                    floatLabelType="Auto"
                    id="cityDropdown"
                    name="city"
                    cssClass="e-outline"
                    className="dropdown_filed"
                    dataSource={cities.length > 0 ? cities : City}
                    value={watch("city")}
                    disabled={!watch("state")} // Disable city dropdown until state is selected
                    fields={
                      cities.length > 0
                        ? { text: "city_name", value: "city_id" }
                        : { text: "Type", value: "Id" }
                    }
                    onChange={(e: any) => {
                      setValue("city", e.value);
                      if (errors.city) {
                        clearErrors("city");
                      }
                    }}
                    placeholder="City *"
                  />
                  {errors.city && (
                    <p className="error-text">{String(errors.city.message)}</p>
                  )}
                </div>
              </Col>

              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="pincode"
                    placeholder="Pincode *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("pincode")}
                    onChange={(e: any) =>
                      setValue("pincode", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.pincode && (
                    <p className="error-text">
                      {String(errors.pincode.message)}
                    </p>
                  )}
                </div>
              </Col>

              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="email"
                    placeholder="Email *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("email")}
                    onChange={(e: any) =>
                      setValue("email", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.email && (
                    <p className="error-text">{String(errors.email.message)}</p>
                  )}
                </div>
              </Col>

              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="website"
                    placeholder="Website *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("website")}
                    onChange={(e: any) =>
                      setValue("website", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.website && (
                    <p className="error-text">
                      {String(errors.website.message)}
                    </p>
                  )}
                </div>
              </Col>
            </Row>
          </div>

          {/* Navigation Buttons */}
          <div className="company_form_btn_sec">
            <div className="company_btn_sec">
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
