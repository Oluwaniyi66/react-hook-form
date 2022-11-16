import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { IShippingBillingInfo } from "../interfaces/IShippingBillingInfo";

type State = {
  shippingInfo: IShippingBillingInfo;
  billingInfo: IShippingBillingInfo;
};

type Action =
  | { type: "updateShippingInfo"; payload: IShippingBillingInfo }
  | { type: "updateBillingInfo"; payload: IShippingBillingInfo };

type Dispatch = (action: Action) => void;

type CheckoutProviderProps = { children: ReactNode };

const initialState: State = {
  shippingInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  },
  billingInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  },
};

const CheckoutContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>;

const checkoutReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "updateShippingInfo": {
      return {
        ...state,
        shippingInfo: action.payload,
      };
    }
    case "updateBillingInfo": {
      return {
        ...state,
        billingInfo: action.payload,
      };
    }
    default: {
      throw new Error("unhandled action type");
    }
  }
};

const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);
  const value = { state, dispatch };
  return (
    <CheckoutContext.Provider value={value}>
      {" "}
      {children}
    </CheckoutContext.Provider>
  );
};

const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context) {
    return context;
  }
  throw new Error("useCheckout must be within a checkoutProvider");
};

export { CheckoutProvider, useCheckout };
