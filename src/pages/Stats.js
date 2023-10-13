import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  getTopArtists,
  getTopTracks,
  handleToken,
  getRecentlyPlayed,
  getAudioFeatures,
  getUser,
  getUserPlaylists,
  getTopItems,
} from "@/helpers/api";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Stats = () => {
  const [token, setToken] = useState("");
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [audioFeatures, setAudioFeatures] = useState();
  const [analyzedTracks, setAnalyzedTracks] = useState();
  const [loading, setLoading] = useState(false);
  const labels = [
    "energy",
    "loudness",
    "acousticness",
    "danceability",
    "instrumentalness",
    "liveness",
    "loudness",
    "speechiness",
    "valence",
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
    return track;
  }

  useEffect(() => {
    AOS.init();
    async function getData() {
      setLoading(true);
      const tokenData = await handleToken();
      setToken(tokenData);
      const topArtistsData = await getTopItems(
        tokenData,
        "long_term",
        "artists"
      );
      setTopArtists(topArtistsData);
      const topTrackData = await getTopItems(tokenData, "long_term", "tracks");
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
      const userPlaylistsData = await getUserPlaylists(tokenData);
      setLoading(false);
    }
    getData();
  }, []);
  //Implementar----
  // const logout = () => {
  //   setToken("");
  //   window.localStorage.removeItem("token");
  // };
  // if (loading) {
  //   return <div>loading</div>;
  // }
  // function updateData(type, term) {
  //   const updatedData = getTopItems(token, term, type);
  // }
  console.log(topArtists);
  return (
    <div className="scroll-smooth bg-[#090a0c]">
      <div className="my-40 flex items-center justify-center text-sm flex-col animate-fade-up">
        <h1 className="text-5xl font-bold mb-4">Top Artists</h1>
        <select
          id="time_range"
          className="bg-[#14171c] text-gray-200 text-sm rounded-lg focus:ring-purple focus:border-purple block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple dark:focus:border-purple"
          onChange={async (e) => {
            const updatedData = await getTopItems(
              token,
              e.target.value,
              "artists"
            );
            setTopArtists(updatedData);
          }}
        >
          <option defaultValue value="long_term">
            Long Term
          </option>
          <option value="medium_term">Medium Term</option>
          <option value="short_term">Short Term</option>
        </select>
        <div className="container max-w-6xl ">
          <div className="flex justify-between mx-auto">
            <div className="flex flex-col justify-center">
              {topArtists !== undefined &&
                topArtists.map((i, index) => (
                  <div key={i.id} className="flex items-center mx-4 my-1">
                    <span className="text-xl font-semibold mr-2 text-[#5D3FD3]">
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
                    className="rounded-xl w-[28rem]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="mb-40 flex items-center justify-center text-sm flex-col "
        data-aos="fade-up"
      >
        <h1 className="text-5xl font-bold mb-4">Top Tracks</h1>
        <select
          id="time_range"
          className="bg-[#14171c] text-gray-200 text-sm rounded-lg focus:ring-purple focus:border-purple block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple dark:focus:border-purple"
          onChange={async (e) => {
            const updatedData = await getTopItems(
              token,
              e.target.value,
              "tracks"
            );
            setTopTracks(updatedData);
          }}
        >
          <option defaultValue value="long_term">
            Long Term
          </option>
          <option value="medium_term">Medium Term</option>
          <option value="short_term">Short Term</option>
        </select>
        <div className="container max-w-6xl ">
          <div className="flex justify-between mx-auto">
            <div className="flex flex-col justify-center">
              {topTracks !== undefined &&
                topTracks.map((i, index) => (
                  <div key={i.id} className="flex items-center mx-4 my-1">
                    <span className="text-xl font-semibold mr-2 text-[#5D3FD3]">
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
                    className="rounded-xl w-[28rem]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-center text-sm flex-col"
        data-aos="fade-up"
      >
        <h1 className="text-5xl font-bold mb-4">Analysis</h1>
        <div className="container place-items-center grid grid-cols-3 grid-rows-3 rounded-3xl py-4 bg-[#14171c]">
          {analyzedTracks && (
            <>
              <div className="m-4">
                <h1 className="font-extrabold text-lg">Energy</h1>
                <Progress value={analyzedTracks.energy} />
                <p>Music that feels fast, loud, and noisy.</p>
              </div>
              <div className="m-4">
                <h1 className="font-extrabold text-lg">Relaxed</h1>
                <Progress value={analyzedTracks.energy} />
                <p>Music that is slow and calm.</p>
              </div>
              <div className=" m-4">
                <h1 className="font-extrabold text-lg">Acousticness</h1>
                <Progress value={analyzedTracks.acousticness} />
                <p>Music with no electric instruments.</p>
              </div>
              <div className=" m-4">
                <h1 className="font-extrabold text-lg">Danceability</h1>
                <Progress value={analyzedTracks.danceability} />
                <p>Music that makes you want to move it.</p>
              </div>
              <div className=" m-4">
                <h1 className="font-extrabold text-lg">Instrumentallness</h1>
                <Progress value={analyzedTracks.instrumentalness} />
                <p>Music that contains no vocals.</p>
              </div>
              <div className=" m-4">
                <h1 className="font-extrabold text-lg">Liveness</h1>
                <Progress value={analyzedTracks.liveness} />
                <p>Music that is performed live.</p>
              </div>
              <div className=" m-4">
                <h1 className="font-extrabold text-lg">Speechness</h1>
                <Progress value={analyzedTracks.speechiness} />
                <p>Podcasts, Poetries, Talk Shows & etc</p>
              </div>
              <div className=" m-4">
                <h1 className="font-extrabold text-lg">Positiviness</h1>
                <Progress value={analyzedTracks.valence} />
                <p>Music that is happy and cheerful.</p>
              </div>
              <div className=" m-4">
                <h1 className="font-extrabold text-lg">Dark</h1>
                <Progress value={1 - analyzedTracks?.valence} />
                <p>Music that is sad, depressing, or angry.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
