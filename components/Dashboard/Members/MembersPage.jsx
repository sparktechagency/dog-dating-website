"use client";
import React, { useState } from "react";
import { Button, ConfigProvider, Flex, Select, Table } from "antd";
import { BiMenuAltRight, BiSolidDonateHeart } from "react-icons/bi";
import { BsFilterRight } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
const { Option } = Select;
const MembersPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const users = [
    {
      slNo: 1,
      name: "Marilyn Terry",
      address: "123 Main Street New York, NY 10001",
      email: "marilyn.terry@example.com",
      status: "Paid",
    },
    {
      slNo: 2,
      name: "John Doe",
      address: "456 Elm Avenue Los Angeles, CA",
      email: "john.doe@example.com",
      status: "General",
    },
    {
      slNo: 3,
      name: "Alice Johnson",
      address: "789 Oak Lane Chicago, IL 60611",
      email: "alice.johnson@example.com",
      status: "Paid",
    },
    {
      slNo: 4,
      name: "Michael Smith",
      address: "567 Pine Road Miami, FL 33133",
      email: "michael.smith@example.com",
      status: "Paid",
    },
    {
      slNo: 5,
      name: "Sophia Brown",
      address: "890 Cedar Street Seattle, WA",
      email: "sophia.brown@example.com",
      status: "General",
    },
    {
      slNo: 6,
      name: "William Lee",
      address: "678 Willow Avenue San Francisco, CA",
      email: "william.lee@example.com",
      status: "General",
    },
    {
      slNo: 7,
      name: "Olivia Rodriguez",
      address: "345 Birch Street Boston, MA",
      email: "olivia.rodriguez@example.com",
      status: "General",
    },
    {
      slNo: 8,
      name: "Ethan Wilson",
      address: "234 Maple Drive Austin, TX",
      email: "ethan.wilson@example.com",
      status: "General",
    },
    {
      slNo: 9,
      name: "Ava Martinez",
      address: "789 Pine Street Portland, OR",
      email: "ava.martinez@example.com",
      status: "General",
    },
    {
      slNo: 10,
      name: "Liam Garcia",
      address: "456 Cedar Lane Denver, CO",
      email: "liam.garcia@example.com",
      status: "General",
    },
  ];

  const columns = [
    {
      title: "Sl No",
      dataIndex: "slNo",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "E-mail",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
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

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

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
            <h1 className="text-[40px] text-[#302F51] font-bold">1800</h1>
          </div>

          <div className="w-full md:w-fit bg-white shadow-md px-6 py-2 rounded-lg mt-5 md:mt-0 ">
            <div>
              <FaUsers className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              General Members
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">1200</h1>
          </div>
          <div className="w-full md:w-fit bg-white shadow-md px-6 py-2 rounded-lg mt-5 md:mt-0 ">
            <div>
              <FaUsers className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              Paid Members
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">1200</h1>
          </div>
        </div>

        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorBgContainer: "rgba(0,0,0,0)",
                fontSize: 20,
                optionSelectedColor: "#F3F3F3",
                optionSelectedBg: "#F88D58",
                optionActiveColor: "#F3F3F3",
                colorBorder: "#F88D58",
                colorBgElevated: "#F3F3F3",
                selectorBg: "#F3F3F3",
                colorText: "#302F51",
                colorTextPlaceholder: "#302F51",
              },
            },
          }}
        >
          <Select
            suffixIcon={<BiMenuAltRight className="text-2xl text-[#F88D58]" />}
            className="!border-none !ring-0 !outline-none !text-2xl !h-12 !w-full lg:!w-auto"
            placeholder="Select a Month"
            style={{ width: 200 }}
            onChange={handleChange}
            value={selectedValue}
          >
            {months.map((month, index) => (
              <Option key={index} value={month}>
                {month}
              </Option>
            ))}
          </Select>
        </ConfigProvider>
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
            },
          }}
        >
          <Table columns={columns} dataSource={users} scroll={{ x: "100%" }} />
        </ConfigProvider>
      </div>
    </div>
  );
};
export default MembersPage;
