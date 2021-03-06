import { useState, useEffect } from "react";
import Layout from "../../components/common/Layout";
import apiUse from "../../functions/common";
import Cookies from "js-cookie";
import PlaylistInMyPage from "../../components/mypage/PlaylistInMyPage";
import MyProfile from "../../components/mypage/MyProfile";
import MyMusic from "../../components/mypage/MyMusic";
import MyTopItems from "../../components/mypage/MyTopItems";

const MyPage = () => {
  const token = Cookies.get("mplistToken");
  const [result, setResult] = useState();

  const setData = async () => {
    try {
      const info = await apiUse(token, "GET", `/me`);
      const playlists = await apiUse(token, "GET", `/me/playlists`);
      const myTracks = await apiUse(token, "GET", `/me/tracks`);
      const myAlbums = await apiUse(token, "GET", `/me/albums`);
      const topTracks = await apiUse(token, "GET", `/me/top/tracks`, {
        limit: 5,
      });
      const topArtists = await apiUse(token, "GET", `/me/top/artists`, {
        limit: 6,
      });
      setResult({ info, playlists, myTracks, myAlbums, topTracks, topArtists });
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
          {(result.topTracks.total > 0 || result.topArtists.total > 0) && (
            <MyTopItems
              topTracks={result.topTracks}
              topArtists={result.topArtists}
            />
          )}

          <MyMusic myTracks={result.myTracks} myAlbums={result.myAlbums} />
          <PlaylistInMyPage id={result.info.id} playlists={result.playlists} />
        </Layout>
      )}
    </>
  );
};

export default MyPage;
