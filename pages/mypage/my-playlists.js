import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAPI } from "../../components/useAPI";
import DeleteSVG from "../../public/delete.svg";

const MyPlaylist = () => {
  const token = Cookies.get("mplistToken");
  const [data, setData] = useState();

  const unfollowPlaylist = async (playlistId) => {
    try {
      await useAPI(token, "DELETE", `/playlists/${playlistId}/followers`);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const response = await useAPI(token, "GET", `me/playlists`);
      console.log(response);
      setData(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout title="내 플레이리스트">
      {data && (
        <div className="py-4 flex flex-col">
          <h1 className="font-bold text-3xl mb-5">내 플레이리스트</h1>
          <ul className="divide-y">
            {data.items.map((i) => {
              return (
                <li key={i.id} className="py-5 px-3 flex">
                  <Image
                    className="mr-5"
                    src={i.images[0]?.url || `/logo-no-text.svg`}
                    width={100}
                    height={100}
                  />
                  <div className="grow mx-5">
                    <h3>{i.name}</h3>
                    <p>{i.owner.display_name}</p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className="h-max cursor-pointer hover:text-mplist"
                      onClick={() => unfollowPlaylist(i.id)}
                    >
                      <DeleteSVG className="w-6 h-6" />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default MyPlaylist;
