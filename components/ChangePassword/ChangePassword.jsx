"use client";
import { Button, Form, Input, Typography } from "antd";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useChangePasswordMutation } from "@/redux/api/features/authApi";
import { clearAuth } from "@/redux/slices/authSlice";

const ChangePassword = () => {
  const router = useRouter();
  const [updatePassword] = useChangePasswordMutation();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const toastId = toast.loading("Updating Password...");

    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    try {
      const res = await updatePassword(data).unwrap();

      dispatch(clearAuth());
      cookies.remove("woof_spot_accessToken", { path: "/" });
      cookies.remove("woof_spot_refreshToken", { path: "/" });
      router.push("/login");

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <div className="w-full sm:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto my-20">
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent w-full"
      >
        <Typography.Title level={4} style={{ color: "#222222" }}>
          Current password
        </Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your current password!",
            },
          ]}
          name="oldPassword"
          className="text-white "
        >
          <Input.Password
            placeholder="Enter your password"
            className="py-2 px-3 text-xl border !border-[#F88D58] !text-base-color !bg-transparent"
          />
        </Form.Item>
        <Typography.Title level={4} style={{ color: "#222222" }}>
          New password
        </Typography.Title>
        <Form.Item
          rules={[
            { required: true, message: "Please enter your new password!" },
          ]}
          name="newPassword"
          className="text-white"
        >
          <Input.Password
            placeholder="Enter your password"
            className="py-2 px-3 text-xl border !border-[#F88D58] !text-base-color !bg-transparent"
          />
        </Form.Item>
        <Typography.Title level={4} style={{ color: "#222222" }}>
          Re-enter new Password
        </Typography.Title>
        <Form.Item
          name="reEnterPassword"
          className="text-white"
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="py-2 px-3 text-xl border !border-[#F88D58] !text-base-color !bg-transparent"
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="w-full py-6 border !border-[#F88D58] hover:border-[#F88D58] text-xl !text-black bg-[#F88D58] hover:!bg-[#F88D58] font-semibold rounded mt-8"
            htmlType="submit"
          >
            Change password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
