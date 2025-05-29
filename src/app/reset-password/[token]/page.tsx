"use client";

import * as React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Icon } from "@iconify/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useParams, useRouter } from "next/navigation";

import { resetPasswordSchema } from "@/@/utils/validations";
import { ResetPasswordFormData } from "@/@/types/auth";
import { resetPassword } from "@/@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import CommonProgressButton from "@/@/component/common-progress-button";
import logo from "../../../../public/Images/logo.png";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.auth);

  const { control, handleSubmit, setValue } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema) as any,
    mode: "onChange",
    defaultValues: { password: "", confirm_password: "" },
  });

  // ✅ Handle Form Submission
  const onSubmit = async (data: any) => {
    dispatch(resetPassword({ ...data, token }))
      .unwrap()
      .then((res) => {
        if (res?.status === 201 || res?.status === 200) {
          router.push(`/signin`);
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
              <Image className="login_logo_img" src={logo} alt="side_img" />
            </div>
            <h5 className="forgot_title"> Reset Password </h5>
            <p className="forgot_subtitle"> Enter your new password below </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg={12}>
                  <div className="text_filed text_filed_dropdown position-relative">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <TextBoxComponent
                            placeholder="New Password *"
                            type={showPassword ? "text" : "password"}
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
                            <p className="error-text">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="text_filed text_filed_dropdown position-relative">
                    <Controller
                      name="confirm_password"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <TextBoxComponent
                            placeholder="Confirm Password *"
                            type={showConfirmPassword ? "text" : "password"}
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            value={field.value}
                            onChange={(e: any) =>
                              setValue("confirm_password", e.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                          <Icon
                            icon={
                              showConfirmPassword ? "mdi:eye-off" : "mdi:eye"
                            }
                            className="password-toggle-icon toggle_password_margin"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
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
                content="Reset Password"
                disabled={loading}
                loading={loading}
                className="common_btn w-100"
                style={{ pointerEvents: loading ? "none" : "auto" }}
              />
            </form>

            <div className="forgot_info_div">
              <p className="signup_account_info">
                Back to{" "}
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
