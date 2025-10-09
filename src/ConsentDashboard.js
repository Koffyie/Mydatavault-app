import React, { useState } from "react";

// Sample consent data; in production, fetch this from your backend or wallet store.
const initialConsents = [
  { id: 1, name: "Location Data", granted: true, description: "Allow access to your location" },
  { id: 2, name: "Health Records", granted: false, description: "Share health profile with providers" },
  { id: 3, name: "Financial Info", granted: true, description: "Share account statements" },
];

export default function ConsentDashboard() {
  const [consents, setConsents] = useState(initialConsents);

  // Toggle consent on/off
  const handleToggle = (id) => {
    setConsents(consents.map(consent =>
      consent.id === id ? { ...consent, granted: !consent.granted } : consent
    ));
    // In production, send consent change to your backend here
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>MyData Wallet - Consent Management</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {consents.map(consent => (
          <li key={consent.id} style={{ marginBottom: 20, borderBottom: "1px solid #eee", paddingBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{consent.name}</strong>
                <div style={{ fontSize: 12, color: "#666" }}>{consent.description}</div>
              </div>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={consent.granted}
                  onChange={() => handleToggle(consent.id)}
                  style={{ marginRight: 10 }}
                />
                <span>{consent.granted ? "Granted" : "Revoked"}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ fontSize: 17, color: "#000000", marginTop: 40 }}>
        You can review and update your consents here at any time. For more info, check the <a href="/privacy-policy">Privacy Policy</a>.
      </div>
    </div>
  );
}
