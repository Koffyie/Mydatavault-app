import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Example static data structure. In production, fetch from your backend after OAuth linking.
const initialConnections = [
  {
    provider: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    manageUrl: "https://myaccount.google.com/permissions",
    connections: [
      {
        id: 1,
        app: "Spotify",
        granted: true,
        scope: "Email, Profile",
        grantedAt: "2025-07-14",
        updatedAt: "2025-07-14",
      },
      {
        id: 2,
        app: "Coursera",
        granted: false,
        scope: "Email",
        grantedAt: "2024-10-28",
        updatedAt: "2025-01-15",
      },
    ],
  },
  {
    provider: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
    manageUrl: "https://www.facebook.com/settings?tab=applications",
    connections: [
      {
        id: 3,
        app: "LinkedIn",
        granted: true,
        scope: "Public profile",
        grantedAt: "2024-12-01",
        updatedAt: "2025-03-01",
      },
    ],
  },
];

export default function OAuthConnectionsDashboard() {
  const [linkedAccounts, setLinkedAccounts] = useState(() => {
    const saved = localStorage.getItem("linkedAccounts");
    return saved ? JSON.parse(saved) : initialConnections;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("linkedAccounts", JSON.stringify(linkedAccounts));
  }, [linkedAccounts]);

  const handleToggle = (providerIdx, connId) => {
    setLinkedAccounts((prev) =>
      prev.map((prov, idx) =>
        idx === providerIdx
          ? {
              ...prov,
              connections: prov.connections.map((conn) =>
                conn.id === connId
                  ? {
                      ...conn,
                      granted: !conn.granted,
                      updatedAt: new Date().toISOString().slice(0, 10),
                    }
                  : conn
              ),
            }
          : prov
      )
    );
  };

  return (
    <>
      <div className="background-overlay" />
      <div className="page-content">
        <div className="datawallet-card">
          <h1 style={{ fontWeight: "700", fontSize: "2.15rem", color: "#1976d2", marginBottom: "12px" }}>
            MyData Wallet
          </h1>
          <p style={{ color: "#444", marginBottom: "26px", fontWeight: 500, fontSize: "1.04rem" }}>
            Connected Apps & Permissions
          </p>
          {linkedAccounts.map((provider, pIdx) => (
            <div key={provider.provider} style={{ marginBottom: 28, background: "#f7faff", borderRadius: 10, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 9 }}>
                <img src={provider.logo} alt={provider.provider} style={{ width: 32, height: 32, marginRight: 10 }} />
                <span style={{ fontWeight: "bold", fontSize: 18 }}>{provider.provider}</span>
                <a
                  href={provider.manageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: "auto",
                    color: "#1976d2",
                    textDecoration: "underline",
                    fontSize: 15,
                  }}
                >
                  Manage on {provider.provider}
                </a>
              </div>
              {provider.connections.length === 0 && (
                <div style={{ color: "#888" }}>
                  No apps connected yet. Link your {provider.provider} account to get started.
                </div>
              )}
              {provider.connections.map((conn) => (
                <div
                  key={conn.id}
                  style={{
                    background: "#fff",
                    borderRadius: 7,
                    marginBottom: 10,
                    border: "1px solid #e0e0e0",
                    padding: "11px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div>
                      <strong>{conn.app}</strong>
                      <span style={{ fontSize: 13, color: "#555", fontStyle: "italic", marginLeft: 8 }}>
                        ({conn.scope})
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      {conn.granted ? (
                        <>
                          Access <span style={{ color: "#388e3c", fontWeight: "bold" }}>Granted</span> on {conn.grantedAt}
                        </>
                      ) : (
                        <>
                          Access <span style={{ color: "#d32f2f", fontWeight: "bold" }}>Revoked</span> (last updated {conn.updatedAt})
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(pIdx, conn.id)}
                    className={conn.granted ? "wallet-btn revoke" : "wallet-btn grant"}
                  >
                    {conn.granted ? "Revoke Access" : "Grant Access"}
                  </button>
                </div>
              ))}
            </div>
          ))}

          <div style={{ fontSize: 17, color: "#333", marginTop: 36 }}>
            <b>Want to import more connected apps?</b>
            <br />
            Link another provider or manually add a connection.
            <br />
            <span style={{ fontSize: 13, color: "#555" }}>
              Note: Some apps may only be managed directly on your provider account.
            </span>
          </div>

          {/* Make a Data Request Button */}
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <button
              onClick={() => navigate("/rights")}
              style={{
                padding: "12px 24px",
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              📋 Make a Data Request
            </button>
            <p style={{ color: "#666", fontSize: "14px", marginTop: "10px" }}>
              Need to access, update, or delete your data? Submit a request here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
