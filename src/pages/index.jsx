import { useEffect, useState } from "react";
import axios from "axios";
import Stats from "./Stats";
import logo from "../images/spotify.png";
import Image from "next/image";

const baseURL = "https://api.spotify.com/v1/";
const client_id = "287c949757504329b8508ecd7671196c";
const response_type = "token";
const auth_endpoint = "https://accounts.spotify.com/authorize";
const redirect_url = "http://localhost:3000/";

export default function Home() {
  const [token, setToken] = useState("");
  const teste = async () => {
    const data = await axios.post(`${baseURL}/me/top/artists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data.data);
  };
  console.log(token);
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // getToken()

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <>
      {/* <div className="bg-amber-200 w-screen h-screen flex items-center justify-center text-8xl"> */}
      <div className="bg-gradient-to-b from-[#6441A5] to-[#2a0845] w-screen h-screen flex items-center justify-center text-4xl">
        <div>Clique Aqui e veja suas stats!</div>
        <div>
          <Image
            src={logo}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </div>
      {/* {!token ? (
        <a
          href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=${response_type}`}
        >
          <button>Clica aqui</button>
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )} */}
    </>
  );
}
