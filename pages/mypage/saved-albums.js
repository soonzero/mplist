import { useState, useEffect } from "react";
import Layout from "../../components/common/Layout";
import apiUse from "../../functions/common";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import Artists from "../../components/common/Artists";
import TrashSVG from "../../public/images/trash.svg";

const SavedAlbums = () => {
  const token = Cookies.get("mplistToken");
  const [result, setResult] = useState();

  const setData = async () => {
    try {
      const myAlbums = await apiUse(token, "GET", `/me/albums`);
      setResult(myAlbums);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  const deleteAndGetData = async (id) => {
    await apiUse(token, "DELETE", `/me/albums`, {
      ids: id,
    });
    setData();
  };

  return (
    <Layout title="내가 저장한 앨범">
      <section className="py-4">
        <h1 className="text-2xl font-bold p-2 border-b">내가 저장한 앨범</h1>
        {result?.total > 0 ? (
          <ul className="mobile:flex mobile:flex-col laptop:grid laptop:grid-cols-2">
            {result.items.map((i) => {
              return (
                <li
                  key={i.id}
                  className="flex items-center p-3 cursor-pointer hover:bg-mplist"
                >
                  <Link href={`/albums/${i.album.id}`}>
                    <Image
                      className="cursor-pointer"
                      src={i.album.images[0]?.url}
                      width={100}
                      height={100}
                      alt={`album cover of ${i.album.name}`}
                    />
                  </Link>
                  <div className="grow flex justify-between items-center">
                    <div className="grow ml-4 flex flex-col">
                      <h2 className="font-semibold truncate mb-1">
                        {i.album.name}
                      </h2>
                      <p>
                        <Artists artists={i.album.artists} />
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
              );
            })}
          </ul>
        ) : (
          <div className="w-full py-12 text-center text-xl font-semibold">
            내가 저장한 앨범이 없습니다.
          </div>
        )}
      </section>
    </Layout>
  );
};

export default SavedAlbums;
