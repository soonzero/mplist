import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ChevronSVG from "../public/chevron-double-right.svg";
import AddSVG from "../public/add.svg";
import CreatePlaylistForm from "./CreatePlaylistForm";
import createPlaylist from "../functions/createPlaylist";

const PlaylistInMyPage = ({ playlists }) => {
  const [addMode, setAddMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  const [checked, setChecked] = useState(false);

  const onClickHandler = async () => {
    if (addMode) {
      if (name?.length > 0) {
        createPlaylist(
          Cookies.get("mplistToken"),
          result.info.id,
          name,
          description,
          checked
        );
      } else {
        setAddMode(false);
      }
    } else {
      setAddMode(true);
    }
  };

  return (
    <div className="py-4">
      <Link href="/mypage/my-playlists">
        <h1 className="flex items-center font-bold text-3xl mb-4 hover:text-mplist cursor-pointer w-max">
          플레이리스트
          {playlists.total > 0 && <ChevronSVG className="h-5 w-5 ml-2" />}
        </h1>
      </Link>
      {playlists.total > 0 ? (
        <div className="grid grid-cols-6 gap-2 mb-5 border-y">
          {playlists.items.map((i) => {
            return (
              <div
                key={i.id}
                className="cursor-pointer pt-3 pb-2 px-1 hover:opacity-50"
              >
                <Link href={`/playlists/${i.id}`}>
                  <Image
                    src={i.images[0]?.url || `/logo-no-text.svg`}
                    height={250}
                    width={250}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p className="text-center p-5 mb-5 border-y font-medium">
            항목이 없습니다.
          </p>
        </div>
      )}
      <div className="flex flex-row-reverse items-center justify-between">
        <button
          className="px-5 py-3 rounded-full bg-black text-white hover:bg-mplist flex items-center"
          onClick={onClickHandler}
        >
          <AddSVG className="w-5 h-5 mr-2" />
          {!addMode ? "새로 만들기" : name?.length == 0 ? "취소" : "저장"}
        </button>
        {addMode && (
          <CreatePlaylistForm
            checked={checked}
            setChecked={setChecked}
            setName={setName}
            setDescription={setDescription}
          />
        )}
      </div>
    </div>
  );
};

export default PlaylistInMyPage;
