import React, { useState } from "react";
import Button from "@mui/material/Button";
import DataTable from "./DataTable";
import { TextField } from "@mui/material";

const TestDNA = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    sequence: "",
    pattern: "",
  });

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let inputName = event.target.name;

    setInputValue({ ...inputValue, [inputName]: inputValue });
  };

  return (
    <div>
      <div className=" w-3/5 border border-indigo-600 rounded-lg mx-auto mt-16 p-6 ">
        <p className="text-2xl font-bold text-center py-4">Tes DNA</p>
        <form>
          <div className="md:columns-3 py-6">
            <div>
              <label>Nama Pengguna</label>
              <TextField
                name="nama"
                type="text"
                value={inputValue.name}
                onChange={handleChange}
                size="small"
              />
            </div>
            <div>
              <label>Sequence DNA</label>
              <TextField
                name="sequence"
                type="file"
                value={inputValue.sequence}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </div>
            <div>
              <label>Nama Penyakit</label>
              <TextField
                name="pattern"
                type="text"
                value={inputValue.pattern}
                onChange={handleChange}
                size="small"
              />
            </div>
          </div>
          <div className="text-center pt-6">
            <Button variant="contained">
              <input type="submit" value="Submit" />
            </Button>
          </div>
        </form>
      </div>
      <div className="w-3/5 mx-auto py-6">
        <p className="text-2xl text-center">Hasil Tes</p>
        <DataTable />
      </div>
    </div>
  );
};

export default TestDNA;
