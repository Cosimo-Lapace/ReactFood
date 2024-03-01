/* import {url} from "../../../http/http" */

export default function Meal() {
  return (
    <div className="meal-item">
      <div className="article">
        {/*     <img src={url} alt="" /> */}
        <h3>Lorem</h3>
        <div>
          <p className="meal-item-price">€10,00</p>
        </div>
        <p className="meal-item-description">desc</p>
        <div className="meal-item-actions">
          <button className="button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
