"use client";

import * as React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Icon } from "@iconify/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "../app/app.css";
import "../app/globals.css";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";

import { signupSchema, SignupFormData } from "../utils/validations";
import Switch from "../component/toggle-switch";
import logo from "../../public/Images/logo.png";
import GoogleIcon from "../../public/Images/google.png";
import IphoneIcon from "../../public/Images/iphone.png";
import { AppDispatch } from "../redux/store";
import { signupUser } from "../redux/slices/authSlice";
import CommonProgressButton from "../component/common-progress-button";
import { useAppSelector } from "../redux/redux-hooks";

export default function Signup() {
  const {
    control,
    // register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema) as any,
    mode: "onChange",
  });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  if (process.env.NEXT_PUBLIC_HIDE_ERRORS === "true") {
    window.addEventListener("error", (e) => e.preventDefault());
    window.addEventListener("unhandledrejection", (e) => e.preventDefault());
  }

  const onSubmit = async (data: SignupFormData) => {
    if (!data.terms) {
      setError("terms", {
        type: "manual",
        message:
          "Please accept the Terms of Service and Privacy Policy to proceed.",
      });
      return;
    }
    const {
      first_name,
      last_name,
      email,
      contact_no,
      password,
      confirm_password,
    } = data;
    const signupData = {
      first_name,
      last_name,
      email,
      password,
      contact_no: +contact_no,
      confirm_password,
    };
    try {
      const result = await dispatch(signupUser(signupData)).unwrap();
      if (result?.token) {
        const { email, first_name, last_name, user_id, contact_no } =
          result?.user;
        localStorage.setItem(
          "user",
          JSON.stringify({ email, first_name, last_name, user_id, contact_no })
        );
        router.push(`/otpverify`);
      }
    } catch (error: any) {
      // console.log("Signup Error:", error.response?.data?.message || "Signup failed");
      window?.console.log(
        "Signup Error:",
        error.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <>
      <div className="login_main_div">
        <div className="login_partition_data">
          <div className="auth_left_data"></div>
          <div className="auth_right_data d-flex justify-content-center align-items-center">
            <div>
              <div className="data_size">
                <div className="login_logo_div logo_alignment_data">
                  <Image
                    className="login_logo_img img-fluid"
                    src={logo}
                    alt="side_img"
                  />
                </div>
                <p className="login_title_text">Let’s Get Started.</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col lg={12}>
                      <div className="text_filed text_filed_dropdown">
                        <Controller
                          name="first_name"
                          control={control}
                          render={({ field }) => (
                            <TextBoxComponent
                              placeholder="First Name *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("first_name", e.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                          )}
                        />
                        <p className="error-text">
                          {errors.first_name?.message}
                        </p>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="text_filed text_filed_dropdown">
                        <Controller
                          name="last_name"
                          control={control}
                          render={({ field }) => (
                            <TextBoxComponent
                              placeholder="Last Name *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("last_name", e.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                          )}
                        />
                        <p className="error-text">
                          {errors.last_name?.message}
                        </p>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="text_filed text_filed_dropdown">
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextBoxComponent
                              placeholder="Email Address *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("email", e.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                          )}
                        />
                        <p className="error-text">{errors.email?.message}</p>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="text_filed text_filed_dropdown">
                        <Controller
                          name="contact_no"
                          control={control}
                          render={({ field }) => (
                            <TextBoxComponent
                              placeholder="Phone Number *"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              value={field.value}
                              onChange={(e: any) =>
                                setValue("contact_no", e.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                          )}
                        />
                        <p className="error-text">
                          {errors.contact_no?.message}
                        </p>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="text_filed text_filed_dropdown position-relative">
                        <Controller
                          name="password"
                          control={control}
                          render={({ field }) => (
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
                            </>
                          )}
                        />
                        <p className="error-text">{errors.password?.message}</p>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="text_filed text_filed_dropdown position-relative">
                        <Controller
                          name="confirm_password"
                          control={control}
                          render={({ field }) => (
                            <>
                              <TextBoxComponent
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password *"
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
                                  showConfirmPassword
                                    ? "mdi:eye-off"
                                    : "mdi:eye"
                                }
                                className="password-toggle-icon toggle_password_margin"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              />
                            </>
                          )}
                        />
                        <p className="error-text">
                          {errors.confirm_password?.message}
                        </p>
                      </div>
                    </Col>
                  </Row>

                  <div className="description_login_main">
                    <div className="description_login_page1">
                      <div className="login_switch_div">
                        <Switch
                          checked={watch("terms")}
                          onChange={(checked) =>
                            setValue("terms", checked, { shouldValidate: true })
                          }
                        />
                      </div>
                      <p className="description_login_page m-0 ms-2">
                        I agree to the <Link href="#">Terms Of Service</Link>{" "}
                        and <Link href="#">Privacy Policy</Link>.
                      </p>
                    </div>
                    <p className="error-text">{errors.terms?.message}</p>
                  </div>

                  <div className="signup_btn_div">
                    <CommonProgressButton content="Sign up" loading={loading} />
                  </div>
                </form>

                <p className="signup_option_title"> OR </p>

                <div className="signup_option">
                  <Link href="#" className="signup_option_data">
                    <Image
                      className="option_img img-fluid"
                      src={GoogleIcon}
                      alt="GoogleIcon"
                    />
                  </Link>

                  {/* <Link href='#' className='signup_option_data'>
                  <Image className="option_img img-fluid" src={FacebookIcon} alt="FacebookIcon" />
                </Link> */}

                  <Link href="#" className="signup_option_data">
                    <Image
                      className="option_img img-fluid"
                      src={IphoneIcon}
                      alt="IphoneIcon"
                    />
                  </Link>
                </div>

                <p className="signup_account_info">
                  Already have an account?{" "}
                  <Link className="link_text" href="/signin">
                    Sign In
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
