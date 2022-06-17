import useAPI from "./common";

const search = async (token, keyword) => {
  const data = await useAPI(token, "GET", `/search`, {
    q: keyword,
    type: "track,artist,album",
  });
  return data.tracks.items;
};

export default search;
