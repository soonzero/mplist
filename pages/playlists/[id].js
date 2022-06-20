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
            <div className="relative flex rounded-lg border-2 p-4 mb-4">
              <Image
                src={result.images[0]?.url || `/logo-no-text.svg`}
                width={250}
                height={250}
              />
              <div className="grow flex flex-col px-4 space-y-1 py-5">
                {!changeMode ? (
                  <div>
                    <h3 className="text-xl font-bold pb-1">{result.name}</h3>
                    <p>{removeBracket(result.description)}</p>
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
              <span
                className="absolute top-0 right-0 m-5 cursor-pointer text-gray-400 hover:text-mplist"
                onClick={() => setChangeMode((prev) => !prev)}
              >
                <ChangeSVG className="w-5 h-5" />
              </span>
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
                        <a className="cursor-pointer hover:bg-opacity-50 w-12 h-12">
                          <Image
                            src={t.track.album.images[0].url}
                            width={50}
                            height={50}
                          />
                        </a>
                      </Link>
                      <span className="basis-5/12 px-2 truncate">
                        {t.track.name}
                      </span>
                      <span className="basis-3/12 truncate">
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
                        <span className="text-xs basis-3/12 truncate cursor-pointer hover:text-mplist hover:underline px-2">
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
