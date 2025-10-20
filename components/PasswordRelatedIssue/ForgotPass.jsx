"use client";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FiKey } from "react-icons/fi";
import Link from "next/link";
import { toast } from "sonner";
import { useForgetPasswordMutation } from "@/redux/api/features/authApi";
import { useRouter } from "next/navigation";

const ForgotPass = () => {
  const [forgetPassword] = useForgetPasswordMutation();
  const router = useRouter();

  const onHandleSubmit = async (e) => {
    const toastId = toast.loading("Requesting...");
    e.preventDefault();
    const email = e.target.email.value;
    try {
      const res = await forgetPassword({ email: email }).unwrap();
      if (res.success) {
        toast.success(res.message, {
          id: toastId,
          duration: 2000,
        });
        localStorage.setItem(
          "woof_spot_forgetPasswordVerifyToken",
          res.data?.forgetToken
        );
        router.push("/login/forgot-password/verify");
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred during Login", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center container my-auto mx-auto h-screen">
      <FiKey className="my-8 text-8xl bg-[#FFF5ED] text-[#F88D58] rounded-full p-6" />
      <h1 className="text-3xl font-semibold">Forgot password?</h1>
      <p className="mt-4 text-gray-500">
        No worries, we&apos;ll send you reset instructions.
      </p>
      <form onSubmit={onHandleSubmit} action="" className="w-full max-w-sm">
        {/* Email */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="input input-bordered w-full"
            required
          />
        </div>
        <button className="btn bg-[#F88D58] hover:bg-black text-white w-full text-xl  ">
          Submit
        </button>
      </form>
      <Link href={"/login"}>
        <button className="flex flex-shrink-0  no-underline text-gray-500   my-2 gap-2">
          <IoMdArrowBack className="text-2xl" />
          <h1 className="">Back to log in</h1>
        </button>
      </Link>
    </div>
  );
};

export default ForgotPass;
