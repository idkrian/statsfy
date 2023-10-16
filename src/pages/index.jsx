import { useRouter } from "next/router";
import Logo from "../images/spotify.png";
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
      <div className="bg-[url(../images/gifBg.gif)] bg-cover bg-center bg w-screen h-screen flex items-center justify-center bg-blend-saturation ">
        <div className="container text-4xl flex items-center justify-between px-56 w-full h-full backdrop-blur-[3px]">
          <div className="mx-5">
            <h1>See stats about your songs, artists, playlists and more!</h1>

            <a className="text-xl" onClick={handleClick}>
              <button className="rounded-xl bg-black p-3">Try now!</button>
            </a>
          </div>
          <div className="">
            <Image
              className="drop-shadow-md animate-wiggle animate-infinite animate-ease-in "
              src={Logo}
              width={400}
              height={300}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </>
  );
}
