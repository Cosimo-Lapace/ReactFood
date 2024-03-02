import Button from "../../../utilities/button/button";

export default function CartTotal({totalPrice}){
    return (
      <>
        <div className="cart-total">${totalPrice}</div>
        <div className="modal-actions">
          <Button $class={"text-modal-button"}>Clean</Button>
          <Button>Checkout</Button>
        </div>
      </>
    );
}