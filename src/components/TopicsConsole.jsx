import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function TopicsConsole() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Link to="/cooking" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            backgroundColor: "#FFC0CB",
            padding: "15px",
            margin: "0 10px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#FF69B4",
            },
          }}
        >
          <Typography variant="h6" color="textPrimary">
            Cooking
          </Typography>
        </Box>
      </Link>

      <Link to="/coding" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            backgroundColor: "#ADD8E6",
            padding: "15px",
            margin: "0 10px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#87CEEB",
            },
          }}
        >
          <Typography variant="h6" color="textPrimary">
            Coding
          </Typography>
        </Box>
      </Link>

      <Link to="/football" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            backgroundColor: "#90EE90",
            padding: "15px",
            margin: "0 10px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#3CB371",
            },
          }}
        >
          <Typography variant="h6" color="textPrimary">
            Football
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}
