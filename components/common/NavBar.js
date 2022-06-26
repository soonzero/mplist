import LogoSVG from "../../public/images/logo-no-text.svg";
import classNames from "classnames";
import Link from "next/link";
import navMenu from "../../data/navMenu";

const NavBar = ({ pathname }) => {
  return (
    <nav>
      <ul className="flex flex-row items-center">
        <li>
          <Link href="/">
            <a className="flex items-center mr-6">
              <LogoSVG className="h-10 w-10 hover:opacity-80" />
            </a>
          </Link>
        </li>
        {navMenu.map((i) => {
          return (
            <li key={i.id}>
              <Link key={i.element} href={i.href}>
                <a
                  className={classNames(
                    "mobile:hidden tablet:block px-4 py-2 text-sm",
                    {
                      "text-mplist":
                        pathname.split("/")[1] === i.href.substring(1),
                      "text-gray-600 hover:text-gray-400":
                        pathname.split("/")[1] !== i.href.substring(1),
                    }
                  )}
                >
                  {i.element}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
