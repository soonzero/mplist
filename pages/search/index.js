import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import SearchSVG from "../../public/search.svg";
import { useAPI } from "../../components/useAPI";

export default function Music() {
  const [keyword, setKeyword] = useState("");
  const [tracks, setTracks] = useState([]);

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

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
      <Layout title="Music">
        <form
          onSubmit={onSubmitSearch}
          className="flex items-center justify-center w-full py-10"
        >
          <input
            type="text"
            onChange={onChangeKeyword}
            className="outline-none text-2xl border-b-2 px-2 py-1 border-b-[#D2CAF6] w-64 placeholder:italic"
            placeholder="Search..."
          />
          <button type="submit" className="p-2">
            <SearchSVG className="h-8 w-8" />
          </button>
        </form>
        <div className="grid grid-flow-row grid-cols-5 gap-4 text-sm">
          {tracks?.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-start items-center overflow-hidden"
            >
              <Image src={t.album.images[0].url} width={640} height={640} />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
