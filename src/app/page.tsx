"use client";

import { SearchBar, AdvocateTable } from "../components";
import { Typography, Alert } from "antd";
import { useAdvocates } from "../hooks";

const { Title } = Typography;

export default function Home() {
  const {
    filteredAdvocates,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    resetSearch,
  } = useAdvocates();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return (
      <div style={{ padding: "24px" }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={1}>Solace Advocates</Title>

      <SearchBar
        searchTerm={searchTerm}
        onChange={handleSearchChange}
        onReset={resetSearch}
      />

      <AdvocateTable
        advocates={filteredAdvocates}
        loading={loading}
        pageSize={10}
      />
    </div>
  );
}
