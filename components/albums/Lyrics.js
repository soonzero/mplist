import Loading from "../common/Loading";

const Lyrics = ({ lyrics, error }) => {
  return (
    <div className="h-[calc(100%-64px)] whitespace-pre-line overflow-y-scroll px-4 py-2">
      {lyrics ? (
        lyrics
      ) : error ? (
        <span className="flex items-center justify-center h-full text-center">
          가사를 찾을 수 없습니다.
        </span>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Lyrics;
