const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    console.log("No token present in local storage.");
    return false;
  }
};

export { getToken };
