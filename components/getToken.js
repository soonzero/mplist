const getToken = () => {
  const hash = window.location.hash;
  let token = window.localStorage.getItem("token");

  if (!token && hash.includes("access_token")) {
    token = hash.substring(1).split("&")[0].substring(13);

    window.location.hash = "";
    window.localStorage.setItem("token", token);
  }
  return token;
};

export default getToken;
