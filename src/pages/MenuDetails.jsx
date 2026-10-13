import { Link, useParams } from "react-router-dom";
import { foods } from "./Menu";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function MenuDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const food = foods.find((item) => item.id === Number(id));

  if (!food) {
    return (
      <section className="section empty-state">
        <h2>Dish not found</h2>
        <Link to="/menu">Back to Menu</Link>
      </section>
    );
  }

  return (
    <section className="details-layout section">
      <img src={food.image} alt={food.name} />

      <div>
        <span className="eyebrow">{food.category}</span>
        <h1>{food.name}</h1>
        <p>{food.description}</p>
        <h2>₹{food.price}</h2>

        <button
          className="primary-btn"
          onClick={() => dispatch(addToCart(food))}
        >
          Add to Cart
        </button>

        <p><Link to="/menu">← Back to menu</Link></p>
      </div>
    </section>
  );
}