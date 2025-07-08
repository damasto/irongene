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
import ConfirmationDialog from "../components/ConfirmationDialog";

export default function SignUp({ onSwitchToSignIn }) {

  const { verifyEmail, verifyPassword, verifyName } = useContext(VerifyInputContext)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("")

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
    const { firstName, lastName, email, password, confirmPassword } = formData

    const checkUserData = (() => {
      if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        setError("Please fill out all fields!");
        return false
      }

      if (!verifyEmail(email)) {
        setError("Provide a valid email address.")
        return false
      }

      if (!verifyPassword(password)) {
        setError("Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.")
        return false
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match!")
        return false
      }

      if (!verifyName(firstName) || !verifyName(lastName)) {
        setError("Numbers or special characters are not allowed for name and last name")
        return false
      }

      return true
    })()
     
    console.log("data", checkUserData)
    if(checkUserData) {
      try {
        await api.post("/auth/signup", formData);
        setMessage("Your account has been created, you will be redirected to the login page")
        setOpen(true)
        setTimeout(() => {
          navigate("/signin")
          setOpen(false)
          setMessage("")
        }, 3000);
      } catch (err) {
        if (err.response) {
          if(err.response.status === 400) {
            setError(err.response.data.message)
          } else {
            setError("An error ocurred, please try again")
          }
        } else {
          console.error("Network error: ", err.message);
          setError("Unable to connect to the server")
        }
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
        <Typography variant="body2" color="error" align="center">{error}</Typography>
        <Button type="submit" variant="contained" fullWidth>
          Create Account
        </Button>
        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <Link component="button" onClick={onSwitchToSignIn}>
            Sign In
          </Link>
        </Typography>
        <ConfirmationDialog open={open} message={message}/>
      </Box>
    </Paper>
  );
}