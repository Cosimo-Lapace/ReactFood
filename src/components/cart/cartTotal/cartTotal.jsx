import { useContext } from "react";
import { MealContext } from "../../../store/meal-context";
import Button from "../../../utilities/button/button";

export default function CartTotal({ totalPrice }) {
  const { cleanCart, checkIsCheckout } = useContext(MealContext);
  return (
    <>
      <div className="cart-total">${totalPrice}</div>
      <div className="modal-actions">
        <Button onClick={cleanCart} $class={"text-modal-button"}>
          Clean
        </Button>
        <Button onClick={() => checkIsCheckout(true)}>Checkout</Button>
      </div>
    </>
  );
}
