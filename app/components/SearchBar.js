"use client";

import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import "../../public/App.css";
import RegisterButton from "./RegisterButton";
import LoginButton from "./LoginButton";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const darkTheme = createTheme({
  palette: { mode: "dark" },
});

export default function SearchBar() {
  const router = useRouter();

  const [userInfo, setUserInfo] = React.useState({
    username: "",
    loggedIn: false,
  });

  const [data, setData] = React.useState({
    title: "",
    author: "",
  });

  React.useEffect(() => {
    async function checkCookies() {
      try {
        const response = await axios.get(backendURL + "/current-user", {
          withCredentials: true,
        });
        return response;
      } catch (err) {
        return { username: "", loggedIn: false };
      }
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.loggedIn) {
      checkCookies()
        .then((response) => {
          const data = {
            loggedIn: response.data.loggedIn,
            username: response.data.username,
          };
          localStorage.setItem("user", JSON.stringify(data));
          setUserInfo((prev) => ({ ...prev, ...data }));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setUserInfo((prev) => ({ ...prev, ...storedUser }));
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const search = (event) => {
    event.preventDefault();
    router.push(
      `/search?title=${encodeURIComponent(
        data.title
      )}&author=${encodeURIComponent(data.author)}`
    );
  };

  function handleClick() {
    router.push("/");
  }

  return (
    <div className="title-bar">
      <div className="logo-name">
        <Typography
          onClick={handleClick}
          variant="h4"
          component="div"
          className="name"
        >
          BookFace
        </Typography>
      </div>
      <form className="search-bar" onSubmit={search}>
        <ThemeProvider theme={darkTheme}>
          <TextField
            label="Book Title"
            variant="outlined"
            onChange={handleChange}
            value={data.title}
            name="title"
            sx={{ maxWidth: 400, mr: 2 }}
            fullWidth
          />
          <TextField
            label="Author"
            variant="outlined"
            onChange={handleChange}
            value={data.author}
            name="author"
            sx={{ maxWidth: 400, mr: 2 }}
            fullWidth
          />
        </ThemeProvider>
        <Fab type="submit" className="search-button">
          <SearchIcon />
        </Fab>
      </form>
      {userInfo.loggedIn ? (
        <Typography className="greeting">Hello, {userInfo.username}</Typography>
      ) : (
        <div className="register-login">
          <RegisterButton />
          <LoginButton />
        </div>
      )}
    </div>
  );
}
