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
      const response = await axios.get("http://localhost:4000/current-user", {
        withCredentials: true,
      });
      return response;
    }
    checkCookies()
      .then((response) => {
        setUserInfo((prev) => ({ ...prev, ...response.data }));
      })
      .catch((err) => {
        console.error(err);
      });
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
