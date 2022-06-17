import axios from "axios";

export const removeBracket = (item) => {
  // 괄호 안에 내용물 없앤 string 반환
  return item.split("(")[0];
};

export const addCommasToNumber = (num) => {
  const numberReg = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(numberReg, ",");
};

export const convertDuration = (time) => {
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

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

export default useAPI;
