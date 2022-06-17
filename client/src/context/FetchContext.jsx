import { createContext, useState, useEffect } from "react";

export const FetchContext = createContext();

export const FetchContextProvider = (props) => {
  const [myData, setMyData] = useState(null);
  const URL = "http://192.168.2.124:5001/users/all";

  const getData = () => {
    fetch(URL).then((response) =>
      response.json().then((myData) => {
        /* console.log("First fetch: ", myData); */
        setMyData(myData);
      })
    );
  };

  useEffect(() => {
    getData(URL);
  }, []);

  return (
    <FetchContext.Provider value={{ myData }}>
      {props.children}
    </FetchContext.Provider>
  );
};
