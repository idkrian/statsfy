import { useEffect, useState } from "react";
import axios from "axios";
import Stats from "./stats";
import logo from "../images/spotify.png";
import Image from "next/image";

const client_id = "287c949757504329b8508ecd7671196c";
const response_type = "token";
const auth_endpoint = "https://accounts.spotify.com/authorize";
const redirect_url = "http://localhost:3000/stats/";
const scopes = "user-top-read";
console.log(
  `${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=${response_type}&scope=${scopes}`
);

export default function Home() {
  return (
    <>
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
        <a
          href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=${response_type}&scope=${scopes}`}
        >
          <button>Clica aqui</button>
        </a>
      </div>
    </>
  );
}
