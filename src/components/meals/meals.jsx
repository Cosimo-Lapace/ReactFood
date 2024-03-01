import { useContext } from "react";
import { MealContext } from "../../store/meal-context";
import Button from "../../utilities/button/button";
import Spinner from "../../utilities/spinner/spinner";
import Meal from "./meal/meal";

export default function Meals() {
  const { isFetching, error, meals, addMealToCart } = useContext(MealContext);
 
  return (
    <>
      {isFetching ? <Spinner /> : null}
      {error ? (
        <div className="error-container">
          <h5>{error.message}</h5>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : null}
      {!error && !isFetching ? (
        <section id="meals">
          {meals.map((meal) => (
            <Meal
              key={meal.id}
              id={meal.id}
              image={meal.image}
              name={meal.name}
              price={meal.price}
              description={meal.description}
              addMealToCart={addMealToCart}
            />
          ))}
        </section>
      ) : null}
    </>
  );
}
