"use client";

import React, { useEffect, useState } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import {
  createOrganizationBranch,
  fetchOrganizationBranchById,
  fetchOrganizationBranchByOrgId,
  updateOrganizationBranch,
} from "@/@/redux/slices/organizationBranchSlice";
import { organizationBranchSchema } from "@/@/utils/validations";
import {
  fetchCountries,
  fetchCurrencies,
  fetchLanguages,
} from "@/@/redux/slices/masterDataSlice";
import {
  fetchCities,
  fetchStates, // fetchCities,
  // fetchStates,
} from "@/@/redux/slices/organizationProfileSlice";
import CommonProgressButton from "../../common-progress-button";

// const gstTypes = [
//   { value: "a1b2c3d4e5f6g7h", label: "Regular" },
//   { value: "x9y8z7w6v5u4t3s", label: "Composition" },
// ]; // Example GST types

// type FormValues = {
//   branch_name: string;
//   email: string;
//   phone_number: string;
//   whatsapp?: string;
//   website: any;
//   pan_number?: any;
//   msme_number?: any;
//   gst_registration_type?: string;
//   gst_id: any;
//   language_id: string;
//   currency_code_id: string;
//   address_details: {
//     addresses: {
//       address_line_1: string;
//       landmark: string;
//       city: string;
//       state: string;
//       pincode: string;
//       country: string;
//     }[];
//   };
// };

const defaultValues = {
  branch_name: "",
  email: "",
  phone_number: "",
  whatsapp: "",
  website: "",
  pan_number: "",
  msme_number: "",
  gst_registration_type: "",
  gst_id: "",
  // country_id: "",
  language_id: "",
  currency_code_id: "",
  address_details: {
    addresses: [
      {
        address_line_1: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      },
    ],
  },
};

