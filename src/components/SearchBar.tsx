"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, Space, Typography } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDebouncedCallback } from "../hooks/useDebouncedCallback";

const { Text } = Typography;

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  debounceMs?: number;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onReset,
  debounceMs = 300,
  className = "",
}) => {
  const [localValue, setLocalValue] = useState(searchTerm);
  const [debouncedSearch, cancelSearch] = useDebouncedCallback(
    onSearchChange,
    debounceMs
  );

  // Sync external searchTerm changes (like reset)
  useEffect(() => {
    setLocalValue(searchTerm);
  }, [searchTerm]);

  // Trigger debounced search when local value changes
  useEffect(() => {
    debouncedSearch(localValue);
  }, [localValue, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleClear = () => {
    setLocalValue("");
    cancelSearch(); // Cancel any pending debounced call
    onSearchChange(""); // Immediate clear for better UX
  };
  return (
    <div className={className}>
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
          value={localValue}
          onChange={handleInputChange}
          allowClear
          onClear={handleClear}
        />
        <Button type="default" icon={<ReloadOutlined />} onClick={onReset}>
          Reset
        </Button>
      </Space.Compact>
    </div>
  );
};
