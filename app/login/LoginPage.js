"use client";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import BookFace from "../components/BookFace";

export default function LoginPage() {
  const [loginInfo, updateInfo] = useState({ user: "", pass: "" });
  const [tried, updateTried] = useState(false);
  const router = useRouter();

  function handleClick() {
    router.push("/login/identify");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    updateInfo((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(event) {
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          username: loginInfo.user,
          password: loginInfo.pass,
        },
        { withCredentials: true }
      );
      router.push("/");
    } catch (err) {
      if (err.response.status == 401) {
        updateTried(true);
      } else {
        console.log(err);
      }
    }
  }

  return (
    <div className="login-card">
      <Card sx={{ borderRadius: 10, margin: 15 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <div className="login-form">
            <BookFace />
            <TextField
              label="Email or Username"
              variant="outlined"
              name="user"
              value={loginInfo.user}
              sx={{ maxWidth: 500, width: 500 }}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              name="pass"
              type="password"
              value={loginInfo.pass}
              sx={{ maxWidth: 500, width: 500 }}
              onChange={handleChange}
            />
            <Button onClick={handleSubmit} variant="contained">
              Log In
            </Button>
          </div>
          {tried && (
            <Typography>
              Incorrect login credentials. Please try again.
            </Typography>
          )}
          <Typography
            onClick={handleClick}
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Forgot Password?
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
