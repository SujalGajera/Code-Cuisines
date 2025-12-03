import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import "../styles/login.css";

function CustomerRegister() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Create Firebase Authentication user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create Firestore user document with customer role
      await setDoc(doc(db, "customer", user.uid), {
        name: `${firstName} ${lastName}`,
        email: email,
        phone: phone,
        role: "customer",
        createdAt: new Date().toISOString(),
      });

      // Sign out to force fresh login and avoid race conditions with AdminContext
      await signOut(auth);

      alert("Account created successfully! Please login.");
      navigate("/login/customer");
    } catch (err) {
      console.error("Registration error:", err);

      if (err.code === "auth/email-already-in-use") {
        setError("⚠️ Email already registered. Please login instead.");
      } else if (err.code === "auth/weak-password") {
        setError("⚠️ Password should be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("⚠️ Invalid email format.");
      } else {
        setError("⚠️ Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Your Account</h2>
        <p>Join Code Cuisine to manage your reservations</p>

        <form onSubmit={handleRegister}>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          {error && <p style={{ color: "#ff4444", fontSize: "14px", marginTop: "10px" }}>{error}</p>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Register"}
          </button>

          <p className="link-prompt">
            Already registered?
            <span onClick={() => navigate("/customer/login")}>Login here</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
