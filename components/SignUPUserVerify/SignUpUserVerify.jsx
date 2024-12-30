"use client";
import { Button, ConfigProvider, Form, Input } from "antd";
import { useState } from "react";
import Container from "@/components/ui/Container";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import { toast } from "sonner";
import {
  useResendOTPMutation,
  useVerifiedEmailMutation,
} from "@/redux/api/authApi";
import Cookies from "universal-cookie";

const SignUpUserVerify = () => {
  const [verifiedEmail] = useVerifiedEmailMutation();
  const [resendOTP] = useResendOTPMutation();
  const navigate = useRouter();
  const cookies = new Cookies();

  const [otp, setOtp] = useState("");

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
        const res = await verifiedEmail(data).unwrap();

        if (res.success) {
          toast.success("Email verified successfully", {
            id: toastId,
            duration: 2000,
          });
          navigate.push("/login");
          navigate.refresh();

          setTimeout(() => {
            localStorage.removeItem("woof_spot_createUserToken");
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
      const res = await resendOTP().unwrap();

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
                  Please check your email. We have sent a code
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
                        components: {},
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
export default SignUpUserVerify;
