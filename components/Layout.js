import Head from "next/head";
import NavBar from "../components/NavBar";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} | MPList</title>
      </Head>
      <NavBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
