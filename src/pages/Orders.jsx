import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../redux/cartSlice";
import { useOrders } from "../context/CartContext";
import { foods } from "./Menu";

export default function Orders() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { orders, dispatch: orderDispatch } = useOrders();

  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function placeOrder(e) {
    e.preventDefault();

    if (customer.trim().length < 2) {
      setMessage("Please enter a valid customer name.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setMessage("Enter a valid 10-digit phone number.");
      return;
    }

    if (cart.length === 0) {
      setMessage("Please add a dish to your cart first.");
      return;
    }

    const order = {
      id: editingId ?? Date.now(),
      customer: customer.trim(),
      phone,
      items: cart.map((item) => `${item.name} × ${item.quantity}`),
      total,
      status: "Confirmed",
    };

    if (editingId) {
      orderDispatch({ type: "DELETE", payload: editingId });
    }

    orderDispatch({ type: "ADD", payload: order });
    dispatch(clearCart());

    setCustomer("");
    setPhone("");
    setEditingId(null);
    setMessage(editingId ? "Order updated!" : "Order placed successfully!");
  }

  function editOrder(order) {
    setEditingId(order.id);
    setCustomer(order.customer);
    setPhone(order.phone);

    // Restore the original items into the cart for editing.
    dispatch(clearCart());

    order.items.forEach((entry) => {
      const [name, quantityText] = entry.split(" × ");
      const food = foods.find((item) => item.name === name);
      const quantity = Number(quantityText) || 1;

      if (food) {
        for (let i = 0; i < quantity; i++) {
          dispatch(addToCart(food));
        }
      }
    });

    setMessage("Edit the details and place the order again.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setCustomer("");
    setPhone("");
    dispatch(clearCart());
    setMessage("Editing cancelled.");
  }

  return (
    <section className="section">
      <div className="section-heading">
        <span className="eyebrow">YOUR RESTAURANT</span>
        <h1>Manage Orders</h1>
        <p>Add dishes, place orders and manage existing bookings.</p>
      </div>

      <div className="orders-layout">
        <div className="panel">
          <h2>Available dishes</h2>

          {foods.map((food) => (
            <div className="order-food" key={food.id}>
              <div>
                <strong>{food.name}</strong>
                <p>₹{food.price}</p>
              </div>
              <button
                className="small-btn"
                onClick={() => dispatch(addToCart(food))}
              >
                + Add
              </button>
            </div>
          ))}

          <h2 className="subheading">Current cart</h2>

          {cart.length === 0 && <p>Your cart is empty.</p>}

          {cart.map((item) => (
            <div className="order-food" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
              <button
                className="text-btn"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))}

          <h3 className="total">Total: ₹{total}</h3>
        </div>

        <div className="panel">
          <h2>{editingId ? "Update Order" : "Customer Details"}</h2>

          <form onSubmit={placeOrder} className="contact-form">
            <label>Customer name</label>
            <input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="Enter full name"
              required
              minLength={2}
            />

            <label>Phone number</label>
            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="10-digit mobile number"
              inputMode="numeric"
              required
              pattern="\d{10}"
            />

            <button className="primary-btn" type="submit">
              {editingId ? "Update Order" : "Place Order"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-btn"
                onClick={cancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </form>

          {message && <p className="form-message">{message}</p>}
        </div>
      </div>

      <div className="panel orders-history">
        <h2>Order History</h2>

        {orders.length === 0 && <p>No orders placed yet.</p>}

        {orders.map((order) => (
          <div className="history-item" key={order.id}>
            <div>
              <strong>{order.customer}</strong>
              <p>{order.items.join(", ")}</p>
              <p>Phone: {order.phone}</p>
              <p>Total: ₹{order.total}</p>
              <span className="status">{order.status}</span>
            </div>

            <div className="history-actions">
              <button
                className="secondary-btn"
                onClick={() => editOrder(order)}
              >
                Edit
              </button>
              <button
                className="text-btn"
                onClick={() =>
                  orderDispatch({ type: "DELETE", payload: order.id })
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}