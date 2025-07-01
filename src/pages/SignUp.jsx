import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { VerifyInputContext } from "../context/inputVerification.context";

export default function SignUp({ onSwitchToSignIn }) {

  const {verifyEmail, verifyPassword} = useContext(VerifyInputContext)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up with", formData);

    createUser();
  };

  const createUser = async () => {
    const {firstName, lastName, email, password, confirmPassword} = formData
    if (firstName.trim() && lastName.trim() && email.trim() && password.trim()) {
      if(verifyEmail(email) && verifyPassword(password)) {
        if(password !== confirmPassword) {
          console.log("passwords do not match")
          return
        }

        try{
          await api.post("/auth/signup", formData);
          navigate("/signin");
        } catch(err) {
          console.log(err)
        } 
      } else {
        return
      }
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
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Name"
          name="firstName"
          variant="outlined"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="lastName"
          variant="outlined"
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" fullWidth>
          Create Account
        </Button>
        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <Link component="button" onClick={onSwitchToSignIn}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
}