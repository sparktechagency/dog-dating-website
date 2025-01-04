"use client";
import React, { useState } from "react";
import { Button, ConfigProvider, Flex, Table } from "antd";
import { BiMenuAltRight, BiSolidDonateHeart } from "react-icons/bi";
import { BsFilterRight } from "react-icons/bs";
import { Select, Space } from "antd";
import { useDonationUserQuery } from "@/redux/api/features/authApi";

const { Option } = Select;

const DonationsPage = () => {
  const { data: donationUser, isFetching } = useDonationUserQuery();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const calculateTotalDonation = (donations) => {
    if (!Array.isArray(donations)) {
      return 0; // Return 0 if donations is undefined or not an array
    }

    return donations.reduce((total, donation) => {
      const amount = donation?.amount || 0; // Default to 0 if amount is missing
      return total + amount;
    }, 0);
  };

  const totalDonation = calculateTotalDonation(donationUser?.data);

  const columns = [
    {
      key: "createdAt",
      title: "Donation Date",
      dataIndex: "createdAt",
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return formattedDate; // e.g., "January 2, 2025"
      },
    },
    {
      key: "name",
      title: "Donator Name",
      dataIndex: "name",
    },
    {
      key: "amount",
      title: "Amount",
      dataIndex: "amount",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <div>
      <div className="my-[50px] flex flex-col lg:flex-row gap-10 justify-between">
        <div className="gap-x-5 gap-y-10 flex flex-col md:flex-row">
          {/* <div className=" w-full lg:w-fit bg-white shadow-md px-6 py-2 rounded-lg">
            <div>
              <BiSolidDonateHeart className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              November Donation
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">$2,100.00</h1>
          </div> */}

          <div className=" w-full lg:w-fit bg-white shadow-md px-6 py-2 rounded-lg">
            <div>
              <BiSolidDonateHeart className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              Total Donation
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">
              ${totalDonation}
            </h1>
          </div>
        </div>
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
            loading={isFetching}
            columns={columns}
            dataSource={donationUser?.data}
            scroll={{ x: "100%" }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default DonationsPage;
