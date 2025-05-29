import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams, usePathname, useRouter } from "next/navigation";
// import Link from "next/link";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import {
  saveCompanyDetails,
  saveOrganizationSetup,
  saveTaxationDetails,
  selectOrganizationProfile,
  updateOrganization,
} from "@/@/redux/slices/organizationProfileSlice";
import { bankDetailsSchema } from "@/@/utils/validations";
import { AppDispatch, RootState } from "@/@/redux/store";
import { setOrganizations } from "@/@/redux/slices/organizationSlice";
import { cookiesOptions } from "@/@/utils/constant";
import { fetchOrganizationList } from "@/@/redux/slices/authSlice";
import CommonProgressButton from "../common-progress-button";
export const BankDetails = ({ onBack }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { taxationDetails, loading } = useSelector((state: RootState) =>
    selectOrganizationProfile(state)
  );
  const { id } = useParams();
  const pathname = usePathname();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bankDetailsSchema),
    defaultValues: {
      accountName: taxationDetails?.account_details?.accountName || "",
      accountNumber: taxationDetails?.account_details?.accountNumber || "",
      bankName: taxationDetails?.account_details?.bankName || "",
      ifscCode: taxationDetails?.account_details?.ifscCode || "",
      swiftCode: taxationDetails?.account_details?.swiftCode || "",
      micrCode: taxationDetails?.account_details?.micrCode || "",
      branch: taxationDetails?.account_details?.branch || "",
    },
  });
  const router = useRouter();

  // Submit handler
  const onSubmit = async (data: any) => {
    try {
      const formData = {
        accountName: data.accountName,
        accountNumber: data.accountNumber,
        bankName: data.bankName,
        ifscCode: data.ifscCode,
        swiftCode: data.swiftCode,
        micrCode: data.micrCode,
        branch: data.branch,
      };
      const apiData = {
        logo: taxationDetails?.logo || "",
        language_id: taxationDetails?.language_id || "",
        country_id: taxationDetails?.country_id || "",
        branch_name: taxationDetails?.branch_name || "",
        organization_name: taxationDetails?.organization_name || "",
        email: taxationDetails?.email || "",
        phone_number: taxationDetails?.phone_number || "",
        whatsapp: taxationDetails?.whatsapp || "",
        website: taxationDetails?.website || "",
        social_media: taxationDetails?.social_media || {},
        contact_persons: taxationDetails?.contact_persons || {},
        address_details: taxationDetails?.address_details || {},
        address_type: "Shipping",
        address_name:
          taxationDetails?.address_details.addresses[0]?.address_name || "",
        pincode: taxationDetails?.address_details.addresses[0]?.pincode || "",
        address_line_1:
          taxationDetails?.address_details.addresses[0]?.address_line || "",
        address_line_2:
          taxationDetails?.address_details.addresses[0]?.address_line || "",
        landmark: "",
        address_contact_person_name:
          taxationDetails?.contact_persons?.name || "",
        address_contact_person_number: taxationDetails?.phone_number || "",
        state_id: taxationDetails?.address_details.addresses[0]?.state || "",
        city_id: taxationDetails?.address_details.addresses[0]?.city || "",
        currency_code_id: taxationDetails?.currency_code_id || "",
        pan_number: taxationDetails?.pan_number || "",
        gst_id: taxationDetails?.gst_id || "",
        gst_registration_type: taxationDetails?.gst_registration_type || "",
        msme_number: taxationDetails?.msme_number || "",
        business_licenses: {
          corp_registration_number:
            taxationDetails?.business_licenses?.corp_registration_number || "",
          tan_number: taxationDetails?.business_licenses?.tan_number || "",
          cin_number: taxationDetails?.business_licenses?.cin_number || "",
        },
        account_details: formData || {},
        updated_by: taxationDetails?.updated_by || "",
      };
      const result = await dispatch(
        updateOrganization({
          id: taxationDetails?.organization_id,
          branch_id: taxationDetails?.branch_id,
          data: apiData,
        })
      ).unwrap();
      if (result) {
        Cookies.set("first_organisation", "true", {
          ...cookiesOptions,
          sameSite: "Strict",
        });
        dispatch(saveOrganizationSetup(null));
        dispatch(saveCompanyDetails(null));
        dispatch(saveTaxationDetails(null));
        dispatch(fetchOrganizationList());
        if (id || pathname.includes("organizationprofile-add-edit")) {
          router.push("/organization/listing");
        } else {
          dispatch(setOrganizations(result));
          router.push("/pricingplan");
        }
      }
    } catch (error) {
      // console.log("Error submitting form:", error);
      window?.console.log("Error submitting form:", error);
    }
  };

  const onSkip = async () => {
    router.push("/pricingplan");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1 className="organization_company_title"> Bank Details </h1>
          </div>
          <div>
            <Row>
              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="accountName"
                    placeholder="Account Name *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("accountName")}
                    onChange={(e: any) =>
                      setValue("accountName", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.accountName && (
                    <p className="error-text">
                      {String(errors.accountName.message)}
                    </p>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="accountNumber"
                    placeholder="Account Number *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("accountNumber")}
                    onChange={(e: any) =>
                      setValue("accountNumber", e.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                  {errors.accountNumber && (
                    <p className="error-text">
                      {String(errors.accountNumber.message)}
                    </p>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="bankName"
                    placeholder="Bank Name *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("bankName")}
                    onChange={(e: any) =>
                      setValue("bankName", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.bankName && (
                    <p className="error-text">
                      {String(errors.bankName.message)}
                    </p>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="ifscCode"
                    placeholder="IFSC Code *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("ifscCode")}
                    onChange={(e: any) =>
                      setValue("ifscCode", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.ifscCode && (
                    <p className="error-text">
                      {String(errors.ifscCode.message)}
                    </p>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="swiftCode"
                    placeholder="Swift Code *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("swiftCode")}
                    onChange={(e: any) =>
                      setValue("swiftCode", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.swiftCode && (
                    <p className="error-text">
                      {String(errors.swiftCode.message)}
                    </p>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="text_filed">
                  <TextBoxComponent
                    name="micrCode"
                    placeholder="MICR Code *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("micrCode")}
                    onChange={(e: any) =>
                      setValue("micrCode", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.micrCode && (
                    <p className="error-text">
                      {String(errors.micrCode.message)}
                    </p>
                  )}
                </div>
              </Col>
              <Col md={12}>
                <div className="text_filed text_filed_dropdown">
                  <TextBoxComponent
                    name="branch"
                    placeholder="Branch *"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    value={watch("branch")}
                    onChange={(e: any) =>
                      setValue("branch", e.value, { shouldValidate: true })
                    }
                  />
                  {errors.branch && (
                    <p className="error-text">
                      {String(errors.branch.message)}
                    </p>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <div className="TaxationDetails_tab_subdata">
            <p className="note_data_text"> Note: </p>
            <ul className="TaxationDetails_ui">
              <li className="TaxationDetails_li_data">
                {" "}
                You can update some of these preference from settings
                anytime.{" "}
              </li>
            </ul>
            {/* <ul className="TaxationDetails_ui">
              <li className="TaxationDetails_li_data">
                {" "}
                The language you select on this page will be the default
                language for the following features even if you{" "}
                <span> change the language later: </span>{" "}
              </li>
            </ul> */}
          </div>

          <div className="banking_form_btn_sec justify-content-end">
            {/* <div>
              <Link href="#" className="policy_text">
                {" "}
                Privacy Policy{" "}
              </Link>
            </div> */}
            <div className="company_btn_sec">
              <button
                type="button"
                className="common_secondary_btn"
                onClick={onSkip}
              >
                Skip
              </button>
              <button className="common_secondary_btn" onClick={onBack}>
                Back
              </button>
              <CommonProgressButton
                content="Save"
                loading={loading}
                disabled={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
