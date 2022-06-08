import Head from "next/head";
import NavBar from "../components/NavBar";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} | MPList</title>
      </Head>
      <NavBar />
      <main className="flex flex-col max-w-screen-2xl mx-auto px-8">
        {children}
      </main>
    </>
  );
};

export default Layout;
