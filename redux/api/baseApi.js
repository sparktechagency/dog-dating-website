import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFromLocalStorage } from "@/utils/local-storage";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { tagTypesList } from "../tagTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    const signUpToken = getFromLocalStorage("woof_spot_createUserToken");
    const forgotPassToken = getFromLocalStorage(
      "woof_spot_forgetPasswordVerifyToken"
    );
    const changePassToken = getFromLocalStorage("woof_spot_otp_match_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    if (signUpToken) {
      headers.set("token", signUpToken);
    }

    if (forgotPassToken) {
      headers.set("token", forgotPassToken);
    }

    if (changePassToken) {
      headers.set("token", changePassToken);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
