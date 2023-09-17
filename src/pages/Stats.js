import React, { useEffect, useState } from "react";
import {
  getTopArtists,
  getTopTracks,
  handleToken,
  getRecentlyPlayed,
  getAudioFeatures,
} from "@/helpers/api";
import { Progress } from "@/components/ui/progress";

const Stats = () => {
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [audioFeatures, setAudioFeatures] = useState();
  const [analyzedTracks, setAnalyzedTracks] = useState();
  const labels = [
    "energy",
    "loudness",
    "acousticness",
    "danceability",
    "instrumentalness",
    "liveness",
    "loudness",
    "speechiness",
  ];
  async function handleRecentlyPlayed(tokenData, recentlyPlayedArray) {
    let minhaString = "";
    for (let i = 0; i < recentlyPlayedArray.length; i++) {
      minhaString += recentlyPlayedArray[i] + ",";
    }
    const audioFeaturesData = await getAudioFeatures(tokenData, minhaString);
    return audioFeaturesData;
  }

  async function handleAverage(value, testinhun) {
    const energy = testinhun.map((e) => e[value]);
    let sum = 0;
    for (let i = 0; i < energy.length; i++) {
      sum += energy[i];
    }
    return sum / energy.length;
  }

  async function analyseTracks(recentlyPlayedFormated) {
    let newArray = [];
    labels.forEach(async (item) => {
      const res = await handleAverage(item, recentlyPlayedFormated);
      newArray.push(res.toFixed(2));
    });

    return newArray;
  }
  function formatAnalysedTrack(trackAverage) {
    const track = {};
    for (let i = 0; i < trackAverage.length; i++) {
      track[labels[i]] = trackAverage[i];
    }
    console.log(track);
    return track;
  }

  useEffect(() => {
    async function getData() {
      const tokenData = await handleToken();
      const topArtistsData = await getTopArtists(tokenData);
      setTopArtists(topArtistsData);
      const topTrackData = await getTopTracks(tokenData);
      setTopTracks(topTrackData);

      const recentlyPlayedData = await getRecentlyPlayed(tokenData);
      setRecentlyPlayed(recentlyPlayedData);
      const recentlyPlayedArray = recentlyPlayedData.map((e) => e.track.id);
      const recentlyPlayedFormated = await handleRecentlyPlayed(
        tokenData,
        recentlyPlayedArray
      );
      const analyzedTracksArrayData = await analyseTracks(
        recentlyPlayedFormated
      );
      const analyzedTrack = formatAnalysedTrack(analyzedTracksArrayData);
      setAnalyzedTracks(analyzedTrack);
    }
    getData();
  }, []);

  //Implementar----
  // const logout = () => {
  //   setToken("");
  //   window.localStorage.removeItem("token");
  // };
  console.log(analyzedTracks.speechiness);
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
      <div className="snap-end bg-[#1a1a1a] h-screen flex items-center justify-center text-sm flex-col">
        <div className="container max-w-6xl flex border-2 flex-wrap">
          {analyzedTracks && (
            <>
              <div className="w-96 m-2">
                <h1>Energy</h1>
                <Progress value={analyzedTracks.energy} />
              </div>
              <div className="w-96 m-2">
                <h1>Loudness</h1>
                <Progress value={analyzedTracks.loudness} />
              </div>
              <div className="w-96 m-2">
                <h1>Acousticness</h1>
                <Progress value={analyzedTracks.acousticness} />
              </div>
              <div className="w-96 m-2">
                <h1>Danceability</h1>
                <Progress value={analyzedTracks.danceability} />
              </div>
              <div className="w-96 m-2">
                <h1>Instrumentallness</h1>
                <Progress value={analyzedTracks.instrumentalness} />
              </div>
              <div className="w-96 m-2">
                <h1>Liveness</h1>
                <Progress value={analyzedTracks.liveness} />
              </div>
              <div className="w-96 m-2">
                <h1>Loudness</h1>
                <Progress value={analyzedTracks.loudness} />
              </div>
              <div className="w-96 m-2">
                <h1>Speechness</h1>
                <Progress value={analyzedTracks.speechiness} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
