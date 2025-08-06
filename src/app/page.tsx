"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "../components";
import { Table, Typography, Tag, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Advocate } from "../types";

const { Title } = Typography;

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        advocate.firstName.toLowerCase().includes(searchLower) ||
        advocate.lastName.toLowerCase().includes(searchLower) ||
        advocate.city.toLowerCase().includes(searchLower) ||
        advocate.degree.toLowerCase().includes(searchLower) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchLower)
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm) ||
        advocate.phoneNumber.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  const columns: ColumnsType<Advocate> = [
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
          {specialties.map((specialty: string, idx: number) => (
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

      <Table<Advocate>
        columns={columns}
        dataSource={filteredAdvocates}
        loading={loading}
        rowKey={(record: Advocate, index?: number) =>
          record.id?.toString() || index?.toString() || "0"
        }
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: number) => `Total ${total} advocates`,
        }}
        style={{ marginTop: 16 }}
      />
    </div>
  );
}
