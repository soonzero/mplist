import Image from "next/image";
import { useState } from "react";

const Cover = ({ category, item }) => {
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

  return (
    <div
      className="h-full w-full overflow-hidden relative cursor-pointer"
      onMouseEnter={() => setHover((prev) => !prev)}
      onMouseLeave={() => setHover((prev) => !prev)}
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
