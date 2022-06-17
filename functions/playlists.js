import axios from "axios";
import useAPI from "./common";
import Cookies from "js-cookie";

export const createPlaylist = async (token, id, name, description, checked) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://api.spotify.com/v1/users/${id}/playlists`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        description,
        public: checked,
      },
    });
    return response.data.id;
  } catch (e) {
    console.log(e);
  }
};

export const changePlaylistDetail = async (
  e,
  router,
  token,
  id,
  name,
  description,
  checked
) => {
  try {
    e.preventDefault();
    await axios({
      method: "PUT",
      url: `https://api.spotify.com/v1/playlists/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        description,
        public: checked,
      },
    });
    router.push("/mypage/my-playlists");
  } catch (e) {
    console.log(e);
  }
};

export const managePlaylistFollowing = async (id, follow, setFollow) => {
  try {
    await useAPI(
      Cookies.get("mplistToken"),
      `${follow ? "DELETE" : "PUT"}`,
      `/playlists/${id}/followers`
    );
    setFollow(!follow);
  } catch (e) {
    console.log(e);
  }
};

export const unfollowPlaylist = async (playlistId, setMyPlaylists) => {
  try {
    await useAPI(
      Cookies.get("mplistToken"),
      "DELETE",
      `/playlists/${playlistId}/followers`
    );
    getMyPlaylists(setMyPlaylists);
  } catch (e) {
    console.log(e);
  }
};

export const getMyPlaylists = async (setMyPlaylists) => {
  try {
    const data = await useAPI(
      Cookies.get("mplistToken"),
      "GET",
      `/me/playlists`
    );
    setMyPlaylists(data.items);
  } catch (e) {
    console.log(e);
  }
};
