"use client";
import React, { useState } from "react";
import { Button, Flex, Table } from "antd";
import { BiSolidDonateHeart } from "react-icons/bi";
import { BsFilterRight } from "react-icons/bs";

const DonationsPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
            <BiSolidDonateHeart className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
          </div>
          <h1 className="text-[22px] text-[#302F51] font-semibold">
            November Donation
          </h1>
          <h1 className="text-[40px] text-[#302F51] font-bold">$2,100.00</h1>
        </div>

        <div className="w-fit bg-white shadow-md px-6 py-2 rounded-lg">
          <div>
            <BiSolidDonateHeart className="text-5xl  rounded-full p-3 bg-[#FF6740] text-white" />
          </div>
          <h1 className="text-[22px] text-[#302F51] font-semibold">
            Total Donation
          </h1>
          <h1 className="text-[40px] text-[#302F51] font-bold">$12,909.00</h1>
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
        <h1 className="text-[24px] font-bold text-[#302F51] mb-[50px]">Donations</h1>
      </div>
      <div>
        <Flex gap="middle" vertical>
          <Flex align="center" gap="middle"></Flex>
          <Table columns={columns} dataSource={donations} />
        </Flex>
      </div>
    </div>
  );
};

export default DonationsPage;
