import Link from "next/link";
import LogoSVG from "../public/logo-no-text.svg";
import signout from "../components/Logout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SpotifySVG from "../public/spotify.svg";
import getToken from "./getToken";
import {
  AUTH_ENDPOINT,
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
} from "./apiData";
import classNames from "classnames";

export default function NavBar() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(getToken());
  }, []);

  const logout = () => {
    signout();
    setToken("");
    router.push("/auth/logout");
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-10">
      <div className="flex flex-row h-16 items-center max-w-screen-2xl mx-auto justify-between px-8">
        <div className="flex flex-row items-center">
          <Link href="/">
            <a className="flex items-center mr-10">
              <LogoSVG className="h-12 w-12" />
            </a>
          </Link>
          {[
            { href: "/", element: "Home" },
            { href: "/albums", element: "Albums" },
            { href: "/playlists", element: "Playlists" },
            { href: "/artists", element: "Artists" },
            { href: "/search", element: "Search" },
            { href: "/mypage", element: "My Page" },
          ].map((i) => {
            return (
              <Link href={i.href}>
                <a
                  className={classNames("px-4 py-2 text-sm text-gray-600", {
                    "text-mplist":
                      router.pathname.split("/")[1] === i.href.substring(1),
                  })}
                >
                  {i.element}
                </a>
              </Link>
            );
          })}
        </div>
        {!token ? (
          <Link
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
          >
            <a className="flex flex-row items-center justify-center rounded-full opacity-70 bg-spotify hover:bg-spotify hover:opacity-100 text-white py-2 px-4">
              Login with
              <SpotifySVG className="fill-white w-5 h-auto ml-2" />
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
