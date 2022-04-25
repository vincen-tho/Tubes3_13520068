import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Axios from "axios";

const TestDNA = () => {
  const [inputValue, setInputValue] = useState({
    nama: "",
    sequence: "",
    namaPenyakit: "",
  });
  const [files, setFiles] = useState();
  const clear = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setInputValue({
      inputValue: [{}],
    });
  };
  const clearFile = () => {
    setFiles(null);
  };
  const uploadHandler = (event) => {
    clearFile();
    const file = event.target.files[0];
    setFiles(file);
    const formData = new FormData();
    formData.append(inputValue.sequence, file, inputValue.sequence);
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let inputName = event.target.name;
    if (event.target.name == "sequence") uploadHandler(event);
    setInputValue({ ...inputValue, [inputName]: inputValue });
  };
  const submit = (event) => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    event.preventDefault();
    Axios.post(url, {
      name: inputValue.nama,
      file: files,
      namaPenyakit: inputValue.namaPenyakit,
    }).catch((err) => console.log(err));
    console.log(files);
    clear();
    clearFile();
  };

  return (
    <div>
      <div className=" w-3/5 border border-indigo-600 rounded-lg mx-auto mt-16 p-6 ">
        <p className="text-2xl font-bold text-center py-4">Tes DNA</p>
        <form onSubmit={submit}>
          <div className="md:columns-3 py-6">
            <div>
              <label>Nama Pengguna</label>
              <TextField
                name="nama"
                type="text"
                value={inputValue.nama}
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
                name="namaPenyakit"
                type="text"
                value={inputValue.namaPenyakit}
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
    </div>
  );
};

export default TestDNA;
