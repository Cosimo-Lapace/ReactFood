import Header from "./components/header/header";
import Meals from "./components/meals/meals";
import MealProvider from "./store/meal-context";

function App() {
  return (
    <MealProvider> 
        <Header />
        <main>
          <Meals />
        </main>
    </MealProvider>
  );
}

export default App;
