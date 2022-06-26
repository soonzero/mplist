import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/common/Layout";
import SearchSVG from "../../public/images/search.svg";

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
          className="flex items-center justify-center w-full h-[calc(100vh-276px)]"
        >
          <input
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            className="outline-none text-2xl border-b-2 px-2 py-1 border-b-mplist mobile:w-48 tablet:w-64 mobile:text-lg tablet:text-xl placeholder:italic placeholder:text-slate-300"
            placeholder="Search..."
          />
          <button type="submit" className="p-2">
            <SearchSVG className="mobile:w-6 mobile:h-6 tablet:w-8 tablet:h-8" />
          </button>
        </form>
      </Layout>
    </>
  );
}
