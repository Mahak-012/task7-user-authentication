import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import { isValidEmail } from "../utils/validation";
import { MailIcon, LockIcon, CheckIcon } from "../components/icons";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(form.email)) newErrors.email = "Please enter a valid email";

    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const result = login(form.email.trim(), form.password);
    if (result.ok) navigate("/dashboard");
    else setFormError(result.error);
  };

  return (
    <div className="auth-page">
      {/* left brand panel — desktop only */}
      <aside className="auth-brand">
        <div className="brand-top">
          <span className="brand-logo"><LockIcon /></span>
          <span className="brand-name">MyApp</span>
        </div>

        <div>
          <h2>Welcome back.<br />We kept your spot.</h2>
          <p>
            A smooth authentication experience built with React Router,
            Context API and localStorage.
          </p>

          <ul className="brand-points">
            <li>
              <span className="point-icon"><CheckIcon /></span>
              Sessions that survive a refresh
            </li>
            <li>
              <span className="point-icon"><CheckIcon /></span>
              Protected routes with smart redirects
            </li>
            <li>
              <span className="point-icon"><CheckIcon /></span>
              Clean, accessible, responsive UI
            </li>
          </ul>
        </div>

        <p className="brand-foot">React JS Internship — Task 7</p>
      </aside>

      {/* right form panel */}
      <main className="auth-panel">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <span className="mobile-logo"><LockIcon /></span>

          <h1>Welcome back</h1>
          <p className="subtitle">Log in to continue to your dashboard</p>

          {formError && (
            <p className="form-error" role="alert">
              {formError}
            </p>
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon={<MailIcon />}
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            icon={<LockIcon />}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
          />

          <Button type="submit">Log In</Button>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </main>
    </div>
  );
}