// This is the base jsx file that all others while parent from
import '../styles/Base.css'; 
import { Link } from "react-router-dom";

export default function Base({ children }) {
  return (
    <div className="base-container">
      <header className="base-header">
        <div className="header-content">
          <h1 className="brand-title">My App</h1>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/saved_businesses">Saved Businesses</Link>
            <Link to="/settings">Settings</Link>
          </nav>
        </div>
      </header>

      <main className="base-main container">
        {children}
      </main>

      <footer className="base-footer">
        <p className="mb-0">&copy; 2026 Website Inc.</p>
      </footer>
    </div>
  );
}
