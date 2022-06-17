import classNames from "classnames";
import Image from "next/image";

const MyMusic = ({ myTracks, myAlbums }) => {
  return (
    <div className="py-4 flex flex-col mb-8">
      <h1 className="font-bold text-3xl mb-4">내 음악</h1>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <h2 className="font-semibold pl-2 pb-2 mb-3 border-b">
            내가 저장한 앨범
          </h2>
          <ul
            className={classNames(
              "flex flex-col justify-center divide-y h-full",
              {
                "justify-start": myAlbums.items?.length > 0,
              }
            )}
          >
            {myAlbums.items?.length > 0 ? (
              <>
                {myTracks.items.map((t) => {
                  return (
                    <li className="flex justify-center items-center py-2">
                      <Image
                        src={t.track.album.images[0]?.url}
                        width={50}
                        height={50}
                      />
                      <h3 className="mx-3">{t.track.name}</h3>
                    </li>
                  );
                })}
              </>
            ) : (
              <span className="text-center">
                내가 저장한 앨범이 아직 없습니다.
              </span>
            )}
          </ul>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold pl-2 pb-2 mr-5 border-b">
            내가 저장한 트랙
          </h2>
          <ul className="flex flex-col divide-y">
            {myTracks.items?.length > 0 ? (
              <>
                {myTracks.items.map((t) => {
                  return (
                    <li className="flex items-center py-2">
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
              <span className="text-center">
                내가 저장한 트랙이 아직 없습니다.
              </span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyMusic;
