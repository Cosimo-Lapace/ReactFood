import { createContext } from "react";
import { useAjax } from "../hooks/useAjax";
import { get } from "../http/http";

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const {
    Fetchdata: orders,
    isFetching,
    error,
  } = useAjax(get, "orders", [], "Error Fetching Meals,please try again later");

  return (
    <OrderContext.Provider
      value={{
        orders,
        isFetching,
        error,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
