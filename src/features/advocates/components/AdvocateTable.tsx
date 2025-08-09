"use client";

import React from "react";
import { Table, Tag, Space, Typography, Result, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Advocate, AdvocateTableProps } from "../types";
import { formattedPhoneNumber } from "@/utils/formatter";

export const AdvocateTable: React.FC<AdvocateTableProps> = ({
  advocates,
  loading = false,
  pageSize = 10,
  page = 1,
  total = 0,
  onChangePage,
  onChangePageSize,
  error = null,
  refetch = () => {},
}) => {
  const { Text } = Typography;

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
      title: "Years of Experience",
      dataIndex: "yearsOfExperience",
      key: "yearsOfExperience",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber: string) => (
        <Text>{formattedPhoneNumber(phoneNumber)}</Text>
      ),
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
  ];

  return (
    <Table<Advocate>
      columns={columns}
      dataSource={advocates}
      loading={loading}
      rowKey={(record: Advocate) => record.id.toString()}
      pagination={{
        current: page,
        pageSize,
        total,
        onChange: onChangePage,
        onShowSizeChange: (_: number, size: number) => onChangePageSize?.(size),
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number) => `Total ${total} advocates`,
      }}
      locale={{
        emptyText: error ? (
          <Result
            status="error"
            title="Failed to Load Data"
            subTitle={`Something went wrong. Please try again later.`}
            extra={
              <Button type="primary" onClick={refetch}>
                Retry
              </Button>
            }
          />
        ) : (
          "No data"
        ),
      }}
    />
  );
};
