import { createContext, useReducer } from "react";
import { useAjax } from "../hooks/useAjax";
import { getMeal } from "../http/http";

export const MealContext = createContext();

function mealCartReducer(state, action) {
  switch (action.type) {
    case "ADD_MEAL":
      //check if item is already in cart
      const existingItem = state.meal.find((meal) => {
        return meal.id === action.payload.id;
      });
      if (!existingItem) {
        const newItem = {
          id: action.payload.id,
          name: action.payload.name,
          price: +action.payload.price,
          quantity: 1,
        };
        //add item to cart if not in cart
        return {
          ...state,
          meal: [...state.meal, newItem],
          totalPrice: +(state.totalPrice + newItem.price).toFixed(2), //bit in javascript
          totalQuantity: state.totalQuantity + 1,
        };
        //increment quantity if item is already in cart
      } else {
        return {
          ...state,
          meal: state.meal.map((meal) => {
            if (meal.id === action.payload.id) {
              return {
                ...meal,
                quantity: meal.quantity + 1,
              };
            } else {
              return {
                ...meal,
              };
            }
          }),
          totalPrice: +(state.totalPrice + existingItem.price).toFixed(2), //bit in javascript
          totalQuantity: state.totalQuantity + 1,
        };
      }
      break;
    default:
      return state;
  }
}

const MealProvider = ({ children }) => {
  const {
    isFetching,
    error,
    Fetchdata: meals,
  } = useAjax(
    getMeal,
    "meals",
    [],
    "Error Fetching Meals,please try again later"
  );
  const [mealCartState, mealCartDispatch] = useReducer(mealCartReducer, {
    meal: [],
    totalPrice: 0,
    totalQuantity: 0,
  });

  console.log(mealCartState);
  function addMealToCart(name, price, id) {
    mealCartDispatch({
      type: "ADD_MEAL",
      payload: { name, price, id },
    });
  }

  return (
    <MealContext.Provider
      value={{
        isFetching,
        error,
        meals,
        addMealToCart,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export default MealProvider;