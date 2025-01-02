"use client";
import { Button, ConfigProvider, Form } from "antd";
import { useState } from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import { toast } from "sonner";
import {
  useForgetOtpVerifyMutation,
  useResendForgetOTPMutation,
} from "@/redux/api/features/authApi";

const ForgetPasswordOTP = () => {
  const [forgetPasswordOTPResend] = useResendForgetOTPMutation();
  const [ForgetVerifiedEmail] = useForgetOtpVerifyMutation();
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const token = localStorage.getItem("woof_spot_forgetPasswordVerifyToken");
  if (!token) {
    router.push("/login/forgot-password");
  }

  const handleOTPSubmit = async () => {
    const toastId = toast.loading("Verifying...");

    if (otp.length < 6) {
      toast.error("The OTP must be 6 digits long", {
        id: toastId,
        duration: 2000,
      });
    } else {
      const data = {
        otp: otp,
      };

      try {
        const res = await ForgetVerifiedEmail(data).unwrap();

        if (res.success) {
          toast.success("Email verified successfully", {
            id: toastId,
            duration: 2000,
          });
          router.push("/login/set-new-password");
          router.refresh();
          localStorage.setItem(
            "woof_spot_otp_match_token",
            res.data?.forgetOtpMatchToken
          );
          setTimeout(() => {
            localStorage.removeItem("woof_spot_forgetPasswordVerifyToken");
          }, 2000);
        }
      } catch (error) {
        toast.error(error?.data?.message || "An error occurred during login", {
          id: toastId,
          duration: 3000,
        });
      }
    }
  };
  const handleResendOTP = async () => {
    const toastId = toast.loading("Resending OTP...");

    try {
      const res = await forgetPasswordOTPResend().unwrap();

      if (res.success) {
        toast.success("OTP resent successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to resend OTP", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="text-primary-color">
      <Container>
        <div className="flex flex-col lg:flex-row justify-center gap-10 items-center min-h-screen bg-site-color py-10">
          <div className="w-full md:w-[80%] lg:w-[50%] ">
            <div className="">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                  Verify OTP
                </h1>
                <p className="md:text-lg lg:text-xl mb-2 ">
                  Please check your email. We have sent a code to contact
                  @gmail.com
                </p>
              </div>
              <ConfigProvider
                theme={{
                  components: {
                    Form: {
                      colorError: "rgb(244,142,72)",
                    },
                  },
                }}
              >
                <Form layout="vertical" className="bg-transparent w-full">
                  <Form.Item className="">
                    <div className="flex justify-center items-center">
                      <OTPInput
                        inputStyle="!w-[35px] !h-[50px] sm:!w-[60px] sm:!h-[70px] text-[20px] sm:text-[30px] bg-transparent border border-[#F88D58] hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color rounded-lg mr-[10px] sm:mr-[20px]"
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => <input {...props} required />}
                      />
                    </div>
                  </Form.Item>
                  <div className="flex justify-between py-1">
                    <p>Didn’t receive code?</p>
                    <div
                      onClick={handleResendOTP}
                      className="text-[#F48E48] underline cursor-pointer"
                    >
                      Resend
                    </div>
                  </div>

                  <Form.Item>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            defaultHoverBg: "#013564",
                            defaultHoverColor: "#F3F3F3",
                          },
                        },
                      }}
                    >
                      <Button
                        className="!btn !bg-[#F88D58] hover:!bg-black !text-white !w-full !text-xl"
                        onClick={handleOTPSubmit}
                      >
                        Verify OTP
                      </Button>
                    </ConfigProvider>
                  </Form.Item>
                </Form>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ForgetPasswordOTP;
