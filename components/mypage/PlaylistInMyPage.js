import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ChevronSVG from "../../public/images/chevron-double-right.svg";
import AddSVG from "../../public/images/add.svg";
import CancelSVG from "../../public/images/cancel.svg";
import CreatePlaylistForm from "./CreatePlaylistForm";
import { createPlaylist } from "../../functions/playlists";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const PlaylistInMyPage = ({ id, playlists }) => {
  const router = useRouter();
  const [addMode, setAddMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  const [checked, setChecked] = useState(false);

  const onClickHandler = async () => {
    if (addMode) {
      if (name?.length > 0) {
        await createPlaylist(
          Cookies.get("mplistToken"),
          id,
          name,
          description,
          checked
        );
        router.push("/mypage/my-playlists");
      } else {
        setAddMode(false);
      }
    } else {
      setAddMode(true);
    }
  };

  return (
    <>
      <section className="py-4">
        <Link href="/mypage/my-playlists">
          <h1 className="flex items-center font-bold text-3xl mb-4 hover:text-mplist cursor-pointer w-max mobile:text-2xl">
            플레이리스트
            {playlists.total > 0 && <ChevronSVG className="h-5 w-5 ml-2" />}
          </h1>
        </Link>
        {playlists.total > 0 ? (
          <article className="grid tablet:grid-cols-6 tablet:gap-2 mb-5 border-y mobile:grid-cols-2 mobile:gap-1">
            {playlists.items.map((i) => {
              return (
                <div
                  key={i.id}
                  className="cursor-pointer pt-3 pb-2 px-1 hover:opacity-50"
                >
                  <Link href={`/playlists/${i.id}`}>
                    <Image
                      src={i.images[0]?.url || `/images/logo-no-text.svg`}
                      height={250}
                      width={250}
                      alt={`cover image of playlist ${i.name}`}
                    />
                  </Link>
                </div>
              );
            })}
          </article>
        ) : (
          <p className="text-center p-5 mb-5 border-y font-medium">
            항목이 없습니다.
          </p>
        )}
      </section>
      <section className="pb-4 flex flex-row-reverse items-center justify-between">
        <button
          className="px-5 py-3 rounded-full bg-black text-white hover:bg-mplist flex items-center"
          onClick={onClickHandler}
        >
          {!addMode ? (
            <>
              <AddSVG className="w-5 h-5 mr-2" />
              새로 만들기
            </>
          ) : name?.length == 0 ? (
            <>
              <CancelSVG className="w-5 h-5 mr-2" />
              취소
            </>
          ) : (
            <>
              <AddSVG className="w-5 h-5 mr-2" />
              저장
            </>
          )}
        </button>
        {addMode && (
          <CreatePlaylistForm
            checked={checked}
            setChecked={setChecked}
            setName={setName}
            setDescription={setDescription}
          />
        )}
      </section>
    </>
  );
};

export default PlaylistInMyPage;
