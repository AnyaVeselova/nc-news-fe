import { useEffect, useState } from "react";
import { fetchUsers, verifyUser } from "../utils/api";
import {
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
  Container,
  Paper,
  Alert,
} from "@mui/material";

const UserLogin = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const handleManualLogin = (e) => {
    e.preventDefault();
    verifyUser(username, password);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 25 }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        This page is currently under development. You will be able to login and
        write your own articles shortly.
      </Alert>
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleManualLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default UserLogin;
