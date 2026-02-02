import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#f0f0f0",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          padding: 0,
          margin: 0,
          gap: "20px",
        }}
      >
        <li>
          <Link
            to="/employees"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Employees
          </Link>
        </li>
        <li>
          <Link
            to="/organization"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Organization
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
