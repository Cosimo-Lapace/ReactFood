import { url } from "../../../http/http";
import Button from "../../../utilities/button/button";

export default function Meal({ id,image, name, price, description,addMealToCart }) {
  return (
    <div className="meal-item">
      <div className="article">
        <img src={url + image} alt="" />
        <h3>{name}</h3>
        <div>
          <p className="meal-item-price">${price}</p>
        </div>
        <p className="meal-item-description">{description}</p>
        <div className="meal-item-actions">
          <Button onClick={() => addMealToCart(name,price,id)}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
