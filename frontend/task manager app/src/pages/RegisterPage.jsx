import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      await registerUser(formData);

      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
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
          <div>
            <div className="brand-badge">Task Manager</div>
            <h1>Create your workspace</h1>
            <p className="brand-description">
              Build your personal task management space to plan work, manage
              deadlines, and keep track of progress every day.
            </p>
          </div>

          <div className="brand-features">
            <div className="brand-feature-card">
              <h3>Task Creation</h3>
              <p>
                Add tasks quickly with title, description, and progress status.
              </p>
            </div>

            <div className="brand-feature-card">
              <h3>Simple Dashboard</h3>
              <p>
                View your tasks in one place and update them whenever needed.
              </p>
            </div>

            <div className="brand-feature-card">
              <h3>Productive Workflow</h3>
              <p>
                Keep your work organized with a clean and practical interface.
              </p>
            </div>
          </div>
        </div>

        {/* Right form section */}
        <div className="auth-form-panel">
          <div className="auth-card modern-auth-card">
            <div className="auth-card-header">
              <p className="auth-overline">Start using Task Manager</p>
              <h2>Create your account</h2>
              <p className="auth-subtitle">
                Register once and start managing your tasks from your dashboard.
              </p>
            </div>

            {error && <p className="message error-message">{error}</p>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="register-name">Full name</label>
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-email">Email address</label>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <input
                  id="register-password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="primary-btn auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="auth-divider">
              <span>Already have an account?</span>
            </div>

            <p className="auth-footer">
              Sign in here <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;