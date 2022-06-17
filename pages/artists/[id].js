import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAPI } from "../../components/useAPI";
import Image from "next/image";
import Link from "next/link";
import convertDuration from "../../functions/convertDuration";
import addCommasToNumber from "../../functions/addCommasToNumber";

const Artist = () => {
  const [result, setResult] = useState();
  const router = useRouter();

  const setData = async () => {
    try {
      const info = await useAPI("GET", `artists/${router.query.id}`);
      const albums = await useAPI("GET", `artists/${router.query.id}/albums`, {
        include_groups: "album,compilation",
        limit: 9,
      });
      const topTracks = await useAPI(
        "GET",
        `artists/${router.query.id}/top-tracks`,
        { market: "KR" }
      );
      const relatedArtists = await useAPI(
        "GET",
        `artists/${router.query.id}/related-artists`
      );
      setResult({
        info,
        albums,
        topTracks,
        relatedArtists,
      });
      console.log(relatedArtists);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <Layout title={result?.info.name}>
      <div className="py-4 flex flex-col text-sm">
        {result && (
          <>
            <div className="flex rounded-lg border-2 p-4 mb-4">
              <Image src={result.info.images[0].url} width={250} height={250} />
              <div className="px-4">
                <h1 className="text-3xl font-bold mb-1">{result.info.name}</h1>
                <p className="text-base">
                  Following: {addCommasToNumber(result.info.followers.total)}
                </p>
                <p className="text-base">
                  Popularity: {result.info.popularity}
                </p>
                <p className="text-base">
                  Genres: {result.info.genres.toString().replace(",", ", ")}
                </p>
              </div>
            </div>
            <div>
              {result.albums.items.length > 0 && (
                <div className="py-4">
                  <h2 className="text-lg py-1 font-semibold border-b-2">
                    Albums
                  </h2>
                  <ul className="grid grid-flow-col grid-cols-3 grid-rows-3">
                    {result.albums.items.map((a) => (
                      <Link href={`/albums/${a.id}`}>
                        <li className="flex items-center justify-start p-1 cursor-pointer hover:bg-mplist hover:text-white">
                          <Image src={a.images[0].url} width={50} height={50} />
                          <h4 className="grow pl-4 pr-2 truncate">{a.name}</h4>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
              <div className="py-4">
                <h2 className="text-lg py-1 font-semibold border-b-2">
                  Top Tracks
                </h2>
                <ul className="grid grid-cols-2">
                  {result.topTracks.tracks.map((t) => (
                    <li className="flex items-center justify-start p-1 cursor-pointer hover:bg-mplist hover:text-white">
                      <Image
                        src={t.album.images[0].url}
                        width={50}
                        height={50}
                      />
                      <h4 className="grow pl-4 pr-2 truncate">{t.name}</h4>
                      <p className="text-xs text-gray-500 text-right px-5 basis-1/12">
                        {convertDuration(t.duration_ms)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-4">
                <h2 className="text-lg py-1 font-semibold border-b-2">
                  Related Artists
                </h2>
                <ul className="flex p-5 justify-between">
                  {result.relatedArtists.artists.splice(0, 6).map((a) => {
                    return (
                      <Link href={`/artists/${a.id}`}>
                        <li className="flex flex-col justify-center items-center hover:font-medium">
                          <Image
                            className="rounded-full cursor-pointer hover:opacity-50"
                            src={a.images[0].url}
                            width={150}
                            height={150}
                          />
                          <h3 className="mt-2">{a.name}</h3>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Artist;
