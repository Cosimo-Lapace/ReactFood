
import OrderProvider from "../../store/order-context";
import Orders from "./orders/orders";

export default function OrdersContainer() {


  return (
    <OrderProvider>
      <h2>Orders</h2>
      <Orders />
    </OrderProvider>
  );
}
