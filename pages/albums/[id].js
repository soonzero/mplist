import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAPI } from "../../components/useAPI";
import convertDuration from "../../components/convertDuration";
import Link from "next/link";

const Album = () => {
  const [result, setResult] = useState();
  const router = useRouter();

  const setData = async () => {
    try {
      const data = await useAPI("GET", `albums/${router.query.id}`);
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
                      <li className="flex items-center py-3 text-sm cursor-pointer">
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
          <div className="flex-none w-64 h-full flex flex-col items-start border-2 rounded-xl p-4">
            <Image src={result.images[0].url} width={250} height={250} />
            <div className="mt-5">
              <h1 className="font-bold">{result.name}</h1>
              <div>
                {result.artists.map((artist, idx) => {
                  return (
                    <Link href={`/artists/${artist.id}`} key={artist.id}>
                      <a>
                        <p className="inline-block cursor-pointer hover:text-mplist">
                          {artist.name}
                        </p>
                        <span>{idx !== result.artists.length - 1 && ", "}</span>
                      </a>
                    </Link>
                  );
                })}
              </div>
              <p>{`${result.release_date
                .replace("-", ".")
                .replace("-", ".")}`}</p>
            </div>
          </div>
          {trackItems(result.tracks.items)}
        </div>
      )}
    </Layout>
  );
};

export default Album;
