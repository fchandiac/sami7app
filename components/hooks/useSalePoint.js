import { useAppContext } from "@/appProvider";
import { useSalePointContext } from "../salePoint/salePointProvider";
import useCashregisterMovements from "./useCashregisterMovements";
import useProducts from "./useProducts";
import useSales from "./useSales";
import useStocks from "./useStocks";
import useUtils from "./useUtils";
import useSellingPrices from "./useSellingPrices";
import useLioren from "./useLioren";
import useCustomerAccountMovements from "./useCustomerAccountMovements";
import usePayments from "./usePayments";
import useDte from "./useDte";
import useCreditNotes from "./useCreditNotes";
import useProductCards from "./useProductCards";

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
  const dte = useDte();
  const payments = usePayments();
  const productCards = useProductCards();
  const lioren = useLioren();
  const sellingPrices = useSellingPrices();
  const cashRegisterMovements = useCashregisterMovements();
  const customerAccountMovements = useCustomerAccountMovements();
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
    let stock = await productCards.countAllGroupByProductStorageAndStatus(
      product.id,
      info.storage.id,
      0
    );
    let virtualStock =
      await productCards.countAllGroupByProductStorageAndStatus(
        product.id,
        info.storage.id,
        0
      );

    console.log("Product", product);

    if (product.stock_control == true) {
      const stocks = await calcStocks(product.id, 1);
      stock = stocks.stockAvailable;
      virtualStock = stocks.stockVirtual;
    } else {
      stock = 0;
      virtualStock = 0;
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
      subTotal: product.SellingPrices[0].gross,
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
    let subTotal = 0;
    let net = 0;
    let tax = 0;
    let discounts = 0;
    let utility = 0;

    items.forEach((item) => {
      total += item.total;
      subTotal += item.subTotal;
      net += item.totalNet;
      tax += item.tax;
      discounts += item.discount;
      utility += item.utility;
    });

    console.log("setTotalCart", total, net, tax, discounts, utility, subTotal);

    setTotalsCart(activeCart, total, net, tax, discounts, utility, subTotal);
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
      itemInCart.subTotal = itemInCart.originalGross * itemInCart.quanty;
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
        itemInCart.subTotal = itemInCart.originalGross * itemInCart.quanty;
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
      itemInCart.originalGross = gross;
      itemInCart.total = itemInCart.gross * itemInCart.quanty;
      itemInCart.subTotal = itemInCart.gross * itemInCart.quanty;
      itemInCart.maxDiscount = 0;
      setCartItems(activeCart, items);
      setTotalCart();
    }
  };

  const changeQuantityToItem = async (productId, quanty) => {
    console.log("Change quantity to item", productId, quanty);
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

      console.log("Gross", gross);

      itemInCart.gross = gross;
      itemInCart.net = net;
      itemInCart.totalNet = net * quanty;
      itemInCart.tax = (gross - net) * quanty;
      itemInCart.discount = itemInCart.unitDiscount * quanty;
      itemInCart.total = itemInCart.gross * quanty;
      itemInCart.subTotal = itemInCart.originalGross * quanty;
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
      itemInCart.subTotal = itemInCart.originalGross * itemInCart.quanty;
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

    // console.log("Product", product);

    const itemInCart = items.find((item) => item.id === product.id);

    console.log("Product", product);
    console.log("ItemInCart", itemInCart);

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
    const stock = await productCards.countAllGroupByProductStorageAndStatus(
      productId,
      info.storage.id,
      0
    );

    const stockAvailable = stock[0]?.count || 0;
    const stockVirtual = stockAvailable - quanty;

    return {
      stockAvailable,
      stockVirtual,
    };
  };

  const authSubmitItemToCart = async (productId) => {
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneById(productId);

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
    storageId,
    quanty,
    saleId,
    saleNet,
    saleTax,
    saleGross,
    priceListId
  ) => {
    const product_cards = [];
    for (let i = 0; i < quanty; i++) {
      const productCard = await productCards.findFirstCardByProductAndStorage(
        productId,
        storageId
      );
      if (!productCard) {
        throw new Error(
          `Product card not found for product ${productId} and storage ${storageId}.`
        );
      }
      const updateStatusCard = await productCards.updateStatus(
        productCard.id,
        2
      ); // cambia status a vendido
      const updateSaleInfoCard = await productCards.updateSaleValues(
        productCard.id,
        saleId,
        saleNet,
        saleTax,
        saleGross,
        priceListId
      ); // actualiza valores de venta
      console.log("Product Card", productCard);
      console.log("Update Status Card", updateStatusCard);
      console.log("Update SaleinfoCard", updateSaleInfoCard);
      product_cards.push(productCard);
    }

    const newStockMovement = await stocks.createSaleStockMovement(
      quanty,
      saleId,
      productId,
      storageId
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

  const globalSaleProcess = async (saleInfo) => {
    try {
      console.log("Sale Info", saleInfo);
      // SALE
      const newSale = await sales.createDirectSale(
        saleInfo.description,
        saleInfo.discount,
        saleInfo.utility,
        saleInfo.net,
        saleInfo.tax,
        saleInfo.total,
        user.id,
        saleInfo.customerId,
        saleInfo.documentTypeId,
        null
      );

      saleInfo.id = newSale.id;

      // SALE CUSTOMER ACCOUNT MOVEMENT

      if (saleInfo.customerId !== 1001) {
        const saleCustomerAccountMovement =
          await customerAccountMovements.createSaleMovement(
            saleInfo.description,
            saleInfo.total,
            newSale.id,
            saleInfo.customerId
          );
        console.log(
          "Sale Customer Account Movement: " + saleCustomerAccountMovement.id
        );
      } else {
        console.log("No customer account movement");
      }

      // STOCK MOVEMENTS
      const items = saleInfo.items;
      const stockMovements = await Promise.all(
        //Modificación en createSaleStockMovement para actualizar todas las cards correspondientes a la venta esta pendiente.
        items.map(async (item) => {
          if (item.stockControl === true) {
            return await createSaleStockMovement(
              item.id,
              info.storage.id,
              item.quanty,
              newSale.id,
              item.net,
              item.tax,
              item.gross,
              item.sale_price_list_id
            );
          }
        })
      );

      // PAYMENTS
      // const payMovements = await Promise.all(
      //   saleInfo.pays.map(async (payment) => {
      //     const amount = payment.amount - payment.change;
      //     const isCash = payment.id == 1001 ? true : false;
      //     const isCresditCustomer = payment.id == 1002 ? true : false;

      //     // SALE CASH REGISTER MOVEMENT
      //     const newSaleMovement =
      //       await cashRegisterMovements.createSaleMovement(
      //         info.cashRegisterId,
      //         amount,
      //         newSale.id,
      //         isCash,
      //         payment.id
      //       );
      //     console.log("Sale Cash Register Movement: " + newSaleMovement.id);

      //     // SALE PAYMENTS
      //     const newPayment = await payments.create(
      //       saleInfo.description,
      //       1,
      //       amount,
      //       payment.credit ? amount : 0,
      //       newSale.id,
      //       user.id,
      //       payment.payDate,
      //       payment.id,
      //       saleInfo.customerId,
      //       newSaleMovement.id
      //     );

      //     console.log("Sale Payment: " + newPayment.id);

      //     // EXCLUDE PAYMENT METHOD 1001 (CASH)
      //     if (saleInfo.customerId !== 1001) {
      //       // SALE CUSTOMER ACCOUNT MOVEMENT PAYMENT
      //       if (payment.credit == false) {
      //         if (payment.id !== 1002) {
      //           const newCustomerPayAccountMovement =
      //             await customerAccountMovements.createPayMovement(
      //               saleInfo.description,
      //               amount,
      //               newSale.id,
      //               saleInfo.customerId
      //             );
      //           console.log(
      //             "Pay no credit Customer Account Movement: " +
      //               newCustomerPayAccountMovement.id
      //           );
      //         }
      //       }
      //     }
      //   })
      // );


      processPayments(newSale, saleInfo);

      // SALE DETAILS

      const productCardsList = await productCards.findAllBySale(newSale.id);
      console.log("Product Cards List", productCardsList);
      let newSaleId = newSale.id;

      const saleDetails = await Promise.all(
        items.map(async (item) => {
         // console.log("Item", item);
          // return await sales.createSaleDetail(
          //   item.quanty,
          //   item.gross,
          //   item.discount,
          //   item.utility,
          //   item.net,
          //   item.tax,
          //   item.total,
          //   newSale.id,
          //   item.id
          // );
          const saleDetail_ = await saleDetail(item, newSaleId);
          console.log("Sale Detail", saleDetail_);
        })
      );

      // console.log("New Sale", newSale);
      // console.log("TiketInfo", dte.ticketProcess(saleInfo));
      // const boletainfo = await dte.boletaProcess(saleInfo);
      // console.log("Boletainfo", boletainfo);

      
      
      const salesDetailList = await sales.findAllSaleDetailBySaleId(newSale.id);

      let utilitySale = 0;
      salesDetailList.map((saleDetail) => {
        utilitySale += saleDetail.utility;
      });

      const updateSaleUtility = await sales.updateUtility(newSale.id, utilitySale);
      

      const dteProcess = await dte.documentProcess(saleInfo);
      const updateSaleDocumentId = await sales.updateDocumentId(dteProcess.saleId, dteProcess.documentId);
      console.log("Update Sale Document Id", updateSaleDocumentId);

      console.log("DTE Process", dteProcess);
      console.log("SaleId", dteProcess.saleId);
      //return dte.ticketProcess(saleInfo);
      return dteProcess;
    } catch (error) {
      // Manejo de errores
      console.error("Error en globalSaleProcess:", error);
      // Manejar el error de alguna manera apropiada
    }
  };

  const processPayments = async (newSale, saleInfo_) => {
    for (const payment of saleInfo_.pays) {
      const amount = payment.amount - payment.change;
      const isCash = payment.id == 1001 ? true : false;
      const isCreditCustomer = payment.id == 1002 ? true : false;
  
      // SALE CASH REGISTER MOVEMENT
      const newSaleMovement = await cashRegisterMovements.createSaleMovement(
        info.cashRegisterId,
        amount,
        newSale.id,
        isCash,
        payment.id
      );
      console.log("Sale Cash Register Movement: " + newSaleMovement.id);
  
      // SALE PAYMENTS
      const newPayment = await payments.create(
        saleInfo_.description,
        1,
        amount,
        payment.credit ? amount : 0,
        newSale.id,
        user.id,
        payment.payDate,
        payment.id,
        saleInfo_.customerId,
        newSaleMovement.id
      );
      console.log("Sale Payment: " + newPayment.id);
  
      // EXCLUDE PAYMENT METHOD 1001 (CASH)
      if (saleInfo_.customerId !== 1001) {
        // SALE CUSTOMER ACCOUNT MOVEMENT PAYMENT
        if (payment.credit == false) {
          if (payment.id !== 1002) {
            const newCustomerPayAccountMovement = await customerAccountMovements.createPayMovement(
              saleInfo_.description,
              amount,
              newSale.id,
              saleInfo_.customerId
            );
            console.log(
              "Pay no credit Customer Account Movement: " +
                newCustomerPayAccountMovement.id
            );
          }
        }
      }
    }
  };
  

  
  // Llamar a la función para procesar los pagos
  // processPayments().then(() => {
  //   console.log("Todos los pagos han sido procesados.");
  // }).catch(error => {
  //   console.error("Hubo un error al procesar los pagos:", error);
  // });
  

  const saleDetail = async (product, saleId) => {
    console.log('saleDetailProduct',product );

    if (product.stockControl == true){
      const productCardsList = await productCards.findAllBySaleAndProduct(saleId, product.id);
      console.log("Product Cards List", productCardsList);

      let purchaseNet = 0

      for (let i = 0; i < product.quanty; i++) {
        purchaseNet += productCardsList[i].puchase_net
      }

      let utility = product.net - purchaseNet


      const newSaleDetail = await sales.createSaleDetail(
        product.quanty,
        product.gross,
        product.discount,
        utility,
        product.net,
        product.tax,
        product.total,
        saleId,
        product.id
      )


     
      //item.quanty
      for (let i = 0; i < product.quanty; i++) {
        const productCard = productCardsList[i];
        const updateProductCardDetail = await productCards.updateSaleDetail(productCard.id, newSaleDetail.id);
      }

      return newSaleDetail


  
    }
    





    
  }
  ;

  const preProcessCart = () => {
    const cart = getActiveCart();

    const items = cart.items;
    let total = 0;
    let subTotal = 0;
    let net = 0;
    let tax = 0;
    let discounts = 0;
    let utility = 0;

    console.log("Items", items);

    items.forEach((item) => {
      total += item.total;
      subTotal += item.subTotal;
      net += item.totalNet;
      tax += item.tax;
      discounts += item.discount;
      utility += item.utility;
    });

    setTotalsCart(activeCart, total, net, tax, discounts, utility, subTotal);
  };

  const clearCart = () => {
    setCartItems(activeCart, []);
    setTotalsCart(activeCart, 0, 0, 0, 0, 0, 0);
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
        const ivaValue =
          result.DTE.Documento[0].Encabezado[0].Totales[0].IVA[0];
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
  };

  const voidSaleProcess = async (saleId, description, movementId) => {
    const findSale = await sales.findOneById(saleId);
    const items = await sales.findAllSaleDetailBySaleId(saleId);
    console.log("Find Sale", findSale);
    console.log("Items", items);

    const voidMovement = await cashRegisterMovements.voidById(movementId);

    if (findSale.customer_id === 1001) {
      // Crear una lista de promesas para procesar cada item
      const itemPromises = items.map(async (item) => {
        // Si el producto tiene control de stock
        if (item.Product.stock_control === true) {
          const stockProduct = await stocks.findOneByStorageAndProduct(
            info.storage.id,
            item.ProductId
          );
          console.log("Stock Product", stockProduct);
          // Nuevo movimiento de stock
          const incrementStock = await stocks.createAddMovement(
            stockProduct.id,
            item.quanty,
            saleId,
            7
          );

          return stockProduct;
        } else {
          console.log("No stock control");
          return null;
        }
      });

      // Esperar a que todas las promesas se resuelvan
      const stockResults = await Promise.all(itemPromises);
      console.log("Stock Results", stockResults);
    }
  };

  const voidSaleNoClient = async (saleId, description, items) => {};

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
    globalSaleProcess,
    changeGrossToItem,
    changeQuantityToItem,
    preProcessCart,
    clearCart,
    voidSaleProcess,
  };
}



