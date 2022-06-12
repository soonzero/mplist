import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import SearchSVG from "../../public/search.svg";
import Cover from "../../components/Cover";
import { useAPI } from "../../components/useAPI";

export default function Music() {
  const [keyword, setKeyword] = useState("");
  const [tracks, setTracks] = useState([]);

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    const data = await useAPI("GET", `/search`, {
      q: keyword,
      type: "track,artist,album",
    });
    setTracks(data.tracks.items);
  };

  useEffect(() => {
    setKeyword(keyword);
  }, [keyword]);

  return (
    <>
      <Layout title="검색">
        <form
          onSubmit={onSubmitSearch}
          className="flex items-center justify-center w-full py-10"
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
        <div className="grid grid-flow-row grid-cols-5 gap-4 text-sm">
          {tracks?.map((i) => (
            <Cover key={i.id} category="search" item={i} />
          ))}
        </div>
      </Layout>
    </>
  );
}
