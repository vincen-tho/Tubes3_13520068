// router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Navbar from "./components/Navbar";
import History from "./components/History";
import InputPenyakit from "./components/InputPenyakit";
import TestDNA from "./components/TestDNA";

// styling
import AppBar from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
        <Route path="input-penyakit" element={<InputPenyakit />} />
        <Route path="test-dna" element={<TestDNA />} />
      </Routes>
    </BrowserRouter>
  );
}

const Home = () => (
  <div>
    <h1>Hello</h1>
  </div>
);
