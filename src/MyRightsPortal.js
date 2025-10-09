import { useState } from "react";
import "./MyRightsPortal.css"; // CSS file for styles

function MyRightsPortal() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    requestType: "access",
    details: "",
    consent: false,
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.consent) {
      setErrorMsg("Please complete all required fields and consent.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      await new Promise((res) => setTimeout(res, 1000)); // simulate API call
      setStatus("success");
    } catch {
      setErrorMsg("Submission failed, please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="form-container">
      <h2>MyRights Portal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name (required):
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email (required):
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Request Type:
          <select
            name="requestType"
            value={form.requestType}
            onChange={handleChange}
          >
            <option value="access">Data Access</option>
            <option value="deletion">Deletion</option>
            <option value="correction">Correction</option>
            <option value="withdrawal">Withdrawal of Consent</option>
          </select>
        </label>
        <label>
          Details:
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder="Provide additional details if needed."
            rows={4}
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            required
          />{" "}
          I confirm that the information provided above is accurate.
        </label>
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Submit Request"}
        </button>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {status === "success" && (
          <p className="success-message">Request submitted successfully! We will contact you shortly.</p>
        )}
      </form>
    </div>
  );
}

export default MyRightsPortal;

