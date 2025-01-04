"use client";
import React, { useState } from "react";
import Product from "./Product";

import img1 from "../../asserts/product.png";
import { useGetAllProductQuery } from "@/redux/api/features/productApi";
import { ConfigProvider, Pagination } from "antd";

const Products = () => {
  const [page, setPage] = useState(1);
  const { data: productsData, isFetching } = useGetAllProductQuery({ page });

  return (
    <div className="bg-[FFFAF5] md:mt-[100px] place-items-center">
      <div className="ProductList text-center text-[#302f51] text-[40px] font-bold md:mb-[52px]">
        Product List
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-10 mx-5">
        {productsData?.data?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </main>

      <div className="flex justify-center my-20">
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#F88D58",
                colorPrimary: "#F3F3F3",
                colorPrimaryHover: "#F3F3F3",
              },
            },
          }}
        >
          <Pagination
            onChange={(page) => setPage(page)}
            pageSize={12}
            total={productsData?.meta?.total}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Products;
