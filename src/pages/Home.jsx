import { Link } from "react-router-dom";

const highlights = [
  { icon: "🥗", title: "Fresh Ingredients", text: "Freshly prepared meals." },
  { icon: "👨‍🍳", title: "Expert Chefs", text: "Made with care and flavour." },
  { icon: "🚀", title: "Easy Ordering", text: "Order your favourites quickly." },
];

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">GOOD FOOD, GOOD MOOD</span>
          <h1>Every meal tells a delicious story.</h1>
          <p>
            Discover delicious food, explore our menu and place your
            favourite orders with Cocoa & Cream.
          </p>
          <Link to="/menu" className="primary-btn">
            Explore Menu →
          </Link>
        </div>

        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=900"
          alt="Delicious restaurant meal"
        />
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">WHY Cocoa & Cream?</span>
          <h2>A better way to enjoy food</h2>
        </div>

        <div className="feature-grid">
          {highlights.map((item) => (
            <div className="feature-card" key={item.title}>
              <span className="feature-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Hungry already?</h2>
        <p>Find your next favourite dish.</p>
        <Link to="/menu" className="primary-btn">
          Order Now
        </Link>
      </section>
    </div>
  );
}