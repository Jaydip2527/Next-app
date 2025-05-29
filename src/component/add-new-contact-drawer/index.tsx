import React from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactsValidationSchema } from "@/@/utils/validations";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { createContact } from "@/@/redux/slices/contactSlice";
import { ENUMS } from "@/@/utils/constant";
import CommonProgressButton from "../common-progress-button";

const AddNewContactDrawerForm = ({ handleClose, contactData }: any) => {
  const dispatch = useAppDispatch();
  const { company } = useAppSelector((state) => state.company);
  const methods = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(contactsValidationSchema),
  });

  const { loading } = useAppSelector((state) => state.contact);

  const { handleSubmit, control, setValue, reset } = methods;
  const onSubmitContacts = async (data: any) => {
    try {
      const bodyData = {
        first_name: data?.first_name,
        last_name: data?.last_name,
        dob: "",
        website: (contactData ? contactData?.website : company?.website) || "",
        position: data?.position,
        description: "",
        role: "",
        visibility: "public",
        source: "",
        image: "",
        currency: undefined,
        status: "Active",
        email: [
          {
            email: data?.email,
            is_primary_email: true,
            email_label: "personal",
          },
        ],
        phone_number: [
          {
            phone_number: data?.phone_number,
            is_primary_phone: true,
            phone_label: "mobile",
          },
        ],
        company_name:
          (contactData
            ? contactData?.company?.company_name
            : company?.company_name) || "",
        gst_number:
          (contactData
            ? contactData?.company?.gst_number
            : company?.gst_number) || "",
        address_type:
          (contactData
            ? contactData?.address?.address_type
            : company?.address?.address_type) || ENUMS.BILLING,
        address_line_1:
          (contactData
            ? contactData?.address?.address_line_1
            : company?.address?.address_line_1) || "",
        address_line_2:
          (contactData
            ? contactData?.address?.address_line_2
            : company?.address?.address_line_2) || "",
        landmark:
          (contactData
            ? contactData?.address?.landmark
            : company?.address?.landmark) || "",
        state_id:
          (contactData
            ? contactData?.address?.state?.state_id
            : company?.address?.state?.state_id) || "",
        city_id:
          (contactData
            ? contactData?.address?.city?.city_id
            : company?.address?.city?.city_id) || "",
        pincode:
          (contactData
            ? contactData?.address?.pincode
            : company?.address?.pincode) || "",
        country_id:
          (contactData
            ? contactData?.address?.country?.country_id
            : company?.address?.country?.country_id) || "",
        company_id:
          (contactData
            ? contactData?.company?.company_id
            : company?.company_id) || "",
        address_id:
          (contactData
            ? contactData?.address?.address_id
            : company?.address?.address_id) || "",
      };
      // console.log("bodyData", bodyData);
      const response = await dispatch(createContact(bodyData)).unwrap();
      console.log("response:", response);
      handleClose();
      reset();
      // if (response.data) {
      //   router.push(`/company`);
      // }
    } catch (error) {
      // eslint-disable-next-line no-console
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
                        setValue("last_name", e.value, {
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
                        setValue("email", e.value, {
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
                        setValue("position", e.value, {
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
            <div className="mt-4 text-end">
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
            </div>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};

export default React.memo(AddNewContactDrawerForm);
