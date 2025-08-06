"use client";

import React from "react";
import { Input, Button, Space, Typography } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onChange,
  onReset,
}) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Text strong>Search</Text>
      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <Text>
          Searching for: <Text code>{searchTerm || "None"}</Text>
        </Text>
      </div>
      <Space.Compact style={{ width: "100%", maxWidth: 400 }}>
        <Input
          placeholder="Search advocates..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={onChange}
          allowClear
        />
        <Button type="default" icon={<ReloadOutlined />} onClick={onReset}>
          Reset
        </Button>
      </Space.Compact>
    </div>
  );
};
