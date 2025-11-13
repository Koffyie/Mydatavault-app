import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyRightsPortal.css";

// Example: list of organizations (in production, fetch from API)
const orgList = [
  "Facebook",
  "MTN",
  "Johns Clinic",
  "My Bank",
  "Spotify",
];

const requestTypes = [
  { value: "access", label: "Data Access", help: "Ask to see what data the organization holds about you." },
  { value: "deletion", label: "Data Deletion", help: "Request for your personal data to be deleted." },
  { value: "correction", label: "Data Correction", help: "Fix wrong information they have about you." },
];

export default function MyRightsPortal() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: orgList[0],
    type: requestTypes[0].value,
    details: "",
    confirm: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [recentRequests, setRecentRequests] = useState([
    { date: "2025-10-09", type: "Data Access", org: "Facebook", status: "Pending" },
  ]);
  const [showHelp, setShowHelp] = useState(null);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.confirm) return;
    setSubmitted(true);
    setRecentRequests(reqs => [
      {
        date: new Date().toISOString().slice(0, 10),
        type: requestTypes.find(rt => rt.value === form.type).label,
        org: form.organization,
        status: "Pending"
      },
      ...reqs
    ]);
  };

  return (
    <>
      <div className="background-overlay" />
      <div className="page-content">
        <div className="myrights-card">
          <h1 style={{ fontWeight: 700, fontSize: "2rem", color: "#1976d2", marginBottom: "18px" }}>
            MyRightsPortal
          </h1>
          { !submitted ? (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label>Name (required):</label>
                <input
                  style={{ width: "100%", padding: 8, marginTop: 2, borderRadius: 6, border: '1px solid #d7e4f5', fontSize: 15 }}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Email (required):</label>
                <input
                  style={{ width: "100%", padding: 8, marginTop: 2, borderRadius: 6, border: '1px solid #d7e4f5', fontSize: 15 }}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Organization:</label>
                <select
                  style={{ width: "100%", padding: 8, marginTop: 2, borderRadius: 6, border: '1px solid #d7e4f5', fontSize: 15 }}
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                >
                  {orgList.map(org => (
                    <option key={org} value={org}>{org}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 14, position: 'relative' }}>
                <label>
                  Request Type:&nbsp;
                  <span style={{ cursor: "pointer", color: "#1976d2" }} onClick={() => setShowHelp(form.type)}>?</span>
                  {showHelp === form.type && (
                    <div style={{
                      position: "absolute", background: "#fff", border: "1px solid #eee", borderRadius: 6, padding: 8,
                      color: "#444", fontSize: 13, zIndex: 10, marginTop: 5, width: 300, left: 0,
                    }}>
                      {requestTypes.find(rt => rt.value === form.type).help}
                      <span style={{ float: "right", cursor: "pointer" }} onClick={() => setShowHelp(null)}>✕</span>
                    </div>
                  )}
                </label>
                <select
                  style={{ width: "100%", padding: 8, marginTop: 2, borderRadius: 6, border: '1px solid #d7e4f5', fontSize: 15 }}
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  {requestTypes.map(rt => (
                    <option key={rt.value} value={rt.value}>{rt.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Details:</label>
                <textarea
                  style={{ width: "100%", padding: 8, marginTop: 2, height: 80, borderRadius: 6, border: '1px solid #d7e4f5', fontSize: 15 }}
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  placeholder="Provide additional details if needed."
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>
                  <input
                    type="checkbox"
                    name="confirm"
                    checked={form.confirm}
                    onChange={handleChange}
                    style={{ marginRight: 7 }}
                    required
                  />
                  I confirm that the information provided above is accurate.
                </label>
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: 13,
                  backgroundColor: "#388e3c",
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 18,
                  marginTop: 5,
                  boxShadow: "0 2px 8px rgba(25,118,210,0.08)",
                  transition: "background 0.18s"
                }}
              >
                Submit Request
              </button>
            </form>
          ) : (
            <div style={{ background: "#f5f8ff", padding: 24, borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", textAlign: 'center' }}>
              <h3 style={{ color: "#388e3c" }}>Success!</h3>
              <p>Your request has been received and is “Pending.”</p>
              <p>You can track requests below or check your email for updates.</p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: 12, padding: 10, background: "#1976d2", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontWeight: 600
                }}
              >
                Submit Another Request
              </button>
            </div>
          )}

          {/* Recent Requests Table */}
          <div style={{ margin: "38px 0 0 0" }}>
            <h3 style={{ marginBottom: 10 }}>My Recent Requests</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 7 }}>
              <thead>
                <tr style={{ background: "#1976d2", color: "#fff" }}>
                  <th style={{ padding: "9px 3px", fontWeight: "bold" }}>Date</th>
                  <th style={{ padding: "9px 3px", fontWeight: "bold" }}>Type</th>
                  <th style={{ padding: "9px 3px", fontWeight: "bold" }}>Organization</th>
                  <th style={{ padding: "9px 3px", fontWeight: "bold" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: 16, color: "#888" }}>No requests yet.</td>
                  </tr>
                ) : (
                  recentRequests.map((req, i) => (
                    <tr key={i} style={{ fontSize: 15, background: i % 2 === 0 ? "#f7f7fa" : "#fff" }}>
                      <td style={{ padding: "7px 2px" }}>{req.date}</td>
                      <td style={{ padding: "7px 2px" }}>{req.type}</td>
                      <td style={{ padding: "7px 2px" }}>{req.org}</td>
                      <td style={{
                        padding: "7px 2px",
                        color: req.status === "Pending" ? "#ffb300" : req.status === "Completed" ? "#388e3c" : "#d32f2f",
                        fontWeight: 600
                      }}>{req.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
