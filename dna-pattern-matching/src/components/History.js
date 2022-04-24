import React from "react";
import DataTable from "./DataTable";

const History = () => {
  return (
    <div className=" w-3/5 border border-indigo-600 rounded-lg mx-auto mt-16 p-6 ">
      <p className="text-2xl font-bold text-center py-4">Hasil Tes</p>
      <DataTable />
    </div>
  );
};

export default History;
