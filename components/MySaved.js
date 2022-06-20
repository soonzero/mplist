import classNames from "classnames";
import Image from "next/image";
import ChevronSVG from "../public/chevron-double-right.svg";

const MySaved = ({ things, data }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center border-b mx-2">
        <h2 className="flex justify-start items-center font-semibold pb-2 hover:text-mplist cursor-pointer">
          {`내가 저장한 ${things === "albums" ? "앨범" : "트랙"}`}
          <span className="ml-1">
            <ChevronSVG className="w-5 h-5" />
          </span>
        </h2>
        <p className="text-sm">{data.total}</p>
      </div>
      <div
        className={classNames(
          {
            "grid gap-2 p-2": things == "albums",
            "grid-cols-1": data.total === 0,
            "grid-cols-3": data.total !== 0,
          },
          {
            "flex flex-col divide-y p-2": things === "tracks",
          }
        )}
      >
        {data.total > 0 ? (
          <>
            {(data.total > (things === "albums" ? 9 : 8)
              ? data.items.slice(0, things === "albums" ? 9 : 8)
              : data.items
            ).map((t) => {
              return things === "albums" ? (
                <Image src={t.album.images[0]?.url} width={300} height={300} />
              ) : (
                <li className="flex items-center py-2 first:pt-0 last:pb-0">
                  <Image
                    src={t.track.album.images[0]?.url}
                    width={50}
                    height={50}
                  />
                  <h3 className="mx-3 text-sm">{t.track.name}</h3>
                </li>
              );
            })}
          </>
        ) : (
          <span className="text-center py-5">
            {`내가 저장한 ${
              things === "albums" ? "앨범" : "트랙"
            }이 아직 없습니다.`}
          </span>
        )}
      </div>
    </div>
  );
};

export default MySaved;
