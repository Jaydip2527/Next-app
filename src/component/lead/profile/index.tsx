import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  AutoCompleteComponent,
  DropDownListComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useParams, useRouter } from "next/navigation";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
import { yupResolver } from "@hookform/resolvers/yup";
// import { debounce } from "lodash";

import { fetchCountries } from "@/@/redux/slices/masterDataSlice";
import {
  fetchCities,
  fetchStates,
} from "@/@/redux/slices/organizationProfileSlice";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { updateLead } from "@/@/redux/slices/leadSlice";
import { showToastError } from "@/@/utils/helpers";
import { leadDefaultValues, leadSources } from "@/@/utils/constant";
import { convertDateToTimestamp } from "@/@/utils/dateFormate";
import { fetchCompany } from "@/@/redux/slices/companySlice";
import { leadValidationSchema } from "@/@/utils/validations";
import ViewLeadProfile from "./viewLeadProfile";
import ToolbarEditor from "../../tool-bar";
import OffCanvasWrapper from "../../off-canvas-wrapper";
import AddNewLeadContactDrawerForm from "../../add-new-lead-contact-drawer";
import CommonProgressButton from "../../common-progress-button";

const LeadProfile = ({
  setIsRefresh,
}: {
  setIsRefresh: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id: lead_id } = useParams();
  // const [search, setSearch] = useState("");
  // const [isRefresh, setIsRefresh] = useState(true);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isLeadEditMode, setIsLeadEditMode] = useState(false);

  const { countries } = useAppSelector((state) => state.masterData);
  const { states, cities } = useAppSelector(
    (state) => state.organizationProfile
  );
  const { contactListWithoutGroupBy } = useAppSelector(
    (state) => state.contact
  );
  const { companyList } = useAppSelector((state) => state.company);
  const { lead, loading } = useAppSelector((state) => state.lead);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClose = () => setIsLeadEditMode(false);
  const handleEditShow = () => setIsLeadEditMode(true);

  const methods = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(leadValidationSchema),
    defaultValues: leadDefaultValues,
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    trigger,
    clearErrors,
  } = methods;

  useEffect(() => {
    Promise.all([
      dispatch(fetchCountries()),
      dispatch(fetchCompany({ page: 1, limit: 10 })),
    ]);
  }, []);

  const hasFetchedStates = useRef(false);
  const hasFetchedCities = useRef(false);

  // // Fetch cities when the state changes
  useEffect(() => {
    const countryId = lead?.contacts?.[0]?.address?.country?.country_id;
    const stateId = lead?.contacts?.[0]?.address?.state?.state_id;

    if (countryId) {
      handleGetState(countryId);
      setValue("country_id", countryId);
      hasFetchedStates.current = true;
    }
    if (stateId) {
      handleGetCity(stateId);
      setValue("state_id", stateId);
      hasFetchedCities.current = true;
    }
  }, [
    lead?.contacts?.[0]?.address?.country?.country_id,
    lead?.contacts?.[0]?.address?.state?.state_id,
  ]);

  // Fetch states and cities from lead only once when lead changes

  const handleGetState = (country_id: any) => {
    if (country_id) {
      dispatch(fetchStates(country_id));
    }
  };

  const handleGetCity = (state_id: any) => {
    if (state_id) {
      dispatch(fetchCities(state_id));
    }
  };

  useEffect(() => {
    if (lead) {
      setValue("contact_id", lead?.contacts?.[0]?.contact_id);
      setValue("company_id", lead?.contacts?.[0]?.company?.company_id);
      setValue("address_id", lead?.contacts?.[0]?.addresses?.address_id);
    }
  }, [lead, setValue]);

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

  // Reset form when `lead` data is available
  useEffect(() => {
    if (lead) {
      reset({
        contact_id: lead?.contacts?.[0]?.contact_id || null,
        company_id: lead?.contacts?.[0]?.company?.company_id || null,

        is_individual_lead: lead?.lead?.is_individual_lead || false,
        company_name: lead?.contacts?.[0]?.company?.company_name || null,
        first_name: lead?.contacts?.[0]?.first_name || null,
        last_name: lead?.contacts?.[0]?.last_name || null,
        position: lead?.contacts?.[0]?.company?.position || null,
        phone_number: lead?.contacts?.[0]?.phone?.phone_number || null,
        email: lead?.contacts?.[0]?.email?.email || null,
        website:
          lead?.contacts?.[0]?.company?.website ||
          lead?.contacts?.[0]?.website ||
          null,
        budget: lead?.lead?.budget || null,
        gst_number:
          lead?.contacts?.[0]?.company?.gst_number ||
          lead?.lead?.gst_number ||
          null,
        is_converted: lead?.lead?.is_converted ?? false,

        address_id: lead?.contacts?.[0]?.address?.address_id || null,
        address_type: lead?.contacts?.[0]?.address?.address_type || "Billing",
        address_line_1: lead?.contacts?.[0]?.address?.address_line_1 || null,
        landmark: lead?.contacts?.[0]?.address?.landmark || null,
        city_id: lead?.contacts?.[0]?.address?.city?.city_id || null,
        country_id: lead?.contacts?.[0]?.address?.country?.country_id || null,
        state_id: lead?.contacts?.[0]?.address?.state?.state_id || null,
        pincode: lead?.contacts?.[0]?.address?.pincode || null,

        sr_number: lead?.lead?.sr_number || null,
        created_at: lead?.lead?.created_at
          ? new Date(Number(lead.lead?.created_at) * 1000)
          : new Date(),
        lead_receive_date: lead?.lead?.lead_receive_date
          ? new Date(Number(lead.lead?.lead_receive_date) * 1000)
          : "",
        last_contact_date: lead?.lead?.last_contact_date
          ? new Date(Number(lead.lead?.last_contact_date) * 1000)
          : "",
        lead_source: lead?.lead?.lead_source || null,
        // status_id: lead?.status?.status_id || null,
        // assigned_to: lead?.assigned_to?.map((item: any) => item?.user_id) || [],
        // priority: lead?.lead?.priority || null,
        // tag_ids: lead?.tags ? lead.tags.map((tag: any) => tag.tag_id) : [],
        details: lead?.lead?.details || null,

        files: [], // Keep empty if handling files separately
      });
    }
  }, [lead, reset]);

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
        company_name: selectedContact?.company?.company_name || "",
        gst_number:
          selectedContact?.lead?.gst_number ||
          selectedContact?.company?.website ||
          "",
        first_name: selectedContact?.contact?.first_name || "",
        last_name: selectedContact?.contact?.last_name || "",
        phone_number: selectedContact?.phone?.phone_number || "",
        contact_id: selectedContact?.contact?.contact_id || null,
        email: selectedContact?.email?.email || "",
        position:
          selectedContact?.company?.position ||
          selectedContact?.contact?.position ||
          "",
        website:
          selectedContact?.company?.website ||
          selectedContact?.contact?.website ||
          "",
        address_id: selectedContact?.address?.address_id || null,
        address_type: selectedContact?.address?.address_type || "Billing",
        landmark: selectedContact?.address?.landmark || "",
        address_line_1: selectedContact?.address?.address_line_1 || "",
        city_id: selectedContact?.address?.city?.city_id || null,
        country_id: selectedContact?.address?.country?.country_id || null,
        state_id: selectedContact?.address?.state?.state_id || null,
        pincode: selectedContact?.address?.pincode || "",
        lead_source: selectedContact?.lead?.lead_source || "",
        is_converted: true,
        // is_individual_lead: true,
        lead_receive_date: selectedContact?.lead?.lead_receive_date || "",
        last_contact_date: selectedContact?.lead?.last_contact_date || "",
        budget: selectedContact?.lead?.budget || "",
        details: selectedContact?.lead?.details || null,
      });
    }
  }, [selectedLead]);

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      create_date: convertDateToTimestamp(data?.create_date),
      lead_receive_date: convertDateToTimestamp(data?.lead_receive_date),
      last_contact_date: convertDateToTimestamp(data?.last_contact_date),
    };
    dispatch(updateLead({ id: lead_id, data: payload }))
      .unwrap()
      .then(() => {
        router.push("/lead");
        reset();
        handleEditClose();
      })
      .catch((err: any) => {
        showToastError(err?.data?.message || "Something went wrong");
      });
  };

  return (
    <>
      <div className="">
        <div className="icon_box_flex_box justify-content-end mb-4">
          {/* <button className="common_small_btn_icon">Convert to Customer</button> */}
          <div className="icon_box_div">
            <Icon
              icon="lucide:edit"
              width="20"
              height="20"
              className="cursor-pointer"
              onClick={() => handleEditShow()}
              style={{ color: !isLeadEditMode ? "#133E87" : undefined }}
            />
          </div>
          {/* <div>
            <div className="dropdown_common mb-0" style={{ width: "100px" }}>
              <DropDownListComponent
                floatLabelType="Auto"
                placeholder="More"
                popupHeight="220px"
                className="dropdown_filed"
                cssClass="e-outline" 
            </div>
          </div> */}
          <div>
            <Icon
              icon="lets-icons:setting-fill"
              className="cursor-pointer"
              width="24"
              height="24"
              style={{ color: "#133E87" }}
              // onClick={SettinghandleEditShow}
            />
          </div>
        </div>

        {!isLeadEditMode ? (
          <ViewLeadProfile
            lead={lead}
            isIndividualLead={watch("is_individual_lead")}
            setIsRefresh={setIsRefresh}
            handleShow={handleShow}
          />
        ) : (
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
                                return (
                                  <div className="custom-autocomplete">
                                    <AutoCompleteComponent
                                      cssClass="e-outline"
                                      floatLabelType="Auto"
                                      showPopupButton={true}
                                      dataSource={companyList} // Use filtered list
                                      itemTemplate={(
                                        item: any,
                                        index: number
                                      ) => (
                                        <Row key={index}>
                                          <div className="lead_common_text">
                                            {item.company_name ?? ""}
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
                                    />
                                    {error && (
                                      <p className="error-text">
                                        {error.message}
                                      </p>
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
                                    disabled={
                                      watch("is_individual_lead") === true
                                    }
                                    value={field.value}
                                    onChange={(e: any) =>
                                      setValue("gst_number", e.value, {
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
                                  disabled={
                                    watch("is_individual_lead") === true
                                  }
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
                                  disabled={
                                    watch("is_individual_lead") === true
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
                                        handleGetCity(e.value);
                                        setValue("city_id", null);
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
                                      floatLabelType="Auto"
                                      dataSource={cities || []}
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
                  </div>
                </Col>
                <Col md={6}>
                  <div className="lead_common_card_main_div">
                    <h6 className="common_card_title">Lead Information</h6>
                    <Row>
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
                                    onChange={(e: any) =>
                                      setValue("lead_receive_date", e.value, {
                                        shouldValidate: true,
                                      })
                                    }
                                  ></DatePickerComponent>
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
                                    onChange={(e: any) =>
                                      setValue("last_contact_date", e.value, {
                                        shouldValidate: true,
                                      })
                                    }
                                  ></DatePickerComponent>
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
                      </Col>
                      <Col md={12}>
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
                      <Col md={12}>
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

                  {/* Tool Bar */}

                  <div className="mt-2 lead_common_card_main_div">
                    <ToolbarEditor
                      name="details"
                      isControl={true}
                      selectedValue={watch("details")}
                    />
                  </div>
                </Col>
              </Row>
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
                    <CommonProgressButton content="Save" loading={loading} />
                  </div>
                </Col>
              </Row>
            </form>
          </FormProvider>
        )}

        <OffCanvasWrapper
          show={show}
          handleClose={handleClose}
          title="Add New Contact"
          placement="end"
        >
          <AddNewLeadContactDrawerForm
            handleClose={handleClose}
            contactData={lead?.contacts[0]}
            leadId={lead?.lead?.lead_id}
            setIsRefresh={setIsRefresh}
          />
        </OffCanvasWrapper>

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
          <Col md={12}>
            <div className="mt-4 text-end">
              <button className="common_btn" type="submit">
                Save
              </button>
            </div>
          </Col>
        </Row> */}
      </div>
    </>
  );
};

export default LeadProfile;
