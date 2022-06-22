import navMenu from "../data/navMenu";
import Link from "next/link";

const Dropdown = ({ logout }) => {
  return (
    <ul className="absolute top-10 right-0 z-30 w-max overflow-hidden rounded-lg border text-sm mobile:text-xs tablet:text-sm">
      {navMenu.map((i) => {
        return (
          <Link key={i.id} href={i.href}>
            <li className="text-left pl-3 pr-6 py-2 tablet:hidden bg-white hover:bg-mplist hover:text-white border-b">
              {i.element}
            </li>
          </Link>
        );
      })}
      <Link href="/mypage">
        <li className="text-left pl-3 pr-6 py-2 bg-white hover:bg-mplist hover:text-white border-b">
          마이 페이지
        </li>
      </Link>
      <li
        className="text-left pl-3 pr-6 py-2 bg-white hover:bg-mplist hover:text-white"
        onClick={logout}
      >
        로그아웃
      </li>
    </ul>
  );
};

export default Dropdown;
