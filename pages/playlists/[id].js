import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAPI } from "../../components/useAPI";
import Image from "next/image";
import Link from "next/link";
import addCommasToNumber from "../../components/addCommasToNumber";
import AddSVG from "../../public/add.svg";
import DeleteSVG from "../../public/delete.svg";

const Playlist = () => {
  const [result, setResult] = useState();
  const router = useRouter();
  const [following, setFollowing] = useState();

  const setData = async () => {
    try {
      const data = await useAPI("GET", `playlists/${router.query.id}`);
      setResult(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getFollowing = async () => {
    try {
      const { id } = await useAPI("GET", `/me`);
      const result = await useAPI(
        "GET",
        `/playlists/${router.query.id}/followers/contains`,
        {
          ids: id,
        }
      );
      setFollowing(result[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const managePlaylistFollowing = async () => {
    try {
      if (following) {
        await useAPI("DELETE", `/playlists/${router.query.id}/followers`);
        setFollowing(false);
      } else {
        await useAPI("PUT", `/playlists/${router.query.id}/followers`, {
          public: true,
        });
        setFollowing(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeBracket = (item) => {
    // 괄호 안에 내용물 없앤 string 반환
    return item.replace(item.slice(item.indexOf("("), item.length), "");
  };

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    getFollowing();
  }, [following]);

  return (
    <Layout title="플레이리스트">
      <div className="py-4 flex flex-col text-sm">
        {result && (
          <>
            <div className="flex rounded-lg border-2 p-4 mb-4">
              <Image src={result.images[0].url} width={250} height={250} />
              <div className="grow flex flex-col px-4 space-y-1">
                <div>
                  <h3 className="text-xl font-bold pb-1">{result.name}</h3>
                  <p>{removeBracket(result.description)}</p>
                  <p>{addCommasToNumber(result.followers.total)} following</p>
                </div>
                <div className="grow flex justify-end items-end">
                  <button
                    type="button"
                    className="rounded-full px-5 py-3 bg-black text-white flex hover:bg-mplist"
                    onClick={managePlaylistFollowing}
                  >
                    {following ? (
                      <DeleteSVG className="h-5 w-5 mr-1" />
                    ) : (
                      <AddSVG className="w-5 h-5 mr-1" />
                    )}
                    <span>
                      {following ? "Unfollow" : "이 플레이리스트 Follow"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <ul className="divide-y-2">
                {result.tracks.items.map((t) => {
                  return (
                    <li className="flex items-center justify-start pt-2 pb-1">
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
                            <Link href={`/artists/${a.id}`}>
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
