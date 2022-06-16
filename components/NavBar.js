import Link from "next/link";
import LogoSVG from "../public/logo-no-text.svg";
import signout from "../components/Logout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SpotifySVG from "../public/spotify.svg";
import ProfileSVG from "../public/profile.svg";
import getToken from "./getToken";
import {
  AUTH_ENDPOINT,
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
} from "./apiData";
import classNames from "classnames";
import Cookies from "js-cookie";

export default function NavBar() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [dropdown, setDropdown] = useState(false);

  const logout = () => {
    signout();
    router.push("/auth/logout");
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = Cookies.get("mplistToken");

    if (!token && hash.includes("access_token")) {
      token = hash.substring(1).split("&")[0].substring(13);
      window.location.hash = "";
      Cookies.set("mplistToken", token, { expires: 1 / 24, secure: true });
    }

    setToken(token);
  }, []);

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
          ].map((i) => {
            return (
              <Link key={i.element} href={i.href}>
                <a
                  className={classNames(
                    "px-4 py-2 text-sm text-gray-600 hover:text-gray-400",
                    {
                      "text-mplist":
                        router.pathname.split("/")[1] === i.href.substring(1),
                    }
                  )}
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
          <span
            className="cursor-pointer relative"
            onClick={() => setDropdown((prev) => !prev)}
          >
            <ProfileSVG className="w-10 h-10 text-gray-300 hover:text-mplist" />
            {dropdown && (
              <ul className="absolute top-10 right-0 z-30 w-max overflow-hidden rounded-lg border text-sm">
                <Link href="/mypage">
                  <li className="px-5 py-2 bg-white hover:bg-mplist hover:text-white border-b">
                    마이 페이지
                  </li>
                </Link>
                <li
                  className="px-5 py-2 bg-white hover:bg-mplist hover:text-white"
                  onClick={logout}
                >
                  로그아웃
                </li>
              </ul>
            )}
          </span>
        )}
      </div>
    </nav>
  );
}
