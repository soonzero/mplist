import Layout from "../../components/Layout";
import SearchSVG from "../../public/search.svg";
import Cover from "../../components/Cover";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import searchSomething from "../../components/searchSomething";

const SearchResult = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState();

  const getData = async () => {
    const data = await searchSomething(router.query.keyword);
    setResult(data);
  };

  const search = async (e) => {
    e.preventDefault();
    const data = await searchSomething(keyword);
    setResult(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout title={`${keyword} 검색결과`}>
      <form
        onSubmit={search}
        className="flex items-center justify-center w-full py-10"
      >
        <input
          type="text"
          defaultValue={router.query.keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="outline-none text-2xl border-b-2 px-2 py-1 border-b-mplist w-64 placeholder:italic placeholder:text-slate-300"
          placeholder="Search..."
        />
        <button type="submit" className="p-2">
          <SearchSVG className="h-8 w-8" />
        </button>
      </form>
      <div className="grid grid-flow-row grid-cols-5 gap-4 text-sm">
        {result?.map((i) => (
          <Cover key={i.id} category="search" item={i} />
        ))}
      </div>
    </Layout>
  );
};

export default SearchResult;