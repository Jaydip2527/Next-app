import React from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { contactsValidationSchema } from "@/@/utils/validations";
import { ENUMS } from "@/@/utils/constant";
import { createContact } from "@/@/redux/slices/contactSlice";
import CommonProgressButton from "../common-progress-button";

const defaultData = {
  first_name: null,
  last_name: null,
  dob: null,
  website: null,
  position: null,
  description: null,
  role: null,
  visibility: "public",
  source: null,
  image: null,
  currency: null,
  // status: "Active",
  company_name: null,
  gst_number: null,
  industry: null,
  address_type: ENUMS.BILLING,
  address_line_1: null,
  address_line_2: null,
  landmark: null,
  state_id: null,
  city_id: null,
  pincode: null,
  country_id: null,
  company_id: null,
  address_id: null,
  lead_id: null,
};

const AddNewLeadContactDrawerForm = ({
  handleClose,
  contactData,
  leadId,
  setIsRefresh,
}: any) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.contact);

  const mergedData = {
    ...defaultData,
    website: contactData.website || null,
    company_name: contactData.company?.company_name || null,
    gst_number: contactData.company?.gst_number || null,
    industry: contactData.company?.industry || null,
    address_type: contactData.address?.address_type || null,
    address_line_1: contactData.address?.address_line_1 || null,
    address_line_2: contactData.address?.address_line_2 || null,
    landmark: contactData.address?.landmark || null,
    state_id: contactData.address?.state?.state_id || null,
    city_id: contactData.address?.city?.city_id || null,
    pincode: contactData.address?.pincode || null,
    country_id: contactData.address?.country?.country_id || null,
    company_id: contactData.company?.company_id || null,
    address_id: contactData.address?.address_id || null,
    lead_id: leadId || null,
  };

  const methods = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: mergedData,
  });

  const { handleSubmit, control, setValue, reset } = methods;

  const onSubmitContacts = async (data: any) => {
    const payload = {
      ...data,
      email: [
        {
          email: data?.email,
          is_primary_email: true,
          email_label: "work",
        },
      ],
      phone_number: [
        {
          phone_number: data?.phone_number,
          is_primary_phone: true,
          phone_label: "work",
        },
      ],
    };

    try {
      await dispatch(createContact(payload)).unwrap();
      setIsRefresh(true);
      handleClose();
      reset();
    } catch (error) {
      // console.error("onSubmit Error:", error);
      console.log("onSubmit Error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitContacts)}>
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
                    {error && <p className="error-text">{error.message}</p>}
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
                        setValue("last_name", e.value, { shouldValidate: true })
                      }
                    />
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>

          <Col md={12}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name="phone_number"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextBoxComponent
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
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>
          <Col md={12}>
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
                        setValue("email", e.value, { shouldValidate: true })
                      }
                    />
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>
          <Col md={12}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name="position"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextBoxComponent
                      placeholder="Position *"
                      cssClass="e-outline"
                      floatLabelType="Auto"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("position", e.value, { shouldValidate: true })
                      }
                    />
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>
          <Col md={12} className="d-flex justify-content-end">
            <button
              className="common_secondary_btn me-2"
              type="button"
              onClick={() => {
                handleClose();
                reset();
              }}
            >
              Cancel
            </button>
            <CommonProgressButton content={"Submit"} loading={loading} />
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};

export default React.memo(AddNewLeadContactDrawerForm);
