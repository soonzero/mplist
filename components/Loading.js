import LogoSVG from "../public/logo-no-text.svg";

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <LogoSVG className="w-12 h-12 m-12 animate-spin-slow" />
      가사를 불러오는 데 최대 1분 가량 소요될 수 있습니다. 잠시만 기다려주세요!
    </div>
  );
};

export default Loading;
