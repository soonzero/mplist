import { useAPI } from "./useAPI";

const searchSomething = async (keyword) => {
  const data = await useAPI("GET", `/search`, {
    q: keyword,
    type: "track,artist,album",
  });
  return data.tracks.items;
};

export default searchSomething;
