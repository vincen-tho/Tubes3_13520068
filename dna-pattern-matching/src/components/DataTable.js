import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function DataTable() {
  const [tableData, setTableData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get(
        `/penyakit`
      );
      console.log(response);

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
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const rows = tableData;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tanggal</TableCell>
            <TableCell>Pengguna</TableCell>
            <TableCell>Penyakit</TableCell>
            <TableCell>Similarity</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.tanggal}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.tanggal}
              </TableCell>
              <TableCell>{row.pengguna}</TableCell>
              <TableCell>{row.penyakit}</TableCell>
              <TableCell>{row.similarity}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
