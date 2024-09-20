import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RootBeerDetail from "./pages/RootBeerDetail";

import "./App.css";

function App() {
  return (
    <div className="flex justify-center">
      <div className="container py-10">
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/drinks/:id" element={<RootBeerDetail />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
