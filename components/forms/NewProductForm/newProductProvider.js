import React, { useReducer, createContext, useContext } from "react";
const NewProductFormContext = createContext();
const useNewProductFormContext = () => useContext(NewProductFormContext);

const initialState = {
  activeStep: 0,
  general: {
    id: 0,
    name: "",
    description: "",
    favorite: false,
    category: null,
    subcategory: null,
    stockControl: true,
    ivaSubject: true,
    code: "",
  },
  purchasePrice: {
    id: 0,
    net: "",
    gross: "",
    provider: null,
    taxes: [],
    use: true,
  },
  sellingPrice: {
    id: 0,
    net: "",
    gross: "",
    priceList: null,
    taxes: [],
    utility: 0,
  },
  stock: {
    id: 0,
    total: '',
    available: "",
    reserve: 0,
    critical: "",
    storage: null,
    //product
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return {
        activeStep: 0,
        general: {
          id: 0,
          name: "",
          description: "",
          favorite: false,
          category: null,
          subcategory: null,
          stockControl: true,
          ivaSubject: true,
          code: "",
        },
        purchasePrice: {
          id: 0,
          net: "",
          gross: "",
          provider: null,
          taxes: [],
          use: true,
        },
        sellingPrice: {
          id: 0,
          net: "",
          gross: "",
          priceList: null,
          taxes: [],
          utility: 0,
        },
        stock: {
          id: 0,
          total: '',
          available: "",
          reserve: 0,
          critical: "",
          storage: null,
        },

      }
    case "SET_ACTIVE_STEP":
      return { ...state, activeStep: action.value };
    case "SET_GENERAL":
      return { ...state, general: action.value };
    case "SET_NAME":
      return { ...state, general: { ...state.general, name: action.value } };
    case "SET_DESCRIPTION":
      return {
        ...state,
        general: { ...state.general, description: action.value },
      };
    case "SET_CATEGORY":
      return {
        ...state,
        general: { ...state.general, category: action.value },
      };
    case "SET_SUBCATEGORY":
      return {
        ...state,
        general: { ...state.general, subcategory: action.value },
      };
    case "SET_STOCK_CONTROL":
      return {
        ...state,
        general: { ...state.general, stockControl: action.value },
      };
    case "SET_FAVORITE":
      return {
        ...state,
        general: { ...state.general, favorite: action.value },
      };
    case "SET_IVA_SUBJECT":
      return {
        ...state,
        general: { ...state.general, ivaSubject: action.value },
      };
    case "SET_CODE":
      return { ...state, general: { ...state.general, code: action.value } };
    case "SET_PURCHASE_PRICE":
      return { ...state, purchasePrice: action.value };
    case "SET_PURCHASE_NET_PRICE":
      return {
        ...state,
        purchasePrice: { ...state.purchasePrice, net: action.value },
      };
    case "SET_PURCHASE_GROSS_PRICE":
      return {
        ...state,
        purchasePrice: { ...state.purchasePrice, gross: action.value },
      };
    case "SET_PURCHASE_PROVIDER":
      return {
        ...state,
        purchasePrice: { ...state.purchasePrice, provider: action.value },
      };
    case "SET_PURCHASE_USE":
      return {
        ...state,
        purchasePrice: { ...state.purchasePrice, use: action.value },
      };
    case "SET_PURCHASE_TAXES":
      return {
        ...state,
        purchasePrice: { ...state.purchasePrice, taxes: action.value },
      };
    case "ADD_PURCHASE_TAX":
      return {
        ...state,
        purchasePrice: {
          ...state.purchasePrice,
          taxes: [...state.purchasePrice.taxes, action.value],
        },
      };
    case "REMOVE_PURCHASE_TAX":
      return {
        ...state,
        purchasePrice: {
          ...state.purchasePrice,
          taxes: state.purchasePrice.taxes.filter(
            (tax) => tax.id !== action.value.id
          ),
        },
      };
    case "SET_SELLING_PRICE":
      return { ...state, sellingPrice: action.value };
    case "SET_SELLING_PRICE_LIST":
      return {
        ...state,
        sellingPrice: { ...state.sellingPrice, priceList: action.value },
      };
    case "SET_SELLING_PRICE_NET":
      return {
        ...state,
        sellingPrice: { ...state.sellingPrice, net: action.value },
      };
    case "SET_SELLING_PRICE_GROSS":
      return {
        ...state,
        sellingPrice: { ...state.sellingPrice, gross: action.value },
      };
    case "SET_SELLING_PRICE_TAXES":
      return {
        ...state,
        sellingPrice: { ...state.sellingPrice, taxes: action.value },
      };
    case "ADD_SELLING_PRICE_TAX":
      return {
        ...state,
        sellingPrice: {
          ...state.sellingPrice,
          taxes: [...state.sellingPrice.taxes, action.value],
        },
      };
    case "SET_SELLING_UTILIY":
      return {
        ...state,
        sellingPrice: { ...state.sellingPrice, utility: action.value },
      };
    case "SET_STOCK":
      return { ...state, stock: action.value };
    case 'SET_STOCK_TOTAL':
        return { ...state, stock: { ...state.stock, total: action.value } };
    case "SET_STOCK_AVAILABLE":
        return { ...state, stock: { ...state.stock, available: action.value } };
    case "SET_STOCK_CRITICAL":
      return { ...state, stock: { ...state.stock, critical: action.value } };
    case "SET_STOCK_STORAGE":
      return { ...state, stock: { ...state.stock, storage: action.value } };

    default:
      return state;
  }
};

