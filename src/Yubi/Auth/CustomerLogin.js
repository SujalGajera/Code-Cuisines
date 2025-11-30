import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import "./login.css";

function CustomerLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Step 1: Authenticate with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Step 2: Verify user role from Firestore
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await auth.signOut();
                setError("⚠️ Access denied. User not found in system.");
                setIsLoading(false);
                return;
            }

            const userData = userSnap.data();
            const role = userData.role;

            // Step 3: Only allow customer or admin roles
            if (role === "customer" || role === "admin") {
                console.log(`✅ ${role} logged in successfully`);
                navigate("/customer/dashboard");
            } else {
                // Block staff/receptionist from customer login
                await auth.signOut();
                setError("⚠️ Access denied. Customer account required.");
                setIsLoading(false);
            }

        } catch (err) {
            console.error("Login error:", err);

            if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
                setError("⚠️ Incorrect email or password.");
            } else if (err.code === "auth/invalid-email") {
                setError("⚠️ Invalid email format.");
            } else if (err.code === "auth/too-many-requests") {
                setError("⚠️ Too many failed attempts. Try again later.");
            } else {
                setError("⚠️ Login failed. Please try again.");
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Welcome Back</h2>
                <p>Access your profile and reservations</p>

                <form onSubmit={handleLogin}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="you@codecuisine.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                    />

                    <div className="login-header-row">
                        <label>Password</label>
                        <span onClick={() => navigate("/customer/forgot-password")}>
                            Forgot password?
                        </span>
                    </div>

                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                    />

                    {error && <p style={{ color: "#ff4444", fontSize: "14px", marginTop: "10px" }}>{error}</p>}

                    <button className="login-btn" type="submit" disabled={isLoading}>
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>

                    <p className="link-prompt">
                        Not yet registered?
                        <span onClick={() => navigate("/customer/register")}>
                            Sign up here
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default CustomerLogin;
