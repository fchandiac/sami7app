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
    commerceName: "",
    commerceRut: "",
  },
  cashAmountCashRegister: 0,
  sideBarOpen: false,
  finderProductsList: [],
  carts: [
    {
      id: 1,
      name: "Carro 1",
      total: 0,
      subTotal: 0,
      net: 0,
      tax: 0,
      discounts: 0,
      customer: { id: 1001, key: 1001, name: "11.111.111-1 - SIN CLIENTE" },
      documentType: { id: 1, key: 1, name: "Ticket" },
      utility: 0,
      items: [],
      payments: [
        {
          id: 1001,
          name: "EFECTIVO",
          amount: 0,
          change: 0,
          credit: false,
          payDate: new Date(),
        },
      ],
      change: 0,
      totalPays: 0,
      balance: 0,
    },
    {
      id: 2,
      name: "Carro 2",
      total: 0,
      subTotal: 0,
      net: 0,
      tax: 0,
      discounts: 0,
      customer: { id: 1001, key: 1001, name: "11.111.111-1 - SIN CLIENTE" },
      documentType: { id: 1, key: 1, name: "Ticket" },
      utility: 0,
      items: [],
      payments: [
        {
          id: 1001,
          name: "EFECTIVO",
          amount: 0,
          change: 0,
          credit: false,
          payDate: new Date(),
        },
      ],
      change: 0,
      totalPays: 0,
      balance: 0,
    },
    {
      id: 3,
      name: "Carro 3",
      total: 0,
      subTotal: 0,
      net: 0,
      tax: 0,
      customer: { id: 1001, key: 1001, name: "11.111.111-1 - SIN CLIENTE" },
      discounts: 0,
      documentType: { id: 1, key: 1, name: "Ticket" },
      utility: 0,
      items: [],
      payments: [
        {
          id: 1001,
          name: "EFECTIVO",
          amount: 0,
          change: 0,
          credit: false,
          payDate: new Date(),
        },
      ],
      change: 0,
      totalPays: 0,
      balance: 0,
    },
    {
      id: 4,
      name: "Carro 4",
      total: 0,
      subTotal: 0,
      net: 0,
      tax: 0,
      discounts: 0,
      customer: { id: 1001, key: 1001, name: "11.111.111-1 - SIN CLIENTE" },
      documentType: { id: 1, key: 1, name: "Ticket" },
      utility: 0,
      items: [],
      payments: [
        {
          id: 1001,
          name: "EFECTIVO",
          amount: 0,
          change: 0,
          credit: false,
          payDate: new Date(),
        },
      ],
      change: 0,
      totalPays: 0,
      balance: 0,
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, sideBarOpen: !state.sideBarOpen };
    case "SET_INFO":
      const { id, name, address, phone, status, storage, cashRegisterId, commerceName, commerceRut } =
        action.payload;
      return {
        ...state,
        info: { id, name, address, phone, status, storage, cashRegisterId, commerceName, commerceRut  },
      };
    case "SET_INFO_CASH_REGISTER":
      const { cashRegister_id } = action.payload;
      return {
        ...state,
        info: { ...state.info, cashRegisterId: cashRegister_id },
      };
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
      const { cartId_1, total, net, tax, discounts, utility, subTotal } = action.payload;
      const updatedCarts_1 = state.carts.map((cart) => {
        if (cart.id === cartId_1) {
          return { ...cart, total, net, tax, discounts, utility, subTotal };
        } else {
          return cart;
        }
      });
      return { ...state, carts: updatedCarts_1 };
    case "SET_DOCUMENT_TYPE":
      const { cartId_2, documentType } = action.payload;
      const updatedCarts_2 = state.carts.map((cart) => {
        if (cart.id === cartId_2) {
          return { ...cart, documentType };
        } else {
          return cart;
        }
      });

      return { ...state, carts: updatedCarts_2 };
    case "SET_CUSTOMER":
      const { cartId_3, customer } = action.payload;
      const updatedCarts_3 = state.carts.map((cart) => {
        if (cart.id === cartId_3) {
          return { ...cart, customer };
        } else {
          return cart;
        }
      });
      return { ...state, carts: updatedCarts_3 };
    case "SET_CART_PAYMENTS":
      const { cartId_4, payments } = action.payload;
      const updatedCarts_4 = state.carts.map((cart) => {
        if (cart.id === cartId_4) {
          return { ...cart, payments };
        } else {
          return cart;
        }
      });
      return { ...state, carts: updatedCarts_4 };
    case "ADD_PAYMENT_METHOD_TO_CART":
      const { cartId_5, payment } = action.payload;
      const updatedCarts_5 = state.carts.map((cart) => {
        if (cart.id === cartId_5) {
          return { ...cart, payments: [...cart.payments, payment] };
        } else {
          return cart;
        }
      });
      return { ...state, carts: updatedCarts_5 };

      case "REMOVE_PAYMENT_METHOD_FROM_CART":
      const { cartId_6, paymentId } = action.payload;
      const updatedCarts_6 = state.carts.map((cart) => {
        if (cart.id === cartId_6) {
          return { ...cart, payments: cart.payments.filter((pay) => pay.id !== paymentId) };
        } else {
          return cart;
        }
      });
      return { ...state, carts: updatedCarts_6 };

      case "UPDATE_PAYMENT_METHOD_AMOUNT_FROM_CART":
      const { cartId_7, paymentId_1, amount } = action.payload;
      const updatedCarts_7 = state.carts.map((cart) => {
        if (cart.id === cartId_7) {
          return { ...cart, payments: cart.payments.map((pay) => {
            if (pay.id === paymentId_1) {
              return { ...pay, amount }
            } else {
              return pay
            }
          }) };
        } else {
          return cart;
        }
      });
      return { ...state, carts: updatedCarts_7 };

    case "SET_TOTAL_PAYMENTS_VALUES":
      const { cartId_8, totalPays, balance, change } = action.payload;
      const updatedCarts_8 = state.carts.map((cart) => {
        if (cart.id === cartId_8) {
          return { ...cart, totalPays, balance, change };
        } else {
          return cart;
        }
      });

      return { ...state, carts: updatedCarts_8 };

    case "SET_PAYMENT_AMOUNT_AND_TOTALS_PAYMENTS_VALUES":
      const { cartId_9, paymentId_2, amount_1, totalPays_1, balance_1, change_1 } = action.payload;
      const updatedCarts_9 = state.carts.map((cart) => {
        if (cart.id === cartId_9) {
          return { ...cart, payments: cart.payments.map((pay) => {
            if (pay.id === paymentId_2) {
              return { ...pay, amount: amount_1 }
            } else {
              return pay
            }
          }), totalPays: totalPays_1, balance: balance_1, change: change_1 };
        } else {
          return cart;
        }
      });

      return { ...state, carts: updatedCarts_9 };

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

  const setInfo = (
    id,
    name,
    address,
    phone,
    status,
    storage,
    cashRegisterId,
    commerceName,
    commerceRut
  ) => {
    dispatch({
      type: "SET_INFO",
      payload: { id, name, address, phone, status, storage, cashRegisterId, commerceName, commerceRut},
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

  const setTotalsCart = (cartId, total, net, tax, discounts, utility, subTotal) => {
    dispatch({
      type: "SET_TOTALS_CART",
      payload: { cartId_1: cartId, total, net, tax, discounts, utility, subTotal },
    });
  };

  const setDocumentType = (cartId, documentType) => {
    dispatch({
      type: "SET_DOCUMENT_TYPE",
      payload: { cartId_2: cartId, documentType },
    });
  };

  const setCustomer = (cartId, customer) => {
    dispatch({
      type: "SET_CUSTOMER",
      payload: { cartId_3: cartId, customer },
    });
  };

  const setCashAmountCashRegister = (amount) => {
    dispatch({ type: "SET_CASH_AMOUNT_CASH_REGISTER", payload: amount });
  };

  const setCartPayments = (cartId, payments) => {
    dispatch({
      type: "SET_CART_PAYMENTS",
      payload: { cartId_4: cartId, payments },
    });
  };

  const addPaymentMethodToCart = (cartId, payment) => {
    dispatch({
      type: "ADD_PAYMENT_METHOD_TO_CART",
      payload: { cartId_5: cartId, payment },
    });

  };

  const removePaymentMethodFromCart = (cartId, paymentId) => {
    dispatch({
      type: "REMOVE_PAYMENT_METHOD_FROM_CART",
      payload: { cartId_6: cartId, paymentId },
    });

  }

  const updatePaymenMethodAmountFromCart = (cartId, paymentId, amount) => {
    dispatch({
      type: "UPDATE_PAYMENT_METHOD_AMOUNT_FROM_CART",
      payload: { cartId_7: cartId, paymentId_1: paymentId, amount },
    });

  }

  const setTotalPaymentsValues = (cartId, totalPays, balance, change) => {
    dispatch({
      type: "SET_TOTAL_PAYMENTS_VALUES",
      payload: { cartId_8: cartId, totalPays, balance, change },
    });
  }

  const updateCartPayments = (cartId) => {

    const payments = state.carts.find((cart) => cart.id === cartId).payments;

    console.log("payments", payments);
    const total = state.carts.find((cart) => cart.id === cartId).total;
    let totalPays = 0;
    let change = 0;
    let balance = 0;
    let sumCash = 0;
    let sumNoCash = 0;

    payments.map((pay) => {
      if (pay.id === 1001) {
        sumCash += pay.amount;
      } else {
        sumNoCash += pay.amount;
      }
    })

    totalPays = sumCash + sumNoCash;
    balance = total - totalPays;
    let preChange = total - sumNoCash;
    change = sumCash - preChange < 0 ? 0 : sumCash - preChange;

    setTotalPaymentsValues(cartId, totalPays, balance, change);
  }

  const setPaymentAmountAndTotalPaymentsValues = (cartId, paymentId, amount,) => {
    const payments = state.carts.find((cart) => cart.id === cartId).payments;
    const pay = payments.find((pay) => pay.id === paymentId);
    pay.amount = amount;

    console.log("payments", payments);
    const total = state.carts.find((cart) => cart.id === cartId).total;
    let totalPays = 0;
    let change = 0;
    let balance = 0;
    let sumCash = 0;
    let sumNoCash = 0;

    payments.map((pay) => {
      if (pay.id === 1001) {
        sumCash += pay.amount;
      } else {
        sumNoCash += pay.amount;
      }
    })

    totalPays = sumCash + sumNoCash;
    balance = total - totalPays;
    let preChange = total - sumNoCash;
    change = sumCash - preChange < 0 ? 0 : sumCash - preChange;


    dispatch({
      type: "SET_PAYMENT_AMOUNT_AND_TOTALS_PAYMENTS_VALUES",
      payload: { cartId_9: cartId, paymentId_2: paymentId, amount_1: amount, totalPays_1: totalPays, balance_1: balance, change_1: change },
    });
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
        setCashAmountCashRegister,
        setCartPayments,
        addPaymentMethodToCart,
        removePaymentMethodFromCart,
        updatePaymenMethodAmountFromCart,
        updateCartPayments,
        setPaymentAmountAndTotalPaymentsValues
      }}
    >
      {children}
    </SalePointContext.Provider>
  );
};

export { SalePointProvider, useSalePointContext };
