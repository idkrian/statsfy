import { useRouter } from "next/router";
import logo from "../images/spotify.png";
import Image from "next/image";

const client_id = "287c949757504329b8508ecd7671196c";
const response_type = "token";
const auth_endpoint = "https://accounts.spotify.com/authorize";
const redirect_url = "http://localhost:3000/stats/";
const scopes =
  "user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative user-read-email";

export default function Home() {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    router.push(
      `${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=${response_type}&scope=${scopes}`
    );
  };
  return (
    <>
      <div className="bg-gradient-to-b from-[#6441A5] to-[#2a0845] w-screen h-screen flex items-center justify-center text-4xl">
        <div className="container flex items-center justify-center">
          <div className="my-5">
            <p>See stats about your songs, playlists and albums!</p>
            <a className="text-xl" onClick={handleClick}>
              <button className="rounded-xl bg-black p-3">Try now!</button>
            </a>
          </div>
          <div>
            <Image
              className="animate-wiggle animate-infinite animate-ease-in"
              src={logo}
              width={400}
              height={400}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </>
  );
}
