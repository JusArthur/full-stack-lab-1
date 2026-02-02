import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
        <ul className="navbar-list">
            <li>
                <Link to="/employees" className="navbar-link">Employees</Link>
            </li>
            <li>
                <Link to="/organization" className="navbar-link">Organization</Link>
            </li>
        </ul>
    </nav>
);
};

export default Navbar;
