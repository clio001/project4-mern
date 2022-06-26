const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Token present in local storage.");
    return token;
  } else {
    console.log("No token present in local storage.");
    return false;
  }
};

export { getToken };
