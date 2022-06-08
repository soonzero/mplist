const logout = () => {
  window.localStorage.removeItem("token");
};

export default logout;
