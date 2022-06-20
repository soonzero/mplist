import apiUse from "./common";

const search = async (token, keyword) => {
  const data = await apiUse(token, "GET", `/search`, {
    q: keyword,
    type: "track,artist,album",
  });
  return data.tracks.items;
};

export default search;
