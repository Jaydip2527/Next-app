"use client";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import AddCompanyTable from "@/@/component/add-company-table";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { companyValidationSchema } from "@/@/utils/validations";
import { createCompany } from "@/@/redux/slices/companySlice";
import {
  fetchCities,
  fetchCountries,
  fetchStates,
} from "@/@/redux/slices/organizationProfileSlice";
import { ENUMS } from "@/@/utils/constant";
import CommonProgressButton from "@/@/component/common-progress-button";

const AddCompanyPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.company);
  const { countries } = useAppSelector((state) => state.organizationProfile);
  const { states, cities } = useAppSelector(
    (state) => state.organizationProfile
  );
  const searchParams = useSearchParams();
  const company_id = searchParams.get("id");

  const methods = useForm<any>({
    mode: "all",
    resolver: yupResolver(companyValidationSchema),
  });
  const { handleSubmit, setValue, control, watch, clearErrors } = methods;

  useEffect(() => {
    Promise.all([dispatch(fetchCountries())]);
  }, []);

  const handleGetState = (country_id: any) => {
    dispatch(fetchStates(country_id));
  };

  const handleGetCity = (state_id: any) => {
    dispatch(fetchCities(state_id));
  };

  const onSubmit = async (data: any) => {
    const finalData = {
      ...data,
      contacts: data.contacts?.map((contact: any) => ({
        ...contact,
        phone_number: contact.phone_number
          ? Number(contact.phone_number)
          : null,
      })),
      address_type: ENUMS.BILLING,
    };
    delete finalData.selected_contacts;

    try {
      const response = await dispatch(createCompany(finalData)).unwrap();
      if (response.data) {
        router.push(`/company`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("onSubmit Error:", error);
    }
  };

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

  const handleCancel = () => {
    router.push(`/company`);
  };

  return (
    <>
      <div className="common_header_main_div">
        <h4 className="common_header_data_text">Add Company </h4>
        <div className="breadcrumb_main_div">
          <label className="breadcrumb_link_text">Dashboard</label>
          <label className="dots_icon"></label>
          <label className="breadcrumb_page_text">Company</label>
        </div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Add Company */}
          {!company_id && (
            <Row>
              <Col>
                <div className="common_card_main_div">
                  {/* <h6 className="common_card_title">Company info.</h6> */}
                  <Row>
                    <Col>
                      <Row>
                        <Col md={4}>
                          <div className="text_filed text_filed_dropdown">
                            <Controller
                              name="company_name"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <TextBoxComponent
                                    placeholder="Company Name *"
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
                        <Col md={4}>
                          <div className="text_filed text_filed_dropdown">
                            <Controller
                              name="website"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <TextBoxComponent
                                    placeholder="Website *"
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
                        <Col md={4}>
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
                                        shouldValidate: e.value ? true : false,
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
                    </Col>
                  </Row>

                  {/* Legal Address */}
                  <Row>
                    <Col md={12}>
                      <h4 className="common_card_title">Legal Address</h4>
                    </Col>
                    <Col md={6}>
                      <div className="text_filed text_filed_dropdown">
                        <Controller
                          name="address_line_1"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <TextBoxComponent
                                placeholder="House No / Flat / Building Name *"
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
                                <p className="error-text">{error.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="text_filed text_filed_dropdown">
                        <Controller
                          name="landmark"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <TextBoxComponent
                                placeholder="Area / Sector/ Locality *"
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
                                <p className="error-text">{error.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </Col>
                    <Col md={12} lg={12}>
                      <Row>
                        <Col md={3}>
                          <div className="dropdown_common">
                            <Controller
                              name="country_id"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <DropDownListComponent
                                    key={field.value}
                                    floatLabelType="Auto"
                                    dataSource={countries}
                                    fields={{
                                      text: "country_name",
                                      value: "country_id",
                                    }}
                                    placeholder="Country *"
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
                        <Col md={3}>
                          <div className="dropdown_common">
                            <Controller
                              name="state_id"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <DropDownListComponent
                                    key={field.value}
                                    floatLabelType="Auto"
                                    dataSource={states}
                                    fields={{
                                      text: "state_name",
                                      value: "state_id",
                                    }}
                                    placeholder="State *"
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
                        <Col md={3}>
                          <div className="dropdown_common">
                            <Controller
                              name="city_id"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <DropDownListComponent
                                    key={field.value}
                                    floatLabelType="Auto"
                                    dataSource={cities}
                                    fields={{
                                      text: "city_name",
                                      value: "city_id",
                                    }}
                                    placeholder="City *"
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
                        <Col md={3}>
                          <div className="text_filed text_filed_dropdown">
                            <Controller
                              name="pincode"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <TextBoxComponent
                                    placeholder="Zip Code *"
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
                  <Row>
                    <Col md={12}>
                      <AddCompanyTable />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          )}

          <Row>
            <Col md={12}>
              <div className="mt-4 text-end">
                <button
                  className="common_secondary_btn me-2"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <CommonProgressButton content={"Submit"} loading={loading} />
              </div>
            </Col>
          </Row>
        </form>
      </FormProvider>
    </>
  );
};

export default AddCompanyPage;
