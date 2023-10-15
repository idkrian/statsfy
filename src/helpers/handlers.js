import { getAudioFeatures } from "./api";

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

export async function handleRecentlyPlayed(tokenData, recentlyPlayedArray) {
  let minhaString = "";
  for (let i = 0; i < recentlyPlayedArray.length; i++) {
    minhaString += recentlyPlayedArray[i] + ",";
  }
  const audioFeaturesData = await getAudioFeatures(tokenData, minhaString);
  return audioFeaturesData;
}

export async function handleAverage(value, testinhun) {
  const energy = testinhun.map((e) => e[value]);
  let sum = 0;
  for (let i = 0; i < energy.length; i++) {
    sum += energy[i];
  }
  return sum / energy.length;
}

export async function analyseTracks(recentlyPlayedFormated) {
  let newArray = [];
  labels.forEach(async (item) => {
    const res = await handleAverage(item, recentlyPlayedFormated);
    newArray.push(res.toFixed(2));
  });

  return newArray;
}
export function formatAnalysedTrack(trackAverage) {
  const track = {};
  for (let i = 0; i < trackAverage.length; i++) {
    track[labels[i]] = trackAverage[i];
  }
  return track;
}
