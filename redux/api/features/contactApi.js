import { baseApi } from "../baseApi";

const contactUrl = "/contactUs";

const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendMessage: build.mutation({
      query: (data) => ({
        url: `${contactUrl}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = contactApi;
