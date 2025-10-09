import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ConsentDashboard from "./ConsentDashboard";
import MyRightsPortal from "./MyRightsPortal";
import ComplianceDashboard from "./ComplianceDashboard";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Links (top of page) */}
        <nav style={{ margin: "20px 0" }}>
          <Link to="/" style={{ marginRight: "20px" }}>MyData Wallet</Link>
          <Link to="/rights" style={{ marginRight: "20px" }}>MyRights Portal</Link>
          <Link to="/dashboard">Compliance Dashboard</Link>

        </nav>
        {/* Routes to load pages/components */}
        <Routes>
          <Route path="/" element={<ConsentDashboard />} />
          <Route path="/rights" element={<MyRightsPortal />} />
          <Route path="/dashboard" element={<ComplianceDashboard />} />
        </Routes>
      </div>
    </Router>
 );
}

export default App;
