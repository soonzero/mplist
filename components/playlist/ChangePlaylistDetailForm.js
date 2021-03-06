import Cookies from "js-cookie";
import { useState } from "react";
import CheckSVG from "../../public/images/check.svg";
import PrevSVG from "../../public/images/prev-page.svg";
import classNames from "classnames";
import { changePlaylistDetail } from "../../functions/playlists";
import { useRouter } from "next/router";

const ChangePlaylistDetailForm = ({
  id,
  originName,
  originDesc,
  setChangeMode,
}) => {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPublic, setNewPublic] = useState(false);

  return (
    <form
      className="flex flex-col"
      onSubmit={(e) =>
        changePlaylistDetail(
          e,
          router,
          Cookies.get("mplistToken"),
          id,
          newTitle,
          newDesc,
          newPublic
        )
      }
    >
      <fields className="flex flex-col items-start justify-center mb-3 relative">
        <field className="mb-3">
          <label
            htmlFor="title"
            className="px-3 font-bold mobile:text-xl mobile-lg:text-lg tablet:text-xl"
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            required
            defaultValue={originName}
            placeholder="새로운 제목을 입력하세요"
            className="px-1 outline-none border-b-2 border-mplist mobile:text-xl mobile-lg:text-lg tablet:text-xl"
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </field>
        <field className="mb-3">
          <label htmlFor="description" className="px-3">
            설명
          </label>
          <input
            id="description"
            type="text"
            placeholder="새로운 설명을 입력하세요"
            defaultValue={originDesc}
            className="outline-none px-1 border-b-2 border-mplist w-1/2"
            onChange={(e) => setNewDesc(e.target.value)}
          />
        </field>
        <field>
          <label htmlFor="public" className="px-3 flex items-center">
            <span className="mr-3">공개</span>
            <CheckSVG
              className={classNames("w-5 h-5 text-gray-500", {
                "text-mplist": newPublic,
              })}
            />
          </label>
          <input
            id="public"
            type="checkbox"
            className="hidden"
            onChange={() => setNewPublic((prev) => !prev)}
          />
        </field>
        <PrevSVG
          onClick={() => setChangeMode((prev) => !prev)}
          className="w-5 h-5 absolute top-0 right-0 cursor-pointer text-gray-400 hover:text-mplist"
        />
      </fields>
      <button
        type="submit"
        className="m-3 px-4 py-2 bg-gray-400 text-white w-max rounded-full hover:bg-mplist"
      >
        변경하기
      </button>
    </form>
  );
};

export default ChangePlaylistDetailForm;
