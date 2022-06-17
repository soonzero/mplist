import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import useAPI, { convertDuration, manageMine } from "../../functions/common";

export const getServerSideProps = async (context) => {
  const albumId = context.params.id;
  const token = context.req.cookies["mplistToken"];
  const data = await useAPI(token, "GET", `/albums/${albumId}`);

  return {
    props: {
      data,
    },
  };
};

const Album = ({ data }) => {
  const [result, setResult] = useState();

  const setData = () => {
    try {
      setResult(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setData();
  }, []);

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
                  {disc.map((t) => {
                    return (
                      <li
                        key={t.id}
                        className="relative flex items-center py-3 text-sm cursor-pointer hover:bg-slate-200"
                      >
                        <p className="px-5 text-right">
                          {t.track_number > 9
                            ? t.track_number
                            : `0${t.track_number}`}
                        </p>
                        <p className="grow text-black">{t.name}</p>
                        <p className="text-xs text-gray-500 text-right basis-1/12 px-5">
                          {convertDuration(t.duration_ms)}
                        </p>
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
                  {`${result.release_date.replace("-", ".").replace("-", ".")}`}
                </span>
              </div>
            </div>
          </div>
          {trackItems(result.tracks.items)}
        </div>
      )}
    </Layout>
  );
};

export default Album;
