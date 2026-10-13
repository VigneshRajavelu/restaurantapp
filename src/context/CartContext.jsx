import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "DELETE":
      return state.filter((order) => order.id !== action.payload);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [orders, dispatch] = useReducer(reducer, []);

  return (
    <CartContext.Provider value={{ orders, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useOrders() {
  return useContext(CartContext);
}