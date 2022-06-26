import LogoSVG from "../public/images/logo-no-text.svg";

const Loading = ({ mode }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <LogoSVG className="w-12 h-12 mb-12 animate-spin-slow" />
      {mode === "lyrics"
        ? "가사를 불러오는 데 최대 1분 가량 소요될 수 있습니다."
        : "플레이리스트를 불러오고 있습니다. "}
      <br />
      잠시만 기다려주세요!
    </div>
  );
};

export default Loading;
