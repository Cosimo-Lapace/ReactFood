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
    case "DECR_MEAL":
      console.log(state.totalPrice);
      let totalPrice = state.totalPrice;
      return {
        ...state,
        meal: state.meal
          .map((meal) => {
            console.log(meal);
            if (meal.id === action.payload.id) {
              totalPrice = +(state.totalPrice - meal.price).toFixed(2);
              if (meal.quantity > 1) {
                return {
                  ...meal,
                  quantity: meal.quantity - 1,
                };
              } else {
                return null;
              }
            }
          })
          .filter((meal) => meal !== null),
        totalPrice: totalPrice,
        totalQuantity: state.totalQuantity - 1,
      };
      break;
    case "CLEAN_CART":
      return {
        ...state,
        meal: [],
        totalPrice: 0,
        totalQuantity: 0,
      };
    case "CHECKOUT":
      return {
        ...state,
        isCheckout: true,
      };
      break;
    case "NOT_CHECKOUT":
      return {
        ...state,
        isCheckout: false,
      };
      break;
    case "SUBMITTED":
      return {
        meal: [...state.meal],
        totalPrice: state.totalPrice,
        totalQuantity:state.totalQuantity,
        userObj: action.payload.userObj,
      };
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
  function onSubmitted(userObj) {
    console.log(userObj);
    mealCartDispatch({
      type: "SUBMITTED",
      payload: { userObj },
    });
  }
  console.log(mealCartState);

  return (
    <MealContext.Provider
      value={{
        isFetching,
        error,
        meals,
        mealCartState,
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
