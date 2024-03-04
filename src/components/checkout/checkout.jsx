import { useContext, useState } from "react";
import { MealContext } from "../../store/meal-context";
import CartContent from "../cart/CartContent";
import CheckoutForm from "./checkoutForm/checkoutForm";
import CheckoutSuccess from "./checkoutSuccess/checkoutSuccess";

export default function Checkout() {
  const { mealCartState } = useContext(MealContext);
  const [isComplete, setIsComplete] = useState(false);

  return (
    <CartContent title={!isComplete ? "Checkout" : "Success"}>
      {!isComplete ? (
        <>
          <p>Total Amount ${mealCartState.totalPrice}</p>
          <CheckoutForm setIsComplete={setIsComplete} />
        </>
      ) : (
        <CheckoutSuccess setIsComplete={setIsComplete} />
      )}
    </CartContent>
  );
}
