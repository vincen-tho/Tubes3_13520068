// router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import History from "./components/History";
import InputPenyakit from "./components/InputPenyakit";
import TestDNA from "./components/TestDNA";

import {
  createTheme,
  CssBaseline,
  Paper,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#8d6e63",
    },
    secondary: {
      main: "#c62828",
    },
  },
});
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="riwayat" element={<History />} />
          <Route path="tambahkan-penyakit" element={<InputPenyakit />} />
          <Route path="tes-dna" element={<TestDNA />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
