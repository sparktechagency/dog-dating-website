import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

const paymentUrl = "/payment";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPayment: build.mutation({
      query: (data) => ({
        url: `${paymentUrl}/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.payment],
    }),

    // getAllProduct: build.query({
    //   query: ({ page }) => ({
    //     url: `${productUrl}/?page=${page}&limit=12`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.product],
    // }),
    // updateProduct: build.mutation({
    //   query: (data) => {
    //     const formData = data?.formData;
    //     const id = data?.id;

    //     return {
    //       url: `${productUrl}/${id}`,
    //       method: "PATCH",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: [tagTypes.product],
    // }),
    // deleteProduct: build.mutation({
    //   query: (id) => ({
    //     url: `${productUrl}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.product],
    // }),
  }),
});

export const { useCreatePaymentMutation } = paymentApi;
