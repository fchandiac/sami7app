const sellingPrices = require("@/services/sellingPrices");

export default function useSellingPrices() {
  const create = async (net, gross, price_list_id, purchase_price_id, purchase_net, utility, taxes) => {
    const price = await sellingPrices.create(net, gross, price_list_id, purchase_price_id, purchase_net, utility, taxes);
    return price;
  };

  const findAll = async () => {
    const price = await sellingPrices.findAll();
    return price;
  };

  const findOneById = async (id) => {
    const price = await sellingPrices.findOneById(id);
    return price;
  };

  const findAllByPriceList = async (price_list_id) => {
    const price = await sellingPrices.findAllByPriceList(price_list_id);
    return price;
  };

  const update = async (id, net, gross, price_list_id) => {
    const price = await sellingPrices.update(id, net, gross, price_list_id);
    return price;
  };

  const destroy = async (id) => {
    const price = await sellingPrices.destroy(id);
    return price;
  };

  const utilityAmount = (
    purchaseNetPrice,
    usePercentage,
    percentage,
    amount
  ) => {
    let netPrice = purchaseNetPrice || 0;
    let utility = { amount: 0, percentage: 0 };

    if (usePercentage) {
      utility.amount = (netPrice * percentage) / 100;
      utility.percentage = percentage;
    } else {
      utility.amount = amount;
      utility.percentage = (amount / netPrice) * 100;
    }
    return utility;
  };

  const inverseUtilityAmount = (netPrice, purchaseNetPrice) => {
    let utility = { amount: 0, percentage: 0 };
    utility.amount = netPrice - purchaseNetPrice;
    if (purchaseNetPrice === 0) {
      utility.percentage = 100;
      utility.amount = netPrice;
      return utility;
    } else if (netPrice === 0) {
      utility.percentage = 0;
      utility.amount = 0;
      return utility;
    } else {
      utility.percentage = (utility.amount / purchaseNetPrice) * 100;
      utility.amount = Math.floor(utility.amount);
      return utility;
    }
  };

  const netPriceFromPurchase = (purchaseNetPrice, utility) => {
    let netPrice = purchaseNetPrice || 0;
    let netPriceWithUtility = netPrice + utility.amount;
    netPriceWithUtility = Math.floor(netPriceWithUtility);
    return netPriceWithUtility;
  };

  const purchaseFromNetPrice = (netPrice, utility) => {
    let purchaseNetPrice = netPrice || 0;
    let purchaseNetPriceWithUtility = purchaseNetPrice - utility.amount;
    purchaseNetPriceWithUtility = Math.floor(purchaseNetPriceWithUtility);
    return purchaseNetPriceWithUtility;

  };
  
  return {
    create,
    findAll,
    findOneById,
    findAllByPriceList,
    update,
    destroy,
    utilityAmount,
    netPriceFromPurchase,
    purchaseFromNetPrice,
    inverseUtilityAmount
  };
}
