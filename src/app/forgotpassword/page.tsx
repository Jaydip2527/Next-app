"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import "../app.css";
import "../globals.css";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useRouter } from "next/navigation";

import { forgotPasswordSchema } from "@/@/utils/validations";
import { ForgotPasswordFormData } from "@/@/types/auth";
import { forgotPassword } from "@/@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import CommonProgressButton from "@/@/component/common-progress-button";
import logo from "../../../public/Images/logo.png";

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.auth);

  const { control, handleSubmit, setValue } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema) as any,
    mode: "onChange",
    defaultValues: { loginId: "" },
  });

  // ✅ Handle Form Submission
  const onSubmit = async (data: ForgotPasswordFormData) => {
    dispatch(forgotPassword(data))
      .unwrap()
      .then((res) => {
        if (res?.status === 201 || res?.status === 200) {
          router.push(`/reset-password/${res?.data?.data}`);
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
        console.log("Error:", error);
      });
  };

  return (
    <div className="forgot_page_bg">
      <div className="forgot_card_main_div">
        <div className="forgot_card_bg">
          <div className="forgot_box_size">
            <div className="login_logo_div logo_alignment_data">
              <Image
                className="login_logo_img img-fluid"
                src={logo}
                alt="side_img"
              />
            </div>
            <h5 className="forgot_title"> Forgot Password? </h5>
            <p className="forgot_subtitle">
              {" "}
              Enter your email address or phone number to get a password reset
              link{" "}
            </p>
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
                            placeholder="Email Address / Phone Number *"
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
                            <p className="error-text">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </Col>
              </Row>

              <CommonProgressButton
                content="Forgot Password"
                disabled={loading}
                loading={loading}
                className="common_btn w-100"
                style={{ pointerEvents: loading ? "none" : "auto" }}
              />
            </form>

            <div className="forgot_info_div">
              <p className="signup_account_info">
                Remember your password?{" "}
                <Link className="link_text" href="/signin">
                  Sign In{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
