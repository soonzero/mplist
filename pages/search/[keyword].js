import Layout from "../../components/Layout";
import SearchSVG from "../../public/search.svg";
import Cover from "../../components/Cover";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import search from "../../functions/search";
import Cookies from "js-cookie";

const SearchResult = () => {
  const token = Cookies.get("mplistToken");
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState();

  const getData = async () => {
    const data = await search(token, router.query.keyword);
    setResult(data);
  };

  const searchNewKeyword = async (e) => {
    e.preventDefault();
    const data = await search(token, keyword);
    setResult(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout title={`${keyword} 검색결과`}>
      <form
        onSubmit={searchNewKeyword}
        className="flex items-center justify-center w-full py-10"
      >
        <input
          type="text"
          defaultValue={router.query.keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="outline-none text-2xl border-b-2 px-2 py-1 border-b-mplist tablet:w-48 mobile:w-32 mobile:text-lg tablet:text-xl placeholder:italic placeholder:text-slate-300"
          placeholder="Search..."
        />
        <button type="submit" className="p-2">
          <SearchSVG className="mobile:w-6 mobile:h-6 tablet:w-8 tablet:h-8" />
        </button>
      </form>
      <div className="grid grid-flow-row gap-4 text-sm pb-12 mobile:grid-cols-1 mobile-lg:grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-5">
        {result?.map((i) => (
          <Cover key={i.id} category="search" item={i} />
        ))}
      </div>
    </Layout>
  );
};

export default SearchResult;
