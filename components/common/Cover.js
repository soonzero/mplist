import classNames from "classnames";
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClickHandler(item)}
    >
      {hover && (
        <div className="absolute flex flex-col px-3 items-center justify-center w-full h-full top-0 left-0 text-white z-10">
          <h3 className="font-bold mobile:text-sm tablet:text-base laptop:text-lg truncate">
            {data().title}
          </h3>
          {data().artists && (
            <h4 className="text-center">
              {data().artists.map((a, idx) => {
                return (
                  <span key={a.id}>
                    <div className="inline-block mobile:text-xs tablet:text-sm laptop:text-base">
                      {a.name}
                      <span className="whitespace-pre-wrap">
                        {idx != data().artists.length - 1 && `, `}
                      </span>
                    </div>
                  </span>
                );
              })}
            </h4>
          )}
        </div>
      )}
      <Image
        className={classNames({ "blur-sm": hover })}
        src={data().image}
        alt={`album cover of ${data().title}`}
        width={640}
        height={640}
      />
    </div>
  );
};

export default Cover;
