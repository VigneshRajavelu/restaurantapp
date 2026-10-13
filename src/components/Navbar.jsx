import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cart = useSelector((state) => state.cart);
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span></span> Cocoa & Cream
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/customers">Customers</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>

      <Link to="/orders" className="cart-link">
        🛒 Cart ({count})
      </Link>
    </nav>
  );
}