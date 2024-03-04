import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { useAjax } from "../hooks/useAjax";
import { getMeal, setOrder } from "../http/http";

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
    case "DECR_MEAL":
      //check if item is already in cart by array index
      const updatedIMeals = [...state.meal];
      const updatedMealsIndex = updatedIMeals.findIndex(
        (meal) => meal.id === action.payload.id
      );
      //get the meal object from array
      const updatedItem = {
        ...updatedIMeals[updatedMealsIndex],
      };
      //decrease quantity
      updatedItem.quantity = updatedItem.quantity - 1;
      //check if quantity is 0, if yes, remove from cart
      if (updatedItem.quantity <= 0) {
        updatedIMeals.splice(updatedMealsIndex, 1);
      } else {
        updatedIMeals[updatedMealsIndex] = updatedItem;
      }
      //update state
      return {
        ...state,
        meal: updatedIMeals,
        totalPrice: +(state.totalPrice - updatedItem.price).toFixed(2), //bit in javascript
        totalQuantity: state.totalQuantity - 1,
      };

      break;
    case "CLEAN_CART":
      //remove all items from cart
      return {
        ...state,
        meal: [],
        totalPrice: 0,
        totalQuantity: 0,
      };
    case "CHECKOUT":
      //navigate to checkout
      return {
        ...state,
        isCheckout: true,
      };
      break;
    case "NOT_CHECKOUT":
      //navigate back
      return {
        ...state,
        isCheckout: false,
      };
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
    isCheckout: false,
  });
  const modalRef = useRef();
  const [inputObj, setInputObj] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
    isValid: true,
  });

  function addMealToCart(name, price, id) {
    mealCartDispatch({
      type: "ADD_MEAL",
      payload: { name, price, id },
    });
  }
  function changeMealQuantity(type, id) {
    if (type === "add") {
      mealCartDispatch({
        type: "ADD_MEAL",
        payload: { id },
      });
    } else {
      mealCartDispatch({
        type: "DECR_MEAL",
        payload: { id },
      });
    }
  }
  function cleanCart() {
    mealCartDispatch({
      type: "CLEAN_CART",
    });
  }

  function checkIsCheckout(ok) {
    if (ok) {
      mealCartDispatch({
        type: "CHECKOUT",
      });
    } else {
      mealCartDispatch({
        type: "NOT_CHECKOUT",
      });
    }
  }
  async function onSubmitted(ajaxObj) {
    await setOrder("orders", ajaxObj);
    mealCartDispatch({
      type: "CLEAN_CART",
    });
  }

  return (
    <MealContext.Provider
      value={{
        isFetching,
        error,
        meals,
        mealCartState,
        modalRef,
        inputObj,
        setInputObj,
        addMealToCart,
        changeMealQuantity,
        cleanCart,
        checkIsCheckout,
        onSubmitted,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export default MealProvider;
