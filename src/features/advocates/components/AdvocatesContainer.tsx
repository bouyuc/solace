"use client";

import React from "react";
import { Alert } from "antd";
import { SearchBar } from "../../../components";
import { AdvocateTable } from "./AdvocateTable";
import { useAdvocates } from "../hooks/useAdvocates";

export const AdvocatesContainer: React.FC = () => {
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
  } = useAdvocates();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <>
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
    </>
  );
};
