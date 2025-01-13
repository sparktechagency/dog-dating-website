import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

const chatUrl = "/chat";

const chatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createChat: build.mutation({
      query: (formData) => ({
        url: `${chatUrl}/add`,
        method: "POST",
        body: formData,
      }),
    }),
    getAllChatByUser: build.query({
      query: ({ id }) => ({
        url: `${chatUrl}/user/${id}`,
        method: "GET",
      }),
    }),
    getAllMessageByChatId: build.query({
      query: ({ id }) => ({
        url: `/message/full-chat/${id}`,
        method: "GET",
      }),
    }),
    sendMessage: build.mutation({
      query: (formData) => ({
        url: `/message/add-message`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useCreateChatMutation,
  useGetAllChatByUserQuery,
  useGetAllMessageByChatIdQuery,
  useSendMessageMutation,
} = chatApi;
