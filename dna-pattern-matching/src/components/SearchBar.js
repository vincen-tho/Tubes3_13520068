import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const SearchBar = ({ tableData, setTableData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
    setTableData(
      tableData.filter((val) => {
        if (searchTerm == "") {
          return true;
        } else {
          if (val.penyakit.toLowerCase().includes(searchTerm.toLowerCase()))
            return true;
          else return false;
        }
      })
    );
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
