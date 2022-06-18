import AddSVG from "../public/add.svg";
import DeleteSVG from "../public/delete.svg";
import CheckSVG from "../public/check-circle.svg";
import { useState, useEffect } from "react";

const FollowBtn = ({ followed, func }) => {
  const [hover, setHover] = useState(false);

  const setBtnSVG = () => {
    if (followed) {
      if (hover) {
        return <DeleteSVG className="h-5 w-5 mr-1" />;
      } else {
        return <CheckSVG className="h-5 w-5 mr-1" />;
      }
    } else {
      return <AddSVG className="w-5 h-5 mr-1" />;
    }
  };

  const setBtnText = () => {
    if (followed) {
      if (hover) {
        return `Unfollow`;
      } else {
        return "Following";
      }
    } else {
      return `Follow`;
    }
  };

  return (
    <div className="grow flex justify-end items-end">
      <button
        type="button"
        className="rounded-full px-5 py-3 bg-black text-white flex hover:bg-mplist"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={func}
      >
        {setBtnSVG()}
        <span>{setBtnText()}</span>
      </button>
    </div>
  );
};

export default FollowBtn;
