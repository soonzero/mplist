import signout from "./Logout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import NavBar from "./NavBar";
import { LoginWithSpotifyBtn, ProfileBtn } from "./Buttons";

export default function Header() {
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
    <header className="sticky top-0 bg-white shadow-sm z-10 flex flex-row h-16 items-center max-w-screen-2xl mx-auto justify-between mobile:px-4 tablet:px-8 box-border">
      <NavBar pathname={router.pathname} />
      {!token ? (
        <LoginWithSpotifyBtn />
      ) : (
        <ProfileBtn
          dropdown={dropdown}
          setDropdown={setDropdown}
          logout={logout}
        />
      )}
    </header>
  );
}
