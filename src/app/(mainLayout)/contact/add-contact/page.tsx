"use client";

import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Controller,
  FormProvider,
  useForm,
  useFieldArray,
} from "react-hook-form";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import {
  DropDownListComponent,
  MultiSelectComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import { Icon } from "@iconify/react";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";

import { yupResolver } from "@hookform/resolvers/yup";
import ToolbarEditor from "@/@/component/tool-bar";
import {
  fetchCountries,
  fetchCurrencies,
} from "@/@/redux/slices/masterDataSlice";
import {
  fetchCities,
  fetchStates,
} from "@/@/redux/slices/organizationProfileSlice";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { createTag, fetchTags } from "@/@/redux/slices/tagsSlice";
import { leadSources } from "@/@/utils/constant";
import {
  createContact,
  fetchContactById,
  updateContact,
} from "@/@/redux/slices/contactSlice";
import { getRandomColor } from "@/@/utils/common";
import CommonProgressButton from "@/@/component/common-progress-button";
import { fetchAllUser } from "@/@/redux/slices/userSlice";
import { contactValidationSchema } from "@/@/utils/validations";
import UploadFiles from "../../../../component/upload-files";
import data from "../../../../app/dataSource.json";

const AddContact = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = useParams();

  // Redux state selections
  const { tagList } = useAppSelector((state) => state.tags);
  const { countries, currencies } = useAppSelector((state) => state.masterData);
  const { contact, loading } = useAppSelector((state) => state.contact);
  const { states, cities } = useAppSelector(
    (state) => state.organizationProfile
  );
  const { users } = useAppSelector((state) => state.user);

  // Define industry data
  const indus = "Industry";
  const Industry = data[indus];

  // Form setup
  const methods = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(contactValidationSchema),
    defaultValues: {
      first_name: null,
      last_name: null,
      dob: " ",
      position: null,
      description: null,
      visibility: "public",
      source: " ",
      image: "",
      currency: " ",
      status: "Active",
      email: [{ email: "", email_label: "work", is_primary_email: true }],
      phone_number: [
        { phone_number: "", phone_label: "work", is_primary_phone: true },
      ],
      company_id: null,
      company_name: "",
      gst_number: null,

      address_id: null,
      address_type: "Billing",
      address_line_1: "",
      landmark: "",
      state_id: "",
      city_id: "",
      country_id: "",
      pincode: null,

      industry: " ",
      facebook: "",
      instagram: "",
      linkedin: "",
      skype: "",
      twitter: "",
      whatsapp: "",
      tag_ids: [],
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = methods;

  // Field arrays
  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: "phone_number" });
  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({ control, name: "email" });

  // Fetch data when component mounts
  useEffect(() => {
    const params = { module: "contact" };
    Promise.all([
      dispatch(fetchCountries()),
      dispatch(fetchCurrencies()),
      dispatch(fetchTags(params)),
      dispatch(
        fetchAllUser({ page: 1, limit: 10, is_with_respect_branch: "0" })
      ),
    ]);
  }, []);

  // Fetch contact description if ID exists
  useEffect(() => {
    if (id) {
      dispatch(fetchContactById(id));
    }
  }, [id]);

  // Reset form values when contact data is available
  useEffect(() => {
    if (id && contact) {
      reset({
        // Address Details
        address_type: "Billing",
        address_id: contact?.addresses?.[0]?.address_id,
        address_line_1: contact?.addresses?.[0]?.address_line_1,
        landmark: contact?.addresses?.[0]?.landmark,
        city_id: contact?.addresses?.[0]?.city?.city_id,
        state_id: contact?.addresses?.[0]?.state?.state_id,
        country_id: contact?.addresses?.[0]?.country?.country_id,
        pincode: contact?.addresses?.[0]?.pincode,

        // Company Details
        company_id: contact?.companies?.[0]?.company_id || null,
        company_name: contact?.companies?.[0]?.company_name,
        position: contact?.companies?.[0]?.position || null,
        industry: contact?.companies?.[0]?.industry || " ",
        currency: contact?.contact?.currency?.currency_id || "",

        // Contact Personal Details
        first_name: contact?.contact?.first_name,
        last_name: contact?.contact?.last_name,
        dob:!contact?.contact?.dob ||
          contact?.contact?.dob === "Invalid Date"
            ? null
            : dayjs(contact?.contact?.dob).format("DD/MM/YYYY"),
        description: contact?.contact?.description,
        source: contact?.contact?.source || null,

        // Contact Status & Visibility
        status: contact?.status,
        visibility: contact?.visibility,

        // Contact Tags
        tag_ids: contact?.tag_ids,

        // Contact Communication
        email: contact?.emails,
        phone_number: contact?.phones,

        // Social Media
        facebook: contact?.contact?.social_media?.facebook,
        twitter: contact?.contact?.social_media?.twitter,
        linkedin: contact?.contact?.social_media?.linkedin,
        instagram: contact?.contact?.social_media?.instagram,
        whatsapp: contact?.contact?.social_media?.whatsapp,
        skype: contact?.contact?.social_media?.skype,
      });
    }
  }, [contact, reset]);

  // Fetch states & cities based on selection
  const handleGetState = (country_id: string) =>
    dispatch(fetchStates(country_id));

  const handleGetCity = (state_id: string) => dispatch(fetchCities(state_id));

  useEffect(() => {
    const countryId = contact?.addresses?.[0]?.country?.country_id;
    const stateId = contact?.addresses?.[0]?.state?.state_id;

    if (countryId) {
      handleGetState(countryId);
      setValue("country_id", countryId);
    }
    if (stateId) {
      handleGetCity(stateId);
      setValue("state_id", stateId);
    }
  }, [
    contact?.addresses?.[0]?.country?.country_id,
    contact?.addresses?.[0]?.state?.state_id,
  ]);

  // Handle tag selection & creation
  const handleTagChange = async (e: { value: any }, fieldValue: any) => {
    const selectedTags = Array.isArray(e.value) ? e.value : [];
    const updatedTags = Array.isArray(fieldValue) ? [...fieldValue] : [];

    for (const tag of selectedTags) {
      const existingTag = tagList.find(
        (t: { name: any; tag_id: any }) => t?.name === tag || t?.tag_id === tag
      );
      if (!existingTag) {
        try {
          const res = await dispatch(
            createTag({
              name: tag.trim(),
              color: getRandomColor(),
              module: "contact",
            })
          ).unwrap();
          if (res?.tag_id) {
            updatedTags.push(res.tag_id);
          }
        } catch (error) {
          // console.error("Error creating tag:", error);
          console.log("Error creating tag:", error);
        }
      } else {
        updatedTags.push(existingTag.tag_id || existingTag.name);
      }
    }
    setValue("tag_ids", [...new Set(updatedTags)], { shouldValidate: true });
  };

  // Form submission handler
  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      social_media: {
        facebook: data?.facebook,
        instagram: data?.instagram,
        linkedin: data?.linkedin,
        skype: data?.skype,
        twitter: data?.twitter,
        whatsapp: data?.whatsapp,
      },
      dob: dayjs(data?.dob).format("DD/MM/YYYY"),
      tag_ids: data?.tag_ids || [],
    };

    if (id) {
      dispatch(updateContact({ id, data: payload }))
        .unwrap()
        .then(() => {
          router.push("/contact");
          reset();
        })
        .catch((error) => {
          console.log("error :>> ", error);
          // router.push("/contact");
        });
    } else {
      dispatch(createContact(payload))
        .unwrap()
        .then(() => {
          router.push("/contact");
          reset();
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    }
  };

  return (
    <>
      <div className="common_header_main_div">
        <h4 className="common_header_data_text">
          {id ? "Edit Contact" : "Add Contact"}{" "}
        </h4>
        <div className="breadcrumb_main_div">
          <label className="breadcrumb_link_text"> Lead </label>
          <label className="dots_icon"></label>
          <label className="breadcrumb_page_text"> Contact </label>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="common_card_main_div">
            <Row>
              <Col md={6}>
                <div>
                  <h6 className="common_card_title"> Basic info. </h6>
                </div>
                <div className="card_upload_sec mb-4">
                  <UploadFiles name="files" multiple={true} />
                </div>
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
                              placeholder="Last Name *"
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
                              disabled={
                                watch("company_name") === "" ||
                                watch("company_name") === null
                              }
                              value={field.value}
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
                  <Col md={6}>
                    <div className="dropdown_common text_filed_dropdown">
                      <Controller
                        name="industry"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
                              floatLabelType="Auto"
                              dataSource={Industry || []} //industries
                              fields={{ text: "Type", value: "Id" }}
                              placeholder="Industry"
                              popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("industry", e.value, {
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
                    <div className="date_picker_div">
                      <div className="datetimepicker-control-section">
                        <Controller
                          name="dob"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <DatePickerComponent
                                placeholder="Date Of Birth"
                                floatLabelType="Auto"
                                cssClass="e-outline"
                                format="dd/MM/yyyy"
                                max={
                                  new Date(
                                    new Date().setDate(new Date().getDate() - 1)
                                  )
                                } // Sets max to yesterday
                                value={field.value}
                                onChange={(e: any) =>
                                  setValue("dob", e.value, {
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
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="dropdown_common text_filed_dropdown">
                      <Controller
                        name="source"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
                              floatLabelType="Auto"
                              dataSource={leadSources}
                              fields={{
                                text: "label",
                                value: "value",
                              }}
                              placeholder="Source"
                              popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("source", e.value, {
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
                    <div className="dropdown_common text_filed_dropdown">
                      <Controller
                        name="currency"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
                              floatLabelType="Auto"
                              dataSource={currencies}
                              fields={{
                                text: "currency_code",
                                value: "currency_id",
                              }}
                              placeholder="Currency"
                              popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("currency", e.value, {
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

                  <div>
                    <h6 className="common_card_title"> Access </h6>
                  </div>
                  {/* Visibility Section */}
                  <Col md={6}>
                    <div className="dropdown_common text_filed_dropdown">
                      <Controller
                        name="visibility"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
                              floatLabelType="Auto"
                              dataSource={[
                                { label: "Public", value: "public" },
                                { label: "Private", value: "private" },
                                {
                                  label: "Select People",
                                  value: "selectpeople",
                                },
                              ]}
                              fields={{
                                text: "label",
                                value: "value",
                              }}
                              placeholder="Visibility"
                              // popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              onChange={(e: any) => {
                                field.onChange(e.value);
                                if (e.value !== "selectpeople") {
                                  setValue("selected_people", null); // Reset people selection if not "selectpeople"
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

                  {/* Status Section */}
                  <Col md={6}>
                    <div className="access_status_sec">
                      <h4 className="access_data_title m-0">Status</h4>
                      <Controller
                        name="status"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <SwitchComponent
                              checked={field.value === "Active"}
                              onChange={(e: { checked: any }) =>
                                field.onChange(
                                  e.checked ? "Active" : "Inactive"
                                )
                              }
                              onLabel="Active"
                              offLabel="Inactive"
                              cssClass="e-small"
                            />
                            {error && (
                              <p className="error-text">{error.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </Col>

                  {/* Conditional People Dropdown */}
                  {watch("visibility") === "selectpeople" && (
                    <Col md={6}>
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
                  )}

                  <div>
                    <h6 className="common_card_title"> Contact</h6>
                  </div>
                  <Col md={6}>
                    <Row>
                      {phoneFields.map((field: any, index: any) => (
                        <Col md={12} key={field.id}>
                          <div className="text_filed text_filed_dropdown d-flex align-items-center">
                            <Controller
                              name={`phone_number.${index}.phone_number`}
                              control={control}
                              render={({ field }) => (
                                <>
                                  <TextBoxComponent
                                    placeholder="Phone Number *"
                                    cssClass="e-outline"
                                    floatLabelType="Auto"
                                    value={field.value}
                                    onChange={(e: any) =>
                                      setValue(
                                        `phone_number.${index}.phone_number`,
                                        e.value,
                                        { shouldValidate: true }
                                      )
                                    }
                                  />
                                </>
                              )}
                            />
                            {index === 0 ? (
                              <button
                                type="button"
                                className="product_or_service_action_icon ms-2"
                                onClick={() =>
                                  appendPhone({
                                    phone_number: "",
                                    phone_label: "work",
                                    is_primary_phone: false,
                                    phone_id: "",
                                  })
                                }
                              >
                                <Icon
                                  icon="ic:sharp-add"
                                  width="16"
                                  height="16"
                                />
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="product_or_service_delete_icon ms-2"
                                onClick={() => removePhone(index)}
                              >
                                <Icon
                                  icon="ic:sharp-minus"
                                  width="16"
                                  height="16"
                                />
                              </button>
                            )}
                          </div>
                          {errors?.phone_number && (
                            <p className="error-text">
                              {
                                errors?.phone_number?.[index]?.phone_number
                                  ?.message
                              }
                            </p>
                          )}
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      {emailFields.map((field: any, index: any) => (
                        <Col md={12} key={field.id}>
                          <div className="text_filed text_filed_dropdown d-flex align-items-center">
                            <Controller
                              name={`email.${index}.email`}
                              control={control}
                              render={({ field }) => (
                                <>
                                  <TextBoxComponent
                                    placeholder="Email Address *"
                                    cssClass="e-outline"
                                    floatLabelType="Auto"
                                    value={field.value}
                                    onChange={(e: any) =>
                                      setValue(
                                        `email.${index}.email`,
                                        e.value,
                                        { shouldValidate: true }
                                      )
                                    }
                                  />
                                </>
                              )}
                            />
                            {index === 0 ? (
                              <button
                                type="button"
                                className="product_or_service_action_icon ms-2"
                                onClick={() =>
                                  appendEmail({
                                    email: "",
                                    email_label: "work",
                                    is_primary_email: false,
                                    email_id: "",
                                  })
                                }
                              >
                                <Icon
                                  icon="ic:sharp-add"
                                  width="16"
                                  height="16"
                                />
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="product_or_service_delete_icon ms-2"
                                onClick={() => removeEmail(index)}
                              >
                                <Icon
                                  icon="ic:sharp-minus"
                                  width="16"
                                  height="16"
                                />
                              </button>
                            )}
                          </div>
                          {errors?.email && (
                            <p className="error-text">
                              {errors?.email?.[index]?.email?.message}
                            </p>
                          )}
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <div>
                  <h6 className="common_card_title"> Description </h6>
                </div>
                <div className="mb-3 mt-2">
                  <ToolbarEditor
                    name="description"
                    isControl={true}
                    selectedValue={watch("description")}
                  />
                </div>
                <div>
                  <h6 className="common_card_title">Legal Address</h6>
                </div>
                <Row>
                  <Col md={6}>
                    <div className="text_filed text_filed_dropdown">
                      <Controller
                        name="address_line_1"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Address Line 1"
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
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="dropdown_common text_filed_dropdown">
                      <Controller
                        name="country_id"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DropDownListComponent
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
                                handleGetState(e.value);
                                setValue("state_id", null);
                                setValue("city_id", null);
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
                  <Col md={6}>
                    <div className="dropdown_common text_filed_dropdown">
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
                              placeholder="State"
                              popupHeight="220px"
                              className="dropdown_filed"
                              cssClass="e-outline"
                              value={field.value}
                              onChange={(e: any) => {
                                setValue("state_id", e.value, {
                                  shouldValidate: true,
                                });
                                handleGetCity(e.value);
                                setValue("city_id", null);
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
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="dropdown_common text_filed_dropdown">
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
                        name="pincode"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <TextBoxComponent
                              placeholder="Zipcode"
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
                <div>
                  <h6 className="common_card_title"> Social Profile </h6>
                </div>
                <div>
                  <Row>
                    <Col md={6}>
                      <div className="social_profile_box">
                        <div className="social_icon_line">
                          <div className="social_profile_icon">
                            <Icon
                              icon="logos:facebook"
                              width="18"
                              height="18"
                            />
                          </div>
                        </div>
                        <div className="social_media_input">
                          <div className="e-input-group">
                            <Controller
                              name="facebook"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <input
                                    className="e-input"
                                    type="text"
                                    placeholder=""
                                    value={field.value}
                                    onChange={(e: any) =>
                                      field.onChange(e.target.value)
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
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="social_profile_box">
                        <div className="social_icon_line">
                          <div className="social_profile_icon">
                            <Icon icon="logos:skype" width="18" height="18" />
                          </div>
                        </div>
                        <div className="social_media_input">
                          <div className="e-input-group">
                            <Controller
                              name="skype"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <input
                                    className="e-input"
                                    type="text"
                                    placeholder=""
                                    value={field.value || ""}
                                    onChange={(e: any) =>
                                      field.onChange(e.target.value)
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
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="social_profile_box">
                        <div className="social_icon_line">
                          <div className="social_profile_icon">
                            <Icon
                              icon="devicon:linkedin"
                              width="18"
                              height="18"
                            />
                          </div>
                        </div>
                        <div className="social_media_input">
                          <div className="e-input-group">
                            <Controller
                              name="linkedin"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <input
                                    className="e-input"
                                    type="text"
                                    value={field.value || ""}
                                    placeholder=""
                                    onChange={(e: any) =>
                                      field.onChange(e.target.value)
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
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="social_profile_box">
                        <div className="social_icon_line">
                          <div className="social_profile_icon">
                            <Icon
                              icon="fa6-brands:square-x-twitter"
                              width="18"
                              height="18"
                            />
                          </div>
                        </div>
                        <div className="social_media_input">
                          <div className="e-input-group">
                            <Controller
                              name="twitter"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <input
                                    className="e-input"
                                    type="text"
                                    placeholder=""
                                    value={field.value || ""}
                                    onChange={(e: any) =>
                                      field.onChange(e.target.value)
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
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="social_profile_box">
                        <div className="social_icon_line">
                          <div className="social_profile_icon">
                            <Icon
                              icon="logos:whatsapp-icon"
                              width="18"
                              height="18"
                            />
                          </div>
                        </div>
                        <div className="social_media_input">
                          <div className="e-input-group">
                            <Controller
                              name="whatsapp"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <input
                                    className="e-input"
                                    type="text"
                                    placeholder=""
                                    value={field.value || ""}
                                    onChange={(e: any) =>
                                      field.onChange(e.target.value)
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
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="social_profile_box">
                        <div className="social_icon_line">
                          <div className="social_profile_icon">
                            <Icon
                              icon="skill-icons:instagram"
                              width="18"
                              height="18"
                            />
                          </div>
                        </div>
                        <div className="social_media_input">
                          <div className="e-input-group">
                            <Controller
                              name="instagram"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <input
                                    className="e-input"
                                    type="text"
                                    placeholder=""
                                    value={field.value || ""}
                                    onChange={(e: any) =>
                                      field.onChange(e.target.value)
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
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div>
                  <h6 className="common_card_title"> Tags </h6>
                </div>
                <Col md={12}>
                  <div className="multi_select_common text_filed_dropdown text_filed">
                    <Controller
                      name="tag_ids"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <MultiSelectComponent
                            cssClass="e-outline"
                            floatLabelType="Auto"
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
              </Col>
            </Row>

            <div className="add_contact_btn_sec">
              <button
                type="button"
                className="common_secondary_btn"
                onClick={() => {
                  router.push("/contact");
                  reset();
                }}
              >
                Cancel
              </button>
              <CommonProgressButton
                content={id ? "Save" : "Submit"}
                loading={loading}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddContact;
