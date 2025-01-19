"use client";
import React, { useMemo, useState } from "react";
import Item from "./Item";
import { FiSearch } from "react-icons/fi";
import AddNewItem from "./AddNewItem";
import { useGetAllProductQuery } from "@/redux/api/features/productApi";
import { ConfigProvider, Pagination } from "antd";
import Loader from "@/components/ui/Loader";

const AllProductsPage = () => {
  const [page, setPage] = useState(1);
  const { data: productData, isFetching } = useGetAllProductQuery({ page });

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = useMemo(() => {
    const items = productData?.data;
    if (!searchText) return items;
    return items.filter((item) =>
      item?.title?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [productData?.data, searchText]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-5 justify-between ">
        <div
          className="flex items-center
                    border-2 border-[#F88D58]
                    w-full  rounded-xl max-w-lg py-3  mt-5"
        >
          <div className="p-2">
            <FiSearch className="text-xl" />
          </div>
          <input
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className=" bg-[#FFFAF5] placeholder:text-black border-none outline-none w-full h-full "
          />
        </div>

        <div className="flex flex-shrink-0 text-lg items-center justify-center mb-10 lg:mb-0">
          <div
            onClick={toggleMenu}
            className="flex justify-center items-center cursor-pointer gap-2"
          >
            <span className="text-3xl text-[#F88D58] mb-2 "> +</span>
            Add New Dog Info
          </div>
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
              <AddNewItem
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                toggleMenu={toggleMenu}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 justify-items-center items-stretch gap-10 my-5">
        {isFetching
          ? ""
          : filteredData?.map((item) => <Item item={item} key={item.id} />)}
      </div>
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
          {filteredData?.length > 0 && (
            <Pagination
              onChange={(page) => setPage(page)}
              pageSize={12}
              total={productData?.meta?.total}
            />
          )}
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AllProductsPage;
