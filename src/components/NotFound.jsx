import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <img
          src={"../../public/assets/page-not-found.webp"}
          alt="Not Found"
          style={{ width: "300px", height: "auto" }}
        />
      </Box>
      <Typography variant="h5" color="error">
        Oops! The page you're looking for doesn't exist.
      </Typography>
    </Box>
  );
}
