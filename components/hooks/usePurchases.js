import React from 'react'
const purchases = require('@/services/purchases')
const purchasesDetails = require('@/services/purchasesDetails')


export default function usePurchases() {

    const create =  async (description, type, utility, net, tax, total, user_id, provider_id, document_type, document_id, nulled) => {
        const purchase = await purchases.create(description, type, utility, net, tax, total, user_id, provider_id, document_type, document_id, nulled)
        return purchase
    }

    const findAll = async () => {
        const purchase = await purchases.findAll()
        return purchase
    }

    //purchasesDetails.create(description, quantity, price, purchase_id, product_id, nulled)

    const createDetail = async (description, quantity, price, purchase_id, product_id, nulled) => {
        const purchaseDetail = await purchasesDetails.create(description, quantity, price, purchase_id, product_id, nulled)
        return purchaseDetail
    }

    const findDetailByPurchase = async (purchase_id) => {
        const purchaseDetail = await purchasesDetails.findByPurchase(purchase_id)
        return purchaseDetail
    }
        
  return {
    create,
    findAll,
    createDetail,
    findDetailByPurchase

  }
   
  
}
