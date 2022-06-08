import axios from "axios";

export const useAPI = async (method, url, limit) => {
  const { data } = await axios({
    method,
    baseURL: "https://api.spotify.com/v1/",
    url,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    params: {
      country: "KR",
      limit,
    },
  });
  return data;
};
