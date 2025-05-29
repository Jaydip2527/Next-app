import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Link from "next/link";
import "../../app/app.css";
import "../../app/globals.css";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import type { FilteringEventArgs } from "@syncfusion/ej2-dropdowns";
import { Query } from "@syncfusion/ej2-data";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import { organizationValidationSchema } from "@/@/utils/validations";
import { AppDispatch, RootState } from "@/@/redux/store";
import {
  fetchCities,
  fetchStates,
  saveOrganizationSetup,
  selectOrganizationProfile,
} from "@/@/redux/slices/organizationProfileSlice";
import data from "../../app/dataSource.json";
import CommonProgressButton from "../common-progress-button";

export const OrganizationSetup = ({ onNext }: { onNext: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    // organizationTypes,
    // industries,
    states,
    countries,
    languages,
    organizationSetup,
    companyDetails,
    loading,
  } = useSelector((state: RootState) => selectOrganizationProfile(state));
  const pathname = usePathname();
  const router = useRouter();
  // define the JSON of data For Organization
  const temp = "Organization";
  const Organization = data[temp];

  // define the JSON of data For Industry
  const indus = "Industry";
  const Industry = data[indus];

  // define the JSON of data For Country
  const count = "Country";
  const country = data[count];

  // define the JSON of data For Language
  const lang = "Language";
  const language = data[lang];

  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(organizationValidationSchema as any),
    defaultValues: {
      organizationType: organizationSetup?.organization_type_id || "",
      industryType: organizationSetup?.industry_id || "",
      country: organizationSetup?.country_id || "",
      language: organizationSetup?.language_id || "",
    },
  });

  useEffect(() => {
    if (organizationSetup) {
      setValue(
        "organizationType",
        organizationSetup?.organization_type_id || ""
      );
      setValue("industryType", organizationSetup?.industry_id || "");
      setValue("country", organizationSetup?.country_id || "");
      setValue("language", organizationSetup?.language_id || "");
      if (organizationSetup?.country_id) {
        dispatch(fetchStates(organizationSetup?.country_id));
      }
    }
  }, [organizationSetup, setValue, languages]);

  useEffect(() => {
    if (
      companyDetails &&
      companyDetails?.address_details?.addresses[0]?.state
    ) {
      dispatch(
        fetchCities(companyDetails?.address_details?.addresses[0]?.state)
      );
    }
  }, [companyDetails, states]);

  // filtering event handler to filter a Country
  const onFiltering = (
    e: FilteringEventArgs,
    searchData: any,
    searchFor: any
  ) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== ""
        ? query.where(
            searchFor === "country"
              ? "country_name"
              : searchFor === "language"
                ? "language_name"
                : "Type",
            "startswith",
            e.text,
            true
          )
        : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(searchData, query as any);
  };

  // Submit handler
  const onSubmit = async (data: any) => {
    const userString = localStorage?.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;
    try {
      const { organizationType, industryType, country, language } = data;
      const formData = {
        tenant_id:
          userString?.user_id || "a60e8400-e29b-41d4-a716-446655440001",
        organization_type_id: organizationType,
        industry_id: industryType,
        language_id: language,
        country_id: country,
      };
      dispatch(saveOrganizationSetup(formData)); // Save form data in Redux
      onNext(); // Move to next step
    } catch (error) {
      // console.log("Error submitting form:", error);
      window?.console.log("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/organization/listing`);
  };

  return (
    <>
      <div>
        {!pathname.includes("organizationprofile-add-edit") && (
          <p className="Welcome_card_inside_title">
            Welcome{" "}
            {JSON.parse(localStorage.getItem("user") as string)?.first_name},
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="dropdown_common">
            <DropDownListComponent
              floatLabelType="Auto"
              id="organizationType"
              cssClass="e-outline"
              dataSource={Organization || []} //organizationTypes
              filtering={(e: FilteringEventArgs) =>
                onFiltering(e, Organization as any, "organizationType")
              }
              filterBarPlaceholder="Search a Organization Type"
              allowFiltering={true}
              fields={{ text: "Type", value: "Id" }}
              placeholder="Organization Type *"
              popupHeight="220px"
              className="dropdown_filed"
              {...register("organizationType", {
                required: "Organization Type is required",
              })}
            />
            {errors.organizationType && (
              <p className="error-text">
                {String(errors.organizationType.message)}
              </p>
            )}
          </div>

          <div className="dropdown_common">
            <DropDownListComponent
              floatLabelType="Auto"
              id="industryType"
              cssClass="e-outline"
              dataSource={Industry || []} //industries
              filtering={(e: FilteringEventArgs) =>
                onFiltering(e, Industry as any, "industryType")
              }
              filterBarPlaceholder="Search a Industry"
              allowFiltering={true}
              fields={{ text: "Type", value: "Id" }}
              placeholder="Industry *"
              popupHeight="220px"
              className="dropdown_filed"
              {...register("industryType", {
                required: "Industry is required",
              })}
            />
            {errors.industryType && (
              <p className="error-text">
                {String(errors.industryType.message)}
              </p>
            )}
          </div>

          <Row>
            <Col md={6}>
              <div className="dropdown_common">
                <DropDownListComponent
                  floatLabelType="Auto"
                  id="country"
                  cssClass="e-outline"
                  dataSource={countries.length > 0 ? countries : country || []}
                  filtering={(e: FilteringEventArgs) =>
                    onFiltering(
                      e,
                      countries.length > 0 ? countries : country || ([] as any),
                      countries.length > 0 ? "country" : ""
                    )
                  }
                  filterBarPlaceholder="Search a Country"
                  allowFiltering={true}
                  fields={
                    countries.length > 0
                      ? { text: "country_name", value: "country_id" }
                      : { text: "Type", value: "Id" }
                  }
                  placeholder="Country *"
                  popupHeight="220px"
                  className="dropdown_filed"
                  {...register("country", {
                    required: "Country is required",
                  })}
                  onChange={(e: any) => {
                    setValue("country", e.value);
                    if (errors.country) {
                      clearErrors("country");
                    }
                    dispatch(fetchStates(e.value));
                  }}
                />
                {errors.country && (
                  <p className="error-text">{String(errors.country.message)}</p>
                )}
              </div>
            </Col>
            <Col md={6}>
              {/* <div className="text_filed text_filed_dropdown"> */}
              <div className="dropdown_common">
                <DropDownListComponent
                  floatLabelType="Auto"
                  id="language"
                  cssClass="e-outline"
                  dataSource={languages.length > 0 ? languages : language || []}
                  filtering={(e: FilteringEventArgs) =>
                    onFiltering(
                      e,
                      languages.length > 0
                        ? languages
                        : language || ([] as any),
                      languages.length > 0 ? "language" : ""
                    )
                  }
                  filterBarPlaceholder="Search a Language"
                  allowFiltering={true}
                  fields={
                    languages.length > 0
                      ? { text: "language_name", value: "language_id" }
                      : { text: "Type", value: "Id" }
                  }
                  placeholder="Language *"
                  popupHeight="220px"
                  className="dropdown_filed"
                  {...register("language", {
                    required: "Language is required",
                  })}
                />
                {errors.language && (
                  <p className="error-text">
                    {String(errors.language.message)}
                  </p>
                )}
              </div>
            </Col>
          </Row>

          <div className="Welcome_form_btn_sec justify-content-end">
            {!pathname.includes("organizationprofile-add-edit") ? (
              <></>
            ) : (
              <button
                className="common_secondary_btn me-2"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
            <CommonProgressButton
              content="Let’s Get Started"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
};
