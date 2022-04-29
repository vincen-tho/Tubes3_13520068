import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const SearchBar = ({ setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(() => event.target.value);
  };
  return (
    <div>
      <TextField
        type="search"
        label="Search"
        onChange={handleChange}
        variant="outlined"
        size="small"
        fullWidth
      />
    </div>
  );
};

export default SearchBar;
