"use client";
import React, { useState } from "react";
import { Button, ConfigProvider, Flex, Table, Tooltip } from "antd";
import { BiMenuAltRight, BiSolidDonateHeart } from "react-icons/bi";
import { BsFilterRight } from "react-icons/bs";
import { Select, Space } from "antd";
import { useDonationUserQuery } from "@/redux/api/features/authApi";
import WoofHero from "@/asserts/woofHero.png";
import WoofSupporter from "@/asserts/woofSupporter.png";
import Image from "next/image";

const { Option } = Select;

const DonationsPage = () => {
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const handleTableChange = (pagination) => {
    setPagination({
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const { data: donationUser, isFetching } = useDonationUserQuery({
    page: pagination?.page,
  });

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
      // // Adding a sorter for the date
      // sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      // sortDirections: ["descend", "ascend"], // This controls the allowed sort directions
    },
    {
      key: "name",
      title: "Donator Name",
      dataIndex: "name",
      render: (text, record) => (
        <div>
          <h1 className="flex items-center gap-2">
            <p>{text}</p>{" "}
            <div className="flex items-center gap-1 ">
              {record?.userId?.isSupported && (
                <Tooltip title="Woof Spot Supporter">
                  <Image
                    loading="lazy"
                    src={WoofSupporter}
                    className="size-4"
                    width={1000}
                    height={1000}
                    alt="WoofSupporter"
                  />
                </Tooltip>
              )}
              {record?.userId?.isHero && (
                <Tooltip title="Woof Spot Hero">
                  <Image
                    loading="lazy"
                    src={WoofHero}
                    className="size-4"
                    width={1000}
                    height={1000}
                    alt="WoofHero"
                  />
                </Tooltip>
              )}
            </div>
          </h1>
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },

    {
      key: "transectionId",
      title: "Transection Id",
      dataIndex: "transectionId",
      // // Adding a sorter for the amount
      // sorter: (a, b) => a.amount - b.amount,
      // sortDirections: ["descend", "ascend"], // Allows numeric sorting
    },
    {
      key: "amount",
      title: "Amount",
      dataIndex: "amount",
      // // Adding a sorter for the amount
      // sorter: (a, b) => a.amount - b.amount,
      // sortDirections: ["descend", "ascend"], // Allows numeric sorting
    },
  ];

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
              Pagination: {
                itemActiveBg: "#F88D58",
                colorPrimary: "#F3F3F3",
                colorPrimaryHover: "#F3F3F3",
              },
            },
          }}
        >
          {" "}
          <Table
            loading={isFetching}
            columns={columns}
            dataSource={donationUser?.data}
            pagination={{
              current: pagination.page,
              pageSize: pagination.pageSize,
              total: donationUser?.meta?.total,
            }}
            onChange={handleTableChange}
            scroll={{ x: "100%" }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default DonationsPage;
