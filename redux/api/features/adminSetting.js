import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

const contactUrl = "/contactUs";

const adminSettingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllLinks: build.query({
      query: () => ({
        url: `/admin/settings`,
        method: "GET",
      }),
      providesTags: [tagTypes.adminSettings],
    }),
    updateAllLinks: build.mutation({
      query: (data) => ({
        url: `/admin/settings`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.adminSettings],
    }),
  }),
});

export const { useGetAllLinksQuery, useUpdateAllLinksMutation } =
  adminSettingApi;
