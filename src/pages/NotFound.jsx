import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="notfound">
      <p className="notfound-code">404</p>
      <h1>Page not found</h1>
      <p className="notfound-text">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="notfound-link">Back to Login</Link>
    </main>
  );
}