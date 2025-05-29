"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import {
  fetchOrganizationList,
  selectOrganization,
} from "@/@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { setOrganizations } from "@/@/redux/slices/organizationSlice";
import { cookiesOptions } from "@/@/utils/constant";
import style from "./organization.module.scss";
import BrightHorizonOrgIcon from "../../../public/Images/organization-icon/bright-horizon-org-icon.png";
import UserImg from "../../../public/Images/user-icon.png";

const OrganizationBar = () => {
  const dispatch = useAppDispatch();
  const { organizationList } = useAppSelector((state) => state.auth);
  const { organization } = useAppSelector((state) => state.organization);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    dispatch(fetchOrganizationList());
  }, []);

  const handleOrganizationClick = (item: any) => {
    const currentYear = new Date().getFullYear();

    const payload = {
      year: currentYear.toString(),
      organization_id: item?.organization_id,
      branch_id: item?.branch_id,
      role_id: item?.role_id,
      organization_public_id: item?.organization_public_id,
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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <div className={`${style.organization_box_div}`}>
        <div className={`${style.add_organization_div}`}>
          <Icon icon="ic:baseline-plus" width="16" height="16" />
        </div>
        <div className={`${style.top_box} organization_scroll_bar`}>
          {organizationList?.data?.map(
            (item: any, index: React.Key | null | undefined) => (
              <Link
                key={index}
                onClick={() => handleOrganizationClick(item)}
                href="#"
                className={`${style.organization_icon} ${organization?.organization_id === item?.organization_id ? "organization_icon_active" : ""}`}
              >
                <Image
                  className="img-fluid"
                  src={
                    BrightHorizonOrgIcon || item?.logo || BrightHorizonOrgIcon
                  }
                  alt="Icon"
                  width={30}
                  height={30}
                  title={item?.organization_name}
                />
              </Link>
            )
          )}
        </div>
        <div className={`${style.bottom_box}`}>
          <Link href="#" className={`${style.action_box}`}>
            <Icon icon="carbon:notification" width="16" height="16" />
          </Link>
          <Link
            href="#"
            onClick={toggleTheme}
            className={`${style.action_box}`}
          >
            {theme === "dark" ? (
              <Icon icon="material-symbols:dark-mode" width="16" height="16" />
            ) : (
              <Icon
                icon="material-symbols-light:light-mode"
                width="16"
                height="16"
              />
            )}
          </Link>
          <Link href="#" className={`${style.action_box}`}>
            <Image className="img-fluid" src={UserImg} alt="Icon" />
          </Link>
          <Link href="#" className={`${style.action_box}`}>
            <Icon icon="ant-design:setting-outlined" width="16" height="16" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrganizationBar;
