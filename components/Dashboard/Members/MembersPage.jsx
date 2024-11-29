"use client";
import React, { useState } from "react";
import { Button, Flex, Table } from "antd";
import { BiSolidDonateHeart } from "react-icons/bi";
import { BsFilterRight } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

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

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <div>
      <div className="my-[50px] flex justify-between">
        <div className="gap-3 flex">
          <div className="w-fit bg-white shadow-md px-6 py-2 rounded-lg">
            <div>
           
              <FaUsers className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              Total Members
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">1800</h1>
          </div>

          <div className="w-fit bg-white shadow-md px-6 py-2 rounded-lg">
            <div>
              <FaUsers className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              General Members
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">1200</h1>
          </div>
          <div className="w-fit bg-white shadow-md px-6 py-2 rounded-lg">
            <div>
              <FaUsers className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
            </div>
            <h1 className="text-[22px] text-[#302F51] font-semibold">
              Paid Members
            </h1>
            <h1 className="text-[40px] text-[#302F51] font-bold">1200</h1>
          </div>
        </div>

        <div className="flex  justify-center gap-2">
          <h1 className="text-[22px] font-semibold text-[#302F51]">
            Select a Month
          </h1>
          <BsFilterRight className="text-3xl  text-[#FF6740] " />
        </div>
      </div>

      <div>
        <h1 className="text-[24px] font-bold text-[#302F51] mb-[50px]">Members</h1>
      </div>
      <div>
        <Flex gap="middle" vertical>
          <Flex align="center" gap="middle"></Flex>
          <Table columns={columns} dataSource={users} />
        </Flex>
      </div>
    </div>
  );
};
export default MembersPage;
