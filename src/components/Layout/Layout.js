import { Link } from "react-router-dom";

const Layout = () => {
    return (
    <div>
        <nav>
        <ul>
            <li>
            <Link to="/user">User</Link>
            </li>
            <li>
            <Link to="/address">Address</Link>
            </li>
            <li>
            <Link to="/user/profile">Profile</Link>
            </li>
        </ul>
        </nav>
    </div>
    )
};

export default Layout;