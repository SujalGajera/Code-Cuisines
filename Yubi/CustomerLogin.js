import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerLogin.css";

function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in as ${email}`);
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-box p-4 shadow-lg">
        <h2 className="text-warning fw-bold text-center mb-3">
          Welcome Back, Customer 👋
        </h2>
        <p className="text-center text-light mb-4">
          Access your profile and reservations
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@codecuisine.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label htmlFor="remember" className="form-check-label text-light">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-bold">
            Sign In
          </button>
          <div className="text-center mt-3">
            <a href="/forgot" className="text-warning">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogin;
