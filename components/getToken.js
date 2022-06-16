// import {
//   AUTH_ENDPOINT,
//   CLIENT_ID,
//   REDIRECT_URI,
//   RESPONSE_TYPE,
//   SCOPE,
// } from "./apiData";
// import Cookies from "js-cookie";

// const getToken = async () => {
//   const hash = window.location.hash;
//   let token = Cookies.get("mplistToken");

//   if (!token && hash.includes("access_token")) {
//     token = hash.substring(1).split("&")[0].substring(13);
//     window.location.hash = "";
//     Cookies.set("mplistToken", token, { expires: 1 / 24 });

//     setTimeout(() => {
//       Cookies.remove("mplistToken");
//       alert("세션이 만료되었습니다. 다시 로그인해주세요.");
//       window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
//     }, 3600 * 1000);
//   }
//   return Cookies.get("mplistToken");
// };

// export default getToken;
