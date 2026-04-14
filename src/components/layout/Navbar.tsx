import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/employees" className="navbar-link">
            Employees
          </Link>
        </li>
        <li>
          <Link to="/organization" className="navbar-link">
            Organization
          </Link>
        </li>
      </ul>

      {/* Auth Controls added to Navbar */}
      <div className="auth-controls">
        <SignedOut>
          {/* Wrap a custom styled button inside the SignInButton */}
          <SignInButton mode="modal">
            <button
              className="navbar-link login-btn"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          {/* UserButton looks great by default, but you can add a prop to make the menu bigger */}
          <UserButton
            appearance={{
              elements: { userButtonAvatarBox: "width-10 height-10" },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
