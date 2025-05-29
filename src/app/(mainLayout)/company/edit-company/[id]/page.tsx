"use client";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { companyValidationSchema } from "@/@/utils/validations";
import {
  fetchSingleCompany,
  updateCompany,
} from "@/@/redux/slices/companySlice";
import {
  fetchCities,
  fetchCountries,
  fetchStates,
} from "@/@/redux/slices/organizationProfileSlice";
import { ENUMS } from "@/@/utils/constant";
import ContactGrid from "@/@/component/company/contact-grid";
import CommonProgressButton from "@/@/component/common-progress-button";

const EditCompanyPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { company } = useAppSelector((state) => state.company);
  const { loading } = useAppSelector((state) => state.company);
  const { countries } = useAppSelector((state) => state.organizationProfile);
  const { states, cities } = useAppSelector(
    (state) => state.organizationProfile
  );
  const { id: company_id } = useParams();

  const methods = useForm<any>({
    mode: "all",
    resolver: yupResolver(companyValidationSchema),
  });
  const { handleSubmit, setValue, control, watch, clearErrors } = methods;

  useEffect(() => {
    Promise.all([dispatch(fetchCountries())]);
  }, []);

  useEffect(() => {
    if (company_id) {
      dispatch(fetchSingleCompany(company_id as string));
    }
  }, [company_id]);

  const handleGetState = (country_id: any) => {
    dispatch(fetchStates(country_id));
  };

  const handleGetCity = (state_id: any) => {
    dispatch(fetchCities(state_id));
  };

  const onSubmit = async (data: any) => {
    try {
      if (company_id) {
        const bodyData = {
          company_name: data.company_name,
          gst_number: data.gst_number,
          website: data.website,
          addresses: [
            {
              address_type: ENUMS.BILLING,
              address_line_1: data.address_line_1,
              landmark: data.landmark,
              city_id: data.city_id,
              state_id: data.state_id,
              pincode: data.pincode,
              country_id: data.country_id,
            },
          ],
          contacts: [],
        };
        // console.log("Form Submitted bodyData: ", bodyData);
        const response = await dispatch(
          updateCompany({
            id: company_id as string,
            data: bodyData,
          })
        ).unwrap();
        if (response.data) {
          router.push(`/company`);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("onSubmit Error:", error);
    }
  };

  useEffect(() => {
    if (company) {
      setValue("country_id", company.address?.country.country_id);
      setValue("company_name", company.company_name);
      setValue("gst_number", company.gst_number);
      setValue("website", company.website);
      setValue("address_line_1", company.address?.address_line_1);
      setValue("landmark", company.address?.landmark);
      setValue("pincode", company.address?.pincode);
      setValue("state_id", company.address?.state.state_id);
      setValue("city_id", company.address?.city.city_id);
      // setValue("contacts", []);
    }
  }, [company, setValue]);

  useEffect(() => {
    if (!watch("country_id")) {
      return;
    }
    handleGetState(watch("country_id"));
  }, [watch("country_id")]);

  useEffect(() => {
    if (!watch("state_id")) {
      return;
    }
    handleGetCity(watch("state_id"));
  }, [watch("state_id")]);

  // const handleCancel = () => {
  //   router.push(`/company`);
  // };

  const [isCompanyEditMode, setIsCompanyEditMode] = useState(false);
  const handleEditClose = () => setIsCompanyEditMode(false);
  const handleEditShow = () => setIsCompanyEditMode(true);

  return (
    <>
      <div className="common_header_main_div">
        <h4 className="common_header_data_text">
          {" "}
          {company_id ? "Edit" : "Add"} Company{" "}
        </h4>
        <div className="breadcrumb_main_div">
          <label className="breadcrumb_link_text">Dashboard</label>
          <label className="dots_icon"></label>
          <label className="breadcrumb_page_text">Company</label>
        </div>
      </div>
      {company_id && (
        <>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <div className="icon_box_flex_box justify-content-end mb-4">
                  <div className="icon_box_div">
                    <Icon
                      icon="lucide:edit"
                      width="20"
                      height="20"
                      className="cursor-pointer"
                      onClick={() => handleEditShow()}
                      style={{ color: "#133E87" }}
                    />
                  </div>
                </div>
                <Col md={6}>
                  <div className="common_card_main_div">
                    {!isCompanyEditMode ? (
                      <>
                        {company?.company_id && (
                          <div className="company-section">
                            <h2 className="lead-header">Company</h2>
                            {/* company List */}
                            <div className="company-list">
                              <div className="company-item">
                                <span className="company-name">
                                  {company?.company_name || "-"}
                                </span>
                              </div>
                              <div className="company-item">
                                <span className="company-name">
                                  {company?.website ? (
                                    <a
                                      href={company.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {company.website}
                                    </a>
                                  ) : (
                                    "-"
                                  )}
                                </span>
                              </div>
                              <div className="company-item">
                                <span className="company-name">
                                  {company?.gst_number || "-"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="company-section">
                          <h2 className="lead-header">Company info.</h2>
                        </div>
                        <Row>
                          <Col md={12}>
                            <div className="text_filed text_filed_dropdown">
                              <Controller
                                name="company_name"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <TextBoxComponent
                                      placeholder="Company Name"
                                      cssClass="e-outline"
                                      floatLabelType="Auto"
                                      value={field.value}
                                      onChange={(e: any) =>
                                        setValue("company_name", e.value, {
                                          shouldValidate: true,
                                        })
                                      }
                                    />
                                    {error && (
                                      <p className="error-text">
                                        {error.message}
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="text_filed text_filed_dropdown">
                              <Controller
                                name="website"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <TextBoxComponent
                                      placeholder="Website"
                                      cssClass="e-outline"
                                      floatLabelType="Auto"
                                      value={field.value}
                                      onChange={(e: any) =>
                                        setValue("website", e.value, {
                                          shouldValidate: true,
                                        })
                                      }
                                    />
                                    {error && (
                                      <p className="error-text">
                                        {error.message}
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="text_filed text_filed_dropdown">
                              <Controller
                                name="gst_number"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <TextBoxComponent
                                      placeholder="GST Number"
                                      cssClass="e-outline"
                                      floatLabelType="Auto"
                                      value={field.value}
                                      onChange={(e: any) => {
                                        setValue("gst_number", e.value, {
                                          shouldValidate: e.value
                                            ? true
                                            : false,
                                        });
                                        if (!e.value) {
                                          clearErrors("gst_number");
                                        }
                                      }}
                                    />
                                    {error && (
                                      <p className="error-text">
                                        {error.message}
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </Col>
                        </Row>
                      </>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="common_card_main_div">
                    {!isCompanyEditMode ? (
                      // <div className="lead-company">
                      <>
                        <div className="company-header">
                          <h2 className="lead-header">Legal Address</h2>
                        </div>

                        {/* company List */}
                        <div className="company-list">
                          <div className="company-item">
                            <span className="company-name">
                              {company?.address?.address_line_1 || "-"}
                            </span>
                          </div>
                          {company?.address?.landmark && (
                            <div className="company-item">
                              <span className="company-name">
                                {company?.address?.landmark || "-"}
                              </span>
                            </div>
                          )}
                          {company?.address?.city?.city_id && (
                            <div className="company-item">
                              <span className="company-name">
                                {company?.address?.city?.city_name || "-"},{" "}
                                {company?.address?.state?.state_name || "-"},{" "}
                                {company?.address?.country?.country_name || "-"}
                              </span>
                            </div>
                          )}

                          {company?.address?.pincode && (
                            <div className="company-item">
                              <span className="company-name">
                                {company?.address?.pincode || "-"}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* </div> */}
                      </>
                    ) : (
                      <>
                        <Row>
                          <Col md={12}>
                            {/* <div className="lead-company"> */}
                            <div className="company-header">
                              <h2 className="lead-header">Legal Address</h2>
                            </div>
                            {/* </div> */}
                          </Col>
                          <Col md={12}>
                            <div className="text_filed text_filed_dropdown">
                              <Controller
                                name="address_line_1"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <TextBoxComponent
                                      placeholder="House No / Flat / Building Name"
                                      cssClass="e-outline"
                                      floatLabelType="Auto"
                                      value={field.value}
                                      onChange={(e: any) =>
                                        setValue("address_line_1", e.value, {
                                          shouldValidate: true,
                                        })
                                      }
                                    />
                                    {error && (
                                      <p className="error-text">
                                        {error.message}
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="text_filed text_filed_dropdown">
                              <Controller
                                name="landmark"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <TextBoxComponent
                                      placeholder="Area / Sector/ Locality"
                                      cssClass="e-outline"
                                      floatLabelType="Auto"
                                      value={field.value}
                                      onChange={(e: any) =>
                                        setValue("landmark", e.value, {
                                          shouldValidate: true,
                                        })
                                      }
                                    />
                                    {error && (
                                      <p className="error-text">
                                        {error.message}
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </Col>
                          <Col md={12} lg={12}>
                            <Row>
                              <Col md={6}>
                                <div className="dropdown_common">
                                  <Controller
                                    name="country_id"
                                    control={control}
                                    render={({
                                      field,
                                      fieldState: { error },
                                    }) => (
                                      <>
                                        <DropDownListComponent
                                          key={field.value}
                                          floatLabelType="Auto"
                                          dataSource={countries}
                                          fields={{
                                            text: "country_name",
                                            value: "country_id",
                                          }}
                                          placeholder="Country"
                                          popupHeight="220px"
                                          className="dropdown_filed"
                                          cssClass="e-outline"
                                          value={field.value}
                                          onChange={(e: any) => {
                                            setValue("country_id", e.value, {
                                              shouldValidate: true,
                                            });
                                          }}
                                        />
                                        {error && (
                                          <p className="error-text">
                                            {error.message}
                                          </p>
                                        )}
                                      </>
                                    )}
                                  />
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="dropdown_common">
                                  <Controller
                                    name="state_id"
                                    control={control}
                                    render={({
                                      field,
                                      fieldState: { error },
                                    }) => (
                                      <>
                                        <DropDownListComponent
                                          key={field.value}
                                          floatLabelType="Auto"
                                          dataSource={states}
                                          fields={{
                                            text: "state_name",
                                            value: "state_id",
                                          }}
                                          placeholder="State"
                                          popupHeight="220px"
                                          className="dropdown_filed"
                                          cssClass="e-outline"
                                          value={field.value}
                                          onChange={(e: any) => {
                                            setValue("state_id", e.value, {
                                              shouldValidate: true,
                                            });
                                            // handleGetCity(e.value);
                                          }}
                                        />
                                        {error && (
                                          <p className="error-text">
                                            {error.message}
                                          </p>
                                        )}
                                      </>
                                    )}
                                  />
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="dropdown_common">
                                  <Controller
                                    name="city_id"
                                    control={control}
                                    render={({
                                      field,
                                      fieldState: { error },
                                    }) => (
                                      <>
                                        <DropDownListComponent
                                          key={field.value}
                                          floatLabelType="Auto"
                                          dataSource={cities}
                                          fields={{
                                            text: "city_name",
                                            value: "city_id",
                                          }}
                                          placeholder="City"
                                          popupHeight="220px"
                                          className="dropdown_filed"
                                          cssClass="e-outline"
                                          value={field.value}
                                          onChange={(e: any) =>
                                            setValue("city_id", e.value, {
                                              shouldValidate: true,
                                            })
                                          }
                                        />
                                        {error && (
                                          <p className="error-text">
                                            {error.message}
                                          </p>
                                        )}
                                      </>
                                    )}
                                  />
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="text_filed text_filed_dropdown">
                                  <Controller
                                    name="pincode"
                                    control={control}
                                    render={({
                                      field,
                                      fieldState: { error },
                                    }) => (
                                      <>
                                        <TextBoxComponent
                                          placeholder="Zip Code"
                                          cssClass="e-outline"
                                          floatLabelType="Auto"
                                          value={field.value}
                                          onChange={(e: any) =>
                                            setValue("pincode", e.value, {
                                              shouldValidate: true,
                                            })
                                          }
                                        />
                                        {error && (
                                          <p className="error-text">
                                            {error.message}
                                          </p>
                                        )}
                                      </>
                                    )}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
              {isCompanyEditMode && (
                <Row>
                  <Col md={12}>
                    <div className="mt-4 text-end">
                      <button
                        className="common_secondary_btn me-2"
                        type="button"
                        onClick={handleEditClose}
                      >
                        Cancel
                      </button>
                      <CommonProgressButton
                        content={"Save"}
                        loading={loading}
                      />
                    </div>
                  </Col>
                </Row>
              )}
            </form>
          </FormProvider>
          <Row>
            <Col md={12}>
              <ContactGrid />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default React.memo(EditCompanyPage);
