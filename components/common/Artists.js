import Link from "next/link";

const Artists = ({ artists }) => {
  return (
    <span className="basis-3/12 truncate mobile:text-xs mobile-lg:text-sm">
      {artists.map((artist, idx) => {
        return (
          <Link key={artist.id} href={`/artists/${artist.id}`}>
            <span className="cursor-pointer hover:text-mplist hover:underline">
              {artist.name}
              {idx === artists.length - 1 ? "" : ", "}
            </span>
          </Link>
        );
      })}
    </span>
  );
};

export default Artists;
