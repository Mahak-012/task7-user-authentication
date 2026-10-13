import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import { isValidEmail } from "../utils/validation";
import { UserIcon, MailIcon, LockIcon, CheckIcon } from "../components/icons";

const initialForm = { name: "", email: "", password: "", confirmPassword: "" };

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(form.email)) newErrors.email = "Please enter a valid email";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const result = signup(form.name.trim(), form.email.trim(), form.password);
    if (result.ok) navigate("/dashboard");
    else setErrors({ email: result.error });
  };

  return (
    <div className="auth-page">
      <aside className="auth-brand">
        <div className="brand-top">
          <span className="brand-logo"><LockIcon /></span>
          <span className="brand-name">MyApp</span>
        </div>

        <div>
          <h2>Create your account<br />in under a minute.</h2>
          <p>
            Sign up once and get full access to your dashboard — your session
            stays intact even after a refresh.
          </p>

          <ul className="brand-points">
            <li>
              <span className="point-icon"><CheckIcon /></span>
              Quick and simple registration
            </li>
            <li>
              <span className="point-icon"><CheckIcon /></span>
              Instant access after signup
            </li>
            <li>
              <span className="point-icon"><CheckIcon /></span>
              Works on desktop and mobile
            </li>
          </ul>
        </div>

        <p className="brand-foot">React JS Internship — Task 7</p>
      </aside>

      <main className="auth-panel">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <span className="mobile-logo"><LockIcon /></span>

          <h1>Create Account</h1>
          <p className="subtitle">Sign up to get access to your dashboard</p>

          <Input
            label="Name"
            name="name"
            placeholder="Ali Khan"
            icon={<UserIcon />}
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            autoComplete="name"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="ali@example.com"
            icon={<MailIcon />}
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Min 6 characters"
            icon={<LockIcon />}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            icon={<LockIcon />}
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <Button type="submit">Sign Up</Button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </main>
    </div>
  );
}