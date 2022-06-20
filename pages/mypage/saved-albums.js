import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import useAPI from "../../functions/common";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import TrashSVG from "../../public/trash.svg";

const SavedAlbums = () => {
  const token = Cookies.get("mplistToken");
  const [result, setResult] = useState();

  const setData = async () => {
    try {
      const myAlbums = await useAPI(token, "GET", `/me/albums`);
      setResult(myAlbums);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  const deleteAndGetData = async (id) => {
    await useAPI(token, "DELETE", `/me/albums`, {
      ids: id,
    });
    setData();
  };

  return (
    <Layout title="내가 저장한 앨범">
      <div className="py-4">
        <h1 className="text-2xl font-bold p-2 border-b">내가 저장한 앨범</h1>
        {result?.total > 0 ? (
          <ul className="grid grid-cols-2">
            {result.items.map((i) => {
              return (
                <div key={i.id} className="hover:bg-mplist">
                  <li className="flex items-center p-3">
                    <Link href={`/albums/${i.album.id}`}>
                      <Image
                        className="cursor-pointer"
                        src={i.album.images[0]?.url}
                        width={150}
                        height={150}
                      />
                    </Link>
                    <div className="grow flex justify-between items-center">
                      <div className="grow ml-4 flex flex-col">
                        <h2 className="font-semibold mb-1">{i.album.name}</h2>
                        <p>
                          {i.album.artists.map((a, idx) => {
                            return (
                              <span key={a.id}>
                                {a.name}
                                {i.album.artists.length === 1
                                  ? ""
                                  : idx === i.album.artists.length - 1
                                  ? ""
                                  : ", "}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                      <span
                        className="hover:text-white z-auto cursor-pointer"
                        onClick={() => deleteAndGetData(i.album.id)}
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

export default SavedAlbums;
