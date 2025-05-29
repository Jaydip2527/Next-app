/* eslint-disable import/named */
"use client";
import React, { useEffect, useState } from "react";
import "../../app/app.css";
import { Icon } from "@iconify/react";
import {
  ChangeEventArgs,
  DropDownListComponent,
} from "@syncfusion/ej2-react-dropdowns";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { fetchOrganizationBranchByOrgId } from "@/@/redux/slices/organizationBranchSlice";
import { selectOrganization } from "@/@/redux/slices/authSlice";
import { setOrganizations } from "@/@/redux/slices/organizationSlice";
import { cookiesOptions } from "@/@/utils/constant";

const Header = () => {
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  const fields = { text: "branch_name", value: "branch_id" };
  const { branchesList } = useAppSelector((state) => state.organizationBranch);
  const { organization } = useAppSelector((state) => state.organization);

  const mappedBranches = branchesList.map(({ branch_id, branch_name }) => ({
    branch_id,
    branch_name,
  }));

  useEffect(() => {
    if (!organization?.organization_id) {
      return;
    }
    dispatch(fetchOrganizationBranchByOrgId(organization?.organization_id));
  }, [organization?.organization_id]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onChange = (args: ChangeEventArgs) => {
    const selectedBranchId = args.value;

    handleOrganizationClick(selectedBranchId);
  };

  const handleOrganizationClick = (selectedBranchId: any) => {
    const currentYear = new Date().getFullYear();

    const payload = {
      year: currentYear.toString(),
      organization_id: organization?.organization_id,
      branch_id: selectedBranchId,
      role_id: organization?.role_id,
      organization_public_id: organization?.organization_public_id,
    };

    dispatch(selectOrganization(payload)).then((res) => {
      if (res?.payload?.data) {
        dispatch(setOrganizations(res?.payload?.data));
        const x_cur_add = res?.payload?.data?.token;
        if (localStorage.getItem("rememberMe") === "true") {
          localStorage.setItem("curAddress", x_cur_add);
          Cookies.set("curAddress", x_cur_add, {
            ...cookiesOptions,
            sameSite: "Strict",
          });
        } else {
          sessionStorage.setItem("curAddress", x_cur_add);
          Cookies.set("curAddress", x_cur_add, {
            ...cookiesOptions,
            sameSite: "Strict",
          });
        }
      }
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="navbar_main_div">
        <div className="left_side_div">
          <p className="org_name">{organization?.organization_name}</p>
          <div className="header_dropdown_div">
            <DropDownListComponent
              // floatLabelType="Auto"
              id="branch_id"
              dataSource={mappedBranches}
              cssClass="e-outline"
              filterBarPlaceholder="Search a Branch"
              allowFiltering={true}
              fields={fields}
              placeholder="Select a Branch"
              popupHeight="220px"
              onChange={onChange}
              value={organization?.branch_id && organization?.branch_id}
            />
          </div>
        </div>
        <div className="right_side_div">
          <div className="icon_box">
            <Icon icon="fe:search" width="16" height="16" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
