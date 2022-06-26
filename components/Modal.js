import axios from "axios";
import { useState, useEffect } from "react";
import LogoSVG from "../public/images/logo-no-text.svg";
import Lyrics from "../components/Lyrics";
import CloseSVG from "../public/images/close.svg";
import apiUse from "../functions/common";
import Cookies from "js-cookie";
import AddPlaylist from "./AddPlaylist";

const Modal = ({ mode, setModal, data }) => {
  console.log(mode, data);
  let didCancel = false;
  const [lyrics, setLyrics] = useState(``);
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(false);

  const getData = async () => {
    if (mode === "lyrics") {
      try {
        const { result } = await axios({
          method: "GET",
          url: `https://api.lyrics.ovh/v1/${data.artists[0].name}/${
            data.name.split("(")[0]
          }`,
        });
        if (!didCancel) {
          setLyrics(result.lyrics);
        }
      } catch (e) {
        setError(true);
        console.log(e);
      }
    } else if (mode === "addTrack") {
      try {
        const { id } = await apiUse(Cookies.get("mplistToken"), "GET", `/me`);
        const { items } = await apiUse(
          Cookies.get("mplistToken"),
          "GET",
          `/me/playlists`
        );
        setPlaylists(items.filter((i) => i.collaborative || i.owner.id === id));
      } catch (e) {
        setError(true);
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getData();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
      didCancel = true;
    };
  }, []);

  return (
    <>
      <div
        className="flex items-center justify-center w-screen h-screen fixed inset-0 z-40 bg-black bg-opacity-20"
        onClick={() => setModal(false)}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-96 max-w-xl mobile:w-11/12 tablet:w-2/3 mobile:h-2/3 bg-white rounded-md z-50 overflow-hidden">
        <div className="sticky top-0 p-3 border-b flex items-center">
          <div className="flex items-center">
            <LogoSVG className="mr-3" />
            <span className="font-semibold">{data.name}</span>
          </div>
          <span className="grow flex items-start justify-end">
            <CloseSVG
              className="w-5 h-5 text-slate-500 hover:text-mplist cursor-pointer"
              onClick={() => setModal(false)}
            />
          </span>
        </div>
        {mode === "lyrics" && <Lyrics lyrics={lyrics} error={error} />}
        {mode === "addTrack" && (
          <AddPlaylist
            playlists={playlists}
            data={data.uri}
            error={error}
            setModal={setModal}
          />
        )}
      </div>
    </>
  );
};

export default Modal;
