import { useAppContext } from "@/appProvider";
import useProductCards from "./useProductCards";

const stocks = require("@/services/stocks");
const stocksMovements = require("@/services/stockMovements");

const statusList = {
  0: "available",
  1: "reserved",
  2: "sold",
  3: "returned",
  4: "to receive",
};

export default function useStocks() {
  const { user } = useAppContext();
  const productCards = useProductCards();

  const movementType = (type) => {
    switch (type) {
      case 0:
        return "compra / recepción";
      case 1:
        return "venta";
      case 2:
        return "devolución";
      case 3:
        return "ajuste";
      case 4:
        return "consumo";
      case 5:
        return "recepción";
      case 6:
        return "despacho";
      case 7:
        return "anulación de venta";
      default:
        return "";
    }
  };

  const create = async (
    total,
    available,
    reserve,
    critical,
    storage_id,
    product_id
  ) => {
    const stock = await stocks.create(
      total,
      available,
      reserve,
      critical,
      storage_id,
      product_id
    );
    return stock;
  };

  const findAll = async () => {
    const stock = await stocks.findAll();
    return stock;
  };

  const findOneById = async (id) => {
    const stock = await stocks.findOneById(id);
    return stock;
  };

  const findAllByStorage = async (storage_id) => {
    const stock = await stocks.findAllByStorage(storage_id);
    return stock;
  };

  const findOneByStorageAndProduct = async (storage_id, product_id) => {
    const stock = await stocks.findOneByStorageAndProduct(
      storage_id,
      product_id
    );
    return stock;
  };

  const addStock = async (id, quanty) => {
    const stock = await stocks.addStock(id, quanty);
    return stock;
  };

  const decrementStock = async (id, quanty) => {
    const stock = await stocks.decrementStock(id, quanty);
    return stock;
  };

  const findLastMovementByStock = async (stock_id) => {
    const stockMovement = await stocksMovements.findLastByStock(stock_id);
    return stockMovement;
  };

  const createProductMovement = async (
    total,
    critical,
    product_id,
    storage_id
  ) => {
    const newStock = await stocks.create(
      total,
      total,
      0,
      critical,
      storage_id,
      product_id
    );
    const stockMovement = await stocksMovements.create(
      total,
      0,
      total,
      0,
      newStock.id,
      newStock.id
    );
    return stockMovement;
  };

  const findAllGroupByProduct = async () => {
    const stock = await stocks.findAllGroupByProduct();
    return stock;
  };

  const findAllMovementsByStock = async (stock_id) => {
    const stockMovements = await stocksMovements.findAllByStock(stock_id);
    return stockMovements;
  };

  const totalStockByProductAndStorage = async (productId, storageId) => {
    const available = await productCards.countAllGroupByProductStorageAndStatus(productId, storageId, 0);
    const reserve = await productCards.countAllGroupByProductStorageAndStatus(productId, storageId, 1);
    const sold = await productCards.countAllGroupByProductStorageAndStatus(productId, storageId, 2);
    const returned = await productCards.countAllGroupByProductStorageAndStatus(productId, storageId, 3);
    const toReceive = await productCards.countAllGroupByProductStorageAndStatus(productId, storageId, 4);

    const total = (available[0]?.count || 0) + (reserve[0]?.count || 0) + (sold[0]?.count || 0) + (returned[0]?.count || 0) + (toReceive[0]?.count || 0);

    return total;
  };
    

  const createAddMovement = async (description, add, reference, type, productId, storageId, net, tax, gros) => {
    const lastMovement = await findLastStockMovementByProductAndStorage(productId, storageId);
    let balance = 0;
    if (lastMovement !== null) {
      balance = lastMovement.balance + add;
    } else {
      const totalStock = await totalStockByProductAndStorage(productId, storageId);
      balance = totalStock + add;
    }

    const newMovement = await stocksMovements.create(
      description,
      add,
      0,
      balance,
      type,
      reference,
      user.id,
      productId,
      storageId
    )

    for (let i = 0; i < add; i++) {
      await productCards.create(
        productId,
        net,
        gros,
        tax,
        0,
        0,
        0,
        0,
        null,
        null,
        null,
        null,
        null,
        storageId,
        null,
        0
      )
    }
      

   
    //const balance = lastMovement.balance + add;
   return newMovement;
  };

  const createDecrementMovement = async (
    description, decrement, reference, type, productId, storageId,
  ) => {
    const lastMovement = await findLastStockMovementByProductAndStorage(productId, storageId);
    let balance = 0;
    if (lastMovement !== null) {
      balance = lastMovement.balance - decrement;
    } else {
      const totalStock = await totalStockByProductAndStorage(productId, storageId);
      balance = totalStock - decrement;
    }

    const newMovement = await stocksMovements.create(
      description,
      0,
      decrement,
      balance,
      type,
      reference,
      user.id,
      productId,
      storageId
    )

    for (let i = 0; i < decrement; i++) {
      const firstCard = await productCards.findFirstCardByProductAndStorage(productId, storageId);
      await productCards.updateStatus(firstCard.id, 6);
    }

    return newMovement;
  };

  const createStockMovement = async (
    description,
    add,
    decrement,
    balance,
    type,
    reference,
    user_id,
    product_id,
    storage_id
  ) => {
    const stockMovement = await stocksMovements.create(
      description,
      add,
      decrement,
      balance,
      type,
      reference,
      user_id,
      product_id,
      storage_id
    );
    return stockMovement;
  };

  const createPurchaseStockMovement = async (
    add,
    reference,
    product_id,
    storage_id
  ) => {
    const description = "Compra de producto";
    const type = 0;
    const user_id = user.id;
    const decrement = 0;
    let balance = 0;

    const lastMovement = await stocksMovements.findLastByProductAndStorage(
      product_id,
      storage_id
    );

    console.log(lastMovement);

    if (lastMovement !== null) {
      balance = lastMovement.balance + add;
    } else {
      const available =
        await productCards.countAllGroupByProductStorageAndStatus(
          product_id,
          storage_id,
          0
        );
      const reserve = await productCards.countAllGroupByProductStorageAndStatus(
        product_id,
        storage_id,
        1
      );
      const sold = await productCards.countAllGroupByProductStorageAndStatus(
        product_id,
        storage_id,
        2
      );
      const returned =
        await productCards.countAllGroupByProductStorageAndStatus(
          product_id,
          storage_id,
          3
        );
      const toReceive =
        await productCards.countAllGroupByProductStorageAndStatus(
          product_id,
          storage_id,
          4
        );

      const total =
        (available[0]?.count || 0) +
        (reserve[0]?.count || 0) +
        (sold[0]?.count || 0) +
        (returned[0]?.count || 0) +
        (toReceive[0]?.count || 0);
      balance = total + add;
    }

    console.log("balance", balance);

    const stockMovement = await stocksMovements.create(
      description,
      add,
      decrement,
      balance,
      0,
      reference,
      user_id,
      product_id,
      storage_id
    );
    return stockMovement;
  };

  const findLastStockMovementByProductAndStorage = async (
    product_id,
    storage_id
  ) => {
    const stockMovement = await stocksMovements.findLastByProductAndStorage(
      product_id,
      storage_id
    );
    return stockMovement;
  };

  const findAllStockMovementsByProductAndStorage = async (
    product_id,
    storage_id
  ) => {
    const stockMovements = await stocksMovements.findAllByProductAndStorage(
      product_id,
      storage_id
    );
    return stockMovements;
  };

  const createSaleStockMovement = async (decrement, reference,product_id,storage_id ) => {
    const description = "Venta de producto";
    const type = 1;
    const user_id = user.id;
    const add = 0;
    let balance = 0;

    const lastMovement = await stocksMovements.findLastByProductAndStorage(
      product_id,
      storage_id
    );

    if (lastMovement !== null) {
      balance = lastMovement.balance - decrement;
    } else {
      const available =
        await productCards.countAllGroupByProductStorageAndStatus(
          product_id,
          storage_id,
          0
        );
      const reserve = await productCards.countAllGroupByProductStorageAndStatus(
        product_id,
        storage_id,
        1
      );
      const sold = await productCards.countAllGroupByProductStorageAndStatus(
        product_id,
        storage_id,
        2
      );
      const returned =
        await productCards.countAllGroupByProductStorageAndStatus(
          product_id,
          storage_id,
          3
        );
      const toReceive =
        await productCards.countAllGroupByProductStorageAndStatus(
          product_id,
          storage_id,
          4
        );

      const total =
        (available[0]?.count || 0) +
        (reserve[0]?.count || 0) +
        (sold[0]?.count || 0) +
        (returned[0]?.count || 0) +
        (toReceive[0]?.count || 0);
      balance = total - decrement;
    }

    const stockMovement = await stocksMovements.create(
      description,
      add,
      decrement,
      balance,
      type,
      reference,
      user_id,
      product_id,
      storage_id
    );

    return stockMovement;
  }

  return {
    create,
    findAll,
    findOneById,
    findAllByStorage,
    findOneByStorageAndProduct,
    addStock,
    decrementStock,
    movementType,
    createProductMovement,
    findLastMovementByStock,
    findAllGroupByProduct,
    findAllMovementsByStock,
    createAddMovement,
    createDecrementMovement,
    createStockMovement,
    createPurchaseStockMovement,
    findLastStockMovementByProductAndStorage,
    findAllStockMovementsByProductAndStorage,
    createSaleStockMovement
  };
}
