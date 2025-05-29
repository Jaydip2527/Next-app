"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import {
  fetchOrganizationList,
  selectOrganization,
} from "@/@/redux/slices/authSlice";
import { setOrganizations } from "@/@/redux/slices/organizationSlice";
import { cookiesOptions } from "@/@/utils/constant";
import BrightHorizon2Img from "../../../public/Images/bright-horizon2-img.png";

function SelectOrganization() {
  const dispatch = useAppDispatch();
  const { organizationList } = useAppSelector((state) => state.auth);
  const router = useRouter();

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
        router.push("/dashboard");
      }
    });
  };

  return (
    <>
      <div className="login_main_div">
        <div className="login_partition_data">
          <div className="auth_left_data"></div>
          <div className="auth_right_data">
            <div>
              <p className="select_organization_title">
                {" "}
                Select your organization{" "}
              </p>
              <p className="select_organization_info">
                {" "}
                Choose your organization to unlock personalized services and
                insights.{" "}
              </p>
            </div>
            <div className="select_organization_sec_main">
              {organizationList &&
                organizationList.data?.map(
                  (item: any, index: React.Key | null | undefined) => (
                    <div
                      className="bright_horizon-sec"
                      key={index}
                      onClick={() => handleOrganizationClick(item)}
                    >
                      <div>
                        <Image
                          className="img-fluid"
                          src={
                            BrightHorizon2Img || item?.logo || BrightHorizon2Img
                          }
                          alt="BrightHorizonImg"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <p className="bright_horizon_title">
                          {" "}
                          {item?.organization_name}{" "}
                        </p>
                        <p className="bright_horizon_subtitle">
                          Professional / Service Provide{" "}
                        </p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectOrganization;
