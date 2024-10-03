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

  const handleAvatarClick = (user) => {
    verifyUser(user.username, user.password);
  };

  const handleManualLogin = (e) => {
    e.preventDefault();
    const user = { username, password };
    verifyUser(user.username, user.password);
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

        <Typography variant="h6" align="center" sx={{ mt: 3 }}>
          Or login with:
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {users.map((user) => (
            <Grid item key={user.username}>
              <div
                onClick={() => handleAvatarClick(user)}
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                <Avatar
                  alt={user.name}
                  src={user.avatar_url}
                  sx={{ width: 60, height: 60 }}
                />
                <Typography variant="body1">{user.name}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserLogin;
