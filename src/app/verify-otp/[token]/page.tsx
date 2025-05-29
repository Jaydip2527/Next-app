"use client";

import * as React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useRouter as useRouter2 } from "next/router";
import Image from "next/image";

import { OtpInputComponent } from "@syncfusion/ej2-react-inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpValidationSchema } from "@/@/utils/validations";
import { resendOtp, verifyOtp } from "@/@/redux/slices/authSlice";
import { AppDispatch } from "@/@/redux/store";
import { useAppSelector } from "@/@/redux/redux-hooks";
import logo from "../../../../public/Images/logo.png";

function VerifyOTP() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);
  const [timeLeft, setTimeLeft] = React.useState<number>(120); // Default: 2 minutes
  const [isResendDisabled, setIsResendDisabled] = React.useState<boolean>(true);
  const { loading } = useAppSelector((state) => state.auth);

  const [decodedEmail, setDecodedEmail] = React.useState("");
  const [decodedPhone, setDecodedPhone] = React.useState("");

  const router2 = useRouter2();

  const decodeData = (encodedData: any) => {
    try {
      return atob(decodeURIComponent(encodedData)); // Decode Base64
    } catch (error) {
      console.error("Failed to decode data:", error);
      return "";
    }
  };

  React.useEffect(() => {
    if (router2.isReady) {
      // Extract encoded params from URL
      const { email, phone } = router2.query;

      // Decode values
      if (email && phone) {
        setDecodedEmail(decodeData(email));
        setDecodedPhone(decodeData(phone));
      }
    }
  }, [router2.isReady, router2.query]);

  const {
    // register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpValidationSchema),
  });

  // Store tokens from localStorage
  React.useEffect(() => {
    const contactToken = localStorage.getItem("contact_no_verification_token");
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user || ""));

    if (!contactToken) {
      router.replace("/signin");
    }

    // Start OTP Resend Timer (120 seconds)
    setTimeLeft(120);
    setIsResendDisabled(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  // Convert seconds to MM:SS format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle OTP Verification Submission
  const onSubmit = async (data: any) => {
    try {
      const { mobileOtp, emailOtp } = data;
      const otpData = {
        loginId: user?.email || "",
        contactNumberToken: mobileOtp,
        emailToken: emailOtp,
        tokenRequired: true,
      };
      const result = await dispatch(verifyOtp(otpData)).unwrap();
      if (result?.access_token) {
        router.push("/organizationprofile");
      }
    } catch (error: any) {
      // console.log("OTP verification Error:", error.response?.data?.message || "OTP verification failed");
      window?.console.log(
        "OTP verification Error:",
        error.response?.data?.message || "OTP verification failed"
      );
    }
  };

  // Handle OTP Resend
  const handleResendOtp = async () => {
    try {
      // Call API to resend OTP
      const result = await dispatch(
        resendOtp({ loginId: user?.email || "" })
      ).unwrap();
      if (result) {
        setTimeLeft(120); // Reset Timer
        setIsResendDisabled(true);
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setIsResendDisabled(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error: any) {
      // console.error("Failed to resend OTP:", error.response?.data?.message || "Request failed");
      window?.console.log(
        "Failed to resend OTP:",
        error.response?.data?.message || "Request failed"
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
              <div className="otp_data_size">
                <div className="login_logo_div logo_alignment_data otp_text_filed">
                  <Image
                    className="login_logo_img img-fluid"
                    src={logo}
                    alt="side_img"
                  />
                </div>
                <p className="signin_title_text"> Verify OTP </p>
                <p className="otp_verify_infodata">
                  {" "}
                  OTP has been sent to registered mobile number {
                    decodedPhone
                  }{" "}
                  and email ID {decodedEmail}.{" "}
                </p>
                <p className="otp_verify_sub_infodata">
                  {" "}
                  Please enter ONE TIME PASSWORD sent on your registered mobile
                  number and Email ID.{" "}
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="otp_sec_size">
                    <div className="mobile_otp_sec_main">
                      <p className="mobile_otp_text">
                        {" "}
                        Mobile OTP <span className="text-danger"> * </span>{" "}
                      </p>
                      <div className="otp_filed_sec">
                        <div className="otp_text_filed">
                          <OtpInputComponent
                            id="mobileOtp"
                            name="mobileOtp"
                            length={6}
                            stylingMode="underlined"
                            onChange={(e: any) => {
                              setValue("mobileOtp", e.value);
                              if (errors.mobileOtp) {
                                clearErrors("mobileOtp");
                              }
                            }}
                          />
                          {errors.mobileOtp && (
                            <p className="error-text">
                              {errors.mobileOtp.message}
                            </p>
                          )}
                        </div>
                        {/* <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div>
                      <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div>
                      <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div>
                      <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div>
                      <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div>
                      <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div> */}
                      </div>
                    </div>

                    <div>
                      <p className="mobile_otp_text">
                        {" "}
                        Email OTP <span className="text-danger"> * </span>{" "}
                      </p>
                      <div className="otp_filed_sec">
                        <div className="otp_text_filed">
                          <OtpInputComponent
                            id="emailOtp"
                            name="emailOtp"
                            length={6}
                            type="text"
                            stylingMode="underlined"
                            onChange={(e: any) => {
                              setValue("emailOtp", e.value);
                              if (errors.emailOtp) {
                                clearErrors("emailOtp");
                              }
                            }}
                          />
                          {errors.emailOtp && (
                            <p className="error-text">
                              {errors.emailOtp.message}
                            </p>
                          )}
                        </div>
                        {/* <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div>
                      <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div>
                      <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div>
                      <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div>
                      <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div>
                      <div className="otp_text_filed">
                        <TextBoxComponent
                          placeholder=""
                          floatLabelType="Auto"
                        />
                      </div> */}
                      </div>
                    </div>
                  </div>

                  <p className="Resend_otp_text">
                    {" "}
                    Resend OTP in {formatTime(timeLeft)}{" "}
                  </p>

                  <div className="otp_btn_sec_main">
                    <div className="otp_btn_sec">
                      <button
                        type="submit"
                        className="otp_verification_continue_btn"
                        disabled={loading}
                      >
                        Continue
                      </button>
                      <button
                        type="button"
                        className="otp_verification_resend_btn"
                        onClick={handleResendOtp}
                        disabled={isResendDisabled}
                      >
                        Resend OTP
                      </button>
                      <button
                        type="button"
                        className="otp_verification_cancel_btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyOTP;
