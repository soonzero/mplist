import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import Link from "next/link";
import apiUse, { getAlbumSaved } from "../../functions/common";
import Modal from "../../components/common/Modal";
import {
  AddToPlaylistLargeBtn,
  SaveToMineLargeBtn,
} from "../../components/common/Buttons";
import TrackItems from "../../components/albums/TrackItems";
import Artists from "../../components/common/Artists";

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
  const [albumSaved, setAlbumSaved] = useState(albumStatus);
  const [tracksSaved, setTracksSaved] = useState(tracksStatus);
  const [mode, setMode] = useState();
  const [modal, setModal] = useState(false);
  const [track, setTrack] = useState();

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
    getAlbumSaved(data.id, setAlbumSaved);
  }, [albumSaved]);

  return (
    <>
      <Layout title={data.name}>
        {data && (
          <article className="py-4 flex mobile:flex-col mobile-lg:flex-col tablet:flex-row">
            <section className="h-full flex flex-col border-2 rounded-xl p-4">
              <figure className="mr-auto mb-5">
                <Image
                  src={data.images[0].url}
                  alt={`album cover of ${data.name}`}
                  width={325}
                  height={325}
                />
              </figure>
              <div className="flex flex-col mb-3">
                <h1 className="font-bold mb-1">{data.name}</h1>
                <p className="mb-1">
                  <Artists artists={data.artists} link />
                </p>
                <time className="text-xs text-slate-500">
                  {`${data.release_date.replace("-", ".").replace("-", ".")}`}
                </time>
              </div>
              <buttons className="grid grid-cols-2 gap-2">
                <AddToPlaylistLargeBtn />
                <SaveToMineLargeBtn
                  result={data}
                  albumSaved={albumSaved}
                  setAlbumSaved={setAlbumSaved}
                />
              </buttons>
            </section>
            <TrackItems
              data={data}
              showModal={showModal}
              tracksSaved={tracksSaved}
              setTracksSaved={setTracksSaved}
            />
          </article>
        )}
        {modal && <Modal mode={mode} setModal={setModal} data={track} />}
      </Layout>
    </>
  );
};

export default Album;
