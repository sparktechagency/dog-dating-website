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
    getAllBlockUsers: build.query({
      query: () => ({
        url: `/blockedUser`,
        method: "GET",
      }),
      providesTags: [tagTypes.blockUser],
    }),
    blockChat: build.mutation({
      query: ({ id, data }) => ({
        url: `/chat/${id}/block`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [
        tagTypes.chat,
        tagTypes.blockUser,
        tagTypes.userProfile,
      ],
    }),
    unBlockChat: build.mutation({
      query: ({ id }) => ({
        url: `/blockedUser/unblock/${id}`,
        method: "POST",
      }),
      invalidatesTags: [
        tagTypes.chat,
        tagTypes.blockUser,
        tagTypes.userProfile,
      ],
    }),
    deleteChat: build.mutation({
      query: ({ id }) => ({
        url: `/chat/${id}/delete`,
        method: "DELETE",
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
  useGetAllBlockUsersQuery,
  useBlockChatMutation,
  useUnBlockChatMutation,
  useDeleteChatMutation,
} = chatApi;
