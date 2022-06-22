import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import apiUse, {
  addCommasToNumber,
  convertDuration,
} from "../../functions/common";
import Image from "next/image";
import Link from "next/link";
import { FollowBtn } from "../../components/Buttons";
import { manageArtistFollowing } from "../../functions/artists";
import Cookies from "js-cookie";

export const getServerSideProps = async (context) => {
  const artistId = context.query.id;
  const token = context.req.cookies["mplistToken"];
  const info = await apiUse(token, "GET", `artists/${artistId}`);
  const artistFollowed = await apiUse(token, "GET", `me/following/contains`, {
    ids: artistId,
    type: "artist",
  });
  const albums = await apiUse(token, "GET", `artists/${artistId}/albums`, {
    include_groups: "album,compilation",
    limit: 9,
  });
  const topTracks = await apiUse(
    token,
    "GET",
    `artists/${artistId}/top-tracks`,
    {
      market: "KR",
    }
  );
  const relatedArtists = await apiUse(
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
  const [follow, setFollow] = useState(artistFollowed);

  const getFollow = async () => {
    try {
      const modifiedFollow = await apiUse(
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

  return (
    <>
      <Layout title={info.name}>
        <div className="py-4 flex flex-col text-sm">
          <>
            <div className="flex rounded-lg border-2 p-4 mb-4 mobile:flex-col mobile:mr-auto tablet:flex-row tablet:mr-0">
              <span>
                <Image src={info.images[0]?.url} width={250} height={250} />
              </span>
              <div className="grow flex flex-col mobile:mt-4 tablet:mt-0 tablet:ml-4">
                <div className="mobile:mb-4 tablet:mb-0">
                  <h1 className="text-3xl font-bold mb-1">{info.name}</h1>
                  <p className="text-base">
                    Following: {addCommasToNumber(info.followers.total)}
                  </p>
                  <p className="text-base">Popularity: {info.popularity}</p>
                  {info.genres?.length > 0 && (
                    <p className="text-base whitespace-pre-wrap">
                      Genres: {info.genres.toString().replace(",", ", ")}
                    </p>
                  )}
                </div>
                <FollowBtn
                  followed={follow}
                  func={() => manageArtistFollowing(info.id, follow, setFollow)}
                />
              </div>
            </div>
            <div>
              {albums.items.length > 0 && (
                <div className="py-4">
                  <h2 className="text-lg py-1 font-semibold border-b-2">
                    Albums
                  </h2>
                  <ul className="mobile:flex mobile:flex-col laptop:grid laptop:grid-cols-2">
                    {albums.items.map((a) => (
                      <Link key={a.id} href={`/albums/${a.id}`}>
                        <li className="flex grow items-center justify-start p-1 cursor-pointer hover:bg-mplist hover:text-white">
                          <span className="w-[50px] h-[50px]">
                            <Image
                              src={a.images[0].url}
                              width={50}
                              height={50}
                            />
                          </span>
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
                <ul className="mobile:flex mobile:flex-col laptop:grid laptop:grid-cols-2">
                  {topTracks.tracks.map((t) => (
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
                      <p className="text-xs text-gray-500 text-right pr-5">
                        {convertDuration(t.duration_ms)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              {relatedArtists.artists?.length > 0 && (
                <div className="py-4">
                  <h2 className="text-lg py-1 font-semibold border-b-2">
                    Related Artists
                  </h2>
                  <ul className="p-5 mobile:flex mobile:flex-wrap mobile:justify-center tablet:grid tablet:grid-cols-6">
                    {relatedArtists.artists.slice(0, 6).map((a) => {
                      return (
                        <Link key={a.id} href={`/artists/${a.id}`}>
                          <li className="flex flex-col justify-center items-center hover:font-medium p-2">
                            <Image
                              className="rounded-full cursor-pointer hover:opacity-50"
                              src={a.images[0]?.url || `/logo-no-text.svg`}
                              width={100}
                              height={100}
                            />
                            <h3 className="w-full text-center mt-2 truncate">
                              {a.name}
                            </h3>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </>
        </div>
      </Layout>
    </>
  );
};

export default Artist;
