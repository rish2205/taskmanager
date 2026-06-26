import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginUser(formData);

      localStorage.setItem("token", response.token);
      localStorage.setItem("userName", response.name);
      localStorage.setItem("userEmail", response.email);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-layout">
        {/* Left branding section */}
        <div className="auth-brand-panel">
          <div className="brand-badge">Task Manager</div>
          <h1>Welcome back</h1>
          <p className="brand-description">
            Manage your daily tasks, track progress, and stay productive with a
            clean and simple task management workspace.
          </p>

          <div className="brand-features">
            <div className="brand-feature-card">
              <h3>Create & Organize</h3>
              <p>
                Add tasks, maintain descriptions, and keep your work structured.
              </p>
            </div>

            <div className="brand-feature-card">
              <h3>Track Progress</h3>
              <p>
                Mark tasks as pending, in progress, or completed with ease.
              </p>
            </div>

            <div className="brand-feature-card">
              <h3>Stay Focused</h3>
              <p>
                Use one dashboard to manage everything without switching tools.
              </p>
            </div>
          </div>
        </div>

        {/* Right form section */}
        <div className="auth-form-panel">
          <div className="auth-card modern-auth-card">
            <div className="auth-card-header">
              <p className="auth-overline">Sign in to continue</p>
              <h2>Login to your account</h2>
              <p className="auth-subtitle">
                Enter your credentials to access your task dashboard.
              </p>
            </div>

            {error && <p className="message error-message">{error}</p>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="primary-btn auth-submit-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="auth-divider">
              <span>New to Task Manager?</span>
            </div>

            <p className="auth-footer modern-auth-footer">
              Create your account here{" "}
              <Link to="/register">Register now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;