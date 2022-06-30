import Image from "next/image";
import Link from "next/link";

const MyTopItems = ({ topTracks, topArtists }) => {
  return (
    <>
      {(topTracks.total > 0 || topArtists.total > 0) && (
        <section className="py-4 flex flex-col mb-8">
          <h1 className="font-bold mb-4 text-2xl">내가 가장 좋아하는 음악</h1>
          <articles className="mobile:flex-col tablet:flex-row items-center justify-center">
            {topArtists.total > 0 && (
              <article className="flex flex-col">
                <h2 className="pb-2 border-b">내가 가장 좋아하는 아티스트</h2>
                <ul className="flex flex-wrap justify-center items-center">
                  {topArtists.items.map((a) => {
                    return (
                      <Link key={a.id} href={`/artist/${a.id}`}>
                        <li className="flex flex-col justify-center items-center text-center p-2">
                          <Image
                            className="rounded-full"
                            src={a.images[0].url || `/images/logo-no-text.svg`}
                            width={150}
                            height={150}
                          />
                          <h3 className="mt-2 truncate">{a.name}</h3>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </article>
            )}
            {topTracks.total > 0 && (
              <article className="flex flex-col">
                <h2 className="pb-2 border-b">내가 가장 좋아하는 트랙</h2>
                <ul>
                  {topTracks.items.map((t) => {
                    return (
                      <li
                        key={t.id}
                        className="flex flex-col justify-center items-center py-2 first:pt-0 last:pb-0"
                      >
                        <Link href={`/albums/${t.track.album.id}`}>
                          <Image
                            className="cursor-pointer"
                            src={t.images[0]?.url || `/images/logo-no-text.svg`}
                            width={50}
                            height={50}
                          />
                        </Link>
                        <h3 className="truncate">{t.name}</h3>
                      </li>
                    );
                  })}
                </ul>
              </article>
            )}
          </articles>
        </section>
      )}
    </>
  );
};

export default MyTopItems;
