import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiUse, {
  addCommasToNumber,
  removeBracket,
} from "../../functions/common";
import { managePlaylistFollowing } from "../../functions/playlists";
import Image from "next/image";
import Link from "next/link";
import AddSVG from "../../public/add.svg";
import Cookies from "js-cookie";
import ChangeSVG from "../../public/change.svg";
import ChangePlaylistDetailForm from "../../components/ChangePlaylistDetailForm";
import FollowBtn from "../../components/FollowBtn";

export const getServerSideProps = async (context) => {
  const playlistId = context.params.id;
  const token = context.req.cookies["mplistToken"];
  const data = await apiUse(token, "GET", `playlists/${playlistId}`);
  const { id } = await apiUse(token, "GET", `/me`);
  const following = await apiUse(
    token,
    "GET",
    `playlists/${playlistId}/followers/contains`,
    {
      ids: id,
    }
  );
  return {
    props: {
      data,
      following: following[0],
      id,
    },
  };
};

const Playlist = ({ data, following, id }) => {
  const router = useRouter();
  const [result, setResult] = useState();
  const [follow, setFollow] = useState(following);
  const [changeMode, setChangeMode] = useState(false);

  const setData = async () => {
    try {
      console.log(data);
      setResult(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getFollow = async () => {
    try {
      const modifiedFollow = await apiUse(
        Cookies.get("mplistToken"),
        "GET",
        `playlists/${router.query.id}/followers/contains`,
        {
          ids: id,
        }
      );
      setFollow(modifiedFollow[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    getFollow();
  }, [follow]);

  return (
    <Layout title="플레이리스트">
      <div className="py-4 flex flex-col text-sm">
        {result && (
          <>
            <div className="relative flex rounded-lg border-2 p-4 mb-4 mobile:flex-col mobile-lg:flex-row">
              <Image
                src={result.images[0]?.url || `/logo-no-text.svg`}
                width={325}
                height={325}
              />
              <div className="grow flex flex-col space-y-1 mobile:mt-4 mobile-lg:ml-4 mobile-lg:mt-0">
                {!changeMode ? (
                  <div>
                    <h3 className="font-bold pb-1 mobile:text-xl mobile-lg:text-lg tablet:text-xl">
                      {result.name}
                    </h3>
                    <p className="mobile:text-base mobile-lg:text-sm tablet:text-base">
                      {removeBracket(result.description)}
                    </p>
                    <p>{addCommasToNumber(result.followers.total)} following</p>
                  </div>
                ) : (
                  <ChangePlaylistDetailForm
                    id={result.id}
                    originName={result.name}
                    originDesc={result.description}
                  />
                )}
                <FollowBtn
                  followed={follow}
                  func={() =>
                    managePlaylistFollowing(result.id, follow, setFollow)
                  }
                />
              </div>
              {(result.collaborative || result.owner.id == id) && (
                <span
                  className="absolute top-0 right-0 cursor-pointer text-gray-400 hover:text-mplist mobile:top-2/3 mobile: m-3 mobile-lg:top-0 mobile-lg:m-5"
                  onClick={() => setChangeMode((prev) => !prev)}
                >
                  <ChangeSVG className="w-5 h-5" />
                </span>
              )}
            </div>
            <div>
              <ul className="divide-y-2">
                {result.tracks.items.map((t) => {
                  return (
                    <li
                      key={t.id}
                      className="flex items-center justify-start pt-2 pb-1"
                    >
                      <Link
                        className="px-2"
                        href={`/albums/${t.track.album.id}`}
                      >
                        <Image
                          src={t.track.album.images[0].url}
                          width={50}
                          height={50}
                        />
                      </Link>
                      <span className="grow basis-5/12 px-2 truncate mobile:text-xs mobile-lg:text-sm">
                        {t.track.name}
                      </span>
                      <span className="basis-3/12 truncate mobile:text-xs mobile-lg:text-sm">
                        {t.track.artists.map((a, idx) => {
                          return (
                            <Link key={a.id} href={`/artists/${a.id}`}>
                              <span className="cursor-pointer hover:text-mplist hover:underline">
                                {a.name}
                                {idx === t.track.artists.length - 1 ? "" : ", "}
                              </span>
                            </Link>
                          );
                        })}
                      </span>
                      <Link href={`/albums/${t.track.album.id}`}>
                        <span className="text-xs basis-3/12 truncate cursor-pointer hover:text-mplist hover:underline px-2 mobile:hidden tablet:block">
                          {t.track.album.name}
                        </span>
                      </Link>
                      <span className="text-gray-500 cursor-pointer hover:text-mplist">
                        <AddSVG className="w-5 h-5" />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Playlist;
