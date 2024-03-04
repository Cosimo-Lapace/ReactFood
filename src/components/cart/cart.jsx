import React, { useContext } from "react";
import Button from "../../utilities/button/button";
import { MealContext } from "../../store/meal-context";
import CartTotal from "./cartTotal/cartTotal";
import CartContent from "./CartContent";

export default function Cart() {
  const { mealCartState, changeMealQuantity } = useContext(MealContext);

  return (
    <CartContent title="Cart">
      {mealCartState.meal.length > 0 ? (
        <ul>
          {mealCartState.meal.map((meal) => (
            <li key={meal.id} className="cart-item">
              <p>
                <span>{meal.name}</span> - <span>{meal.quantity}</span> x
                <span>{meal.price}</span>
              </p>
              <div className="cart-item-actions ">
                <Button
                  onClick={() =>
                    changeMealQuantity("add", meal.id, meal.quantity)
                  }
                  $class={"none"}
                >
                  +
                </Button>
                <span>{meal.quantity}</span>
                <Button
                  onClick={() =>
                    changeMealQuantity("decr", meal.id)
                  }
                  $class={"none"}
                >
                  -
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your Cart is Empty :(</p>
      )}
      {mealCartState.meal.length > 0 ? (
        <CartTotal totalPrice={mealCartState.totalPrice} />
      ) : null}
    </CartContent>
  );
}
