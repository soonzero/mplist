import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LogoSVG from "../../public/logo-no-text.svg";

const Logout = () => {
  const router = useRouter();

  const navigate = () => {
    router.push("/");
  };

  useEffect(() => {
    const navigation = setTimeout(navigate, 10000);

    return () => {
      clearTimeout(navigation);
    };
  });

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <span className="w-1/4 h-1/4 mb-5">
        <LogoSVG className="w-full h-full" />
      </span>
      <div className="flex flex-col items-center justify-center">
        <h1>로그아웃이 완료되었어요.</h1>
        <p>10초 뒤 메인 페이지로 이동합니다.</p>
        <span>
          <Link href="/">
            <a className="font-bold hover:text-mplist">여기</a>
          </Link>
          를 누르시면 메인 페이지로 바로 이동합니다.{" "}
        </span>
      </div>
    </div>
  );
};

export default Logout;
