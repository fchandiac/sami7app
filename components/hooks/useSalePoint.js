import { useSalePointContext } from "../salePoint/salePointProvider";
import useCashregisterMovements from "./useCashregisterMovements";
import useProducts from "./useProducts";
import useStocks from "./useStocks";
import useUtils from "./useUtils";





export default function useSalePoint() {
  const {
    setCartItems,
    activeCart,
    cart1,
    cart2,
    cart3,
    cart4,
    info,
    priceList,
    setTotalsCart,
  } = useSalePointContext();
  const products = useProducts();
  const stocks = useStocks();
  const cashRegisterMovements = useCashregisterMovements();
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();

  const getActiveCart = () => {
    switch (activeCart) {
      case 1:
        return cart1;
      case 2:
        return cart2;
      case 3:
        return cart3;
      case 4:
        return cart4;
      default:
        return "cart not found";
    }
  };

  const itemInfoDefault = () => {
    return {
      id: 0,
      name: "",
      key: 0,
      sellingPriceId: 0,
      gross: 0,
      net: 0,
      quanty: 0,
      total: 0,
      discount: 0,
      tax: 0,
      stock: 0,
      virtualStock: 0,
      priceListId: 0,
    };
  };

  const formatProductToCart = async (product) => {
    let stock = product.Stocks[0].available;
    let virtualStock = product.Stocks[0].available;

    if (product.stock_control == true) {
      const stocks = await calcStocks(product.id, 1);
      stock = stocks.stockAvailable;
      virtualStock = stocks.stockVirtual;
    }

    const item = {
      id: product.id,
      name: product.name,
      key: product.code,
      sellingPriceId: product.SellingPrices[0].id,
      gross: product.SellingPrices[0].gross,
      net: product.SellingPrices[0].net,
      quanty: 1,
      total: product.SellingPrices[0].gross,
      discount: 0,
      tax: 0,
      stock: stock,
      virtualStock: virtualStock,
      priceListId: product.SellingPrices[0].PriceList.id,
      priceListName: product.SellingPrices[0].PriceList.name,
      utility: product.SellingPrices[0].utility,
      stockControl: product.stock_control,
    };

    return item;
  };

  const setTotalCart = () => {
    const cart = getActiveCart();
    const items = cart.items;
    let total = 0;
    let net = 0;
    let tax = 0;
    let discounts = 0;

    items.forEach((item) => {
      total += item.total;
      net += item.net;
      tax += item.tax;
      discounts += item.discount;
    });

    setTotalsCart(activeCart, total, net, tax, discounts);
  };

  const addItemToCart = async (productId) => {
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIdToCart(productId);
    const itemInCart = items.find((item) => item.id === product.id);

    if (itemInCart === undefined) {
      return;
    } else {
      const quanty = itemInCart.quanty + 1;
      if (itemInCart.stockControl === true) {
        const stocks = await calcStocks(productId, quanty);
        itemInCart.stock = stocks.stockAvailable;
        itemInCart.virtualStock = stocks.stockVirtual;
      }
      itemInCart.quanty = quanty;
      itemInCart.total = itemInCart.gross * itemInCart.quanty;
      setCartItems(activeCart, items);
      setTotalCart();
    }
  };

  const subtractItemToCart = async (productId) => {
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIdToCart(productId);
    const itemInCart = items.find((item) => item.id === product.id);

    if (itemInCart === undefined) {
      return;
    } else {
      if (itemInCart.quanty === 1) {
        items.splice(items.indexOf(itemInCart), 1);
        setCartItems(activeCart, items);
        setTotalCart();
      } else {
        const quanty = itemInCart.quanty - 1;
        if (itemInCart.stockControl === true) {
          const stocks = await calcStocks(productId, quanty);
          itemInCart.stock = stocks.stockAvailable;
          itemInCart.virtualStock = stocks.stockVirtual;
        }
        itemInCart.quanty = quanty;
        itemInCart.total = itemInCart.gross * itemInCart.quanty;
        setCartItems(activeCart, items);
        setTotalCart();
      }
    }
  };

  const removeItemToCart = async (productId) => {
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIdToCart(productId);
    const index = items.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      items.splice(index, 1);
      setCartItems(activeCart, items);
      setTotalCart();
    }
  };

  const addDiscountToItem = async (productId, amount) => {
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIdToCart(productId);
    const itemInCart = items.find((item) => item.id === product.id);
    if (itemInCart === undefined) {
      return;
    } else {
      itemInCart.discount = amount;
      itemInCart.total = itemInCart.gross * itemInCart.quanty - amount;
      setCartItems(activeCart, items);
      setTotalCart();
    }
  };

  const authDiscount = async (productId, amount) => {
    const cart = getActiveCart();
    const items = cart.items;

    const itemInCart = items.find((item) => item.id === productId);

    // console.log("Item in cart", itemInCart);

    const limit = Math.floor((itemInCart.utility * itemInCart.quanty) / 2);
    // console.log("Limit", limit);
    // console.log("Amount", amount);
    if (limit - amount < 0) {
      return true;
    } else {
      return false;
    }
  };

  const submitItemToCart = async (productId) => {
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIAndStorageAndPriceList(
      productId,
      info.storage.id,
      priceList.id
    );

    console.log("Product", product);

    const itemInCart = items.find((item) => item.id === product.id);

    // console.log('Product', product)
    // console.log('Stock', stock)

    if (itemInCart === undefined) {
      const item = await formatProductToCart(product);
      console.log("Item", item);
      items.push(item);
      setCartItems(activeCart, items);
      setTotalCart();
    } else {
      addItemToCart(productId);
      setTotalCart();
    }
  };

  const calcStocks = async (productId, quanty) => {
    const product = await products.findOneByIdToCart(productId);
    const stock = product.Stocks.find(
      (stock) => stock.StorageId === info.storage.id
    );
    const stockAvailable = stock.available;
    const stockVirtual = stockAvailable - quanty;

    return {
      stockAvailable,
      stockVirtual,
    };
  };

  const authSubmitItemToCart = async (productId) => {
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIAndStorageAndPriceList(
      productId,
      info.storage.id,
      priceList.id
    );

    if (product.stock_control === true) {
      const itemInCart = items.find((item) => item.id === product.id);
      if (itemInCart === undefined) {
        const stocks = await calcStocks(productId, 1);
        if (stocks.stockVirtual < 0) {
          return false;
        } else {
          return true;
        }
      } else {
        const stocks = await calcStocks(productId, itemInCart.quanty + 1);
        if (stocks.stockVirtual < 0) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  };

  const createSaleMovementByPayment = async (payment, saleId, change) => {

    const amount= parseInt(removeThousandsSeparator(payment.amount));

    console.log('payment', payment)
    const cash = payment.paymentMethodId == 1001 ?true:false;
    console.log('cash', cash)

    
    console.log('amount', amount)
    console.log('change', change)

    let debit = cash==true ? amount : amount-change;

    console.log('debit', debit)
 


  
    const newSaleMovement = await cashRegisterMovements.createSaleMovement(
      info.cashRegisterId,
      debit,
      saleId,
      cash,
    )
      


    return newSaleMovement;
  }

  const createSaleStockMovement = async (productId, StorageId, quanty, saleId) => {
    const stockProduct = await stocks.findOneByStorageAndProduct(StorageId, productId);
    const decrementStock = await stocks.decrementStock(stockProduct.id, quanty);
    const newStockMovement = await stocks.createDecrementMovement(
      stockProduct.id,
      quanty,
      saleId,
      1
    )
    return newStockMovement;
  }






  const globalSaleProcess = async (payments, change) => {
    // Obtiene el carrito activo
    const cart = getActiveCart();
    // Obtiene los artículos del carrito
    const items = cart.items;
    // Obtiene el total del carrito
    const total = cart.total;
    // Obtiene el total neto del carrito
    const net = cart.net;
    // Obtiene el impuesto total del carrito
    const tax = cart.tax;
    // Obtiene los descuentos aplicados al carrito
    const discounts = cart.discounts;

    try {
        // Registra los pagos de la venta
        const saleMovements = await Promise.all(payments.map(async (payment) => {
            return await createSaleMovementByPayment(payment, null, change);
        }));

        // Registra los movimientos de stock para cada artículo vendido, si es necesario
        const stockMovements = await Promise.all(items.map(async (item) => {
            if (item.stockControl === true) {
                return await createSaleStockMovement(item.id, info.storage.id, item.quanty, null);
            }
        }));

        // Muestra información de depuración en la consola
        console.log("Cart", cart);
        console.log("Items", items);

        // Limpia el carrito después del proceso de venta
        clearCart();
    } catch (error) {
        // Manejo de errores
        console.error("Error en globalSaleProcess:", error);
        // Manejar el error de alguna manera apropiada
    }
}



  
  const saleProcess = (payments, change) => {
    // Obtiene el carrito activo
    const cart = getActiveCart();
    // Obtiene los artículos del carrito
    const items = cart.items;
  
    // Obtiene el total del carrito
    const total = cart.total;
    // Obtiene el total neto del carrito
    const net = cart.net;
    // Obtiene el impuesto total del carrito
    const tax = cart.tax;
    // Obtiene los descuentos aplicados al carrito
    const discounts = cart.discounts;
  
    // Procesa cada pago en paralelo utilizando la función map con async/await
    const pay = payments.map( async (payment) => {
      const amount = parseInt(removeThousandsSeparator(payment.amount));
      const toPay = amount - change;
      console.log("Payment", payment);+
      console.log("amount", amount);
    
      const newSaleMovement = await cashRegisterMovements.createSaleMovement(
        info.cashRegisterId,
        toPay,
        cart.id,
        payment.credit,
        payment.paymentMethodId
      );
   
      // return newSaleMovement;
    });

    items.map(async (item) => {
      console.log(item.stockControl)
      if(item.stockControl === true){
        const stockProduct = await stocks.findOneByStorageAndProduct(info.storage.id, item.id)
        const quanty = item.quanty;
        const newStocDecrement = await stocks.decrementStock(stockProduct.id, quanty)
        const newStockMovement = await stocks.createDecrementMovement(
          stockProduct.id,
          quanty,
          null,
          1
        )
      }
      // return newSaleDetail;
    })
    console.log("Cart", cart);
    console.log("Items", items);
    clearCart();
  }

  const clearCart = () => {
    setCartItems(activeCart, []);
    setTotalsCart(activeCart, 0, 0, 0, 0);
  
  };
  

  return {
    submitItemToCart,
    getActiveCart,
    itemInfoDefault,
    addItemToCart,
    removeItemToCart,
    subtractItemToCart,
    addDiscountToItem,
    authDiscount,
    authSubmitItemToCart,
    saleProcess,
    globalSaleProcess
  };
}
