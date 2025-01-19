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

// const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
//   const cookies = new Cookies();

//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 403) {
//     const res = await fetch(`${getBaseUrl()}/auth/refresh-token`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         refreshToken: cookies.get("woof_spot_refreshToken"),
//       },
//     });

//     const data = await res.json();
//     if (data?.data?.accessToken) {
//       const accessToken = api.getState().auth.accessToken;
//       cookies.get("woof_spot_refreshToken");
//       api.dispatch(setAccessToken(accessToken));
//       api.dispatch(setUserInfo(accessToken));

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(clearAuth());
//       cookies.remove("woof_spot_accessToken", { path: "/" });
//       cookies.remove("woof_spot_refreshToken", { path: "/" });

//       window.location.href = "/login";
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
