import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MenuDetails from "./pages/MenuDetails";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Contact from "./pages/Contact";

function NotFound() {
  return (
    <section className="section empty-state">
      <h1>404 – Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Return Home</a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <h3>Cocoa & Cream</h3>
      <p>Good food. Great moments.</p>
      <p>© {new Date().getFullYear()} Cocoa & Cream. Training project.</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetails />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}