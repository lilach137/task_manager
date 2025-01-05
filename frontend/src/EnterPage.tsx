import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Paper, Box, Snackbar, Alert } from "@mui/material";
import { authenticateUser } from "./API";

const Login = ({setUserLoadFlag}: {setUserLoadFlag: (state: boolean) => void}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = isRegistering
      ? { email, password, name }
      : { email, password };
  
    try {
      const authenticate = await authenticateUser(payload);
  
      if (authenticate) {
        setSnackbarMessage(isRegistering ? "Registration successful!" : "Login successful!");
        const loggedInUser = {id: authenticate.user.id };
        sessionStorage.setItem("user", JSON.stringify(loggedInUser));

        
        setUserLoadFlag(true); 

        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/tasks");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isRegistering ? "Register" : "Login"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              required
            />
          </Box>

          {isRegistering && (
            <Box mb={2}>
              <TextField
                label="Name"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                required
              />
            </Box>
          )}

          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              required
            />
          </Box>

          <Box mb={2}>
            <Button type="submit" variant="contained" fullWidth>
              {isRegistering ? "Register" : "Login"}
            </Button>
          </Box>
        </form>

        <Typography variant="body2" align="center">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <span style={{ cursor: "pointer", color: "#1976d2" }} onClick={handleToggle}>
                Login
              </span>
            </>
          ) : (
            <>
              New account?{" "}
              <span style={{ cursor: "pointer", color: "#1976d2" }} onClick={handleToggle}>
                Please register
              </span>
            </>
          )}
        </Typography>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
