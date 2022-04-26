import React, { useState } from "react";
import { TextField, DialogContent, Button } from "@mui/material";
import Axios from "axios";

const InputPenyakit = () => {
  const [inputValue, setInputValue] = useState({
    namaPenyakit: "",
    sequence: "",
  });
  const [currentFile, setFiles] = useState({
    contents: "",
  });
  const clear = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setInputValue({
      namaPenyakit: "",
      sequence: "",
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
    const url = `/post-input-penyakit`;
    event.preventDefault();

    Axios.post(url, {
      namaPenyakit: inputValue.namaPenyakit,
      sequence: currentFile.contents,
    })
      .then(console.log("uploaded"))
      .catch((err) => console.log(err));
    clear();
  };

  return (
    <div>
      <div className=" w-3/5 border border-gray-600 rounded-lg mx-auto mt-16 p-6 ">
        <p className="text-2xl font-bold text-center ">Tambahkan Penyakit</p>
        <form onSubmit={submit}>
          <div className="md:columns-2 py-6 ">
            <div>
              <DialogContent>
                <TextField
                  name="namaPenyakit"
                  type="text"
                  value={inputValue.penyakit}
                  onChange={handleChange}
                  size="small"
                  label="Nama Penyakit"
                  required
                  margin="dense"
                />
              </DialogContent>
            </div>
            <div>
              <DialogContent>
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
                  margin="dense"
                />
              </DialogContent>
            </div>
          </div>
          <div className="text-center pt-6">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputPenyakit;
