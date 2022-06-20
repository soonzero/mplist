import Cookies from "js-cookie";
import apiUse from "./common";

export const manageArtistFollowing = async (id, follow, setFollow) => {
  try {
    await apiUse(
      Cookies.get("mplistToken"),
      `${follow ? "DELETE" : "PUT"}`,
      `me/following`,
      {
        ids: id,
        type: "artist",
      }
    );
    setFollow(!follow);
  } catch (e) {
    console.log(e);
  }
};
