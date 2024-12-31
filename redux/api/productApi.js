import { baseApi } from "./baseApi";

const productUrl = "/products";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data) => ({
        url: `${productUrl}/add`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateProductMutation } = productApi;
