import React from "react";
const purchasePrices = require("@/services/purchasePrices");

export default function usePurchasePrices() {
  const create = async (net, gross, provider_id, taxes) => {
    const purchasePrice = await purchasePrices.create(net, gross, provider_id, taxes);
    return purchasePrice;
  };

  const findAll = async () => {
    const purchasePrice = await purchasePrices.findAll();
    return purchase;
  };

  const findOneById = async (id) => {
    const purchasePrice = await purchasePrices.findOneById(id);
    return purchasePrice;
  };

  const update = async (id, net, gross, provider_id) => {
    const purchasePrice = await purchasePrices.update(
      id,
      net,
      gross,
      provider_id
    );
    return purchasePrice;
  };

  const destroy = async (id) => {
    const purchasePrice = await purchasePrices.destroy(id);
    return purchasePrice;
  };

  const createTaxPurchasePrices = async (tax_id, purchase_price_id) => {
    const taxPurchasePrices = await purchasePrices.createTaxPurchasePrices(
      tax_id,
      purchase_price_id
    );
    return taxPurchasePrices;
  };

  // {
  //     "id": 1,
  //     "key": 1,
  //     "name": "IVA",
  //     "percentage": 19
  // }

 
  

  return {
    create,
    findAll,
    findOneById,
    update,
    destroy,
    createTaxPurchasePrices,

  };
}
