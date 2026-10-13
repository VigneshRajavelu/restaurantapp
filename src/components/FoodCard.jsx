import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function FoodCard({ food }) {
  const dispatch = useDispatch();

  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} />

      <div className="food-info">
        <span className="category">{food.category}</span>
        <h3>{food.name}</h3>
        <p>{food.description}</p>

        <div className="food-bottom">
          <strong>₹{food.price}</strong>
          <button
            className="small-btn"
            onClick={() => dispatch(addToCart(food))}
          >
            + Add
          </button>
        </div>

        <Link className="details-link" to={`/menu/${food.id}`}>
          View details →
        </Link>
      </div>
    </div>
  );
}