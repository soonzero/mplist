import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import useAPI, {
  convertDuration,
  manageMine,
  getAlbumSaved,
  getTracksSaved,
} from "../../functions/common";
import AddSVG from "../../public/add.svg";
import SaveSVG from "../../public/save.svg";
import TrashSVG from "../../public/trash.svg";
import CancelSVG from "../../public/cancel.svg";
import LyricsSVG from "../../public/lyrics.svg";
import DetailSVG from "../../public/detail.svg";
import Modal from "../../components/Modal";

export const getServerSideProps = async (context) => {
  const albumId = context.params.id;
  const token = context.req.cookies["mplistToken"];
  const data = await useAPI(token, "GET", `/albums/${albumId}`);
  const albumStatus = await useAPI(token, "GET", `/me/albums/contains`, {
    ids: albumId,
  });
  const tracksStatus = await useAPI(token, "GET", `/me/tracks/contains`, {
    ids: data.tracks.items.map((i) => i.id).join(","),
  });

  return {
    props: {
      data,
      albumStatus: albumStatus[0],
      tracksStatus,
    },
  };
};

const Album = ({ data, albumStatus, tracksStatus }) => {
  const [result, setResult] = useState();
  const [albumSaved, setAlbumSaved] = useState(albumStatus);
  const [tracksSaved, setTracksSaved] = useState(tracksStatus);
  const [modal, setModal] = useState(false);
  const [track, setTrack] = useState();

  const setData = () => {
    try {
      setResult(data);
    } catch (e) {
      console.log(e);
    }
  };

  const showDetail = (track) => {
    setTrack(track);
    setModal(true);
  };

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    getAlbumSaved(data.id, setAlbumSaved);
  }, [albumSaved]);

  // useEffect(() => {
  //   getTracksSaved(
  //     data.tracks.items.map((i) => i.id).join(","),
  //     setTracksSaved
  //   );
  // }, [tracksSaved]);

  const trackItems = (tracks) => {
    const discCount = tracks[tracks.length - 1].disc_number;
    let discArray = [];
    for (let i = 0; i < discCount; i++) {
      discArray[i] = tracks.filter((t) => t.disc_number === i + 1);
    }
    return (
      <div className="flex-1 ml-6 divide-y-2 text-slate-700">
        {discArray.map((disc, idx) => {
          return (
            <>
              <div className="pt-5 first:pt-0">
                {result.album_type === "album" && (
                  <h2 className="flex justify-between items-end px-5 py-2 border-b-2 border-b-mplist">
                    CD{idx + 1}
                    <span className="text-sm">
                      {disc.length} {disc.length === 1 ? `track` : `tracks`}
                    </span>
                  </h2>
                )}
                <ul className="divide-dashed divide-y-2">
                  {disc.map((t, idx) => {
                    return (
                      <li
                        key={t.id}
                        className="relative flex items-center py-3 text-sm cursor-pointer hover:bg-slate-200"
                      >
                        <p className="basis-1/24 text-center">
                          {t.track_number > 9
                            ? t.track_number
                            : `0${t.track_number}`}
                        </p>
                        <span
                          className="hover:text-mplist basis-1/20"
                          onClick={() => showDetail(t)}
                        >
                          <LyricsSVG className="h-5 w-5 mx-auto" />
                        </span>
                        <p className="grow text-black">{t.name}</p>
                        <p className="text-xs text-gray-500 text-right basis-1/12 px-5">
                          {convertDuration(t.duration_ms)}
                        </p>
                        <span className="hover:text-mplist px-1">
                          <DetailSVG className="w-5 h-5" />
                        </span>
                        <span className="hover:text-mplist px-1">
                          <AddSVG className="w-5 h-5" />
                        </span>
                        <span
                          className="hover:text-mplist px-1"
                          onClick={() =>
                            manageMine(t, tracksSaved, setTracksSaved, idx)
                          }
                        >
                          {tracksStatus[idx] ? (
                            <CancelSVG className="w-5 h-5" />
                          ) : (
                            <SaveSVG className="w-5 h-5" />
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Layout title={result?.name}>
        {result && (
          <div className="py-4 flex">
            <div className="h-full flex flex-col items-start border-2 rounded-xl p-4">
              <Image src={result.images[0].url} width={250} height={250} />
              <div className="w-full mt-5">
                <div className="flex flex-col mb-2">
                  <h1 className="font-bold">{result.name}</h1>
                  <div>
                    {result.artists.map((artist, idx) => {
                      return (
                        <Link href={`/artists/${artist.id}`} key={artist.id}>
                          <a className="text-sm">
                            <p className="inline-block cursor-pointer hover:text-mplist">
                              {artist.name}
                            </p>
                            <span>
                              {idx !== result.artists.length - 1 && ", "}
                            </span>
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                  <span className="text-xs text-slate-500">
                    {`${result.release_date
                      .replace("-", ".")
                      .replace("-", ".")}`}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="flex items-center justify-center py-2 bg-slate-400 text-white rounded-full cursor-pointer hover:bg-mplist">
                    <AddSVG className="w-5 h-5" />
                    <span className="ml-1 text-xs">Playlist에 추가</span>
                  </span>
                  <span
                    className="flex items-center justify-center py-2 bg-slate-400 text-white rounded-full cursor-pointer hover:bg-mplist"
                    onClick={() =>
                      manageMine(result, albumSaved, setAlbumSaved)
                    }
                  >
                    {albumSaved ? (
                      <TrashSVG className="w-5 h-5" />
                    ) : (
                      <SaveSVG className="w-5 h-5" />
                    )}
                    <span className="ml-1 text-xs">
                      {albumSaved ? "내 앨범에서 삭제" : "내 앨범에 추가"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {trackItems(result.tracks.items)}
          </div>
        )}
        {modal && <Modal setModal={setModal} track={track} />}
      </Layout>
    </>
  );
};

export default Album;
