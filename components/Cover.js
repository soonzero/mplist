import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Cover = ({ category, item }) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const data = () => {
    switch (category) {
      case "search": {
        return {
          image: item.album.images[0].url,
          title: item.name,
          artists: item.artists,
        };
      }
      default: {
        return {
          image: item.images[0].url,
          title: item.name,
          artists: item.artists,
        };
      }
    }
  };

  const onClickHandler = ({ type, id, album }) => {
    if (type === "album") {
      router.push(`/albums/${id}`);
    } else if (type === "playlist") {
      router.push(`/playlists/${id}`);
    } else if (type === "track") {
      router.push(`/albums/${album.id}`);
    }
  };

  return (
    <div
      className="overflow-hidden relative cursor-pointer"
      onMouseEnter={() => setHover((prev) => !prev)}
      onMouseLeave={() => setHover((prev) => !prev)}
      onClick={() => onClickHandler(item)}
    >
      <Image src={data().image} width={640} height={640} />
      {hover && (
        <div className="absolute flex flex-col items-center justify-center w-full h-full top-0 left-0 bg-opacity-40 bg-black text-white z-10">
          <span>{data().title}</span>
          {data().artists && (
            <span>
              {data().artists.map((a, idx) => {
                return (
                  <span key={a.id}>
                    {a.name}
                    {idx === data().artists.length - 1 ? "" : ", "}
                  </span>
                );
              })}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Cover;
