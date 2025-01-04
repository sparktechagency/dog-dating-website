"use client";
import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FiKey } from "react-icons/fi";
import Link from "next/link";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/redux/api/features/authApi";
import { useRouter } from "next/navigation";
const SetNewPassword = () => {
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();

  const token = localStorage.getItem("woof_spot_otp_match_token");
  if (!token) {
    router.push("/login/forgot-password");
  }

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Updateing Password...");

    e.preventDefault();

    //* validate password
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    const value = { newPassword, confirmPassword };

    //* Logic Part
    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }
      const res = await resetPassword(value).unwrap();
      if (res.success) {
        toast.success(res.message, {
          id: toastId,
          duration: 2000,
        });
        setTimeout(() => {
          localStorage.removeItem("woof_spot_otp_match_token");
        }, 2000);
        router.push("/login");
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "An error occurred during Login",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  return (
    <div className="flex flex-col justify-center items-center container my-auto mx-auto h-screen">
      <FiKey className="my-8 text-7xl bg-[#FFF5ED] text-[#F88D58] rounded-full p-5" />
      <h1 className="text-3xl font-semibold">Set new password</h1>
      <p className="mt-4 text-gray-500 text-center">
        Your new password must be different to
        <br />
        previously used passwords.
      </p>
      <form onSubmit={handleSubmit} action="" className="w-full max-w-sm">
        {/* Password */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your Password"
            name="newPassword"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="text-left">
          <h1 className="text-gray-500   -mt-3 mb-5">
            Must be at least 8 characters.
          </h1>
        </div>
        {/* Confirm Password */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="confirm passsword"
            name="confirmPassword"
            className="input input-bordered w-full"
            required
          />
        </div>
        <button className="btn bg-[#F88D58] hover:bg-black text-white w-full text-xl  ">
          Reset password
        </button>
      </form>
      <Link href={"/login"}>
        <button className="flex flex-shrink-0  no-underline text-gray-500   my-2 gap-2 mt-5">
          <IoMdArrowBack className="text-2xl" />
          <h1 className="">Back to log in</h1>
        </button>
      </Link>
    </div>
  );
};
export default SetNewPassword;
