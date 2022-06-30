import Image from "next/image";
import Loading from "../common/Loading";
import { addItemToMyPlaylist } from "../../functions/playlists";

const PlaylistSeletion = ({ playlists, data, error, setModal }) => {
  return (
    <>
      {playlists ? (
        <>
          <h2 className="mx-5 py-2 text-lg font-bold">
            추가할 플레이리스트를 골라주세요
          </h2>
          <ul className="px-5">
            {playlists.map((p) => {
              return (
                <li
                  key={p.id}
                  className="flex items-center cursor-pointer p-2 hover:bg-slate-100"
                  onClick={() => addItemToMyPlaylist(p.id, data, setModal)}
                >
                  <Image
                    src={p.images[0]?.url || `/images/logo-no-text.svg`}
                    width={75}
                    height={75}
                    alt={`cover image of playlist ${p.name}`}
                  />
                  <div className="flex ml-2 px-2 whitespace-pre-wrap">
                    <h3 className="font-semibold">{p.name}</h3>
                    <span className="text-slate-500"> ({p.tracks.total})</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : error ? (
        <span className="flex items-center justify-center h-full text-center">
          추가할 수 있는 플레이리스트가 없습니다.
        </span>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PlaylistSeletion;
