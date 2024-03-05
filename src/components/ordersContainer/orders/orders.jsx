import { useContext } from "react";
import { OrderContext } from "../../../store/order-context";
import Spinner from "../../../utilities/spinner/spinner";
import Button from "../../../utilities/button/button";

export default function Orders() {
  const { orders, isFetching, error } = useContext(OrderContext);
  return (
    <div>
      <div>
        {isFetching ? <Spinner typeContainer={"sm"} /> : null}
        {error ? (
          <div>
            <h5>{error.message}</h5>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        ) : null}
        {orders.length !== 0 || !isFetching || error ? (
          orders.map((order) => (
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
              <div>
                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.name} - {item.price} x {item.quantity}
                  </p>
                ))}
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No orders</p>
        )}
      </div>
    </div>
  );
}
