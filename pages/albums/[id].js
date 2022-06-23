import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import apiUse, {
  convertDuration,
  getAlbumSaved,
  getTracksSaved,
} from "../../functions/common";
import Modal from "../../components/Modal";
import {
  AddToMyPlaylistSmallBtn,
  AddToPlaylistLargeBtn,
  DetailBtn,
  LyricsBtn,
  SaveToMineLargeBtn,
  SaveToMineSmallBtn,
} from "../../components/Buttons";

export const getServerSideProps = async (context) => {
  const albumId = context.params.id;
  const token = context.req.cookies["mplistToken"];
  const data = await apiUse(token, "GET", `/albums/${albumId}`);
  const albumStatus = await apiUse(token, "GET", `/me/albums/contains`, {
    ids: albumId,
  });
  const tracksStatus = await apiUse(token, "GET", `/me/tracks/contains`, {
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
  const [mode, setMode] = useState();
  const [modal, setModal] = useState(false);
  const [track, setTrack] = useState();

  const setData = () => {
    try {
      setResult(data);
    } catch (e) {
      console.log(e);
    }
  };

  const showModal = (mode, track) => {
    if (mode === "lyrics") {
      setMode("lyrics");
      setTrack(track);
    } else if (mode === "addTrack") {
      setMode("addTrack");
      setTrack(track);
    }

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
      <div className="grow divide-y-2 text-slate-700 mobile:mt-6 tablet:mt-0 tablet:ml-6">
        {discArray.map((disc, idx) => {
          return (
            <div key={disc.id} className="pt-5 first:pt-0">
              {result.album_type === "album" && (
                <h2 className="flex justify-between items-end py-2 border-b-2 border-b-mplist mobile:px-0 tablet:px-5">
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
                      <span className="basis-1/24 text-center">
                        {t.track_number > 9
                          ? t.track_number
                          : `0${t.track_number}`}
                      </span>
                      <LyricsBtn t={t} showModal={showModal} />
                      <h3 className="grow text-black truncate">{t.name}</h3>
                      <p className="text-xs text-gray-500 text-right basis-1/12 px-5">
                        {convertDuration(t.duration_ms)}
                      </p>
                      <DetailBtn />
                      <AddToMyPlaylistSmallBtn t={t} showModal={showModal} />
                      <SaveToMineSmallBtn
                        t={t}
                        tracksSaved={tracksSaved}
                        setTracksSaved={setTracksSaved}
                        tracksStatus={tracksStatus}
                        idx={idx}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Layout title={result?.name}>
        {result && (
          <section className="py-4 flex mobile:flex-col mobile-lg:flex-col tablet:flex-row">
            <div className="h-full flex flex-col border-2 rounded-xl p-4">
              <span className="mx-auto">
                <Image src={result.images[0].url} width={325} height={325} />
              </span>
              <div className="w-full mt-5">
                <div className="flex flex-col mb-2">
                  <span className="text-xs text-slate-500">
                    {`${result.release_date
                      .replace("-", ".")
                      .replace("-", ".")}`}
                  </span>
                  <h1 className="font-bold">{result.name}</h1>
                  <p>
                    {result.artists.map((artist, idx) => {
                      return (
                        <Link href={`/artists/${artist.id}`} key={artist.id}>
                          <a className="text-sm">
                            <span className="inline-block cursor-pointer hover:text-mplist">
                              {artist.name}
                            </span>
                            <span>
                              {idx !== result.artists.length - 1 && ", "}
                            </span>
                          </a>
                        </Link>
                      );
                    })}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <AddToPlaylistLargeBtn />
                  <SaveToMineLargeBtn
                    result={result}
                    albumSaved={albumSaved}
                    setAlbumSaved={setAlbumSaved}
                  />
                </div>
              </div>
            </div>
            {trackItems(result.tracks.items)}
          </section>
        )}
        {modal && <Modal mode={mode} setModal={setModal} data={track} />}
      </Layout>
    </>
  );
};

export default Album;
