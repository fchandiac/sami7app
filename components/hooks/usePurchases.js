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

  

    const createDetail = async (quanty, price, utility, net, tax, total, purchase_id, product_id) => {
        const purchaseDetail = await purchasesDetails.create(quanty, price, utility, net, tax, total, purchase_id, product_id)
        return purchaseDetail
    }

    const findDetailByPurchase = async (purchase_id) => {
        const purchaseDetail = await purchasesDetails.findByPurchase(purchase_id)
        return purchaseDetail
    }

    //function findById(id)

    const findById = async (id) => {
        const purchase = await purchases.findById(id)
        return purchase
    }




//function findAllBetweenDates(start, end)

    const findAllBetweenDates = async (start, end) => {
        const purchase = await purchases.findAllBetweenDates(start, end)
        return purchase
    }
        
  return {
    create,
    findAll,
    createDetail,
    findDetailByPurchase,
    findById,
    findAllBetweenDates

  }
   
  
}
