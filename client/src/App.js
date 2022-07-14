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
import ViewObject from "./views/ViewObject";
import ProtectedRoute from "./components/ProtectedRoute";
import { ObjectContextProvider } from "./context/ObjectContext";
import ViewAllObjects from "./views/ViewAllObjects";
import { CommentContextProvider } from "./context/CommentContext";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <ProjectFetchContextProvider>
        <FetchContextProvider>
          <AuthContextProvider>
            <UserContextProvider>
              <ObjectContextProvider>
                <CommentContextProvider>
                  <Routes>
                    <Route path="/" element={<ViewLanding />} />
                    <Route path="about" element={<ViewAbout />} />
                    <Route path="help" element={<ViewHelp />} />
                    <Route path="list" element={<ViewList />} />
                    <Route path="all-objects" element={<ViewAllObjects />} />
                    <Route
                      path="registration"
                      element={<ViewRegistration />}
                    />{" "}
                    <Route
                      path="dashboard"
                      element={
                        <ProtectedRoute>
                          <ViewDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="new-project"
                      element={
                        <ProtectedRoute>
                          <ViewCreateProject />{" "}
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="single-project"
                      element={
                        <ProtectedRoute>
                          <ViewProject />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="user-profile"
                      element={
                        <ProtectedRoute>
                          <ViewProfile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="single-object/:id"
                      element={
                        <ProtectedRoute>
                          <ViewObject />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </CommentContextProvider>
              </ObjectContextProvider>
            </UserContextProvider>
          </AuthContextProvider>
        </FetchContextProvider>
      </ProjectFetchContextProvider>
    </Router>
  );
}

export default App;
