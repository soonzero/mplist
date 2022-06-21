import { useState, useEffect } from "react";
import apiUse from "../functions/common";
import Cover from "./Cover";
import PrevSVG from "../public/prev-button.svg";
import NextSVG from "../public/next-button.svg";
import Cookies from "js-cookie";
import classNames from "classnames";

export default function Table({ category, limit, count }) {
  const [tableTopic, setTableTopic] = useState("");
  const [result, setResult] = useState([]);
  const [table, setTable] = useState([]);
  const [page, setPage] = useState(0);

  const setData = async () => {
    try {
      const data = await apiUse(
        Cookies.get("mplistToken"),
        "GET",
        `/browse/${category}`,
        {
          country: "KR",
          limit,
        }
      );
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
    <div className="pt-4 pb-8 last:pb-12">
      <h1 className="relative flex justify-between font-bold mobile:text-lg tablet:text-2xl mb-4">
        {tableTopic}
        {table?.length > 0 && (
          <div className="flex space-x-2">
            <button
              id="prev"
              className="flex items-center justify-center cursor-pointer border rounded-full w-8 h-8 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={controlPage}
              disabled={page === 0}
            >
              <PrevSVG className="h-5 w-5" />
            </button>
            <button
              id="next"
              className="flex items-center justify-center cursor-pointer border rounded-full w-8 h-8 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={controlPage}
              disabled={page === limit / count - 1}
            >
              <NextSVG className="h-5 w-5" />
            </button>
          </div>
        )}
      </h1>
      <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-2 tablet:grid-cols-4 tablet:grid-rows-1">
        {table?.map((i) => (
          <Cover key={i.id} category={category} item={i} />
        ))}
      </div>
    </div>
  );
}
