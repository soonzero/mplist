import CheckSVG from "../../public/images/check.svg";
import classNames from "classnames";

const CreatePlaylistForm = ({
  checked,
  setChecked,
  setName,
  setDescription,
}) => {
  return (
    <form className="grow flex items-center space-x-5">
      <section>
        <label
          htmlFor="public"
          className={classNames("flex items-center text-slate-500", {
            "text-mplist": checked,
          })}
        >
          <CheckSVG className="mr-1 w-6 h-6" />
          <span>공개</span>
        </label>
        <input
          id="public"
          type="checkbox"
          className="hidden"
          onChange={() => setChecked((prev) => !prev)}
        />
      </section>
      <section className="basis-3/12 flex items-center">
        <label htmlFor="title" className="mr-3">
          제목
        </label>
        <input
          id="title"
          type="text"
          placeholder="제목"
          className="border-b-2 border-mplist outline-none p-1 text-sm"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </section>
      <section className="grow flex items-center ">
        <label htmlFor="description" className="mr-3">
          설명
        </label>
        <input
          id="description"
          type="text"
          placeholder="설명"
          className="border-b-2 w-10/12 border-mplist outline-none p-1 text-sm"
          onChange={(e) => setDescription(e.target.value)}
        />
      </section>
    </form>
  );
};

export default CreatePlaylistForm;
