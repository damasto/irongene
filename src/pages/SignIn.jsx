import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom"
import api from "../api/axios";
import { AuthContext } from "../context/auth.context";



export default function SignIn({ onSwitchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {storeToken, authenticateUser} = useContext(AuthContext)


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in with", { email, password });
    login();
  };

  const login = async () => {

    let reqBody;

    if (email.trim() && password.trim()) {
      reqBody = {
        email: email,
        password: password
      }
    }

    if (!reqBody) {
      return
    }

    try {
      const res = await api.post("/auth/login", reqBody);
      storeToken(res.data.authToken);
      authenticateUser();
      navigate("/")
    } catch (err) {
      console.log(err)
    }
    
  }


  return (
    <Paper
      elevation={3}
      sx={{
        width: 400,
        mx: "auto",
        mt: 10,
        p: 4,
        borderRadius: 4,
        backgroundColor: "#f5f5f5",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign In
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>
        <Typography variant="body2" align="center">
          Don’t have an account?{" "}
          <RouterLink to="/signup">
            Sign Up
          </RouterLink>
        </Typography>
      </Box>
    </Paper>
  );
}
