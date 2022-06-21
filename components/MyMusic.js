import MySaved from "./MySaved";

const MyMusic = ({ myTracks, myAlbums }) => {
  return (
    <div className="py-4 flex flex-col mb-8">
      <h1 className="font-bold text-3xl mb-4 mobile:text-2xl">내 음악</h1>
      <div className="mobile:flex mobile:flex-col tablet:grid tablet:grid-cols-2 tablet:gap-5">
        <MySaved things="albums" data={myAlbums} />
        <MySaved things="tracks" data={myTracks} />
      </div>
    </div>
  );
};

export default MyMusic;
