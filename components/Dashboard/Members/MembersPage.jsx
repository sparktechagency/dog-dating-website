"use client";
import React, { useState } from "react";
import { Button, ConfigProvider, Flex, Select, Table } from "antd";
import { BiMenuAltRight, BiSolidDonateHeart } from "react-icons/bi";
import { BsFilterRight } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { useGetAllUsersQuery } from "@/redux/api/features/authApi";

const { Option } = Select;
const MembersPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [pagination, setPagination] = useState({ page: 1, pageSize: 12 });
  const handleTableChange = (pagination) => {
    setPagination({
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const { data: users, isFetching } = useGetAllUsersQuery();

  const getPaidMembers = (users, status) => {
    return users?.filter((user) => user?.status === status);
  };

  const paidMembers = getPaidMembers(users?.data, "Paid");
  const generalMembers = getPaidMembers(users?.data, "General");

  const columns = [
    {
      title: "Sl No",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },

    {
      title: "E-mail",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Donated", value: "Paid" }, // Filter option that shows "Donated" but filters for "Paid"
        { text: "General", value: "General" },
        // Add more status options here as needed
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) =>
        status === "Paid" ? (
          <span className="bg-[#FF6740] text-white px-4 py-2 rounded">
            Donated
          </span>
        ) : (
          <span className="bg-[#1A2238] text-white px-4 py-2 rounded">
            {status}
          </span>
        ),
    },
  ];
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <div className="my-[50px]  flex flex-col lg:flex-row gap-10 justify-between">
        <div className=" flex flex-col md:flex-row gap-x-5 gap-y-10">
          <div className="w-full md:w-fit bg-white shadow-md px-6 py-2 rounded-lg mt-5 md:mt-0 ">
            <div>
              <FaUsers className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              Total Members
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">
              {users?.data?.length}
            </h1>
          </div>

          <div className="w-full md:w-fit bg-white shadow-md px-6 py-2 rounded-lg mt-5 md:mt-0 ">
            <div>
              <FaUsers className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              General Members
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">
              {generalMembers?.length}
            </h1>
          </div>
          <div className="w-full md:w-fit bg-white shadow-md px-6 py-2 rounded-lg mt-5 md:mt-0 ">
            <div>
              <FaUsers className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              Paid Members
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">
              {paidMembers?.length}
            </h1>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-[24px] font-bold text-[#302F51] mb-[50px]">
          Members
        </h1>
      </div>
      <div className="">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#F88D5899",
                colorBgContainer: "#fffaf5",
                colorText: "#0C0C0C",
                borderColor: "#fffaf5",
                headerColor: "#0C0C0C",
                fontSize: 18,
                footerColor: "#fffaf5",
                // marginXXS: 4,
                colorLinkActive: "#fffaf5",
                headerSplitColor: "#0C0C0C",
              },
              Pagination: {
                itemActiveBg: "#F88D58",
                colorPrimary: "#F3F3F3",
                colorPrimaryHover: "#F3F3F3",
              },
            },
          }}
        >
          <Table
            loading={isFetching}
            columns={columns}
            dataSource={users?.data}
            pagination={{
              current: pagination.page,
              pageSize: pagination.pageSize,
            }}
            onChange={handleTableChange}
            scroll={{ x: "100%" }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};
export default MembersPage;
