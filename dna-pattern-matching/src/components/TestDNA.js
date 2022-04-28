import React, { useState } from "react";
import { TextField, DialogContent, Button } from "@mui/material";
import TableComponent from "./TableComponent";
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

  const [resultData, setResultData] = useState([]);

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

  const onSubmit = (event) => {
    const url = `/post-riwayat-penyakit`;
    event.preventDefault();

    const body = {
      name: inputValue.nama,
      sequence: currentFile.contents,
      namaPenyakit: inputValue.namaPenyakit,
    };

    Axios.post(url, body).then((response) => {
      setResultData(
        [response.data].map((item) => {
          return {
            tanggal: item.tanggal,
            pengguna: item.pengguna,
            penyakit: item.penyakit,
            similarity: item.similarity,
            status: item.status,
          };
        })
      ).catch((err) => console.log(err.response.data));
    });

    clear();
  };

  return (
    <div>
      <div className=" w-3/5 border border-gray-600 rounded-lg mx-auto mt-16 p-6 ">
        <p className="text-2xl font-bold text-center py-4">Tes DNA</p>
        <form onSubmit={onSubmit}>
          <div className="md:columns-3 py-6">
            <div className="pt-2">
              <TextField
                name="nama"
                type="text"
                label="Nama"
                value={inputValue.nama}
                onChange={handleChange}
                size="small"
                required
              />
            </div>
            <div className="pt-2">
              <TextField
                name="sequence"
                type="file"
                value={inputValue.sequence}
                onChange={handleChange}
                variant="outlined"
                size="small"
                label="Sequence DNA"
                InputLabelProps={{ shrink: true }}
                required
              />
            </div>
            <div className="pt-2">
              <TextField
                name="namaPenyakit"
                type="text"
                label="Nama Penyakit"
                value={inputValue.namaPenyakit}
                onChange={handleChange}
                size="small"
                required
              />
            </div>
          </div>
          <div className="text-center pt-6">
            <Button variant="contained" type="submit" value="Submit">
              Submit
            </Button>
          </div>
        </form>
        {resultData.length > 0 ? (
          <div className="py-6">
            <hr></hr>
            <p className="text-2xl font-bold text-center py-4">Hasil</p>
            <TableComponent tableData={resultData} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default TestDNA;
