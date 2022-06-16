import axios from "axios";

const createPlaylist = async (id, name, description, checked) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://api.spotify.com/v1/users/${id}/playlists`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

export default createPlaylist;
