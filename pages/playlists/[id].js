import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAPI } from "../../components/useAPI";
import Image from "next/image";
import Link from "next/link";
import addCommasToNumber from "../../components/addCommasToNumber";
import AddSVG from "../../public/add.svg";

const Playlist = () => {
  const [result, setResult] = useState();
  const router = useRouter();

  const setData = async () => {
    try {
      const data = await useAPI("GET", `playlists/${router.query.id}`);
      console.log(data);
      setResult(data);
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

  return (
    <Layout title="플레이리스트">
      <div className="py-4 flex flex-col text-sm">
        {result && (
          <>
            <div className="flex rounded-lg border-2 p-4 mb-4">
              <Image src={result.images[0].url} width={250} height={250} />
              <div className="px-4 space-y-1">
                <h3 className="text-xl font-bold pb-1">{result.name}</h3>
                <p>{removeBracket(result.description)}</p>
                <p>{addCommasToNumber(result.followers.total)}명 following</p>
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
                        <span className="text-xs basis-3/12 truncate cursor-pointer hover:text-mplist hover:underline">
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
