"use client";
import React, { useState } from "react";
import { Button, ConfigProvider, Flex, Table } from "antd";
import { BiMenuAltRight, BiSolidDonateHeart } from "react-icons/bi";
import { BsFilterRight } from "react-icons/bs";
import { Select, Space } from "antd";

const { Option } = Select;

const DonationsPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const donations = [
    {
      donationDate: "12-10-2024",
      donatorName: "Marilyn Terry",
      shelter: "Bartell Animal Rescue",
      amount: "$300.00",
      email: "marilyn.terry1@example.com",
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Alice Johnson",
      shelter: "Whisker Haven Shelter",
      amount: "$250.00",
      email: "alice.johnson@example.com",
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Ella Parker",
      shelter: "Paws and Claws Sanctuary",
      amount: "$350.00",
      email: "ella.parker@example.com",
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Sophia Adams",
      shelter: "Furry Friends Haven",
      amount: "$280.00",
      email: "sophia.adams@example.com",
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Olivia Mitchell",
      shelter: "Happy Tails Refuge",
      amount: "$320.00",
      email: "olivia.mitchell@example.com",
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Liam Thompson",
      shelter: "Pet Haven Society",
      amount: "$270.00",
      email: "liam.thompson@example.com",
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Henry Roberts",
      shelter: "Companion Critters Shelter",
      amount: "$330.00",
      email: "henry.roberts@example.com",
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Ava White",
      shelter: "Purrfect Paws Haven",
      amount: "$260.00",
      email: "ava.white@example.com",
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Noah Davis",
      shelter: "Tail Waggers Sanctuary",
      amount: "$340.00",
      email: "noah.davis@example.com",
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Isabella Clark",
      shelter: "Whisker Whims Shelter",
      amount: "$290.00",
      email: "isabella.clark@example.com",
    },
  ];

  const columns = [
    {
      title: "Donation Date",
      dataIndex: "donationDate",
    },
    {
      title: "Donator Name",
      dataIndex: "donatorName",
    },
    {
      title: "Shelter",
      dataIndex: "shelter",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
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
      <div className="my-[50px] flex flex-col lg:flex-row gap-10 justify-between">
        <div className="gap-x-5 gap-y-10 flex flex-col md:flex-row">
          <div className=" w-full lg:w-fit bg-white shadow-md px-6 py-2 rounded-lg">
            <div>
              <BiSolidDonateHeart className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              November Donation
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">$2,100.00</h1>
          </div>

          <div className=" w-full lg:w-fit bg-white shadow-md px-6 py-2 rounded-lg">
            <div>
              <BiSolidDonateHeart className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              Total Donation
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">$12,909.00</h1>
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
          Donations
        </h1>
      </div>
      <div>
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
          {" "}
          <Table
            columns={columns}
            dataSource={donations}
            scroll={{ x: "100%" }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default DonationsPage;
