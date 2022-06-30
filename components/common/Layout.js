import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "./Header";
import Link from "next/link";
import AUTH_LINK from "../../data/api";
import Footer from "./Footer";

const Layout = ({ title, children }) => {
  const [display, setDisplay] = useState();

  useEffect(() => {
    if (Cookies.get("mplistToken")) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title} | MPList</title>
      </Head>
      <Header />
      <main className="flex flex-col max-w-screen-2xl mx-auto px-8 mobile:px-4 tablet:px-8">
        {display ? (
          children
        ) : (
          <section className="text-4xl flex items-center justify-center h-[calc(100vh-64px)]">
            <Link href={AUTH_LINK}>
              <a className="font-bold hover:text-mplist mobile:text-base tablet:text-2xl laptop:text-3xl monitor:text-4xl text-center">
                로그인 후에 이용 가능합니다. <br />
                여기를 눌러 로그인해주세요.
              </a>
            </Link>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Layout;