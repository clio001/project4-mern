import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// * Import hooks

// * Import views
import ViewLanding from "./views/ViewLanding";
import ViewList from "./views/ViewList";

// * Import contexts
import { FetchContextProvider } from "./context/FetchContext";
import ViewRegistration from "./views/ViewRegistration";
import ViewDashboard from "./views/ViewDashboard";
import { ProjectFetchContextProvider } from "./context/ProjectFetchContext";
import ViewCreateProject from "./views/ViewCreateProject";
import ViewProject from "./views/ViewProject";

function App() {
  return (
    <Router>
      <ProjectFetchContextProvider>
        <FetchContextProvider>
          <Routes>
            <Route path="/" element={<ViewLanding />} />
            <Route path="list" element={<ViewList />} />
            <Route path="registration" element={<ViewRegistration />} />{" "}
            <Route path="dashboard" element={<ViewDashboard />} />
            <Route path="newproject" element={<ViewCreateProject />} />
            <Route path="singleproject" element={<ViewProject />} />
          </Routes>
        </FetchContextProvider>
      </ProjectFetchContextProvider>
    </Router>
  );
}

export default App;
