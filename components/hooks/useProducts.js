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
    ivaSubject,
    favorite,
    purchase_price_id,
    selling_price_id,
    subcategory_id
  ) => {
    const product = await products.create(
      name,
      code,
      description,
      stock_control,
      ivaSubject,
      favorite,
      purchase_price_id,
      selling_price_id,
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
    ivaSubject,
    favorite,
    subcategory_id
  ) => {
    const product = await products.generalUpdate(
      id,
      name,
      code,
      description,
      stock_control,
      ivaSubject,
      favorite,
      subcategory_id
    );
    return product;
  };

  const newProduct = async (general, purchase, selling, stock) => {



    console.log('purchase', purchase)
    console.log('selling', selling)

    const newPurchase = await purchasePrices.create(
      parseInt(removeThousandsSeparator(purchase.net)),
      parseInt(removeThousandsSeparator(purchase.gross)),
      purchase.provider.id,
      purchase.taxes
    );

    const newSelling = await sellingPrices.create(
      parseInt(removeThousandsSeparator(selling.net)),
      parseInt(removeThousandsSeparator(selling.gross)),
      selling.priceList.id,
      newPurchase.id,
      parseInt(removeThousandsSeparator(purchase.net)),
      selling.utility,
      selling.taxes
   
    );

    const newProduct = await products.create(
      general.name,
      general.code,
      general.description,
      general.stock_control,
      general.ivaSubject,
      general.favorite,
      newPurchase.id,
      newSelling.id,
      general.subcategory.id
    )

    const newProductStock = await stocks.createProductMovement(
      stock.total,
      stock.critical,
      newProduct.id,
      stock.storage.id
    )

    return {
      newPurchase: newPurchase,
      newSelling: newSelling,
      newProduct: newProduct,
      newProductStock: newProductStock
    }
  };


  const existByName = async (name) => {
    const product = await products.existByName(name);
    return product;
  }

  return {
    create,
    findAll,
    findOneById,
    generalUpdate,
    newProduct,
    existByName
  };
}
