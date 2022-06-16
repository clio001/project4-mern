import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// * Import hooks

// * Import views
import ViewLanding from "./views/ViewLanding";
import ViewList from "./views/ViewList";

// * Import contexts
import { FetchContextProvider } from "./context/FetchContext";

function App() {
  return (
    <Router>
      <FetchContextProvider>
        <Routes>
          <Route path="/" element={<ViewLanding />} />
          <Route path="list" element={<ViewList />} />
        </Routes>
      </FetchContextProvider>
    </Router>
  );
}

export default App;
