import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import useAPI from "../../functions/common";
import Cookies from "js-cookie";
import PlaylistInMyPage from "../../components/PlaylistInMyPage";
import MyProfile from "../../components/MyProfile";
import MyMusic from "../../components/MyMusic";

const MyPage = () => {
  const token = Cookies.get("mplistToken");
  const [result, setResult] = useState();

  const setData = async () => {
    try {
      const info = await useAPI(token, "GET", `/me`);
      const playlists = await useAPI(token, "GET", `/me/playlists`);
      const myTracks = await useAPI(token, "GET", `/me/tracks`);
      const myAlbums = await useAPI(token, "GET", `/me/albums`);
      setResult({ info, playlists, myTracks, myAlbums });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      {result && (
        <Layout title="내 정보">
          <MyProfile info={result.info} />
          <MyMusic
            myTracks={result.myTracks}
            myAlbums={result.myAlbums.items}
          />
          <PlaylistInMyPage playlists={result.playlists} />
        </Layout>
      )}
    </>
  );
};

export default MyPage;
