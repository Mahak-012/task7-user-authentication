import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dash">
      <header className="dash-header">
        <div className="dash-brand">
          <span className="brand-mark">M</span>
          <span className="brand-name">MyApp</span>
        </div>

        <div className="dash-user">
          <span className="avatar" aria-hidden="true">
            {getInitials(user?.name)}
          </span>
          <div className="dash-user-info">
            <strong>{user?.name}</strong>
            <small>{user?.email}</small>
          </div>
          <Button variant="outline" onClick={logout}>
            Log Out
          </Button>
        </div>
      </header>

      <main className="dash-body">
        <section className="hero-card">
          <h1>Welcome back, {user?.name} 👋</h1>
          <p>
            You're logged in as <strong>{user?.email}</strong>. This page is
            protected — only authenticated users can view it.
          </p>
          <span className="badge">🔐 Session persisted with localStorage</span>
        </section>

        <section className="cards-grid">
          <article className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Protected Routes</h3>
            <p>
              The dashboard only renders for authenticated users. Anyone else
              gets redirected straight to the login page.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Persistent Session</h3>
            <p>
              Your session is stored in localStorage, so refreshing the page or
              reopening the tab keeps you logged in.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">🚪</div>
            <h3>Secure Logout</h3>
            <p>
              Logging out clears the stored authentication state and locks
              every protected route again.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}