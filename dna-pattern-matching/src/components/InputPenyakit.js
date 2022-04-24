import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const InputPenyakit = () => {
  const [inputValue, setInputValue] = useState({
    penyakit: "",
    sequence: "",
  });

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let inputName = event.target.name;

    setInputValue({ ...inputValue, [inputName]: inputValue });
  };

  return (
    <div>
      <div className=" w-3/5 border border-indigo-600 rounded-lg mx-auto mt-16 p-6 ">
        <p className="text-2xl font-bold text-center ">Tambahkan Penyakit</p>
        <form>
          <div className="md:columns-2 py-6 ">
            <div>
              <label>Nama Penyakit</label>
              <br />
              <TextField
                name="penyakit"
                type="text"
                value={inputValue.penyakit}
                onChange={handleChange}
                size="small"
              />
            </div>
            <div>
              <label>Sequence DNA</label>
              <br />
              <TextField
                name="sequence"
                type="file"
                value={inputValue.sequence}
                onChange={handleChange}
                variant="outlined"
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
    </div>
  );
};

export default InputPenyakit;
