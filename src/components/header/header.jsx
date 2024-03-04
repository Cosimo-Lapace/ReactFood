import { useContext } from "react";
import logo from "../../assets/logo.jpg";
import Button from "../../utilities/button/button";
import Modal from "../../utilities/modal/modal";
import Cart from "../cart/cart";
import { MealContext } from "../../store/meal-context";
import Checkout from "../checkout/checkout";
import OrdersContainer from "../ordersContainer/ordersContainer";

export default function Header() {
  const { mealCartState, modalRef, modalNavigator } = useContext(MealContext);
  function onOpenOrders(){
    modalRef.current.open();
    modalNavigator("orders");
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="REACTFOOD" />
        <h1>REACTFOOD</h1>
      </div>
      <div>
        <Button onClick={onOpenOrders}>Orders</Button>
        <Button onClick={() => modalRef.current.open()}>
          Cart({mealCartState.totalQuantity})
        </Button>
      </div>
      <Modal ref={modalRef}>
        {mealCartState.CheckoutNagitator === "cart" && <Cart />}
        {mealCartState.CheckoutNagitator === "checkout" && <Checkout />}
        {mealCartState.CheckoutNagitator === "orders" && <OrdersContainer />}
      </Modal>
    </header>
  );
}
