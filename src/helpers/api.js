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
export const getTrack = async (token, id) => {
  try {
    const data = await axios.get(`${baseURL}/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data.items;
  } catch (error) {
    return error;
  }
};
export const getRecentlyPlayed = async (token) => {
  try {
    const data = await axios.get(`${baseURL}me/player/recently-played`, {
      params: {
        limit: 50,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data.items;
  } catch (error) {
    return error;
  }
};
export const getAudioFeatures = async (token, ids) => {
  try {
    const data = await axios.get(`${baseURL}audio-features?ids=${ids}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data.audio_features;
  } catch (error) {
    return error;
  }
};
export const getUser = async (token) => {
  try {
    const data = await axios.get(`${baseURL}me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
};
export const getUserPlaylists = async (token) => {
  try {
    const userId = await getUser(token);
    const data = await axios.get(`${baseURL}users/${userId.id}/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
};
