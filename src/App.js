import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ConsentDashboard from "./ConsentDashboard";
import MyRightsPortal from "./MyRightsPortal";
import ComplianceDashboard from "./ComplianceDashboard";
import Login from "./Login";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Links */}
        <nav style={{ margin: "20px 0" }}>
          <Link to="/" style={{ marginRight: "20px" }}>Login</Link>
          <Link to="/wallet" style={{ marginRight: "20px" }}>MyData Wallet</Link>
          <Link to="/rights" style={{ marginRight: "20px" }}>MyRights Portal</Link>
          <Link to="/dashboard" style={{ marginRight: "20px" }}>Compliance Dashboard</Link>
          
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/wallet" element={<ConsentDashboard />} />
          <Route path="/rights" element={<MyRightsPortal />} />
          <Route path="/dashboard" element={<ComplianceDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
