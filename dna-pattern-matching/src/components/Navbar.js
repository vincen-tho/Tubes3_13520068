import React from "react";
import { Link } from "react-router-dom";
import { AppBar } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <nav>
        <h3>Logo</h3>
        <Link to="/history">History</Link>,{" | "}
        <Link to="/input-penyakit">Input penyakit</Link>
      </nav>
    </AppBar>
  );
};

export default Navbar;
