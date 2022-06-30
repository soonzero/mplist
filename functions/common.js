import axios from "axios";
import Cookies from "js-cookie";

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

export const manageMine = async (item, status, setStatus, idx) => {
  const token = Cookies.get("mplistToken");
  try {
    if (item.type === "album") {
      await apiUse(token, `${status ? "DELETE" : "PUT"}`, `/me/albums`, {
        ids: item.id,
      });
      setStatus(!status);
    } else if (item.type === "track") {
      await apiUse(token, `${status[idx] ? "DELETE" : "PUT"}`, `/me/tracks`, {
        ids: item.id,
      });
      let newStatus = [...status];
      newStatus.map((item, index) => {
        if (idx === index) {
          newStatus[idx] = !item;
        }
        return newStatus;
      });
      setStatus(newStatus);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getAlbumSaved = async (id, setAlbumSaved) => {
  const result = await apiUse(
    Cookies.get("mplistToken"),
    "GET",
    `/me/albums/contains`,
    {
      ids: id,
    }
  );
  setAlbumSaved(result[0]);
};

const apiUse = async (token, method, url, params) => {
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

export default apiUse;
