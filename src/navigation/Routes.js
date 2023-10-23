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
            <Link to="/CreateAddress">CreateAddress</Link>
          </li>
          <li>
            <Link to="/user/profile">Profile</Link>
          </li>
          <li>
            <Link to="/myAddress">Addresses</Link>
          </li>
          <li>
            <Link to="/createProducts">Create products</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Layout;
