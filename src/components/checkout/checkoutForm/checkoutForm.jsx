import { useContext } from "react";
import Input from "../../../utilities/input/input";
import Button from "../../../utilities/button/button";
import ErrorMessage from "../../../utilities/error/errorMessage/errorMessage";
import { MealContext } from "../../../store/meal-context";

export default function CheckoutForm({ setIsComplete }) {
  const { onSubmitted, mealCartState, inputObj, setInputObj } =
    useContext(MealContext);
 
  function submit(e) {
    e.preventDefault();
    if (
      inputObj.name.length < 4 ||
      inputObj.street.length < 4 ||
      inputObj.city.length < 4 ||
      !inputObj.email.includes("@") ||
      !inputObj.postalCode.match(/.*\d+.*/)
    ) {
      setInputObj((prev) => {
        return {
          ...prev,
          isValid: false,
        };
      });
      return;
    } else {
      setInputObj((prev) => {
        return {
          ...prev,
          isValid: true,
        };
      });
      setIsComplete(true);
    }
    const AjaxObj = {
      items: mealCartState.meal,
      totalQuantity: mealCartState.totalQuantity,
      totalPrice: mealCartState.totalPrice,
      customer: {
        name: inputObj.name,
        email: inputObj.email,
        street: inputObj.street,
        ["postal-code"]: inputObj.postalCode,
        city: inputObj.city,
      },
    };

    onSubmitted(AjaxObj);
  }

  return (
    <>
      {!inputObj.isValid && <ErrorMessage message={"Please fill all fields"} />}
      <form onSubmit={submit}>
        <Input
          setInputObj={setInputObj}
          inputObj={inputObj}
          label="Full Name"
          type="text"
          name="name"
        />

        <Input
          setInputObj={setInputObj}
          inputObj={inputObj}
          label="E-Mail Address"
          type="email"
          name="email"
        />

        <Input
          setInputObj={setInputObj}
          inputObj={inputObj}
          label="Street"
          type="text"
          name="street"
        />

        <div className="control-row">
          <Input
            setInputObj={setInputObj}
            inputObj={inputObj}
            label="Postal Code"
            type="text"
            name="postalCode"
          />

          <Input
            setInputObj={setInputObj}
            inputObj={inputObj}
            label="City"
            type="text"
            name="city"
          />
        </div>
        <div className="modal-actions">
          <Button type="submit">Checkout</Button>
        </div>
      </form>
    </>
  );
}
