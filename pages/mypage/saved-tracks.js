import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import apiUse from "../../functions/common";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import TrashSVG from "../../public/trash.svg";

const SavedTracks = () => {
  const token = Cookies.get("mplistToken");
  const [result, setResult] = useState();

  const setData = async () => {
    try {
      const myTracks = await apiUse(token, "GET", `/me/tracks`);
      setResult(myTracks);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  const deleteAndGetData = async (id) => {
    await apiUse(token, "DELETE", `/me/tracks`, {
      ids: id,
    });
    setData();
  };

  return (
    <Layout title="내가 저장한 트랙">
      <div className="py-4">
        <h1 className="text-2xl font-bold p-2 border-b">내가 저장한 트랙</h1>
        {result?.total > 0 ? (
          <ul className="flex flex-col divide-y">
            {result.items.map((i) => {
              return (
                <div key={i.id} className="hover:bg-mplist">
                  <li className="flex items-center p-1">
                    <Link href={`/albums/${i.track.album.id}`}>
                      <Image
                        className="cursor-pointer"
                        src={i.track.album.images[0]?.url}
                        width={50}
                        height={50}
                      />
                    </Link>
                    <div className="grow flex justify-between items-center">
                      <div className="grow ml-4 flex flex-col">
                        <h2 className="font-semibold">{i.track.name}</h2>
                        <p className="text-sm">
                          {i.track.album.artists.map((a, idx) => {
                            return (
                              <span key={a.id}>
                                {a.name}
                                {i.track.album.artists.length === 1
                                  ? ""
                                  : idx === i.track.album.artists.length - 1
                                  ? ""
                                  : ", "}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                      <span
                        className="hover:text-white z-auto cursor-pointer"
                        onClick={() => deleteAndGetData(i.track.id)}
                      >
                        <TrashSVG className="w-5 h-5" />
                      </span>
                    </div>
                  </li>
                </div>
              );
            })}
          </ul>
        ) : (
          <div className="w-full py-12 text-center text-xl font-semibold">
            내가 저장한 앨범이 없습니다.{" "}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SavedTracks;
