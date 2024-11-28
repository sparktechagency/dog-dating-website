"use client"
import React, { useState } from 'react';
import { Button, Flex, Table } from 'antd';

const DonationsPage = () => {

      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
//   const start = () => {
//     setLoading(true);
//     // ajax request after empty completing
//     setTimeout(() => {
//       setSelectedRowKeys([]);
//       setLoading(false);
//     }, 1000);
//   };

  const donations = [
    {
      donationDate: "12-10-2024",
      donatorName: "Marilyn Terry",
      shelter: "Bartell Animal Rescue",
      amount: "$300.00",
      email: "marilyn.terry1@example.com"
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Alice Johnson",
      shelter: "Whisker Haven Shelter",
      amount: "$250.00",
      email: "alice.johnson@example.com"
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Ella Parker",
      shelter: "Paws and Claws Sanctuary",
      amount: "$350.00",
      email: "ella.parker@example.com"
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Sophia Adams",
      shelter: "Furry Friends Haven",
      amount: "$280.00",
      email: "sophia.adams@example.com"
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Olivia Mitchell",
      shelter: "Happy Tails Refuge",
      amount: "$320.00",
      email: "olivia.mitchell@example.com"
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Liam Thompson",
      shelter: "Pet Haven Society",
      amount: "$270.00",
      email: "liam.thompson@example.com"
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Henry Roberts",
      shelter: "Companion Critters Shelter",
      amount: "$330.00",
      email: "henry.roberts@example.com"
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Ava White",
      shelter: "Purrfect Paws Haven",
      amount: "$260.00",
      email: "ava.white@example.com"
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Noah Davis",
      shelter: "Tail Waggers Sanctuary",
      amount: "$340.00",
      email: "noah.davis@example.com"
    },
    {
      donationDate: "12-10-2024",
      donatorName: "Isabella Clark",
      shelter: "Whisker Whims Shelter",
      amount: "$290.00",
      email: "isabella.clark@example.com"
    }
  ];

  const columns = [
    {
      title: 'Donation Date',
      dataIndex: 'donationDate',
    },
    {
      title: 'Donator Name',
      dataIndex: 'donatorName',
    },
    {
      title: 'Shelter',
      dataIndex: 'shelter',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];


//   donationDate: "12-10-2024",
//   donatorName: "Marilyn Terry",
//   shelter: "Bartell Animal Rescue",
//   amount: "$300.00",
//   email: "marilyn.terry1@example.com"

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
//   const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button> */}
        {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : null} */}
      </Flex>
      <Table  columns={columns} dataSource={donations} />
    </Flex>
        </div>
    );
};

export default DonationsPage;