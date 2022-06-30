import MySaved from "./MySaved";

const MyMusic = ({ myTracks, myAlbums }) => {
  return (
    <section className="py-4 flex flex-col mb-8">
      <h1 className="font-bold mb-4 text-2xl">내가 저장한 음악</h1>
      <articles className="mobile:flex mobile:flex-col tablet:grid tablet:grid-cols-2 tablet:gap-5">
        <MySaved things="albums" data={myAlbums} />
        <MySaved things="tracks" data={myTracks} />
      </articles>
    </section>
  );
};

export default MyMusic;
