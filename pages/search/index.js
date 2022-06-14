import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import SearchSVG from "../../public/search.svg";

export default function Music() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    router.push(`/search/${keyword}`);
  };

  useEffect(() => {
    setKeyword(keyword);
  }, [keyword]);

  return (
    <>
      <Layout title="검색">
        <form
          onSubmit={onSubmitHandler}
          className="flex items-center justify-center w-full h-[calc(100vh-64px)]"
        >
          <input
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            className="outline-none text-2xl border-b-2 px-2 py-1 border-b-mplist w-64 placeholder:italic placeholder:text-slate-300"
            placeholder="Search..."
          />
          <button type="submit" className="p-2">
            <SearchSVG className="h-8 w-8" />
          </button>
        </form>
      </Layout>
    </>
  );
}
