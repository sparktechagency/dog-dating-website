import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFromLocalStorage } from "@/utils/local-storage";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { tagTypesList } from "../tagTypes";
import Cookies from "universal-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers) => {
    const cookie = new Cookies();
    const accessToken = cookie.get("woof_spot_accessToken");
    const signUpToken = getFromLocalStorage("woof_spot_createUserToken");
    const forgotPassToken = getFromLocalStorage(
      "woof_spot_forgetPasswordVerifyToken"
    );
    const changePassToken = getFromLocalStorage("woof_spot_otp_match_token");
    const token = accessToken;

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

// const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     const res = await fetch(`${getBaseUrl()}/auth/refresh-token`, {
//       method: "POST",
//       credentials: "include",
//     });

//     const data = await res.json();
//     if (data?.data?.accessToken) {
//       const user = api.getState().auth.user;

//       api.dispatch(
//         setUser({
//           user,
//           token: data.data.accessToken,
//         })
//       );

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       // api.dispatch(logout());
//     }
//   }

//   return result;
// };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
