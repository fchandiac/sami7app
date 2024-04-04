import React, { useReducer, createContext, useContext } from "react";
const SalePointContext = createContext();
const useSalePointContext = () => useContext(SalePointContext);

// customer: {
//   id: null,
//   rut: "",
//   name: "",
//   activity: "",
//   district: null,
//   city: null,
//   address: "",
//   phone: "",
//   mail: "",
// },

const initialState = {
  activeCart: 1,
  priceList: { id: 1001, key: 1001, name: "MINORISTA" },
  info: {
    id: null,
    name: "",
    description: "",
    address: "",
    phone: "",
    status: false,
    storage: { id: 1001, key: 1001, name: "SALA DE VENTAS" },
    cashRegisterId: null,
  },
  cashAmountCashRegister: 0,
  sideBarOpen: false,
  finderProductsList: [],
  carts: [
    {
      id: 1,
      name: "Carro 1",
      total: 0,
      net: 0,
      tax: 0,
      discounts: 0,
      customer: { id: 1001, key: 1001, name: "SIN CLIENTE" },
      documentType:  { id: 1, key: 1, name: "Ticket" },
      items: [],
    },
    {
      id: 2,
      name: "Carro 2",
      total: 0,
      net: 0,
      tax: 0,
      discounts: 0,
      customer: { id: 1001, key: 1001, name: "SIN CLIENTE" },
      documentType:  { id: 1, key: 1, name: "Ticket" },
      items: [],
    },
    {
      id: 3,
      name: "Carro 3",
      total: 0,
      net: 0,
      tax: 0,
      customer: { id: 1001, key: 1001, name: "SIN CLIENTE" },
      discounts: 0,
      documentType:  { id: 1, key: 1, name: "Ticket" },
      items: [],
    },
    {
      id: 4,
      name: "Carro 4",
      total: 0,
      net: 0,
      tax: 0,
      discounts: 0,
      customer: { id: 1001, key: 1001, name: "SIN CLIENTE" },
      documentType:  { id: 1, key: 1, name: "Ticket" },
      items: [],
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, sideBarOpen: !state.sideBarOpen };
    case "SET_INFO":
      const { id, name, address, phone, status, storage, cashRegisterId } = action.payload;
      return { ...state, info: { id, name, address, phone, status, storage, cashRegisterId } };
    case "SET_INFO_CASH_REGISTER":
      const { cashRegister_id } = action.payload;
      return { ...state, info: { ...state.info, cashRegisterId: cashRegister_id } };
    case "SET_INFO_STATUS":
      return { ...state, info: { ...state.info, status: action.payload } };
    case "SET_PRICE_LIST":
      return { ...state, priceList: action.payload };
    case "SET_FIND_PRODUCTS_LIST":
      return { ...state, finderProductsList: action.payload };
    case "SET_ACTIVE_CART":
      return { ...state, activeCart: action.payload };
    case "GET_CART_BY_ID":
      const cart = state.carts.find((cart) => cart.id === action.payload);
      return cart;
    case "SET_CART_ITEMS":
      const { cartId_0, items } = action.payload;
      const updatedCarts_0 = state.carts.map((cart) => {
        if (cart.id === cartId_0) {
          return { ...cart, items };
        } else {
          return cart;
        }
      });
      return { ...state, carts: updatedCarts_0 };
    case "SET_TOTALS_CART":
      const { cartId_1, total, net, tax, discounts } = action.payload;
      const updatedCarts_1 = state.carts.map((cart) => {
        if (cart.id === cartId_1) {
          return { ...cart, total, net, tax, discounts };
        } else {
          return cart;
        }
      });
      return { ...state, carts: updatedCarts_1 };
    case "SET_DOCUMENT_TYPE":
      const {cartId_2, documentType} = action.payload;
      const updatedCarts_2 = state.carts.map((cart) => {
        if (cart.id === cartId_2) {
          return { ...cart, documentType };
        } else {
          return cart;
        }
      });
      case "SET_CUSTOMER":
        const {cartId_3, customer} = action.payload;
        const updatedCarts_3 = state.carts.map((cart) => {
          if (cart.id === cartId_3) {
            return { ...cart, customer };
          } else {
            return cart;
          }
        });
        case "SET_CASH_AMOUNT_CASH_REGISTER":
          return { ...state, cashAmountCashRegister: action.payload };
     
    default:
      return state;
  }
};

const SalePointProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toogleSideBar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  const setFinderProductsList = (list) => {
    dispatch({ type: "SET_FIND_PRODUCTS_LIST", payload: list });
  };

  const setActiveCart = (cartId) => {
    dispatch({ type: "SET_ACTIVE_CART", payload: cartId });
  };

  const setCartItems = (cartId, items) => {
    dispatch({
      type: "SET_CART_ITEMS",
      payload: { cartId_0: cartId, items: items },
    });
  };

  const setInfo = ( id, name, address, phone, status, storage, cashRegisterId) => {
    dispatch({
      type: "SET_INFO",
      payload: { id, name, address, phone, status, storage, cashRegisterId },
    });
  };

  const setInfoCashRegister = (cashRegister_id) => {
    dispatch({ type: "SET_INFO_CASH_REGISTER", payload: { cashRegister_id } });
  };

  const setInfoStatus = (status) => {
    dispatch({ type: "SET_INFO_STATUS", payload: status });
  };

  const setPriceList = (priceList) => {
    dispatch({ type: "SET_PRICE_LIST", payload: priceList });
  };

  const setTotalsCart = (cartId, total, net, tax, discounts) => {
    dispatch({
      type: "SET_TOTALS_CART",
      payload: { cartId_1: cartId, total, net, tax, discounts },
    });
  };

  const setDocumentType = (cartId, documentType) => {
    dispatch({
      type: "SET_DOCUMENT_TYPE",
      payload: { cartId_2: cartId, documentType },
    });
  }

  const setCustomer = (cartId, customer) => {
    dispatch({
      type: "SET_CUSTOMER",
      payload: { cartId_3: cartId, customer },
    });
  }

  const setCashAmountCashRegister = (amount) => {
    dispatch({ type: "SET_CASH_AMOUNT_CASH_REGISTER", payload: amount });
  }

  return (
    <SalePointContext.Provider
      value={{
        state,
        sideBarOpen: state.sideBarOpen,
        finderProductsList: state.finderProductsList,
        info: state.info,
        carts: state.carts,
        cart1: state.carts[0],
        cart2: state.carts[1],
        cart3: state.carts[2],
        cart4: state.carts[3],
        activeCart: state.activeCart,
        priceList: state.priceList,
        cashAmountCashRegister: state.cashAmountCashRegister,
        infoSatus: state.info.status,
        dispatch,
        toogleSideBar,
        setFinderProductsList,
        setActiveCart,
        setCartItems,
        setInfo,
        setInfoCashRegister,
        setInfoStatus,
        setPriceList,
        setTotalsCart,
        setDocumentType,
        setCustomer,
        setCashAmountCashRegister
      }}
    >
      {children}
    </SalePointContext.Provider>
  );
};

export { SalePointProvider, useSalePointContext };
