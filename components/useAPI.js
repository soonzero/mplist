import axios from "axios";

export const useAPI = async (token, method, url, params) => {
  const { data } = await axios({
    method,
    baseURL: "https://api.spotify.com/v1/",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return data;
};
