import React, { useState } from "react";
import "./ComplianceDashboard.css"; // Create this CSS file for styling
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function ComplianceDashboard() {
  // Mock compliance summary data
  const [compliance , setCompliance] = useState({
    status: "Compliant",
    percent: 92,
    lastAudit: "2025-09-15",
  });

  // Mock alerts
  const [alerts, setAlerts] = useState([
    { id: 1, message: "2 new data access requests pending", type: "info" },
    { id: 2, message: "NDPR audit due in 2 weeks", type: "warning" },
  ]);

  // Mock user requests
  const [requests, setRequests] = useState([
    {
      id: 101,
      user: "Solomon bobo",
      type: "Access",
      status: "Pending",
      date: "2025-10-07",
    },
    {
      id: 102,
      user: "Nosirat Alade",
      type: "Deletion",
      status: "Approved",
      date: "2025-10-06",
    },
    {
      id: 103,
      user: "Okusanya Timilehin",
      type: "Correction",
      status: "Pending",
      date: "2025-10-05",
    },
  ]);

  const [issues, setIssues] = useState([
  { id: 1, description: "Data breach reported", severity: "High", status: "Open", date: "2025-10-01", resolutionTime: "2 days" },
  { id: 2, description: "Policy update overdue", severity: "Medium", status: "Closed", date: "2025-09-20", resolutionTime: "5 days" },
  ]);


  const complianceChartData = {
  labels: ["Compliant", "Pending", "Non-Compliant"],
  datasets: [
    {
      label: "Compliance Status",
      data: [80, 15, 5], // Example: 80% compliant, 15% pending, 5% non-compliant
      backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      borderWidth: 1,
    },
  ],
};



  return (
    <div className="compliance-dashboard">
      <h2>Compliance Dashboard</h2>
      {/* Compliance Summary */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Status</h3>
          <p>{compliance.status}</p>
        </div>
        <div className="summary-card">
          <h3>Compliance %</h3>
          <p>{compliance.percent}%</p>
        </div>
        <div className="summary-card">
          <h3>Last Audit</h3>
          <p>{compliance.lastAudit}</p>
        </div>
      </div>

      {/* Alerts */}
      <div className="alerts-panel">
        <h3>Alerts</h3>
        <ul>
          {alerts.map((alert) => (
            <li key={alert.id} className={`alert-${alert.type}`}>
              {alert.message}
            </li>
          ))}
        </ul>
      </div>

      <div className="issues-log">
  <h3>Compliance Issues & Incidents</h3>
  <table>
    <thead>
      <tr>
        <th>Issue</th>
        <th>Severity</th>
        <th>Status</th>
        <th>Reported</th>
        <th>Resolution Time</th>
      </tr>
    </thead>
    <tbody>
      {issues.map((issue) => (
        <tr key={issue.id}>
          <td>{issue.description}</td>
          <td className={`severity-${issue.severity.toLowerCase()}`}>{issue.severity}</td>
          <td>{issue.status}</td>
          <td>{issue.date}</td>
          <td>{issue.resolutionTime}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* User Requests Table */}
      <div className="requests-table">
        <h3>User Requests</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.user}</td>
                <td>{req.type}</td>
                <td>{req.status}</td>
                <td>{req.date}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplianceDashboard;
