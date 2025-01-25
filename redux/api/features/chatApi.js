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
      invalidatesTags: [tagTypes.chat],
    }),
    getAllChatByUser: build.query({
      query: ({ id }) => ({
        url: `${chatUrl}/user/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.chat],
    }),
    getAllMessageByChatId: build.query({
      query: ({ id }) => ({
        url: `/message/full-chat/${id}`,
        method: "GET",
      }),
    }),
    leaveGroupChat: build.mutation({
      query: ({ id }) => ({
        url: `/chat/leave-chat/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.chat],
    }),
  }),
});

export const {
  useCreateChatMutation,
  useGetAllChatByUserQuery,
  useGetAllMessageByChatIdQuery,
  useLeaveGroupChatMutation,
} = chatApi;
