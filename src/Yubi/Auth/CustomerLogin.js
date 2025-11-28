import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function CustomerLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

        const matchedUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (matchedUser) {
            alert(`Welcome back, ${matchedUser.firstName}!`);
            localStorage.setItem("currentCustomer", JSON.stringify(matchedUser));
            navigate("/customer/dashboard");
        } else {
            alert("Invalid email or password.");
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
                        required
                    />

                    <button className="login-btn" type="submit">
                        Sign In
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
