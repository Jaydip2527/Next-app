"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import "../app.css";
import "../globals.css";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginSchema } from "@/@/utils/validations";
import { loginUser } from "@/@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { LoginCredentials } from "@/@/types/auth";
import { setOrganizations } from "@/@/redux/slices/organizationSlice";
import CommonProgressButton from "@/@/component/common-progress-button";
import { cookiesOptions } from "@/@/utils/constant";
import Switch from "../../component/toggle-switch";
import logo from "../../../public/Images/logo.png";
import GoogleIcon from "../../../public/Images/google.png";
import IphoneIcon from "../../../public/Images/iphone.png";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useAppSelector((state) => state.auth);

  const { control, handleSubmit, setValue } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema) as any,
    mode: "onChange",
    defaultValues: {
      loginId: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    const savedloginId = localStorage.getItem("loginId");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe && savedloginId && savedPassword) {
      setValue("loginId", savedloginId);
      setValue("password", savedPassword);
      setValue("rememberMe", savedRememberMe);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginCredentials) => {
    dispatch(
      loginUser({
        loginId: data.loginId,
        password: data.password,
      })
    )
      .unwrap()
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          const {
            access_token,
            refresh_token,
            x_cur_add,
            organizationData,
            email,
            first_name,
            last_name,
            user_id,
            contact_no_verified,
            contact_no,
          } = response.data.data;
          // ✅ Store login details only if "Remember Me" is checked
          if (data.rememberMe) {
            localStorage.setItem("token", access_token);
            Cookies.set("token", access_token, {
              ...cookiesOptions,
              sameSite: "Strict",
            });
            localStorage.setItem("refreshToken", refresh_token);
            Cookies.set("refreshToken", refresh_token, {
              ...cookiesOptions,
              sameSite: "Strict",
            });
            Cookies.set("contact_no_verified", contact_no_verified, {
              ...cookiesOptions,
              sameSite: "Strict",
            });
            // localStorage.setItem("curAddress", x_cur_add);
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem(
              "user",
              JSON.stringify({
                email,
                first_name,
                last_name,
                user_id,
                contact_no,
              })
            );
            Cookies.set(
              "user",
              JSON.stringify({
                email,
                first_name,
                last_name,
                user_id,
                contact_no,
              }),
              { ...cookiesOptions, sameSite: "Strict" }
            );
            Cookies.set("organizations", organizationData?.data?.length, {
              ...cookiesOptions,
              sameSite: "Strict",
            });
          } else {
            sessionStorage.setItem("token", access_token);
            Cookies.set("token", access_token, {
              ...cookiesOptions,
              sameSite: "Strict",
            });
            sessionStorage.setItem("refreshToken", refresh_token);
            Cookies.set("refreshToken", refresh_token, {
              ...cookiesOptions,
              sameSite: "Strict",
            });
            Cookies.set("contact_no_verified", contact_no_verified, {
              ...cookiesOptions,
              sameSite: "Strict",
            });
            // sessionStorage.setItem("curAddress", x_cur_add);
            localStorage.setItem(
              "user",
              JSON.stringify({
                email,
                first_name,
                last_name,
                user_id,
                contact_no,
              })
            );
            Cookies.set(
              "user",
              JSON.stringify({ email, first_name, last_name, user_id }),
              { ...cookiesOptions, sameSite: "Strict" }
            );
            Cookies.set("organizations", organizationData?.data?.length, {
              ...cookiesOptions,
              sameSite: "Strict",
            });
          }

          // ✅ Redirect based on organizationData
          if (organizationData?.data?.length === 0) {
            router.push("/organizationprofile");
          } else {
            if (
              organizationData?.data?.length === 1 &&
              organizationData?.data?.length !== 0
            ) {
              dispatch(setOrganizations(organizationData?.data[0]));
              router.push("/dashboard");
              if (data.rememberMe) {
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
            } else {
              router.push("/select-organization-profile");
            }
          }
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
        console.log("Error:", error);
      });
  };

  return (
    <>
      <div className="login_main_div">
        <div className="login_partition_data">
          <div className="auth_left_data"></div>
          <div className="auth_right_data d-flex justify-content-center align-items-center">
            <div>
              <div className="data_size">
                <div className="signin_title_main_div">
                  <p className="signin_title_text"> Welcome To </p>
                  <div className="logo_img_div">
                    <Image
                      className="login_logo_img img-fluid"
                      src={logo}
                      alt="Logo"
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col lg={12}>
                      <div className="text_filed text_filed_dropdown">
                        <Controller
                          name="loginId"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <TextBoxComponent
                                placeholder="Email / Phone Number *"
                                cssClass="e-outline"
                                floatLabelType="Auto"
                                value={field.value}
                                onChange={(e: any) =>
                                  setValue("loginId", e.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                              {error && (
                                <p className="error-text">{error?.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="text_filed text_filed_dropdown position-relative">
                        <Controller
                          name="password"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <TextBoxComponent
                                type={showPassword ? "text" : "password"}
                                placeholder="Password *"
                                cssClass="e-outline"
                                floatLabelType="Auto"
                                value={field.value}
                                onChange={(e: any) =>
                                  setValue("password", e.value, {
                                    shouldValidate: true,
                                  })
                                }
                              />
                              <Icon
                                icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                                className="password-toggle-icon toggle_password_margin"
                                onClick={() => setShowPassword(!showPassword)}
                              />
                              {error && (
                                <p className="error-text">{error?.message}</p>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </Col>
                  </Row>

                  {/* ✅ Remember Me & Forgot Password */}
                  <div className="description_signin_main">
                    <div className="signin_switch_sec">
                      <Controller
                        name="rememberMe"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field?.value ?? false}
                            onChange={(checked) => field.onChange(checked)}
                          />
                        )}
                      />
                      <p className="description_login_page"> Remember Me </p>
                    </div>
                    <Link
                      href="/forgotpassword"
                      className="signin_redirection_link"
                    >
                      {" "}
                      Forgot Password?{" "}
                    </Link>
                  </div>
                  <div className="signup_btn_div">
                    <CommonProgressButton content="Sign In" loading={loading} />
                  </div>
                </form>

                <p className="signup_option_title"> OR </p>

                <div className="signup_option">
                  <div className="signup_option_data">
                    <Link href="#">
                      <Image
                        className="option_img img-fluid"
                        src={GoogleIcon}
                        alt="GoogleIcon"
                      />
                    </Link>
                  </div>
                  <div className="signup_option_data">
                    <Link href="#">
                      <Image
                        className="option_img img-fluid"
                        src={IphoneIcon}
                        alt="IphoneIcon"
                      />
                    </Link>
                  </div>
                </div>

                <p className="signup_account_info">
                  New on our platform?{" "}
                  <Link className="link_text" href="/">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
