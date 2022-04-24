import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar } from "@mui/material";

const Navbar = () => {
  const urls = ["/", "/tes-dna", "/riwayat", "/tambahkan-penyakit"];
  const pages = ["Beranda", "Tes DNA", "Riwayat", "Tambahkan Penyakit"];
  const buttonMap = new Map();
  urls.forEach((e, i = 0) => {
    buttonMap.set(e, pages[i]);
    i++;
  });
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <nav>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {urls.map((e) => (
              <Button
                key={e}
                onClick={() => navigate(e)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {buttonMap.get(e)}
              </Button>
            ))}
          </Box>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
