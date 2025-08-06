"use client";

import React from "react";
import { Table, Tag, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Advocate, AdvocateTableProps } from "../types";

export const AdvocateTable: React.FC<AdvocateTableProps> = ({
  advocates,
  loading = false,
  pageSize = 10,
}) => {
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
    <Table<Advocate>
      columns={columns}
      dataSource={advocates}
      loading={loading}
      rowKey={(record: Advocate, index?: number) =>
        record.id?.toString() || index?.toString() || "0"
      }
      pagination={{
        pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number) => `Total ${total} advocates`,
      }}
      style={{ marginTop: 16 }}
    />
  );
};
