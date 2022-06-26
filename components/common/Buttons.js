import Link from "next/link";
import AUTH_LINK from "../../data/api";
import SpotifySVG from "../../public/images/spotify.svg";
import ProfileSVG from "../../public/images/profile.svg";
import Dropdown from "./Dropdown";
import PrevSVG from "../../public/images/prev-button.svg";
import NextSVG from "../../public/images/next-button.svg";
import TrashSVG from "../../public/images/trash.svg";
import AddSVG from "../../public/images/add.svg";
import SaveSVG from "../../public/images/save.svg";
import CancelSVG from "../../public/images/cancel.svg";
import LyricsSVG from "../../public/images/lyrics.svg";
import DetailSVG from "../../public/images/detail.svg";
import CheckSVG from "../../public/images/check-circle.svg";
import DeleteSVG from "../../public/images/delete.svg";
import ChangeSVG from "../../public/images/change.svg";
import RemoveSVG from "../../public/images/remove.svg";
import { manageMine } from "../../functions/common";
import { useState } from "react";
import { removeItemFromMyPlaylist } from "../../functions/playlists";

export const LoginWithSpotifyBtn = () => {
  return (
    <Link href={AUTH_LINK}>
      <a className="flex flex-row items-center justify-center rounded-full opacity-70 bg-spotify hover:bg-spotify hover:opacity-100 text-white py-2 px-4">
        Login with
        <SpotifySVG className="fill-white w-5 h-auto ml-2" />
      </a>
    </Link>
  );
};

export const ProfileBtn = ({ dropdown, setDropdown, logout }) => {
  return (
    <button
      className="cursor-pointer relative"
      onClick={() => setDropdown((prev) => !prev)}
    >
      <ProfileSVG className="w-10 h-10 text-gray-300 hover:text-mplist" />
      {dropdown && <Dropdown logout={logout} />}
    </button>
  );
};

export const PrevBtn = ({ page, controlPage }) => {
  return (
    <button
      id="prev"
      className="flex items-center justify-center cursor-pointer border rounded-full w-8 h-8 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={controlPage}
      disabled={page === 0}
    >
      <PrevSVG className="h-5 w-5" />
    </button>
  );
};

export const NextBtn = ({ page, controlPage, limit, count }) => {
  return (
    <button
      id="next"
      className="flex items-center justify-center cursor-pointer border rounded-full w-8 h-8 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={controlPage}
      disabled={page === limit / count - 1}
    >
      <NextSVG className="h-5 w-5" />
    </button>
  );
};

export const AddToPlaylistLargeBtn = () => {
  return (
    <button className="flex items-center justify-center py-2 bg-slate-400 text-white rounded-full cursor-pointer hover:bg-mplist">
      <AddSVG className="w-5 h-5" />
      <span className="ml-1 text-xs">Playlist에 추가</span>
    </button>
  );
};

export const AddToMyPlaylistSmallBtn = ({ t, showModal }) => {
  return (
    <button
      className="hover:text-mplist px-1"
      onClick={() => showModal("addTrack", t)}
    >
      <AddSVG className="w-5 h-5" />
    </button>
  );
};

export const RemoveFromMyPlaylistSmallBtn = ({ playlistId, uri }) => {
  return (
    <button
      className="hover:text-mplist px-1"
      onClick={() => removeItemFromMyPlaylist(playlistId, uri)}
    >
      <RemoveSVG className="w-5 h-5" />
    </button>
  );
};

export const SaveToMineLargeBtn = ({ result, albumSaved, setAlbumSaved }) => {
  return (
    <button
      className="flex items-center justify-center py-2 bg-slate-400 text-white rounded-full cursor-pointer hover:bg-mplist"
      onClick={() => manageMine(result, albumSaved, setAlbumSaved)}
    >
      {albumSaved ? (
        <TrashSVG className="w-5 h-5" />
      ) : (
        <SaveSVG className="w-5 h-5" />
      )}
      <span className="ml-1 text-xs">
        {albumSaved ? "내 앨범에서 삭제" : "내 앨범에 추가"}
      </span>
    </button>
  );
};

export const SaveToMineSmallBtn = ({
  t,
  tracksSaved,
  setTracksSaved,
  tracksStatus,
  idx,
}) => {
  return (
    <button
      className="hover:text-mplist px-1"
      onClick={() => manageMine(t, tracksSaved, setTracksSaved, idx)}
    >
      {tracksStatus[idx] ? (
        <CancelSVG className="w-5 h-5" />
      ) : (
        <SaveSVG className="w-5 h-5" />
      )}
    </button>
  );
};

export const LyricsBtn = ({ t, showModal }) => {
  return (
    <button
      className="hover:text-mplist basis-1/20"
      onClick={() => showModal("lyrics", t)}
    >
      <LyricsSVG className="h-5 w-5 mx-auto" />
    </button>
  );
};

export const DetailBtn = () => {
  return (
    <button className="hover:text-mplist px-1">
      <DetailSVG className="w-5 h-5" />
    </button>
  );
};

export const FollowBtn = ({ followed, func }) => {
  const [hover, setHover] = useState(false);

  const setBtnSVG = () => {
    if (followed) {
      if (hover) {
        return <DeleteSVG className="h-5 w-5 mr-1" />;
      } else {
        return <CheckSVG className="h-5 w-5 mr-1" />;
      }
    } else {
      return <AddSVG className="w-5 h-5 mr-1" />;
    }
  };

  const setBtnText = () => {
    if (followed) {
      if (hover) {
        return `Unfollow`;
      } else {
        return "Following";
      }
    } else {
      return `Follow`;
    }
  };

  return (
    <div className="grow flex justify-end items-end">
      <button
        type="button"
        className="rounded-full px-5 py-3 bg-black text-white flex hover:bg-mplist"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={func}
      >
        {setBtnSVG()}
        <span>{setBtnText()}</span>
      </button>
    </div>
  );
};

export const ChangeBtn = ({ setChangeMode }) => {
  return (
    <button
      className="absolute top-0 right-0 cursor-pointer text-gray-400 hover:text-mplist mobile:top-2/3 mobile: m-3 mobile-lg:top-0 mobile-lg:m-5"
      onClick={() => setChangeMode((prev) => !prev)}
    >
      <ChangeSVG className="w-5 h-5" />
    </button>
  );
};
