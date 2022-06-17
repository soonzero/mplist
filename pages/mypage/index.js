import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useAPI } from "../../components/useAPI";
import Cookies from "js-cookie";
import PlaylistInMyPage from "../../components/PlaylistInMyPage";

const MyPage = () => {
  const token = Cookies.get("mplistToken");
  const [result, setResult] = useState();

  const setData = async () => {
    try {
      const info = await useAPI(token, "GET", `/me`);
      const playlists = await useAPI(token, "GET", `/me/playlists`);
      setResult({ info, playlists });
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
          <PlaylistInMyPage playlists={result.playlists} />
        </Layout>
      )}
    </>
  );
};

export default MyPage;
