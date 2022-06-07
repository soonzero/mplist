import Link from "next/link";
import Logo from "../public/logo-no-text.svg";

export default function NavBar() {
  return (
    <nav className="sticky top-0 bg-white shadow-sm z-10">
      <div className="flex flex-row h-16 items-center max-w-screen-2xl mx-auto justify-between px-8">
        <div className="flex flex-row items-center">
          <Link href="/">
            <a className="flex items-center mr-10">
              <Logo className="h-12 w-12" />
            </a>
          </Link>
          <Link href="/">
            <a className="px-4 py-2 text-sm text-gray-600">Home</a>
          </Link>
          <Link href="/search">
            <a className="px-4 py-2 text-sm text-gray-600">Search</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
