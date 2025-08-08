"use client";

import React from "react";
import { Alert, Typography } from "antd";
import { useFetchAdvocates } from "../features/advocates";
import { AdvocateTable } from "../features/advocates/components/AdvocateTable";
import { SearchBar } from "../components";

const { Title } = Typography;

export default function Home() {
  const {
    advocates,
    isFetching,
    error,
    searchTerm,
    setSearchTerm,
    resetSearch,
    page,
    setPage,
    pageSize,
    setPageSize,
    total,
  } = useFetchAdvocates();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  if (error) {
    return (
      <div style={{ padding: "24px" }}>
        <Title level={1}>Solace Advocates</Title>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={1}>Solace Advocates</Title>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onReset={resetSearch}
        debounceMs={300}
      />

      <AdvocateTable
        advocates={advocates}
        loading={isFetching}
        pageSize={pageSize}
        page={page}
        total={total}
        onChangePage={setPage}
        onChangePageSize={setPageSize}
      />
    </div>
  );
}
