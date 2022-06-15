import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useAPI } from "../../components/useAPI";
import Image from "next/image";
import Link from "next/link";
import ChevronSVG from "../../public/chevron-double-right.svg";
import AddSVG from "../../public/add.svg";
import CheckSVG from "../../public/check.svg";
import classNames from "classnames";
import { createPlaylist } from "../../components/createPlaylist";

const MyPage = () => {
  const [result, setResult] = useState();
  const [addMode, setAddMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  const [checked, setChecked] = useState(false);

  const setData = async () => {
    try {
      const info = await useAPI("GET", `/me`);
      const playlists = await useAPI("GET", `/me/playlists`);
      setResult({ info, playlists });
    } catch (e) {
      console.log(e);
    }
  };

  const onClickHandler = async (e) => {
    if (addMode) {
      e.preventDefault();
      createPlaylist(result.info.id, name, description);
    } else {
      setAddMode(true);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      {result && (
        <Layout title="내 정보">
          <div className="py-4 flex flex-col mb-8">
            <h1 className="font-bold text-3xl mb-4">내 프로필</h1>
            <table>
              <thead>
                <tr className="border-y">
                  <td className="px-5 py-2 text-right text-gray-500">성명</td>
                  <td className="px-5 py-2 font-medium">
                    {result.info.display_name}
                  </td>
                </tr>
                <tr className="border-y">
                  <td className="px-5 py-2 text-right text-gray-500">
                    사용자 이름
                  </td>
                  <td className="px-5 py-2 font-medium">{result.info.id}</td>
                </tr>
                <tr className="border-y">
                  <td className="px-5 py-2 text-right text-gray-500">이메일</td>
                  <td className="px-5 py-2 font-medium">{result.info.email}</td>
                </tr>
              </thead>
            </table>
          </div>
          <div className="py-4">
            <Link href="/mypage/my-playlists">
              <h1 className="flex items-center font-bold text-3xl mb-4 hover:text-mplist cursor-pointer w-max">
                플레이리스트
                {result.playlists.total > 0 && (
                  <ChevronSVG className="h-5 w-5 ml-2" />
                )}
              </h1>
            </Link>
            {result.playlists.total > 0 ? (
              <div className="grid grid-flow-col grid-cols-6 gap-2 mb-5 border-y">
                {result.playlists.items.map((i) => {
                  return (
                    <div className="cursor-pointer hover:opacity-50">
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
                {addMode ? "저장" : "새로 만들기"}
              </button>
              {addMode && (
                <form className="grow flex items-center space-x-5">
                  <div>
                    <label
                      htmlFor="public"
                      className={classNames(
                        "flex items-center text-slate-500",
                        {
                          "text-mplist": checked,
                        }
                      )}
                    >
                      <CheckSVG className="mr-1 w-6 h-6" />
                      <span>공개</span>
                    </label>
                    <input
                      id="public"
                      type="checkbox"
                      className="hidden"
                      onChange={() => setChecked((prev) => !prev)}
                    />
                  </div>
                  <div className="basis-3/12 flex items-center">
                    <label htmlFor="title" className="mr-3">
                      제목
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="제목"
                      className="border-b-2 border-mplist outline-none p-1 text-sm"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grow flex items-center ">
                    <label htmlFor="description" className="mr-3">
                      설명
                    </label>
                    <input
                      id="description"
                      type="text"
                      placeholder="설명"
                      className="border-b-2 w-10/12 border-mplist outline-none p-1 text-sm"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </form>
              )}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default MyPage;
