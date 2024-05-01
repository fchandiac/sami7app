import { useAppContext } from "@/appProvider";
import { useSalePointContext } from "../salePoint/salePointProvider";
import useCashregisterMovements from "./useCashregisterMovements";
import useProducts from "./useProducts";
import useSales from "./useSales";
import useStocks from "./useStocks";
import useUtils from "./useUtils";
import useSellingPrices from "./useSellingPrices";
import useLioren from "./useLioren";

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
  const { user } = useAppContext();
  const products = useProducts();
  const stocks = useStocks();
  const sales = useSales();
  const lioren = useLioren();
  const sellingPrices = useSellingPrices();
  const cashRegisterMovements = useCashregisterMovements();
  const {
    addThousandsSeparator,
    removeThousandsSeparator,
    taxesAmount,
    calculateTaxesFromGross,
  } = useUtils();

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

    console.log("Product", product);

    if (product.stock_control == true) {
      const stocks = await calcStocks(product.id, 1);
      stock = stocks.stockAvailable;
      virtualStock = stocks.stockVirtual;
    }

    const itemTaxes = await sellingPrices.findTaxesBySellingPrice(
      product.SellingPrices[0].id
    );

    const item = {
      id: product.id,
      name: product.name,
      key: product.code,
      sellingPriceId: product.SellingPrices[0].id,
      originalGross: product.SellingPrices[0].gross,
      gross: product.SellingPrices[0].gross,
      net: product.SellingPrices[0].net,
      totalNet: product.SellingPrices[0].net,
      quanty: 1,
      total: product.SellingPrices[0].gross,
      unitDiscount: 0,
      discount: 0,
      taxes: itemTaxes,
      tax: taxesAmount(product.SellingPrices[0].net, itemTaxes),
      maxDiscount: Math.floor(product.SellingPrices[0].utility * 0.4),
      stock: stock,
      virtualStock: virtualStock,
      priceListId: product.SellingPrices[0].PriceList.id,
      priceListName: product.SellingPrices[0].PriceList.name,
      unitUtility: product.SellingPrices[0].utility,
      originalUnitUtility: product.SellingPrices[0].utility,
      utility: product.SellingPrices[0].utility,
      stockControl: product.stock_control,
      ivaSubject: product.iva_subject,
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
    let utility = 0;

    items.forEach((item) => {
      total += item.total;
      net += item.totalNet;
      tax += item.tax;
      discounts += item.discount;
      utility += item.utility;
    });

    setTotalsCart(activeCart, total, net, tax, discounts, utility);
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
      itemInCart.tax =
        taxesAmount(itemInCart.net, itemInCart.taxes) * itemInCart.quanty;
      itemInCart.utility = itemInCart.unitUtility * itemInCart.quanty;
      itemInCart.discount = itemInCart.unitDiscount * itemInCart.quanty;
      itemInCart.totalNet = itemInCart.net * itemInCart.quanty;

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
        itemInCart.tax =
          taxesAmount(itemInCart.net, itemInCart.taxes) * itemInCart.quanty;
        itemInCart.utility = itemInCart.unitUtility * itemInCart.quanty;
        itemInCart.discount = itemInCart.unitDiscount * itemInCart.quanty;
        itemInCart.totalNet = itemInCart.net * itemInCart.quanty;
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

  const changeGrossToItem = async (productId, amount) => {
    //CAMBIA PRECIO BRUTO POR UNIDAD
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIdToCart(productId);
    const itemInCart = items.find((item) => item.id === product.id);
    if (itemInCart === undefined) {
      return;
    } else {
      console.log("Item in cart", itemInCart);

      let totalTaxPercentage = 0;

      itemInCart.taxes.map((tax) => {
        totalTaxPercentage += parseFloat(tax.percentage) / 100;
      });

      console.log("Total tax percentage", totalTaxPercentage);

      const isSum = amount > itemInCart.gross ? true : false;
      const gross = amount;
      const net = Math.ceil(gross / (1 + totalTaxPercentage));

      let unitUtility = 0;

      if (isSum) {
        unitUtility = itemInCart.unitUtility + (gross - itemInCart.gross);
      } else {
        unitUtility = itemInCart.unitUtility - (itemInCart.gross - gross);
      }

      itemInCart.gross = gross;
      itemInCart.net = net;
      itemInCart.totalNet = net * itemInCart.quanty;
      itemInCart.tax = (gross - net) * itemInCart.quanty;
      itemInCart.unitUtility = unitUtility;
      itemInCart.utility = unitUtility * itemInCart.quanty;
      itemInCart.discount = 0;
      itemInCart.unitDiscount = 0;
      itemInCart.total = itemInCart.gross * itemInCart.quanty;
      itemInCart.maxDiscount = 0;
      setCartItems(activeCart, items);
      setTotalCart();
    }
  };

  const changeQuantityToItem = async (productId, quanty) => {
    //CAMBIA CANTIDAD POR UNIDAD
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIdToCart(productId);
    const itemInCart = items.find((item) => item.id === product.id);
    if (itemInCart === undefined) {
      return;
    } else {
      console.log("Item in cart", itemInCart);

      if (itemInCart.stockControl === true) {
        const stocks = await calcStocks(productId, quanty);
        itemInCart.stock = stocks.stockAvailable;
        itemInCart.virtualStock = stocks.stockVirtual;
      }

      let totalTaxPercentage = 0;

      itemInCart.taxes.map((tax) => {
        totalTaxPercentage += parseFloat(tax.percentage) / 100;
      });

      console.log("Total tax percentage", totalTaxPercentage);
      const gross = itemInCart.gross;
      const net = Math.ceil(gross / (1 + totalTaxPercentage));

      itemInCart.gross = gross;
      itemInCart.net = net;
      itemInCart.totalNet = net * quanty;
      itemInCart.tax = (gross - net) * quanty;
      itemInCart.discount = itemInCart.unitDiscount * quanty;
      itemInCart.total = itemInCart.gross * quanty;
      itemInCart.utility = itemInCart.unitUtility * quanty;
      itemInCart.quanty = quanty;
      setCartItems(activeCart, items);
      setTotalCart();
    }
  };

  const addDiscountToItem = async (productId, amount) => {
    //AGREGA DESCUENTO POR UNIDAD
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIdToCart(productId);
    const itemInCart = items.find((item) => item.id === product.id);
    if (itemInCart === undefined) {
      return;
    } else {
      console.log("Item in cart", itemInCart);

      let totalTaxPercentage = 0;

      itemInCart.taxes.map((tax) => {
        totalTaxPercentage += parseFloat(tax.percentage) / 100;
      });

      console.log("Total tax percentage", totalTaxPercentage);
      const gross = itemInCart.originalGross - amount;
      const net = Math.ceil(gross / (1 + totalTaxPercentage));

      itemInCart.unitDiscount = amount;
      itemInCart.gross = gross;
      itemInCart.net = net;
      itemInCart.totalNet = net * itemInCart.quanty;
      itemInCart.tax = (gross - net) * itemInCart.quanty;
      itemInCart.unitUtility = itemInCart.originalUnitUtility - amount;
      itemInCart.discount = amount * itemInCart.quanty;
      itemInCart.total = itemInCart.gross * itemInCart.quanty;
      itemInCart.utility = itemInCart.unitUtility * itemInCart.quanty;
      setCartItems(activeCart, items);
      setTotalCart();
    }
  };

  const authDiscount = async (productId, amount) => {
    const cart = getActiveCart();
    const items = cart.items;

    const itemInCart = items.find((item) => item.id === productId);

    // console.log("Item in cart", itemInCart);

    const newGross = itemInCart.originalGross - amount;
    const minNewGross = itemInCart.originalGross - itemInCart.maxDiscount;

    console.log("New Gross", newGross);
    console.log("Min New Gross", minNewGross);

    if (amount > itemInCart.maxDiscount) {
      return false;
    } else if (newGross < minNewGross) {
      return false;
    } else {
      return true;
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
    const amount = parseInt(removeThousandsSeparator(payment.amount));

    console.log("payment", payment);
    const cash = payment.paymentMethodId == 1001 ? true : false;
    console.log("cash", cash);

    console.log("amount", amount);
    console.log("change", change);
    console.log("cash", cash == true ? true : false);

    let debit = 0;

    if (cash) {
      debit = amount - change;
    } else {
      debit = amount;
    }

    console.log("debit", debit);

    const newSaleMovement = await cashRegisterMovements.createSaleMovement(
      info.cashRegisterId,
      debit,
      saleId,
      cash
    );

    return newSaleMovement;
  };

  const createSaleStockMovement = async (
    productId,
    StorageId,
    quanty,
    saleId
  ) => {
    const stockProduct = await stocks.findOneByStorageAndProduct(
      StorageId,
      productId
    );
    const decrementStock = await stocks.decrementStock(stockProduct.id, quanty);
    const newStockMovement = await stocks.createDecrementMovement(
      stockProduct.id,
      quanty,
      saleId,
      1
    );
    return newStockMovement;
  };

  const utilityCart = (items) => {
    let utility = 0;
    items.forEach((item) => {
      utility += item.utility * item.quanty;
    });
    return utility;
  };

  const taxesCart = (items) => {
    let taxes = 0;
    //taxesAmount(items.net, items.taxes)
    items.map((item) => {
      taxes += taxesAmount(item.net, item.taxes);
    });
    return taxes;
  };

  const setTaxCartAmount = () => {
    const cart = getActiveCart();
    const items = cart.items;
    let tax = 0;
    items.map((item) => {
      tax += item.tax;
    });
    setTotalsCart(activeCart, cart.total, cart.net, tax, cart.discounts);
  };

  const setNetCartAmount = () => {
    const cart = getActiveCart();
    const items = cart.items;
    let net = 0;
    items.map((item) => {
      net += item.net;
    });
    setTotalsCart(activeCart, cart.total, net, cart.tax, cart.discounts);
  };

  const globalSaleProcess = async (payments, change, saleType) => {
    // Obtiene el carrito activo
    preProcessCart();
    const cart = getActiveCart();
    const boletaData = boletaProcess(cart);

    const boleta = await lioren.boleta(boletaData);

    console.log("Boleta", boleta);

    //const timbre = await parseDteXML(boleta.xml);
    console.log("Timbre", parseDteXML(boleta.xml));

    try {



      // const newSale = await sales.create(
      //   saleDescription,
      //   saleType,
      //   discounts,
      //   utility,
      //   net,
      //   tax,
      //   total,
      //   0,
      //   new Date(),
      //   user.id,
      //   customer.id,
      //   documentType.id,
      //   null
      // )

      // Registra los pagos de la venta
      // const saleMovements = await Promise.all(payments.map(async (payment) => {
      //     return await createSaleMovementByPayment(payment, null, change);
      // }));

      // Registra los movimientos de stock para cada artículo vendido, si es necesario
      // const stockMovements = await Promise.all(items.map(async (item) => {
      //     if (item.stockControl === true) {
      //         return await createSaleStockMovement(item.id, info.storage.id, item.quanty, null);
      //     }
      // }));

      // Muestra información de depuración en la consola
      console.log("Cart", cart);

      // Limpia el carrito después del proceso de venta
      //clearCart(); // MOVER DESPUES CLERA CART FUERA
    } catch (error) {
      // Manejo de errores
      console.error("Error en globalSaleProcess:", error);
      // Manejar el error de alguna manera apropiada
    }
  };

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
    const pay = payments.map(async (payment) => {
      const amount = parseInt(removeThousandsSeparator(payment.amount));
      const toPay = amount - change;
      console.log("Payment", payment);
      +console.log("amount", amount);

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
      console.log(item.stockControl);
      if (item.stockControl === true) {
        const stockProduct = await stocks.findOneByStorageAndProduct(
          info.storage.id,
          item.id
        );
        const quanty = item.quanty;
        const newStocDecrement = await stocks.decrementStock(
          stockProduct.id,
          quanty
        );
        const newStockMovement = await stocks.createDecrementMovement(
          stockProduct.id,
          quanty,
          null,
          1
        );
      }
      // return newSaleDetail;
    });
    console.log("Cart", cart);
    console.log("Items", items);
    clearCart();
  };

  const preProcessCart = () => {
    const cart = getActiveCart();

    const items = cart.items;
    let total = 0;
    let net = 0;
    let tax = 0;
    let discounts = 0;
    let utility = 0;

    items.forEach((item) => {
      total += item.total;
      net += item.totalNet;
      tax += item.tax;
      discounts += item.discount;
      utility += item.utility;
    });

    setTotalsCart(activeCart, total, net, tax, discounts);
  };

  const ticketProcess = (cart) => {
    const data = {}
  }



  const clearCart = () => {
    setCartItems(activeCart, []);
    setTotalsCart(activeCart, 0, 0, 0, 0);
  };

  const parseString = require("xml2js").parseString;

  const parseDteXML = (xmlBase64) => {
    // Decodificar el XML base64
    const xmlString = Buffer.from(xmlBase64, "base64").toString("utf-8");
    console.log("XML", xmlString);

    let timbreStr = "";
    let iva = 0;
    let folio = 0;

    // Parsear el XML
    parseString(xmlString, (err, result) => {
      if (err) {
        console.error("Error al parsear el XML:", err);
      } else {
        // Acceder a los valores específicos
        const ivaValue = result.DTE.Documento[0].Encabezado[0].Totales[0].IVA[0];
        const RE = result.DTE.Documento[0].TED[0].DD[0].RE[0];
        const TD = result.DTE.Documento[0].TED[0].DD[0].TD[0];
        const F = result.DTE.Documento[0].TED[0].DD[0].F[0];
        const FE = result.DTE.Documento[0].TED[0].DD[0].FE[0];
        const RR = result.DTE.Documento[0].TED[0].DD[0].RR[0];
        const RSR = result.DTE.Documento[0].TED[0].DD[0].RSR[0];
        const MNT = result.DTE.Documento[0].TED[0].DD[0].MNT[0];
        const IT1 = result.DTE.Documento[0].TED[0].DD[0].IT1[0];
        const TSTED = result.DTE.Documento[0].TED[0].DD[0].TSTED[0];
        const CAF = result.DTE.Documento[0].TED[0].DD[0].CAF[0];
        const FRMT = result.DTE.Documento[0].TED[0].FRMT[0]._;

        timbreStr =
          '<TED version="1.0"><DD>' +
          "<RE>" +
          RE +
          "</RE>" +
          "<TD>" +
          TD +
          "</TD>" +
          "<F>" +
          F +
          "</F>" +
          "<FE>" +
          FE +
          "</FE>" +
          "<RR>" +
          RR +
          "</RR>" +
          "<RSR>" +
          RSR +
          "</RSR>" +
          "<MNT>" +
          MNT +
          "</MNT>" +
          "<IT1>" +
          IT1 +
          "</IT1>" +
          '<CAF version="1.0">' +
          CAF +
          "</CAF>" +
          "<TSTED>" +
          TSTED +
          "</TSTED></DD>" +
          "<FRMT>" +
          FRMT +
          "</FRMT></TED>";

          iva = parseFloat(ivaValue);
          folio = parseInt(F);
      }
    });

    return {
      timbre: timbreStr,
      iva: iva,
      folio: folio,

    };
}


 

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
    globalSaleProcess,
    changeGrossToItem,
    changeQuantityToItem,
  };
}
