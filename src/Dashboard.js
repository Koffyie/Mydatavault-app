import React from "react";
import { Card, CardContent, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Divider } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Sample data for demo—replace with backend data when ready
const complianceData = [
  { name: "Compliant", value: 92 },
  { name: "Non-Compliant", value: 8 },
];
const COLORS = ["#388e3c", "#d32f2f"];

const consents = [
  { provider: "Google", app: "Spotify", status: "Granted", date: "2025-07-14" },
  { provider: "Google", app: "Coursera", status: "Revoked", date: "2025-01-15" },
  { provider: "Facebook", app: "LinkedIn", status: "Granted", date: "2025-03-01" },
];

const requests = [
  { type: "Access", org: "Facebook", date: "2025-10-09", status: "Pending" },
  { type: "Correction", org: "MTN", date: "2025-06-22", status: "Completed" },
];

const auditTrail = [
  { action: "Login (Google OAuth)", user: "Jane Doe", date: "2025-10-09" },
  { action: "Granted consent to Spotify", user: "Jane Doe", date: "2025-07-14" },
  { action: "Submitted data request", user: "Jane Doe", date: "2025-10-09" },
];

export default function Dashboard() {
  return (
    <Box sx={{ maxWidth: 900, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>Compliance Dashboard</Typography>

      {/* Compliance Status Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Overall NDPR Compliance</Typography>
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie data={complianceData} dataKey="value" outerRadius={80} label>
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Typography variant="body2" color="text.secondary">
            <span style={{ color: COLORS[0], fontWeight: "bold" }}>92% Compliant</span>; <span style={{ color: COLORS[1], fontWeight: "bold" }}>8% Non-Compliant</span>
          </Typography>
        </CardContent>
      </Card>

      {/* Consent Log Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Consent Log</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Provider</TableCell>
                <TableCell>App</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consents.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.provider}</TableCell>
                  <TableCell>{row.app}</TableCell>
                  <TableCell style={{ color: row.status === "Granted" ? COLORS[0] : COLORS[1], fontWeight: "bold" }}>{row.status}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Data Requests Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Recent Data Requests</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((req, idx) => (
                <TableRow key={idx}>
                  <TableCell>{req.type}</TableCell>
                  <TableCell>{req.org}</TableCell>
                  <TableCell>{req.date}</TableCell>
                  <TableCell style={{ color: req.status === "Completed" ? COLORS[0] : "#ffb300", fontWeight: "bold" }}>{req.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Audit Trail Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Audit Trail</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditTrail.map((entry, idx) => (
                <TableRow key={idx}>
                  <TableCell>{entry.action}</TableCell>
                  <TableCell>{entry.user}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
