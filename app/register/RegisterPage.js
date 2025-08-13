"use client";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import BookFace from "../components/BookFace";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RegisterPage() {
  const [registerInfo, updateInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  function handleChange(event) {
    const { name, value } = event.target;
    updateInfo((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(event) {
    console.log(backendURL + "/register");
    try {
      const response = await axios.post(
        backendURL + "/register",
        {
          username: registerInfo.username,
          email: registerInfo.email,
          password: registerInfo.password,
        },
        { withCredentials: true }
      );
      router.push("/");
    } catch (err) {
      if (err.status == 401) {
        updateTried(true);
      } else {
        console.log(err);
      }
    }
  }

  return (
    <div className="register-card">
      <Card sx={{ borderRadius: 10, margin: 15 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <BookFace />
          <div className="register-form">
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={registerInfo.user}
              sx={{ maxWidth: 500, width: 500 }}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={registerInfo.user}
              sx={{ maxWidth: 500, width: 500 }}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={registerInfo.pass}
              sx={{ maxWidth: 500, width: 500 }}
              onChange={handleChange}
            />
            <Button onClick={handleSubmit} variant="contained">
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
