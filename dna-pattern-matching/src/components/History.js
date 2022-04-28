import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import axios from "axios";
import SearchBar from "./SearchBar";

const History = () => {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setTableData([]);
    getData();
  };
  const getData = () => {
    axios
      .get(`/get-riwayat-penyakit`, {
        params: { searchTerm: searchTerm },
      })
      .then((response) => {
        setTableData(
          response.data.map((item) => {
            return {
              tanggal: item.tanggal,
              pengguna: item.pengguna,
              penyakit: item.penyakit,
              similarity: item.similarity,
              status: item.status,
            };
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" w-3/5 border border-gray-600 rounded-lg mx-auto mt-16 p-6 ">
      <form onSubmit={handleSubmit}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </form>
      <p className="text-2xl font-bold text-center py-4">Hasil Tes</p>
      <TableComponent tableData={tableData} />
    </div>
  );
};

export default History;
