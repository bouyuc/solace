"use client";

import React from "react";
import { Typography } from "antd";
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
    refetch,
  } = useFetchAdvocates();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="p-6">
      <Title level={1}>Solace Advocates</Title>

      <SearchBar
        className="mb-4"
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
        error={error}
        refetch={refetch}
      />
    </div>
  );
}
