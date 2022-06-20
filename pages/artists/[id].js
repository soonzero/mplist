import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import useAPI, {
  addCommasToNumber,
  convertDuration,
} from "../../functions/common";
import Image from "next/image";
import Link from "next/link";
import FollowBtn from "../../components/FollowBtn";
import { manageArtistFollowing } from "../../functions/artists";
import Cookies from "js-cookie";

export const getServerSideProps = async (context) => {
  const artistId = context.query.id;
  const token = context.req.cookies["mplistToken"];
  const info = await useAPI(token, "GET", `artists/${artistId}`);
  const artistFollowed = await useAPI(token, "GET", `me/following/contains`, {
    ids: artistId,
    type: "artist",
  });
  const albums = await useAPI(token, "GET", `artists/${artistId}/albums`, {
    include_groups: "album,compilation",
    limit: 9,
  });
  const topTracks = await useAPI(
    token,
    "GET",
    `artists/${artistId}/top-tracks`,
    {
      market: "KR",
    }
  );
  const relatedArtists = await useAPI(
    token,
    "GET",
    `artists/${artistId}/related-artists`
  );
  return {
    props: {
      info,
      artistFollowed: artistFollowed[0],
      albums,
      topTracks,
      relatedArtists,
    },
  };
};

const Artist = ({
  info,
  artistFollowed,
  albums,
  topTracks,
  relatedArtists,
}) => {
  const [data, setData] = useState();
  const [follow, setFollow] = useState(artistFollowed);

  const getFollow = async () => {
    try {
      const modifiedFollow = await useAPI(
        Cookies.get("mplistToken"),
        "GET",
        `me/following/contains`,
        {
          ids: info.id,
          type: "artist",
        }
      );
      setFollow(modifiedFollow[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFollow();
  }, [follow]);

  useEffect(() => {
    setData({ info, albums, topTracks, relatedArtists });
  }, [info, albums, topTracks, relatedArtists]);

  return (
    <>
      {data && (
        <Layout title={data.info.name}>
          <div className="py-4 flex flex-col text-sm">
            <>
              <div className="flex rounded-lg border-2 p-4 mb-4">
                <Image
                  src={data.info.images[0]?.url}
                  width={250}
                  height={250}
                />
                <div className="grow flex flex-col px-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">
                      {data.info.name}
                    </h1>
                    <p className="text-base">
                      Following: {addCommasToNumber(data.info.followers.total)}
                    </p>
                    <p className="text-base">
                      Popularity: {data.info.popularity}
                    </p>
                    <p className="text-base">
                      Genres: {data.info.genres.toString().replace(",", ", ")}
                    </p>
                  </div>
                  <FollowBtn
                    followed={follow}
                    func={() =>
                      manageArtistFollowing(data.info.id, follow, setFollow)
                    }
                  />
                </div>
              </div>
              <div>
                {data.albums.items.length > 0 && (
                  <div className="py-4">
                    <h2 className="text-lg py-1 font-semibold border-b-2">
                      Albums
                    </h2>
                    <ul className="grid grid-flow-col grid-cols-3 grid-rows-3">
                      {data.albums.items.map((a) => (
                        <Link key={a.id} href={`/albums/${a.id}`}>
                          <li className="flex items-center justify-start p-1 cursor-pointer hover:bg-mplist hover:text-white">
                            <Image
                              src={a.images[0].url}
                              width={50}
                              height={50}
                            />
                            <h4 className="grow pl-4 pr-2 truncate">
                              {a.name}
                            </h4>
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
                    {data.topTracks.tracks.map((t) => (
                      <li
                        key={t.id}
                        className="flex items-center justify-start p-1 cursor-pointer hover:bg-mplist hover:text-white"
                      >
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
                  <ul className="flex p-5 space-x-6">
                    {data.relatedArtists.artists.splice(0, 6).map((a) => {
                      return (
                        <Link id={a.id} href={`/artists/${a.id}`}>
                          <li className="flex flex-col justify-center items-center hover:font-medium">
                            <Image
                              className="rounded-full cursor-pointer hover:opacity-50"
                              src={a.images[0]?.url}
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
          </div>
        </Layout>
      )}
    </>
  );
};

export default Artist;
