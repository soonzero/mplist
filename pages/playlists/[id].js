import Layout from "../../components/common/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiUse, {
  addCommasToNumber,
  removeBracket,
} from "../../functions/common";
import { managePlaylistFollowing } from "../../functions/playlists";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import ChangePlaylistDetailForm from "../../components/playlist/ChangePlaylistDetailForm";
import {
  AddToMyPlaylistSmallBtn,
  ChangeBtn,
  FollowBtn,
  RemoveFromMyPlaylistSmallBtn,
} from "../../components/common/Buttons";
import Artists from "../../components/common/Artists";

export const getServerSideProps = async (context) => {
  const playlistId = context.params.id;
  const token = context.req.cookies["mplistToken"];
  const data = await apiUse(token, "GET", `playlists/${playlistId}`);
  const { id } = await apiUse(token, "GET", `/me`);
  const following = await apiUse(
    token,
    "GET",
    `playlists/${playlistId}/followers/contains`,
    {
      ids: id,
    }
  );
  return {
    props: {
      data,
      following: following[0],
      id,
    },
  };
};

const Playlist = ({ data, following, id }) => {
  const router = useRouter();
  const [follow, setFollow] = useState(following);
  const [changeMode, setChangeMode] = useState(false);

  const getFollow = async () => {
    try {
      const modifiedFollow = await apiUse(
        Cookies.get("mplistToken"),
        "GET",
        `playlists/${router.query.id}/followers/contains`,
        {
          ids: id,
        }
      );
      setFollow(modifiedFollow[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFollow();
  }, [follow]);

  return (
    <Layout title="플레이리스트">
      <section className="py-4 flex flex-col text-sm">
        <div className="relative flex rounded-lg border-2 p-4 mb-4 mobile:flex-col mobile-lg:flex-row">
          <Image
            src={data.images[0]?.url || `/images/logo-no-text.svg`}
            width={325}
            height={325}
          />
          <div className="grow flex flex-col space-y-1 mobile:mt-4 mobile-lg:ml-4 mobile-lg:mt-0">
            {!changeMode ? (
              <div>
                <h1 className="font-bold pb-1 mobile:text-xl mobile-lg:text-lg tablet:text-xl">
                  {data.name}
                </h1>
                <p className="mobile:text-base mobile-lg:text-sm tablet:text-base">
                  {removeBracket(data.description)}
                </p>
                <p>{addCommasToNumber(data.followers.total)} following</p>
              </div>
            ) : (
              <ChangePlaylistDetailForm
                id={data.id}
                originName={data.name}
                originDesc={data.description}
              />
            )}
            <FollowBtn
              followed={follow}
              func={() => managePlaylistFollowing(data.id, follow, setFollow)}
            />
          </div>
          {(data.collaborative || data.owner.id == id) && (
            <ChangeBtn setChangeMode={setChangeMode} />
          )}
        </div>
        <ul className="divide-y-2">
          {data.tracks.items.map((t) => {
            return (
              <li
                key={t.id}
                className="flex items-center justify-start pt-2 pb-1"
              >
                <Link className="px-2" href={`/albums/${t.track.album.id}`}>
                  <Image
                    src={t.track.album.images[0].url}
                    width={50}
                    height={50}
                  />
                </Link>
                <h2 className="grow basis-5/12 px-2 truncate mobile:text-xs mobile-lg:text-sm">
                  {t.track.name}
                </h2>
                <Artists artists={t.track.artists} />
                <Link href={`/albums/${t.track.album.id}`}>
                  <span className="text-xs basis-3/12 truncate cursor-pointer hover:text-mplist hover:underline px-2 mobile:hidden tablet:block">
                    {t.track.album.name}
                  </span>
                </Link>
                {data.collaborative || data.owner.id == id ? (
                  <RemoveFromMyPlaylistSmallBtn
                    playlistId={router.query.id}
                    uri={t.track.uri}
                  />
                ) : (
                  <AddToMyPlaylistSmallBtn />
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};

export default Playlist;
