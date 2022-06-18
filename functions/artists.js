import Cookies from "js-cookie";
import useAPI from "./common";

export const manageArtistFollowing = async (id, follow, setFollow) => {
  try {
    await useAPI(
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
