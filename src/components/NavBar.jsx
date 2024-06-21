import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Box,
  Button,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

const StyleLink = styled(Link)({
  textDecoration: "none",
  color: "black",
  marginRight: "10px",
  "&:hover": {
    color: "darkBlue",
  },
});

function NavBar() {
  return (
    <AppBar sx={{ p: "0  10px" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
          <Box
            component="img"
            src="/assets/NC-news-logo.png"
            alt="logo"
            sx={{ mr: 2, width: 100, height: 40, borderRadius: 2 }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit">
          <StyleLink sx={{ color: "#fff" }} to="/">
            Home
          </StyleLink>
        </Button>
        <Button color="inherit">
          <StyleLink sx={{ color: "#fff" }} to="/">
            Sign in
          </StyleLink>
        </Button>

        <Button color="inherit">
          <StyleLink sx={{ color: "#fff" }} to="/">
            Your article
          </StyleLink>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
