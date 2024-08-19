import { Box, Typography } from "@mui/material";

interface Props {
  msg: string;
  errorCode: number;
  errorImg?: string;
}
export default function ErrorPage({
  msg = "Ooops! Page not found!",
  errorCode = 404,
  errorImg = "/assets/page-not-found.webp",
}: Props) {
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
        <Box
          component="img"
          src={errorImg}
          alt="Not Found"
          sx={{ width: "300px", height: "auto" }}
        />
      </Box>
      <Typography variant="h5" color="error">
        {errorCode} - {msg}
      </Typography>
    </Box>
  );
}
