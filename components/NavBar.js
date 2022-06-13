import Link from "next/link";
import Logo from "../public/logo-no-text.svg";
import signout from "../components/Logout";
import { useEffect, useState } from "react";
import Spotify from "../public/spotify.svg";
import getToken from "./getToken";
import {
  AUTH_ENDPOINT,
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
} from "./apiData";

export default function NavBar() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(getToken());
  }, []);

  const logout = () => {
    signout();
    setToken("");
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-10">
      <div className="flex flex-row h-16 items-center max-w-screen-2xl mx-auto justify-between px-8">
        <div className="flex flex-row items-center">
          <Link href="/">
            <a className="flex items-center mr-10">
              <Logo className="h-12 w-12" />
            </a>
          </Link>
          <Link href="/">
            <a className="px-4 py-2 text-sm text-gray-600">Home</a>
          </Link>
          <Link href="/albums">
            <a className="px-4 py-2 text-sm text-gray-600">Albums</a>
          </Link>
          <Link href="/playlists">
            <a className="px-4 py-2 text-sm text-gray-600">Playlists</a>
          </Link>
          <Link href="/search">
            <a className="px-4 py-2 text-sm text-gray-600">Search</a>
          </Link>
        </div>
        {!token ? (
          <Link
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            <a className="flex flex-row items-center justify-center rounded-full opacity-70 bg-spotify hover:bg-spotify hover:opacity-100 text-white py-2 px-4">
              Login with
              <Spotify className="fill-white w-5 h-auto ml-2" />
            </a>
          </Link>
        ) : (
          <a
            onClick={logout}
            className="rounded-full bg-gray-200 hover:bg-gray-300 text-white py-2 px-4"
          >
            로그아웃
          </a>
        )}
      </div>
    </nav>
  );
}