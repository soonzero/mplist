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
      await useAPI(token, `${status ? "DELETE" : "PUT"}`, `/me/albums`, {
        ids: item.id,
      });
      setStatus(!status);
    } else if (item.type === "track") {
      await useAPI(token, `${status[idx] ? "DELETE" : "PUT"}`, `/me/tracks`, {
        ids: item.id,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const getAlbumSaved = async (id, setAlbumSaved) => {
  const result = await useAPI(
    Cookies.get("mplistToken"),
    "GET",
    `/me/albums/contains`,
    {
      ids: id,
    }
  );
  setAlbumSaved(result[0]);
};

// 실시간 트랙 저장 여부 변경 아직 구현 안 됨

// export const getTracksSaved = async (id, setTracksSaved) => {
//   const result = await useAPI(
//     Cookies.get("mplistToken"),
//     "GET",
//     `/me/tracks/contains`,
//     {
//       ids: id,
//     }
//   );
//   setTracksSaved(result);
// };

const useAPI = async (token, method, url, params) => {
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
