import React, { useRef, useState } from "react";
import "./ComplianceDashboard.css";



const incidentList = [
  { id: 1, issue: "Data breach reported", severity: "High", status: "Open", reported: "2025-10-01", resolution: "2 days" },
  { id: 2, issue: "Policy update overdue", severity: "Medium", status: "Closed", reported: "2025-09-20", resolution: "5 days" },
];

const userRequests = [
  { id: 11, user: "Solomon bobo", type: "Data Access", status: "Pending", date: "2025-10-08" },
  { id: 12, user: "Nosirat Alade", type: "Data Deletion", status: "Completed", date: "2025-09-28" },
];

const auditTrail = [
  { date: "2025-10-09", action: "Incident closed by Admin" },
  { date: "2025-09-15", action: "NDPR Audit performed" },
  { date: "2025-09-10", action: "Policy reviewed by bobo" },
];

function statusColor(status) {
  if (status === "Compliant" || status === "Completed") return "#388e3c";
  if (status === "Medium" || status === "Pending") return "#ffb300";
  if (status === "High" || status === "Open") return "#d32f2f";
  return "#888";
}

export default function ComplianceDashboard() {
  const targetRef = useRef(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredIncidents = incidentList.filter((inc) =>
    (!filterStatus || inc.status === filterStatus) &&
    (inc.issue.toLowerCase().includes(search.toLowerCase()) || inc.severity.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <div className="background-overlay" />
      <div className="page-content">
        <div className="compliance-card">
          <button
            style={{
              padding: "10px 18px",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontWeight: "bold",
              marginBottom: 10,
              float: "right",
              marginLeft: "12px"
            }}
            onClick={() => window.print()}
          >
            Export Dashboard as PDF
          </button>

          <h1 style={{ textAlign: "center", fontWeight: 700, marginBottom: 30 }}>Compliance Dashboard</h1>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 38, flexWrap: 'wrap' }}>
            <SummaryBox label="Status" value="Compliant" color={statusColor("Compliant")} icon="✔️" />
            <SummaryBox label="Compliance %" value="92%" color="#388e3c" icon="📈" />
            <SummaryBox label="Last Audit" value="2025-09-15" color="#1976d2" icon="📅" />
          </div>
          <div style={{ marginBottom: 18 }}>
            <Alert color="#1976d2" icon="🔔">2 new data access requests pending</Alert>
            <Alert color="#ffb300" icon="⏰">NDPR audit due in 2 weeks</Alert>
          </div>

          <h3>Compliance Issues & Incidents</h3>
          <div style={{ margin: "10px 0 10px 0", display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search issues or severity"
              style={{ padding: 7, borderRadius: 5, border: "1px solid #ccc", marginRight: 12, fontSize: 15 }}
            />
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              style={{ padding: 7, borderRadius: 5, border: "1px solid #ccc", fontSize: 15 }}>
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#f7faff", borderRadius: 9 }}>
            <thead>
              <tr style={{ background: "#e3e6ec", color: "#222" }}>
                <th>Issue</th><th>Severity</th><th>Status</th><th>Reported</th><th>Resolution</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: "center", color: "#888" }}>No incidents found.</td></tr>
              ) : (
                filteredIncidents.map(inc => (
                  <tr key={inc.id}>
                    <td>{inc.issue}</td>
                    <td style={{ color: statusColor(inc.severity), fontWeight: "bold" }}>{inc.severity}</td>
                    <td style={{ color: statusColor(inc.status), fontWeight: "bold" }}>{inc.status}</td>
                    <td>{inc.reported}</td>
                    <td>{inc.resolution}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>


          <h3 style={{ marginTop: 36 }}>User Requests</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#f7faff", borderRadius: 8, marginBottom: 12 }}>
            <thead>
              <tr style={{ background: "#e3e6ec", color: "#222" }}>
                <th>User</th><th>Type</th><th>Status</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {userRequests.map(req => (
                <tr key={req.id}>
                  <td>{req.user}</td>
                  <td>{req.type}</td>
                  <td style={{ color: statusColor(req.status), fontWeight: "bold" }}>{req.status}</td>
                  <td>{req.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: 33 }}>Audit Trail</h3>
          <ul style={{ background: "#eeeeee", borderRadius: 8, padding: 18, fontSize: 15, color: "#343444", lineHeight: 1.7 }}>
            {auditTrail.map((entry, i) => (
              <li key={i}><strong>{entry.date}:</strong> {entry.action}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

// SummaryBox and Alert same as your version
function SummaryBox({ label, value, color, icon }) {
  return (
    <div style={{
      flex: 1, minWidth: 110, maxWidth: 185, margin: 10, background: "#f1f7fa", borderRadius: 12, padding: 17, textAlign: "center", boxShadow: "0 1px 5px rgba(25,118,210,0.10)"
    }}>
      <div style={{ fontSize: 27 }}>{icon}</div>
      <div style={{ fontWeight: "bold", color, fontSize: 24, marginBottom: 7 }}>{value}</div>
      <div style={{ fontSize: 15, color: "#344" }}>{label}</div>
    </div>
  );
}

function Alert({ children, color, icon }) {
  return (
    <div style={{
      background: color,
      color: "#fff",
      padding: "10px 16px",
      borderRadius: 7,
      marginBottom: 11,
      fontWeight: 500,
      fontSize: 15,
      display: "flex",
      alignItems: "center"
    }}>
      <span style={{ marginRight: 7 }}>{icon}</span> {children}
    </div>
  );
}
