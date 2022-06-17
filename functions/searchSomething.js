import Cookies from "js-cookie";
import { useAPI } from "../components/useAPI";

const searchSomething = async (token, keyword) => {
  const data = await useAPI(token, "GET", `/search`, {
    q: keyword,
    type: "track,artist,album",
  });
  return data.tracks.items;
};

export default searchSomething;
