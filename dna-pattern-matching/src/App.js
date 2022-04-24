import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Button variant="contained">
          <Link to="/history">Go to History</Link>
        </Button>
      </nav>
    </div>
  );
}
