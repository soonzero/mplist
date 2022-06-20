import GitHubSVG from "../public/github.svg";
import NotionSVG from "../public/notion.svg";
import LogoText from "../public/logo-text.svg";

const Footer = () => {
  return (
    <footer className="bg-[#F9F9F9] py-12">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex justify-between mb-12">
          <div>
            <span>
              <LogoText />
            </span>
          </div>
        </div>
        <section className="flex justify-between items-start text-xs text-slate-400">
          <div>
            <p>Copyright 2022. MPList</p>
            <p>All rights reserved</p>
          </div>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://github.com/soonzero/mplist"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubSVG className="fill-[#24292F] hover:opacity-80" />
              </a>
            </li>
            <li>
              <a
                href="https://www.notion.so/MPList-37103c94cbf14920a3e4bbae4a8d209b"
                target="_blank"
                rel="noreferrer"
              >
                <NotionSVG className="fill-[#111111] hover:opacity-80" />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
};
export default Footer;
