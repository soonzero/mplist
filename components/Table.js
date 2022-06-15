import { useState, useEffect } from "react";
import { useAPI } from "./useAPI";
import Cover from "./Cover";
import PrevSVG from "../public/prev-button.svg";
import NextSVG from "../public/next-button.svg";

export default function Table({ category, limit, count }) {
  const [tableTopic, setTableTopic] = useState("");
  const [result, setResult] = useState([]);
  const [table, setTable] = useState([]);
  const [page, setPage] = useState(0);

  const setData = async () => {
    try {
      const data = await useAPI("GET", `/browse/${category}`, {
        country: "KR",
        limit,
      });
      let items, title;
      if (category === "new-releases") {
        title = "신규 앨범";
        items = data.albums.items;
      } else if (category === "featured-playlists") {
        title = data.message;
        items = data.playlists.items;
      }
      setTableTopic(title);
      setResult(items);
      splitData(items, page);
    } catch (e) {
      console.log(e);
    }
  };

  const splitData = (data, page) => {
    setTable(data.slice(page * count, (page + 1) * count));
  };

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    splitData(result, page);
  }, [page]);

  const controlPage = (e) => {
    const direction = e.currentTarget.getAttribute("id");
    if (direction == "prev") {
      setPage((prev) => prev - 1);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="py-4">
      <h1 className="font-bold text-2xl mb-4">{tableTopic}</h1>
      <div className="relative grid grid-flow-col grid-rows-1 gap-5">
        {table?.map((i) => (
          <Cover key={i.id} category={category} item={i} />
        ))}
        {table?.length > 0 && (
          <>
            {page !== 0 && (
              <span
                id="prev"
                className="absolute flex items-center -left-7 cursor-pointer h-full hover:bg-mplist hover:text-white hover:opacity-50"
                onClick={controlPage}
              >
                <PrevSVG className="h-5 w-5" />
              </span>
            )}
            {page !== limit / count - 1 && (
              <span
                id="next"
                className="absolute flex items-center -right-7 cursor-pointer h-full  hover:bg-mplist hover:text-white hover:opacity-50"
                onClick={controlPage}
              >
                <NextSVG className="h-5 w-5" />
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
