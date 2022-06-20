import axios from "axios";
import { useState, useEffect } from "react";
import LogoSVG from "../public/logo-no-text.svg";
import Loading from "../components/Loading";
import CloseSVG from "../public/close.svg";

const Modal = ({ setModal, track }) => {
  let didCancel = false;
  const [lyrics, setLyrics] = useState(``);
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://api.lyrics.ovh/v1/${track.artists[0].name}/${
          track.name.split("(")[0]
        }`,
      });
      if (!didCancel) {
        console.log(data.lyrics);
        setLyrics(data.lyrics);
      }
    } catch (e) {
      setError(true);
      console.log(e);
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
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-96 max-w-xl w-1/2 h-1/2 bg-white rounded-md z-50 overflow-hidden">
        <div className="sticky top-0 p-3 border-b flex items-center">
          <div className="flex items-center">
            <LogoSVG className="mr-3" />
            <span className="font-semibold">{track.name}</span>
          </div>
          <span className="grow flex items-start justify-end">
            <CloseSVG
              className="w-5 h-5 text-slate-500 hover:text-mplist cursor-pointer"
              onClick={() => setModal(false)}
            />
          </span>
        </div>
        <div className="h-[calc(100%-64px)] whitespace-pre-line overflow-y-scroll px-4 py-2">
          {lyrics ? lyrics : error ? "가사를 찾을 수 없습니다." : <Loading />}
        </div>
      </div>
    </>
  );
};

export default Modal;
