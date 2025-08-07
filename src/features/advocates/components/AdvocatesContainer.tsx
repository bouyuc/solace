"use client";

import React from "react";
import { Alert } from "antd";
import { SearchBar } from "../../../components";
import { AdvocateTable } from "./AdvocateTable";
import { useAdvocates } from "../hooks/useAdvocates";

export const AdvocatesContainer: React.FC = () => {
  const {
    advocates,
    loading,
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onChange={handleSearchChange}
        onReset={resetSearch}
      />

      <AdvocateTable
        advocates={advocates}
        loading={loading}
        pageSize={pageSize}
        page={page}
        total={total}
        onChangePage={setPage}
        onChangePageSize={setPageSize}
      />
    </>
  );
};
