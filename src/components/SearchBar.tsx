"use client";

import React from "react";

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
    <div>
      <p>Search</p>
      <p>
        Searching for: <span id="search-term">{searchTerm}</span>
      </p>
      <input style={{ border: "1px solid black" }} onChange={onChange} />
      <button onClick={onReset}>Reset Search</button>
    </div>
  );
};
