import { useContext } from "react";
import { MealContext } from "../../store/meal-context";
import CartContent from "../cart/CartContent";
import CheckoutForm from "./checkoutForm/checkoutForm";

export default function Checkout() {
  const { mealCartState } = useContext(MealContext);


  return (
    <CartContent title="Checkout">
      <p>Total Amount ${mealCartState.totalPrice}</p>
      <CheckoutForm />
    </CartContent>
  );
}
