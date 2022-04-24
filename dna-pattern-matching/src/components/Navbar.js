import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Typography, Toolbar } from "@mui/material";

const Navbar = () => {
  const urls = ["/", "/test-dna", "/history", "/input-penyakit"];
  const buttonMap = new Map();
  const pages = ["Home", "Test DNA", "History", "Input Penyakit"];
  urls.forEach((e, i = 0) => {
    buttonMap.set(e, pages[i]);
    i++;
  });
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <nav>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {urls.map((e) => (
              <Link to={e}>
                <Button
                  key={e}
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => navigate({ e })}
                >
                  {buttonMap.get(e)}
                </Button>
              </Link>
            ))}
          </Box>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