export default function AddEditBranchForm({
  handleClose,
  setIsRefresh,
  branchId,
}: {
  handleClose: () => void;
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  branchId: string | number | null;
}) {
  const dispatch = useAppDispatch();
  const { organization } = useAppSelector((state) => state.organization);
  const { branch, loading } = useAppSelector(
    (state) => state.organizationBranch
  );
  const { languages, currencies } = useAppSelector((state) => state.masterData);

  const initialValues = branchId
    ? {
        branch_name: branch?.branch_name ?? "",
        email: branch?.email ?? "",
        phone_number: branch?.phone_number ?? "",
        whatsapp: branch?.whatsapp ?? "",
        website: branch?.website ?? "",
        pan_number: branch?.pan_number ?? "",
        msme_number: branch?.msme_number ?? "",
        gst_registration_type: branch?.gst_registration_type ?? "",
        gst_id: branch?.gst_id ?? "",
        language_id: branch?.language_id ?? "",
        currency_code_id: branch?.currency_code_id ?? "",
        address_details: branch?.address_details ?? { addresses: [] },
      }
    : defaultValues;

  const methods = useForm<any>({
    resolver: yupResolver(organizationBranchSchema),
    mode: "onChange",
    defaultValues: initialValues,
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    // formState: ,
  } = methods;

  // Inside the component
  const { fields, append, remove } = useFieldArray({
    control,
    name: "address_details.addresses",
  });

  console.log("fields :>> ", fields);

  console.log("branch :>> ", branch);

  useEffect(() => {
    if (branchId) {
      reset(initialValues);
    } else {
      reset(defaultValues);
    }
  }, [reset, branch, branchId]);

  useEffect(() => {
    Promise.all([
      dispatch(fetchCountries()),
      dispatch(fetchLanguages()),
      dispatch(fetchCurrencies()),
    ]);
  }, []);

  useEffect(() => {
    if (branchId) {
      dispatch(fetchOrganizationBranchById(branchId))
        .unwrap()
        .then(() => {});
    }
  }, [branchId]);

  const fetchBranches = () => {
    dispatch(
      fetchOrganizationBranchByOrgId(organization?.organization_id)
    ).unwrap();
  };

  const onSubmit = (data: any) => {
    setIsRefresh(false);
    const organization_id = organization?.organization_id;

    if (branchId) {
      // Pass branchId as id
      dispatch(updateOrganizationBranch({ id: branchId, data })) // Change here
        .unwrap()
        .then(() => {
          fetchBranches();
          setIsRefresh(true);
          handleClose();
        });
    } else {
      dispatch(createOrganizationBranch({ organization_id, data }))
        .unwrap()
        .then(() => {
          fetchBranches();
          setIsRefresh(true);
          handleClose();
        });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg={6}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name="branch_name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextBoxComponent
                      placeholder="Branch Name *"
                      cssClass="e-outline"
                      floatLabelType="Auto"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("branch_name", e.value, {
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

          <Col lg={6}>
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

          <Col lg={6}>
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

          <Col lg={6}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name="whatsapp"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextBoxComponent
                      placeholder="WhatsApp Number"
                      cssClass="e-outline"
                      floatLabelType="Auto"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("whatsapp", e.value, {
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

          <Col lg={6}>
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
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name="language_id"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DropDownListComponent
                      floatLabelType="Auto"
                      dataSource={languages}
                      fields={{ text: "language_name", value: "language_id" }}
                      placeholder="Select Language *"
                      cssClass="e-outline"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("language_id", e.value, {
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

          <Col lg={6}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name="pan_number"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextBoxComponent
                      placeholder="PAN Number"
                      cssClass="e-outline"
                      floatLabelType="Auto"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("pan_number", e.value, {
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

          <Col lg={6}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name="msme_number"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextBoxComponent
                      placeholder="MSME Number"
                      cssClass="e-outline"
                      floatLabelType="Auto"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("msme_number", e.value, {
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

          {/* <Col lg={6}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name="country_id"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DropDownListComponent
                      floatLabelType="Auto"
                      dataSource={countries}
                      fields={{ text: "country_name", value: "country_id" }}
                      placeholder="Select Country *"
                      cssClass="e-outline"
                      value={field.value}
                      onChange={(e: any) => {
                        setValue("country_id", e.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {error && <p className="error-text">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </Col> */}

          <Col lg={6}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name="currency_code_id"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DropDownListComponent
                      floatLabelType="Auto"
                      dataSource={currencies}
                      fields={{ text: "currency_code", value: "currency_id" }}
                      placeholder="Select Currency *"
                      cssClass="e-outline"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("currency_code_id", e.value, {
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

          <Col lg={6}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name="gst_id"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextBoxComponent
                      name="gstEmail"
                      placeholder="GST ID"
                      cssClass="e-outline"
                      floatLabelType="Auto"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("gst_id", e.value, {
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
          <Col lg={6}>
            <div className="text_filed text_filed_dropdown">
              <Controller
                name="gst_registration_type"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextBoxComponent
                      placeholder="GST Registration Type"
                      cssClass="e-outline"
                      floatLabelType="Auto"
                      value={field.value}
                      onChange={(e: any) =>
                        setValue("gst_registration_type", e.value, {
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
        </Row>

        {/* Address Details */}
        <Row>
          <Col
            lg={12}
            className="d-flex align-items-center justify-content-between mb-3"
          >
            <h4 className="common_card_title">Legal Address</h4>
            <button
              className="product_or_service_action_icon ms-2"
              type="button"
              onClick={() =>
                append({
                  address_line_1: "",
                  landmark: "",
                  city: "",
                  state: "",
                  pincode: "",
                  country: "",
                })
              }
            >
              <Icon icon="ic:sharp-add" width="16" height="16" />
            </button>
          </Col>
          {fields.map((field: any, index: any) => (
            <div key={field.id}>
              <AddressComponent
                field={field}
                index={index}
                branchId={branchId}
              />
              {/* Add Remove Button */}
              <button
                className="product_or_service_delete_icon mb-3"
                type="button"
                onClick={() => remove(index)}
              >
                <Icon icon="ic:sharp-minus" width="16" height="16" />
              </button>
            </div>
          ))}
        </Row>

        <Row>
          <Col md={12}>
            <div className="mt-4 text-end">
              <button
                className="common_secondary_btn me-2"
                type="button"
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <CommonProgressButton
                content={branchId ? "Save" : "Submit"}
                loading={loading}
              />
            </div>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
}

const AddressComponent = ({ field, index, branchId }: any) => {
  const { control, setValue } = useFormContext();
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.masterData);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (field && branchId) {
      handleGetState(field?.country);
      handleGetCity(field?.state);
    }
  }, [field, branchId]);

  const handleGetState = (country_id: any) => {
    if (!country_id) {
      return;
    }
    dispatch(fetchStates(country_id))
      .then((response: any) => {
        if (response?.payload) {
          setStates(response.payload);
        }
      })
      .catch((error: any) => {
        // console.error("Error fetching states:", error);
        console.log("Error fetching states:", error);
      });
  };

  const handleGetCity = (state_id: any) => {
    if (!state_id) {
      return;
    }
    dispatch(fetchCities(state_id))
      .then((response: any) => {
        if (response?.payload) {
          setCities(response.payload);
        }
      })
      .catch((error: any) => {
        // console.error("Error fetching cities:", error);
        console.log("Error fetching cities:", error);
      });
  };

  return (
    <>
      <Row>
        <Col lg={6}>
          <div className="text_filed text_filed_dropdown">
            <Controller
              name={`address_details.addresses.${index}.address_line_1`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextBoxComponent
                    placeholder="Address Line 1 *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={field.value}
                    onChange={(e: any) =>
                      setValue(
                        `address_details.addresses.${index}.address_line_1`,
                        e.value,
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  />
                  {error && <p className="error-text">{error.message}</p>}
                </>
              )}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="text_filed text_filed_dropdown">
            <Controller
              name={`address_details.addresses.${index}.landmark`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextBoxComponent
                    placeholder="Area / Sector/ Locality *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={field.value}
                    onChange={(e: any) =>
                      setValue(
                        `address_details.addresses.${index}.landmark`,
                        e.value,
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  />
                  {error && <p className="error-text">{error.message}</p>}
                </>
              )}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="text_filed text_filed_dropdown">
            <Controller
              name={`address_details.addresses.${index}.country`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <DropDownListComponent
                    floatLabelType="Auto"
                    dataSource={countries}
                    fields={{ text: "country_name", value: "country_id" }}
                    placeholder="Select Country *"
                    cssClass="e-outline"
                    value={field.value}
                    onChange={(e: any) => {
                      setValue(
                        `address_details.addresses.${index}.country`,
                        e.value,
                        { shouldValidate: true }
                      );
                      handleGetState(e.value); // Fetch states when country changes
                    }}
                  />
                  {error && <p className="error-text">{error.message}</p>}
                </>
              )}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="text_filed text_filed_dropdown">
            <Controller
              name={`address_details.addresses.${index}.state`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <DropDownListComponent
                    floatLabelType="Auto"
                    dataSource={states}
                    fields={{ text: "state_name", value: "state_id" }}
                    placeholder="Select State *"
                    cssClass="e-outline"
                    value={field.value}
                    onChange={(e: any) => {
                      setValue(
                        `address_details.addresses.${index}.state`,
                        e.value,
                        { shouldValidate: true }
                      );
                      handleGetCity(e.value); // Fetch cities when state changes
                    }}
                  />
                  {error && <p className="error-text">{error.message}</p>}
                </>
              )}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="text_filed text_filed_dropdown">
            <Controller
              name={`address_details.addresses.${index}.city`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <DropDownListComponent
                    floatLabelType="Auto"
                    dataSource={cities}
                    fields={{ text: "city_name", value: "city_id" }}
                    placeholder="Select City *"
                    cssClass="e-outline"
                    value={field.value}
                    onChange={(e: any) => {
                      setValue(
                        `address_details.addresses.${index}.city`,
                        e.value,
                        { shouldValidate: true }
                      );
                    }}
                  />
                  {error && <p className="error-text">{error.message}</p>}
                </>
              )}
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className="text_filed text_filed_dropdown">
            <Controller
              name={`address_details.addresses.${index}.pincode`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextBoxComponent
                    placeholder="Pincode *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={field.value}
                    onChange={(e: any) =>
                      setValue(
                        `address_details.addresses.${index}.pincode`,
                        e.value,
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  />
                  {error && <p className="error-text">{error.message}</p>}
                </>
              )}
            />
          </div>
        </Col>
      </Row>
      {/* Add Remove Button */}
    </>
  );
};
