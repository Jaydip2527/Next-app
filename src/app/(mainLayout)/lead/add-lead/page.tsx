"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import {
  AutoCompleteComponent,
  DropDownListComponent,
  MultiSelectComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import {
  DatePickerComponent,
  DateTimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import { useRouter } from "next/navigation";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
import { debounce } from "lodash";
import ToolbarEditor from "@/@/component/tool-bar";
import UploadFiles from "@/@/component/upload-files";
// import AddProductServiceTable from "@/@/component/add-product-service-table";
import { fetchCountries } from "@/@/redux/slices/masterDataSlice";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import {
  fetchCities,
  fetchStates,
} from "@/@/redux/slices/organizationProfileSlice";
import { leadValidationSchema } from "@/@/utils/validations";
import { LEAD_TITLE, leadDefaultValues, leadSources } from "@/@/utils/constant";
import { createLead, getAllLeadStatus } from "@/@/redux/slices/leadSlice";
import { convertDateToTimestamp } from "@/@/utils/dateFormate";
import { createTag, fetchTags } from "@/@/redux/slices/tagsSlice";
import { fetchContactsWithoutGroupBy } from "@/@/redux/slices/contactSlice";
import { fetchCompany } from "@/@/redux/slices/companySlice";
import { fetchAllUser } from "@/@/redux/slices/userSlice";
import { getRandomColor, priorityColors } from "@/@/utils/common";
import CommonProgressButton from "@/@/component/common-progress-button";
import {
  priorityItemTemplate,
  priorityValueTemplate,
  statusItemTemplate,
  statusValueTemplate,
} from "@/@/utils/dataGridCommonFunc";
// import { LeadType } from "@/@/types/lead";

const AddLeadPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [search, setSearch] = useState("");
  // const [debouncedSearch, debouncedSetSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const { countries } = useAppSelector((state) => state.masterData);
  const { contactListWithoutGroupBy } = useAppSelector(
    (state) => state.contact
  );
  const { companyList } = useAppSelector((state) => state.company);
  const { states, cities } = useAppSelector(
    (state) => state.organizationProfile
  );
  // const [isLoading, setIsLoading] = useState(false);

  const { leadStatusList, loading } = useAppSelector((state) => state.lead);

  const { users } = useAppSelector((state) => state.user);
  const { tagList } = useAppSelector((state) => state.tags);

  // const progressBtnRef = useRef<any>(null);
  // const [isValid, setIsValid] = useState(true);

  // console.log("isValid :>> ", isValid);

  // const handleClick = async () => {
  //   if (!validateForm()) {
  //     setIsValid(false);
  //     return; // Prevent spinner from showing
  //   }

  //   setIsValid(true);

  //   // Start Progress Indicator
  //   progressBtnRef.current.start();

  //   try {
  //     await fakeApiCall(); // Simulate API request
  //   } catch (error) {
  //     console.error("API Error:", error);
  //   } finally {
  //     // Stop Progress Indicator
  //     progressBtnRef.current.progressComplete();
  //   }
  // };

  // const validateForm = () => {
  //   return Math.random() > 0.5; // Example validation: Passes randomly
  // };

  // const fakeApiCall = () => {
  //   return new Promise((resolve) => setTimeout(resolve, 7000)); // Simulated 7s delay
  // };

  const methods = useForm<any>({
    mode: "all",
    resolver: yupResolver(leadValidationSchema),
    defaultValues: leadDefaultValues,
  });

  const {
    handleSubmit,
    setValue,
    control,
    reset,
    trigger,
    watch,
    clearErrors,
  } = methods;

  const watchStateId = useWatch({ control, name: "state_id" });
  const watchCityId = useWatch({ control, name: "city_id" });

  useEffect(() => {
    setValue("state_id", watchStateId);
  }, [watchStateId]);
  useEffect(() => {
    setValue("city_id", watchCityId);
  }, [watchCityId]);

  useEffect(() => {
    const params = {
      module: "lead",
    };
    Promise.all([
      dispatch(fetchCountries()),
      dispatch(fetchTags(params)),
      dispatch(fetchCompany({ page: 1, limit: 10 })),
      dispatch(
        fetchAllUser({ page: 1, limit: 10, is_with_respect_branch: "0" })
      ),
      dispatch(getAllLeadStatus()),
    ]);
  }, []);

  const handleGetState = (country_id: any) => {
    dispatch(fetchStates(country_id));
  };

  const handleGetCity = (state_id: any) => {
    dispatch(fetchCities(state_id));
  };

  useEffect(() => {
    const countryId = watch("country_id");
    if (!countryId) {
      return;
    }

    handleGetState(countryId);
    setValue("state_id", null); // Reset state when country changes
    setValue("city_id", null); // Reset city when country changes
  }, [watch("country_id")]);

  useEffect(() => {
    const stateId = watch("state_id");
    if (!stateId) {
      return;
    }

    handleGetCity(stateId);
    // setValue("city_id", null); // Reset city when state changes
  }, [watch("state_id")]);

  // Handle tag selection & new tag creation
  const handleTagChange = async (e: { value: any }, fieldValue: any) => {
    const selectedTags = Array.isArray(e.value) ? e.value : []; // Ensure selectedTags is an array
    let updatedTags = Array.isArray(fieldValue) ? [...fieldValue] : []; // Ensure updatedTags is an array

    for (const tag of selectedTags) {
      // Check if the tag exists by comparing both tag_id and name
      const existingTag = tagList.find(
        (t: { name: any; tag_id: any }) => t?.name === tag || t?.tag_id === tag
      );

      if (!existingTag) {
        const payload = {
          name: tag.trim(),
          color: getRandomColor(),
          module: "lead",
        };

        try {
          const res = await dispatch(createTag(payload)).unwrap();
          if (res?.tag_id) {
            updatedTags.push(res.tag_id);
          }
        } catch (error) {
          // console.error("Error creating tag:", error);
          console.log("Error creating tag:", error);
        }
      } else {
        updatedTags.push(existingTag.tag_id || existingTag.name); // Ensure correct ID or name is added
      }
    }

    // Remove duplicates
    updatedTags = [...new Set(updatedTags)];
    setValue("tag_ids", updatedTags, { shouldValidate: true });
  };

  useEffect(() => {
    if (selectedLead) {
      const selectedContact = contactListWithoutGroupBy.data.find(
        (item: { contact: { contact_id: any } }) =>
          item?.contact?.contact_id === selectedLead
      );

      if (!selectedContact) {
        return;
      }

      reset({
        company_id: selectedContact?.company?.company_id || null,
        address_id: selectedContact?.address?.address_id || null,
        contact_id: selectedContact?.contact?.contact_id || null,

        first_name: selectedContact?.contact?.first_name || "",
        last_name: selectedContact?.contact?.last_name || "",
        company_name: selectedContact?.company?.company_name || null,
        position:
          selectedContact?.company?.position ||
          selectedContact?.contact?.position ||
          "",
        phone_number: selectedContact?.phone?.phone_number || "",
        email: selectedContact?.email?.email || "",
        website:
          selectedContact?.company?.website ||
          selectedContact?.contact?.website ||
          "",
        budget: selectedContact?.contact?.budget || "",
        gst_number:
          selectedContact?.lead?.gst_number ||
          selectedContact?.company?.website ||
          "",
        is_converted: true,
        // status_id: selectedLead?.status?.status_id || "",
        address_type: selectedContact?.address?.address_type || "",
        landmark: selectedContact?.address?.landmark || "",
        address_line_1: selectedContact?.address?.address_line_1 || "",
        city_id: selectedContact?.address?.city?.city_id || null,
        country_id: selectedContact?.address?.country?.country_id || null,
        state_id: selectedContact?.address?.state?.state_id || null,
        pincode: selectedContact?.address?.pincode || "",
        // sr_number: "",
        create_date: new Date().toISOString(),
        lead_receive_date: "",
        last_contact_date: "",
        lead_source: "",
        priority: "",
        tag_ids: [],
        assigned_to: [],
        details: "",
      });
    } else {
      if (leadStatusList?.data?.length > 0) {
        const defaultStatus = leadStatusList.data.reduce(
          (prev: any, current: any) =>
            prev.sequence < current.sequence ? prev : current
        );
        
        reset({
          ...leadDefaultValues,
          status_id: defaultStatus.status_id || "",
        });
      } else {
        reset(leadDefaultValues);
      }
    }
  }, [contactListWithoutGroupBy, selectedLead, leadStatusList]);

  useEffect(() => {
    dispatch(fetchContactsWithoutGroupBy({ search }));
  }, [search]);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 1000),
    []
  );

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (!value) {
      setSelectedLead(null);
    }
    debouncedSetSearch(value);
  };

  const handleCompanyChange = (selectedItem: any) => {
    if (selectedItem?.company_name) {
      setValue("company_name", selectedItem.company_name, {
        shouldValidate: true,
      });
      clearErrors("company_name");
    }
    if (selectedItem?.company_id) {
      setValue("company_id", selectedItem.company_id, {
        shouldValidate: true,
      });
    }
  };

  const processedContacts =
    (contactListWithoutGroupBy &&
      contactListWithoutGroupBy?.data?.map((item: any) => ({
        ...item,
        contact: {
          ...item.contact,
          full_name: `${item.contact.first_name} ${item.contact.last_name}`,
        },
      }))) ||
    [];

  // const validateForm = () => {
  //   return Math.random() > 0.5; // Example validation: Passes randomly
  // };

  const onSubmit = (data: any) => {
    // if (!validateForm()) {
    //   setIsValid(false);
    //   return; // Prevent spinner from showing
    // }

    // setIsValid(true);
    // // Start Progress Indicator
    // progressBtnRef.current?.start();

    const payload = {
      ...data,
      create_date: convertDateToTimestamp(data.create_date),
      lead_receive_date: convertDateToTimestamp(data.lead_receive_date),
      last_contact_date: convertDateToTimestamp(data.last_contact_date),
    };

    // setIsLoading(true);
    dispatch(createLead(payload))
      .unwrap()
      .then(() => {
        // setIsLoading(false);
        router.push("/lead");
        reset();
      });
  };

  return (
    <>
      <div className="common_header_main_div">
        <h4 className="common_header_data_text"> {LEAD_TITLE.LEAD_ADD} </h4>
        <div className="breadcrumb_main_div">
          <label className="breadcrumb_link_text">Dashboard</label>
          <label className="dots_icon"></label>
          <label className="breadcrumb_page_text">Lead</label>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <div className="common_card_main_div">
                <h6 className="common_card_title">Lead contact info.</h6>
                <div className="radiobutton-control">
                  <Row className="mb-3">
                    <Col md={6}>
                      <div className="radio_btn">
                        <Controller
                          name="is_individual_lead"
                          control={control}
                          render={({ field }) => (
                            <RadioButtonComponent
                              label="Person"
                              name={field.name}
                              value="person"
                              checked={field.value === true}
                              onChange={() => {
                                setValue("is_individual_lead", true, {
                                  shouldValidate: true,
                                });
                                trigger("company_name");
                              }}
                            />
                          )}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="radio_btn">
                        <Controller
                          name="is_individual_lead"
                          control={control}
                          render={({ field }) => (
                            <RadioButtonComponent
                              label="Company"
                              name={field.name}
                              value="company"
                              checked={field.value === false}
                              onChange={() => {
                                setValue("is_individual_lead", false, {
                                  shouldValidate: true,
                                });
                                trigger("company_name");
                              }}
                            />
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="text_filed text_filed_dropdown">
                        <Controller
                          name="company_name"
                          control={control}
                          render={({ field, fieldState: { error } }) => {
                            // Ensure dataSource contains only valid items
                            // const filteredCompanyList =
                            //   companyList?.filter(
                            //     (item: any) => item?.company
                            //   ) || [];

                            return (
                              <div className="custom-autocomplete">
                                <AutoCompleteComponent
                                  cssClass="e-outline"
                                  floatLabelType="Auto"
                                  showPopupButton={true}
                                  dataSource={companyList} // Use filtered list
                                  itemTemplate={(item: any, index: number) => (
                                    <Row key={index}>
                                      <div className="lead_common_text">
                                        {item?.company_name ?? ""}
                                      </div>
                                    </Row>
                                  )}
                                  placeholder={`Company Name ${watch("is_individual_lead") === false ? "*" : ""}`}
                                  fields={{
                                    value: "company_name",
                                    text: "company_name",
                                  }}
                                  filterType="Contains"
                                  onChange={(e: any) => {
                                    const selectedCompany =
                                      e?.target?.itemData || null;

                                    if (!e?.target?.value) {
                                      setValue("company_name", "", {
                                        shouldValidate: true,
                                      });
                                      setValue("company_id", "", {
                                        shouldValidate: true,
                                      });
                                    } else {
                                      handleCompanyChange(selectedCompany);
                                    }
                                  }}
                                  value={field.value || null}
                                  popupHeight="250px"
                                  // allowCustom={true}
                                />
                                {error && (
                                  <p className="error-text">{error.message}</p>
                                )}
                              </div>
                            );
                          }}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
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
                                disabled={watch("is_individual_lead") === true}
                                onChange={(e: any) =>
                                  setValue("gst_number", e.value, {
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
                  </Row>
                </div>
                <Row>
                  <Col>
                    <div className="custom-autocomplete mb-3">
                      <AutoCompleteComponent
                        cssClass="e-outline"
                        dataSource={processedContacts}
                        placeholder="Search Name"
                        fields={{
                          value: "contact.first_name",
                          text: "contact.first_name",
                        }}
                        filterType="Contains"
                        showPopupButton={true}
                        itemTemplate={(item: any, index: number) => (
                          <Row
                            onClick={() => {
                              setSelectedLead(item?.contact?.contact_id);
                            }}
                            key={index}
                            className="autocomplete-item"
                          >
                            <div className="lead_common_text">{`${item.contact.first_name} ${item.contact.last_name}`}</div>
                            <div className="lead_common_text">
                              {item?.email?.email}
                            </div>
                            <div
                              className="lead_common_text lead_phone"
                              style={{
                                borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
                                paddingBottom: "5px",
                              }}
                            >
                              {item?.phone?.phone_number}
                            </div>
                          </Row>
                        )}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="text_filed text_filed_dropdown">
                      <Controller
                        name="first_name"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="First Name *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("first_name", e.value, {
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
                        name="last_name"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Last Name"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("last_name", e.value, {
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
                        name="email"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Email *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("email", e.value, {
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
                        name="phone_number"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              type="number"
                              placeholder="Phone Number *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("phone_number", e.value, {
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
                        name="website"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Website"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              disabled={watch("is_individual_lead") === true}
                              onChange={(e: any) =>
                                setValue("website", e.value, {
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
                        name="position"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Position"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              disabled={watch("is_individual_lead") === true}
                              onChange={(e: any) =>
                                setValue("position", e.value, {
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

                  <Col md={12}>
                    <h6 className="common_card_title">Legal Address</h6>
                  </Col>
                  <Col md={6}>
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
                                  onChange={(e: { value: any }) => {
                                    setValue("country_id", e.value, {
                                      shouldValidate: true,
                                    });
                                  }}
                                />
                                {error && (
                                  <p className="error-text">{error.message}</p>
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
                                  value={field.value || null}
                                  onChange={(e: { value: any }) => {
                                    field.onChange(e.value);
                                    setValue("state_id", e.value, {
                                      shouldValidate: true,
                                    });
                                  }}
                                  ref={(ref: any) => {
                                    if (ref && ref.value !== field.value) {
                                      ref.value = field.value;
                                    }
                                  }}
                                />
                                {error && (
                                  <p className="error-text">{error.message}</p>
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
                                  value={field.value || null}
                                  onChange={(e: { value: any }) => {
                                    field.onChange(e.value);
                                    setValue("city_id", e.value, {
                                      shouldValidate: true,
                                    });
                                  }}
                                  ref={(ref: any) => {
                                    if (ref && ref.value !== field.value) {
                                      ref.value = field.value;
                                    }
                                  }}
                                />
                                {error && (
                                  <p className="error-text">{error.message}</p>
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
                                  <p className="error-text">{error.message}</p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={6}>
              <div className="lead_common_card_main_div">
                <h6 className="common_card_title">Lead Information</h6>
                <Row>
                  <Col md={12}>
                    <div className="text_filed text_filed_dropdown">
                      <Controller
                        name="sr_number"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Lead Number"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("sr_number", e.value, {
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
                  <Col md={12}>
                    <div className="date_picker_div">
                      <div className="datetimepicker-control-section">
                        <Controller
                          name="create_date"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <DateTimePickerComponent
                                placeholder="Create Date & Time"
                                cssClass="e-outline"
                                floatLabelType="Auto"
                                value={field.value}
                                disabled
                                onChange={(e: any) =>
                                  setValue("create_date", e.value, {
                                    shouldValidate: true,
                                  })
                                }
                              ></DateTimePickerComponent>
                              {error && (
                                <p className="error-text">{error.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="date_picker_div">
                      <div className="datetimepicker-control-section">
                        <Controller
                          name="lead_receive_date"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <DatePickerComponent
                                placeholder="Received Date & Time"
                                floatLabelType="Auto"
                                cssClass="e-outline"
                                value={field.value}
                                min={new Date()}
                                onChange={(e: any) =>
                                  setValue("lead_receive_date", e.value, {
                                    shouldValidate: true,
                                  })
                                }
                              ></DatePickerComponent>
                              {error && (
                                <p className="error-text">{error.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="date_picker_div">
                      <div className="datetimepicker-control-section">
                        <Controller
                          name="last_contact_date"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <DatePickerComponent
                                placeholder="Last Contact Date & Time"
                                floatLabelType="Auto"
                                cssClass="e-outline"
                                value={field.value}
                                min={new Date()}
                                onChange={(e: any) =>
                                  setValue("last_contact_date", e.value, {
                                    shouldValidate: true,
                                  })
                                }
                              ></DatePickerComponent>
                              {error && (
                                <p className="error-text">{error.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="dropdown_common">
                      <Controller
                        name="lead_source"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
                              floatLabelType="Auto"
                              placeholder="Source"
                              dataSource={leadSources}
                              fields={{ text: "label", value: "value" }}
                              popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("lead_source", e.value, {
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
                        name="budget"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              type="number"
                              placeholder="Budget"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("budget", e.value, {
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
                </Row>
              </div>
              <div className="lead_common_card_main_div">
                <h6 className="common_card_title">General Information</h6>
                <Row>
                  <Col md={12}>
                    <div className="dropdown_common">
                      <Controller
                        name="status_id"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
                              floatLabelType="Auto"
                              placeholder="Status"
                              dataSource={leadStatusList?.data}
                              fields={{ text: "name", value: "status_id" }}
                              popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              itemTemplate={(data: any) =>
                                statusItemTemplate(data)
                              }
                              valueTemplate={(data: any) =>
                                statusValueTemplate(data)
                              }
                              onChange={(e: any) =>
                                setValue("status_id", e.value, {
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

                  <Col md={12}>
                    <div className="dropdown_common">
                      <Controller
                        name="priority"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
                              floatLabelType="Auto"
                              placeholder="Priority"
                              dataSource={priorityColors}
                              fields={{ text: "label", value: "value" }}
                              popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              itemTemplate={(data: any) =>
                                priorityItemTemplate(data)
                              }
                              valueTemplate={(data: any) =>
                                priorityValueTemplate(data)
                              }
                              onChange={(e: any) =>
                                setValue("priority", e.value, {
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
                  <Col md={12}>
                    <div
                      className={`multi_select_common text_filed_dropdown text_filed`}
                    >
                      <Controller
                        name="assigned_to"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <MultiSelectComponent
                              floatLabelType="Auto"
                              cssClass="e-outline"
                              dataSource={
                                users?.data?.map(
                                  (user: {
                                    first_name: any;
                                    last_name: any;
                                    user_id: any;
                                  }) => ({
                                    ...user,
                                    fullName: `${user.first_name} ${user.last_name}`, // Combine first and last name
                                  })
                                ) || []
                              }
                              fields={{
                                text: "fullName", // Use the concatenated field
                                value: "user_id",
                              }}
                              placeholder="Assigned To"
                              value={field.value || []}
                              onChange={(e: { value: any }) => {
                                setValue("assigned_to", e.value, {
                                  shouldValidate: true,
                                });
                              }}
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="multi_select_common text_filed_dropdown text_filed">
                      <Controller
                        name="tag_ids"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <MultiSelectComponent
                              floatLabelType="Auto"
                              cssClass="e-outline"
                              dataSource={tagList}
                              fields={{ text: "name", value: "tag_id" }} // Ensure API returns { id, text }
                              allowCustomValue={true}
                              placeholder="Select or add tags"
                              value={field.value || []} // Ensure value is always an array
                              onChange={(e: any) =>
                                handleTagChange(e, field.value || [])
                              } // Ensure field.value is an array
                            />

                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              {/* Tool Bar */}

              <div className="mt-2 lead_common_card_main_div">
                <ToolbarEditor
                  name="details"
                  isControl={true}
                  selectedValue={watch("details")}
                />
              </div>
            </Col>

            {/* Upload Files */}
            <Col md={12}>
              <div className="mt-3">
                <div className="common_card_main_div">
                  <h6 className="common_card_title">Upload Multiple Files</h6>
                  <UploadFiles name="files" multiple={true} />
                </div>
              </div>
            </Col>
          </Row>
          {/* Add product or service*/}
          {/* <Row>
            <Col md={3}>
              <div className="dropdown_common">
                <DropDownListComponent
                  floatLabelType="Auto"
                  placeholder="Add Item"
                  popupHeight="220px"
                  className="dropdown_filed"
                  cssClass="e-outline"
                />
              </div>
            </Col>
            <Col md={12}>
              <AddProductServiceTable />
            </Col>
          </Row> */}
          <Col md={12}>
            {/* <ProgressButtonComponent
              ref={progressBtnRef}
              content="Submit"
              onClick={handleClick}
              enableProgress={isValid}
            /> */}
            <div className="add_contact_btn_sec">
              <button
                type="button"
                className="common_secondary_btn"
                onClick={() => {
                  router.push("/lead");
                  reset();
                }}
              >
                Cancel
              </button>

              <CommonProgressButton
                content="Submit"
                loading={loading}
                // ref={progressBtnRef}
                // enableProgress={isValid}
                // onClick={handleSubmit(onSubmit)}
                // disabled={!isValid || isSubmitting}
              />
            </div>
          </Col>
        </form>
      </FormProvider>
    </>
  );
};

export default AddLeadPage;
