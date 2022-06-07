import Head from "next/head";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} | MPList</title>
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
