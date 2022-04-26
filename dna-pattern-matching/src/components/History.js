import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import axios from "axios";
import SearchBar from "./SearchBar";

const History = () => {
  const [tableData, setTableData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get(`/get-riwayat-penyakit`);
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
    } catch (error) {
      alert(error); // todo ubah jadi sesuatu yang lebi bagus
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" w-3/5 border border-gray-600 rounded-lg mx-auto mt-16 p-6 ">
      <SearchBar tableData={tableData} setTableData={setTableData} />
      <p className="text-2xl font-bold text-center py-4">Hasil Tes</p>
      <TableComponent tableData={tableData} />
    </div>
  );
};

export default History;
