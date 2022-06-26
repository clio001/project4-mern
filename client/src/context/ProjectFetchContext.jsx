import { createContext, useState, useEffect } from "react";

export const ProjectFetchContext = createContext();

export const ProjectFetchContextProvider = (props) => {
  const [projectData, setProjectData] = useState(null);
  const URL = "http://localhost:5001/projects/all";

  const getProjectData = async () => {
    const response = await fetch(URL);
    const json = await response.json();
    setProjectData(json);
  };

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <ProjectFetchContext.Provider value={{ projectData }}>
      {props.children}
    </ProjectFetchContext.Provider>
  );
};
