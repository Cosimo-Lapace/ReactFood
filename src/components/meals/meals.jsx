import { useAjax } from "../../hooks/useAjax";
import { get } from "../../http/http";
import Spinner from "../../utilities/spinner/spinner";
import Meal from "./meal/meal";

export default function Meals() {
  const {
    isFetching,
    error,
    Fetchdata: meals,
  } = useAjax(get, "meal", [], "no meals found");
  return (
    <>
      {isFetching ? <Spinner /> : null}
      {error ? <p>{error.message}</p> : null}
      {!error && !isFetching ? (
        <section id="meals">
          {meals.map((meal) => (
            <Meal key={meal.id} {...meal} />
          ))}
        </section>
      ) : null}
    </>
  );
}
