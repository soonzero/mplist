import Cookies from "js-cookie";

const logout = () => {
  Cookies.remove("mplistToken");
};

export default logout;