// Componente Proveedor del contexto
const NewProductFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInitialState = () => {
    dispatch({ type: "SET_INITIAL_STATE" });
  };

  const setActiveStep = (value) => {
    dispatch({ type: "SET_ACTIVE_STEP", value });
  };

  const setGeneral = (name, description, favorite, category) => {
    dispatch({
      type: "SET_GENERAL",
      value: { name, description, favorite, category },
    });
  };

  const setName = (name) => {
    dispatch({ type: "SET_NAME", value: name });
  };

  const setDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", value: description });
  };

  const setCategory = (category) => {
    dispatch({ type: "SET_CATEGORY", value: category });
  };

  const setSubcategory = (subcategory) => {
    dispatch({ type: "SET_SUBCATEGORY", value: subcategory });
  };

  const setStockControl = (stockControl) => {
    dispatch({ type: "SET_STOCK_CONTROL", value: stockControl });
  };

  const setFavorite = (favorite) => {
    dispatch({ type: "SET_FAVORITE", value: favorite });
  };

  const setIvaSubject = (ivaSubject) => {
    dispatch({ type: "SET_IVA_SUBJECT", value: ivaSubject });
  };

  const setCode = (code) => {
    dispatch({ type: "SET_CODE", value: code });
  };

  const setPurchasePrice = (netPrice, grossPrice, provider, taxes) => {
    dispatch({
      type: "SET_PURCHASE_PRICE",
      value: { netPrice, grossPrice, provider, taxes },
    });
  };

  const setPurchaseNetPrice = (net) => {
    dispatch({ type: "SET_PURCHASE_NET_PRICE", value: net });
  };

  const setPurchaseGrossPrice = (gross) => {
    dispatch({ type: "SET_PURCHASE_GROSS_PRICE", value: gross });
  };

  const setPurchaseProvider = (provider) => {
    dispatch({ type: "SET_PURCHASE_PROVIDER", value: provider });
  };

  const setPurchaseUse = (use) => {
    dispatch({ type: "SET_PURCHASE_USE", value: use });
  };

  const setPurchaseTaxes = (taxes) => {
    dispatch({ type: "SET_PURCHASE_TAXES", value: taxes });
  };

  const addPurchaseTax = (tax) => {
    const findTax = state.purchasePrice.taxes.find((t) => t.id === tax.id);
    if (!findTax) {
      dispatch({ type: "ADD_PURCHASE_TAX", value: tax });
    }
  };

  const removePurchaseTax = (tax) => {
    dispatch({ type: "REMOVE_PURCHASE_TAX", value: tax });
  };

  const setSellingPrice = (sellingPrice) => {
    dispatch({ type: "SET_SELLING_PRICE", value: sellingPrice });
  };

  const setSellingPriceList = (priceList) => {
    dispatch({ type: "SET_SELLING_PRICE_LIST", value: priceList });
  };
  const setSellingPriceNet = (net) => {
    dispatch({ type: "SET_SELLING_PRICE_NET", value: net });
  };

  const setSellingPriceGross = (gross) => {
    dispatch({ type: "SET_SELLING_PRICE_GROSS", value: gross });
  };

  const setSellingPriceTaxes = (taxes) => {
    dispatch({ type: "SET_SELLING_PRICE_TAXES", value: taxes });
  };

  const addSellingPriceTax = (tax) => {
    dispatch({ type: "ADD_SELLING_PRICE_TAX", value: tax });
  };

  const setSellingUtility = (utility) => {
    dispatch({ type: "SET_SELLING_UTILIY", value: utility });
  };

  const setStock = (quanty, critical, storage) => {
    dispatch({ type: "SET_STOCK", value: { quanty, critical, storage } });
  };

  const setStockTotal = (total) => {
    dispatch({ type: "SET_STOCK_TOTAL", value: total });
  }
  
  const setStockAvailable = (available) => {
    dispatch({ type: "SET_STOCK_AVAILABLE", value: available });
  }

  const setStockCritical = (critical) => {
    dispatch({ type: "SET_STOCK_CRITICAL", value: critical });
  };

  const setStockStorage = (storage) => {
    dispatch({ type: "SET_STOCK_STORAGE", value: storage });
  };

  return (
    <NewProductFormContext.Provider
      value={{
        state,
        general: state.general,
        activeStep: state.activeStep,
        purchasePrice: state.purchasePrice,
        purchasePriceTaxes: state.purchasePrice.taxes,
        sellingPrice: state.sellingPrice,
        sellingPriceTaxes: state.sellingPrice.taxes,
        stock: state.stock,
        dispatch,
        setInitialState,
        setActiveStep,
        setGeneral,
        setName,
        setDescription,
        setCategory,
        setSubcategory,
        setStockControl,
        setFavorite,
        setIvaSubject,
        setCode,
        setPurchasePrice,
        setPurchaseNetPrice,
        setPurchaseGrossPrice,
        setPurchaseProvider,
        setPurchaseUse,
        setPurchaseTaxes,
        addPurchaseTax,
        removePurchaseTax,
        setSellingPrice,
        setSellingPriceList,
        setSellingPriceNet,
        setSellingPriceGross,
        setSellingPriceTaxes,
        addSellingPriceTax,
        setSellingUtility,
        setStock,
        setStockTotal,
        setStockAvailable,
        setStockCritical,
        setStockStorage,
      }}
    >
      {children}
    </NewProductFormContext.Provider>
  );
};

export { NewProductFormProvider, useNewProductFormContext };
