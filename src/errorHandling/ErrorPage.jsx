import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function ErrorPage({ msg, errorCode, errorImg }) {
  console.log("Error Image:", errorImg);
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
          src={errorImg}
          alt="Not Found"
          style={{ width: "300px", height: "auto" }}
        />
      </Box>
      <Typography variant="h5" color="error">
        {errorCode} - {msg}
      </Typography>
    </Box>
  );
}

ErrorPage.propTypes = {
  msg: PropTypes.string.isRequired,
  errorCode: PropTypes.number.isRequired,
  errorImg: PropTypes.string,
};

ErrorPage.defaultProps = {
  msg: "Ooops! Page not found!",
  errorCode: 404,
  errorImg: "/assets/page-not-found.webp",
};
