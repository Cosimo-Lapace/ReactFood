import { useContext } from "react";
import { MealContext } from "../../../store/meal-context";
import Button from "../../../utilities/button/button";

export default function CheckoutSuccess() {
  const { modalRef } = useContext(MealContext);
  return (
    <div>
      <p>Your order was submitted successfully</p>
      <p>
        We will back with more details via email within the next few minutes.
      </p>
      <div className="modal-actions">
        <Button onClick={()=>modalRef.current.close()}>Okay</Button>
      </div>
    </div>
  );
}
