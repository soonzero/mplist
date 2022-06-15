const createPlaylist = async (id, name, description) => {
  try {
    await useAPI("POST", `/users/${id}/playlists`, {
      name,
      description,
    });
  } catch (e) {
    console.log(e);
  }
};

export default createPlaylist;
