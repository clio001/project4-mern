import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// * Import views
import ViewLanding from "./views/ViewLanding";
import ViewList from "./views/ViewList";
import ViewRegistration from "./views/ViewRegistration";
import ViewDashboard from "./views/ViewDashboard";
import ViewCreateProject from "./views/ViewCreateProject";
import ViewProject from "./views/ViewProject";
import ViewProfile from "./views/ViewProfile";

// * Import contexts
import { FetchContextProvider } from "./context/FetchContext";
import { ProjectFetchContextProvider } from "./context/ProjectFetchContext";
import { AuthContextProvider } from "./context/AuthContext";
import ViewAbout from "./views/ViewAbout";
import ViewHelp from "./views/ViewHelp";

function App() {
  return (
    <Router>
      <ProjectFetchContextProvider>
        <FetchContextProvider>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<ViewLanding />} />
              <Route path="list" element={<ViewList />} />
              <Route path="registration" element={<ViewRegistration />} />{" "}
              <Route path="dashboard" element={<ViewDashboard />} />
              <Route path="new-project" element={<ViewCreateProject />} />
              <Route path="single-project" element={<ViewProject />} />
              <Route path="user-profile" element={<ViewProfile />} />
              <Route path="about" element={<ViewAbout />} />
              <Route path="help" element={<ViewHelp />} />
            </Routes>
          </AuthContextProvider>
        </FetchContextProvider>
      </ProjectFetchContextProvider>
    </Router>
  );
}

export default App;
