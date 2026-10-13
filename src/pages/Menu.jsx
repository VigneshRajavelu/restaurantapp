import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";

export const foods = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 249,
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600",
    description: "Classic pizza with cheese, tomato and basil.",
  },
  {
    id: 2,
    name: "Veg Burger",
    category: "Burger",
    price: 149,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    description: "A delicious veggie burger with fresh toppings.",
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    category: "Pasta",
    price: 199,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
    description: "Creamy pasta prepared with herbs and cheese.",
  },
  {
    id: 4,
    name: "French Fries",
    category: "Sides",
    price: 99,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
    description: "Crispy golden fries served hot.",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "Dessert",
    price: 129,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    description: "Rich chocolate cake for your sweet cravings.",
  },
  {
    id: 6,
    name: "Fresh Lemonade",
    category: "Drinks",
    price: 79,
    image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Refreshing lemonade made with fresh lemons.",
  },
];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const searchRef = useRef(null);

  const categories = ["All", ...new Set(foods.map((f) => f.category))];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || food.category === category;

    return matchesSearch && matchesCategory;
  });

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);

    if (value && value !== "All") {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    setSearchParams(next);
  }

  return (
    <section className="section">
      <div className="section-heading">
        <span className="eyebrow">MADE FRESH FOR YOU</span>
        <h1>Explore Our Menu</h1>
        <p>Find something delicious for every craving.</p>
      </div>

      <div className="menu-controls">
        <input
          ref={searchRef}
          value={search}
          onChange={(e) => updateParam("search", e.target.value)}
          placeholder="Search dishes..."
          aria-label="Search dishes"
        />

        <button
          className="secondary-btn"
          onClick={() => searchRef.current?.focus()}
        >
          Focus Search
        </button>

        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <p className="result-count">{filteredFoods.length} dishes found</p>

      <div className="food-grid">
        {filteredFoods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <p className="empty-state">No dishes found. Try another search.</p>
      )}
    </section>
  );
}