"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  DropDownListComponent,
  // MultiSelectComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import AddUserTable from "@/@/component/add-user-table";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { userValidationSchema } from "@/@/utils/validations";
import { createUser } from "@/@/redux/slices/userSlice";
import CommonProgressButton from "@/@/component/common-progress-button";
import { fetchBranchesbyOrgId } from "@/@/redux/slices/organizationBranchSlice";

const InviteUserPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { organizationList } = useAppSelector((state) => state.auth);
  // const { user } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.user);
  const { orgBranchesList } = useAppSelector(
    (state) => state.organizationBranch
  );
  // const searchParams = useSearchParams();
  // const user_id = searchParams.get("id");
  // console.log("user ::::", user);
  const methods = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(userValidationSchema),
    defaultValues: {
      organization_id: "",
      branch_id: "",
      employees: [],
    },
  });
  const { handleSubmit, setValue, control, reset, watch } = methods;

  const handleGetBranches = (organizationId: string) => {
    dispatch(fetchBranchesbyOrgId(organizationId));
  };

  const onSubmit = async (data: any) => {
    const { organization_id, branch_id, employees } = data;
    // Add organization_id and branch_id to each user
    const userFormData = employees.map((userItem: any) => ({
      ...userItem,
      organization_id,
      branch_id,
      contact_number: parseInt(userItem.contact_number, 10),
    }));

    // eslint-disable-next-line no-console
    console.log("Form Submitted userFormData: ", userFormData);

    try {
      // if (user_id) {
      //   await dispatch(
      //     updateUser({
      //       id: user_id,
      //       data: userFormData,
      //     })
      //   );
      // } else {
      const response = await dispatch(
        createUser({ employees: userFormData })
      ).unwrap();
      if (response?.user_invitation_inserted.length > 0) {
        reset();
        router.push(`/organization/user`);
      }
      // }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("onSubmit Error:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/organization/user`);
  };

  return (
    <>
      <div className="common_header_main_div">
        <h4 className="common_header_data_text"> Invite User </h4>
        <div className="breadcrumb_main_div">
          <label className="breadcrumb_link_text">Dashboard</label>
          <label className="dots_icon"></label>
          <label className="breadcrumb_page_text">Invite User</label>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <div className="common_card_main_div">
                {/* <h6 className="common_card_title">User info.</h6> */}
                <Row>
                  <Col>
                    <Row>
                      <Col md={6}>
                        <div className="dropdown_common">
                          <Controller
                            name="organization_id"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <DropDownListComponent
                                  dataSource={organizationList?.data || []}
                                  fields={{
                                    text: "organization_name",
                                    value: "organization_id",
                                  }}
                                  placeholder="Organization *"
                                  popupHeight="220px"
                                  className="dropdown_filed"
                                  cssClass="e-outline"
                                  value={field.value}
                                  onChange={(e: any) => {
                                    setValue("organization_id", e.value, {
                                      shouldValidate: true,
                                    });
                                    handleGetBranches(e.value);
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
                        <div className="dropdown_common">
                          <Controller
                            name="branch_id"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <DropDownListComponent
                                  dataSource={orgBranchesList || []}
                                  fields={{
                                    text: "branch_name",
                                    value: "branch_id",
                                  }}
                                  placeholder="Branch *"
                                  popupHeight="220px"
                                  className="dropdown_filed"
                                  cssClass="e-outline"
                                  value={field.value}
                                  onChange={(e: any) => {
                                    setValue("branch_id", e.value, {
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
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <AddUserTable organizationId={watch("organization_id")} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          {/* Add product or service*/}
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

export default InviteUserPage;
