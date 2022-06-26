import { useState, useEffect } from "react";
import apiUse from "../../functions/common";
import Cover from "../common/Cover";
import Cookies from "js-cookie";
import { NextBtn, PrevBtn } from "./Buttons";

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
    <section className="pt-4 pb-8 last:pb-12">
      <h1 className="relative flex justify-between font-bold mobile:text-lg tablet:text-2xl mb-4">
        {tableTopic}
        {table?.length > 0 && (
          <div className="flex space-x-2">
            <PrevBtn page={page} controlPage={controlPage} />
            <NextBtn
              page={page}
              controlPage={controlPage}
              limit={limit}
              count={count}
            />
          </div>
        )}
      </h1>
      <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-2 tablet:grid-cols-4 tablet:grid-rows-1">
        {table?.map((i) => (
          <Cover key={i.id} category={category} item={i} />
        ))}
      </div>
    </section>
  );
}
