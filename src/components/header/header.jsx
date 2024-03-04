import { useContext } from "react";
import logo from "../../assets/logo.jpg";
import Button from "../../utilities/button/button";
import Modal from "../../utilities/modal/modal";
import Cart from "../cart/cart";
import { MealContext } from "../../store/meal-context";
import Checkout from "../checkout/checkout";

export default function Header() {
  const { mealCartState, modalRef } = useContext(MealContext);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="REACTFOOD" />
        <h1>REACTFOOD</h1>
      </div>
      <Button onClick={() => modalRef.current.open()}>
        Cart({mealCartState.totalQuantity})
      </Button>
      <Modal ref={modalRef}>
        {!mealCartState.isCheckout ? <Cart /> : <Checkout />}
      </Modal>
    </header>
  );
}
