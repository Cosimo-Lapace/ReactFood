import { useContext } from "react";
import { OrderContext } from "../../../store/order-context";

export default function Orders() {
  const { orders } = useContext(OrderContext);

  return (
    <div>
      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <p>
              {order.customer.name}, {order.customer.city},
              {order.customer.street}, {order.customer["postal-code"]},
            </p>
            <p>
              <strong>
                total price: ${order.totalPrice} total quantity:{" "}
                {order.totalQuantity}
              </strong>
            </p>
            <p>
              {order.items.map((item) => (
                <div key={item.id}>
                  {item.name} - {item.price} x {item.quantity}
                </div>
              ))}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
