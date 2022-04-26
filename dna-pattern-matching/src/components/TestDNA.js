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
  const [currentFile, setFiles] = useState({
    contents: "",
  });
  const clear = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setInputValue({
      nama: "",
      sequence: "",
      namaPenyakit: "",
    });
  };
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setFiles({ ...currentFile, ["contents"]: reader.result });
    };
    reader.onerror = () => {
      console.log("error");
    };
  };

  const handleChange = (event) => {
    let newInputValue = event.target.value;
    let newInputName = event.target.name;
    if (event.target.name === "sequence") uploadHandler(event);
    setInputValue({ ...inputValue, [newInputName]: newInputValue });
  };
  const submit = (event) => {
    const url = `/post-riwayat-penyakit`;
    event.preventDefault();

    Axios.post(url, {
      name: inputValue.nama,
      sequence: currentFile.contents,
      namaPenyakit: inputValue.namaPenyakit,
    }).catch((err) => alert(err.response.data)); // TODO: ubah jadi sesuatu yg lebi bagus
    clear();
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
