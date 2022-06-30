import Link from "next/link";

const Artists = ({ artists, link }) => {
  return (
    <>
      {artists.map((artist, idx) => {
        return (
          <span key={artist.id}>
            {link ? (
              <Link href={`/artists/${artist.id}`}>
                <a className="cursor-pointer hover:text-mplist hover:underline">
                  {artist.name}
                </a>
              </Link>
            ) : (
              artist.name
            )}
            {idx === artists.length - 1 ? "" : ", "}
          </span>
        );
      })}
    </>
  );
};

export default Artists;
