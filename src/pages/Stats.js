import React, { useEffect, useState } from "react";
import { getTopArtists, getTopTracks, handleToken } from "@/helpers/api";

const Stats = () => {
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();

  useEffect(() => {
    async function getData() {
      const tokenData = await handleToken();
      const topArtistsData = await getTopArtists(tokenData);
      setTopArtists(topArtistsData);
      const topTrackData = await getTopTracks(tokenData);
      setTopTracks(topTrackData);
    }
    getData();
  }, []);
  //Implementar----

  // const logout = () => {
  //   setToken("");
  //   window.localStorage.removeItem("token");
  // };
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-scroll overflow-x-hidden scroll-smooth">
      <div className="snap-end bg-[#1a1a1a] h-screen flex items-center justify-center text-sm flex-col">
        <h1 className="text-6xl font-bold mb-4">Top Artists</h1>
        <div className="container max-w-6xl ">
          <div className="flex justify-between mx-auto">
            <div className="flex flex-col justify-center">
              {topArtists !== undefined &&
                topArtists.map((i, index) => (
                  <div key={i.id} className="flex items-center mx-4 my-1">
                    <span className="text-xl font-semibold mr-2">
                      {index + 1}
                    </span>
                    <p className="text-2xl font-semibold">{i.name}</p>
                  </div>
                ))}
            </div>
            <div>
              {topArtists !== undefined && (
                <div>
                  <img
                    src={topArtists[0].images[0].url}
                    className="rounded-xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="snap-end bg-[#1a1a1a] h-screen flex items-center justify-center text-sm flex-col">
        <h1 className="text-6xl font-bold mb-4">Top Tracks</h1>
        <div className="container max-w-6xl ">
          <div className="flex justify-between mx-auto">
            <div className="flex flex-col justify-center">
              {topTracks !== undefined &&
                topTracks.map((i, index) => (
                  <div key={i.id} className="flex items-center mx-4 my-1">
                    <span className="text-xl font-semibold mr-2">
                      {index + 1}
                    </span>
                    <p className="text-2xl font-semibold">{i.name}</p>
                  </div>
                ))}
            </div>
            <div>
              {topTracks !== undefined && (
                <div>
                  <img
                    src={topTracks[0].album.images[0].url}
                    className="rounded-xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="snap-end bg-lime-400 h-screen flex items-center justify-center text-8xl">
        1
      </div>
    </div>
  );
};

export default Stats;
