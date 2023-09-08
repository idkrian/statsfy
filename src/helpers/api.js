const baseURL = "https://api.spotify.com/v1/";
import axios from "axios";

export const handleToken = async (token) => {
  try {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    return token;
  } catch (error) {
    return error;
  }
};
export const getTopArtists = async (token) => {
  try {
    const data = await axios.get(
      `${baseURL}me/top/artists?time_range=long_term&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data.items;
  } catch (error) {
    return error;
  }
};
export const getTopTracks = async (token) => {
  try {
    const data = await axios.get(
      `${baseURL}me/top/tracks?time_range=long_term&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data.items;
  } catch (error) {
    return error;
  }
};
