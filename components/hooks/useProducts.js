import usePurchasePrices from "./usePurchasePrices";
import useSellingPrices from "./useSellingPrices";
import useStocks from "./useStocks";
import useUtils from "./useUtils";

const products = require("@/services/products");

export default function useProducts() {
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const purchasePrices = usePurchasePrices();
  const sellingPrices = useSellingPrices();
  const stocks = useStocks();

  const create = async (
    name,
    code,
    description,
    stock_control,
    iva_subject,
    favorite,
    purchase_price_id,
    subcategory_id
  ) => {
    const product = await products.create(
      name,
      code,
      description,
      stock_control,
      iva_subject,
      favorite,
      purchase_price_id,
      subcategory_id
    );
    return product;
  };

  const findAll = async () => {
    const product = await products.findAll();
    return product;
  };

  const findOneById = async (id) => {
    const product = await products.findOneById(id);
    return product;
  };

  const generalUpdate = async (
    id,
    name,
    code,
    description,
    stock_control,
    iva_subject,
    favorite,
    subcategory_id
  ) => {
    const product = await products.generalUpdate(
      id,
      name,
      code,
      description,
      stock_control,
      iva_subject,
      favorite,
      subcategory_id
    );
    return product;
  };

  const newProduct = async (general, purchase, selling, stock) => {
    console.log("purchase", purchase);
    console.log("selling", selling);

    const newPurchase = await purchasePrices.create(
      parseInt(removeThousandsSeparator(purchase.net)),
      parseInt(removeThousandsSeparator(purchase.gross)),
      purchase.provider.id,
      purchase.taxes
    );

    // const newSelling = await sellingPrices.create(
    //   parseInt(removeThousandsSeparator(selling.net)),
    //   parseInt(removeThousandsSeparator(selling.gross)),
    //   selling.priceList.id,
    //   newPurchase.id,
    //   parseInt(removeThousandsSeparator(purchase.net)),
    //   selling.utility,
    //   selling.taxes
    // );

    const newProduct = await products.create(
      general.name,
      general.code,
      general.description,
      general.stock_control,
      general.ivaSubject,
      general.favorite,
      newPurchase.id,
      general.subcategory.id
    );

    const newSellingPrice = await sellingPrices.create(
      parseInt(removeThousandsSeparator(selling.gross)),
      parseInt(removeThousandsSeparator(selling.net)),
      selling.utility,
      parseInt(removeThousandsSeparator(purchase.net)),
      selling.priceList.id,
      newProduct.id,
      selling.taxes
    );

    const newProductStock = await stocks.createProductMovement(
      stock.total,
      stock.critical,
      newProduct.id,
      stock.storage.id
    );

    return {
      newPurchase: newPurchase,
      newProduct: newProduct,
      newProductStock: newProductStock,
      newSelling: newSellingPrice,
    };
  };

  const existByName = async (name) => {
    const product = await products.existByName(name);
    return product;
  };

  const findAllToSalePoint = async (price_list_id, storage_id) => {
    const product = await products.findAllToSalePoint(
      price_list_id,
      storage_id
    );
    return product;
  };

  const findOneByIdToCart = async (id) => {
    const product = await products.findOneByIdToCart(id);
    return product;
  };

  // findOneByIAndStorageAndPriceList(
  //   id,
  //   storage_id,
  //   price_list_id
  // );

  const findOneByIAndStorageAndPriceList = async (
    id,
    storage_id,
    price_list_id
  ) => {
    const product = await products.findOneByIAndStorageAndPriceList(
      id,
      storage_id,
      price_list_id
    );
    return product;
  };

  const findAllToAutocomplete = async () => {
    const product = await products.findAll()
    const data = product.map((product) => {
      return {
        id: product.id,
        key: product.id,
        name: product.name,
      };
    });
    return data;
  }

  return {
    create,
    findAll,
    findOneById,
    generalUpdate,
    newProduct,
    existByName,
    findAllToSalePoint,
    findOneByIdToCart,
    findOneByIAndStorageAndPriceList,
    findAllToAutocomplete
  };
}
