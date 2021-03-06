import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import DeleteSVG from "../../public/images/delete.svg";
import Link from "next/link";
import { unfollowPlaylist, getMyPlaylists } from "../../functions/playlists";

const MyPlaylist = () => {
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    getMyPlaylists(setMyPlaylists);
  }, []);

  return (
    <Layout title="내 플레이리스트">
      <section className="py-4 flex flex-col">
        <h1 className="font-bold text-3xl mb-5">내 플레이리스트</h1>
        <ul className="divide-y">
          {myPlaylists?.map((i) => {
            return (
              <li
                key={i.id}
                className="py-5 px-3 flex cursor-pointer hover:bg-slate-200 relative"
              >
                <Link href={`/playlists/${i.id}`}>
                  <>
                    <Image
                      className="mr-5"
                      src={i.images[0]?.url || `/images/logo-no-text.svg`}
                      width={100}
                      height={100}
                      alt={`cover image of playlist ${i.name}`}
                    />
                    <div className="grow px-5">
                      <h3 className="text-lg font-semibold">{i.name}</h3>
                      <p>{i.owner.display_name}</p>
                      <span className="text-sm text-gray-500">
                        트랙 {i.tracks.total}개
                      </span>
                    </div>
                  </>
                </Link>
                <span
                  className="h-max cursor-pointer hover:text-mplist absolute mr-3 right-0 top-1/2 -translate-y-1/2 flex items-center"
                  onClick={() => unfollowPlaylist(i.id, setMyPlaylists)}
                >
                  <DeleteSVG className="w-6 h-6" />
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};

export default MyPlaylist;
