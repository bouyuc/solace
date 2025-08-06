"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "../components";
import { Table, Typography, Tag, Space } from "antd";

const { Title } = Typography;

export default function Home() {
  const [advocates, setAdvocates] = useState<any[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("fetching advocates...");
    setLoading(true);
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setLoading(false);
      });
    });
  }, []);

  const onChange = (e: any) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
    },
    {
      title: "Specialties",
      dataIndex: "specialties",
      key: "specialties",
      render: (specialties: string[]) => (
        <Space direction="vertical" size={2}>
          {specialties.map((specialty, idx) => (
            <Tag key={idx} color="blue">
              {specialty}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Years of Experience",
      dataIndex: "yearsOfExperience",
      key: "yearsOfExperience",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={1}>Solace Advocates</Title>

      <SearchBar
        searchTerm={searchTerm}
        onChange={onChange}
        onReset={onClick}
      />

      <Table
        columns={columns}
        dataSource={filteredAdvocates}
        loading={loading}
        rowKey={(record: any, index: any) => index || 0}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: any) => `Total ${total} advocates`,
        }}
        style={{ marginTop: 16 }}
      />
    </div>
  );
}
