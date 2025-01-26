// For fetchbase query
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { baseApi } from "../baseApi";
import { decodedToken } from "@/utils/jwt";
import { tagTypes } from "../../tagTypes";

const AUTH_URL = "/users";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (signupData) => ({
        url: `${AUTH_URL}/create`,
        method: "POST",
        body: signupData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    verifiedEmail: build.mutation({
      query: (otpData) => {
        return {
          url: `${AUTH_URL}/create-user-verify-otp`,
          method: "POST",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    resendOTP: build.mutation({
      query: () => {
        // const token = localStorage.getItem("woof_spot_createUserToken");
        // const decoded = decodedToken(token);
        // const email = decoded?.email;

        return {
          url: `/otp/resend-otp`,
          method: "PATCH",
          body: {},
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    userLogin: build.mutation({
      query: (loginData) => ({
        url: `/auth/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgetPassword: build.mutation({
      query: (userEmail) => {
        return {
          url: `/auth/forgot-password-otp`,
          method: "POST",
          body: userEmail,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    forgetOtpVerify: build.mutation({
      query: (otpData) => {
        const token = localStorage.getItem(
          "woof_spot_forgetPasswordVerifyToken"
        );
        return {
          url: `/auth/forgot-password-otp-match`,
          method: "PATCH",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    resendForgetOTP: build.mutation({
      query: () => {
        const token = localStorage.getItem(
          "woof_spot_forgetPasswordVerifyToken"
        );
        const decoded = decodedToken(token);
        const email = decoded?.email;
        return {
          url: `/otp/resend-otp`,
          method: "PATCH",
          body: { email: email },
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    resetPassword: build.mutation({
      query: (resetData) => {
        const token = localStorage.getItem("woof_spot_otp_match_token");
        return {
          url: `/auth/forgot-password-reset`,
          method: "PATCH",
          body: resetData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    myProfile: build.query({
      query: () => {
        return {
          url: `${AUTH_URL}/my-profile`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user], // Ensures that the profile data can be invalidated if needed
    }),
    getAllUsers: build.query({
      query: () => {
        return {
          url: `${AUTH_URL}/all-users`,
          method: "GET",
          query: {},
        };
      },
      providesTags: [tagTypes.user], // Ensures that the profile data can be invalidated if needed
    }),
    donationUser: build.query({
      query: ({ page }) => {
        return {
          url: `/donation/?page=${page}&limit=12`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.payment],
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerifiedEmailMutation,
  useResendOTPMutation,
  useUserLoginMutation,
  useForgetPasswordMutation,
  useResendForgetOTPMutation,
  useForgetOtpVerifyMutation,
  useResetPasswordMutation,
  useMyProfileQuery,
  useGetAllUsersQuery,
  useDonationUserQuery,
} = authApi;
