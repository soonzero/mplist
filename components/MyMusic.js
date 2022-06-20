import MySaved from "./MySaved";

const MyMusic = ({ myTracks, myAlbums }) => {
  return (
    <div className="py-4 flex flex-col mb-8">
      <h1 className="font-bold text-3xl mb-4">내 음악</h1>
      <div className="grid grid-cols-2 gap-5">
        <MySaved things="albums" data={myAlbums} />
        <MySaved things="tracks" data={myTracks} />
      </div>
    </div>
  );
};

export default MyMusic;
