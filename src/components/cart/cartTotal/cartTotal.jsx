import { useContext } from "react";
import { MealContext } from "../../../store/meal-context";
import Button from "../../../utilities/button/button";

export default function CartTotal({ totalPrice }) {
  const { cleanCart, modalNavigator } = useContext(MealContext);
  return (
    <>
      <div className="cart-total">${totalPrice}</div>
      <div className="modal-actions">
        <Button onClick={cleanCart} $class={"text-modal-button"}>
          Clean
        </Button>
        <Button onClick={() => modalNavigator("checkout")}>Checkout</Button>
      </div>
    </>
  );
}
