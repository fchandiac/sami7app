import React from 'react'
const products = require('@/services/productCards')

// router.post('/productCards/create', async (req, res) => {
//     const { product_id, puchase_net, purchase_gross, purchase_tax, sale_net, sale_gross, sale_tax, utility, sale_price_list_id, sale_id, sale_detail_id, purchase_id, purchase_detail_id, storage_id, reception_id, status } = req.body
//     const productCard = await productCards.create(product_id, puchase_net, purchase_gross, purchase_tax, sale_net, sale_gross, sale_tax, utility, sale_price_list_id, sale_id, sale_detail_id, purchase_id, purchase_detail_id, storage_id, reception_id, status)
//     res.json(productCard)
// })

// router.post('/productCards/findAllByProduct', async (req, res) => {
//     const { product_id } = req.body
//     const productCard = await productCards.findAllByProduct(product_id)
//     res.json(productCard)
// })

// router.post('/productCards/countAllByProduct', async (req, res) => {
//     const { product_id } = req.body
//     const productCard = await productCards.countAllByProduct(product_id)
//     res.json(productCard)
// })

// router.post('/productCards/countAllGroupByProductStorageAndStatus', async (req, res) => {
//     const { product_id, storage_id, status } = req.body
//     const productCard = await productCards.countAllGroupByProductStorageAndStatus(product_id, storage_id, status)
//     res.json(productCard)
// })

// router.post('/productCards/findAllGroupByProductStorageAndStatus', async (req, res) => {
//     const { product_id, storage_id, status } = req.body
//     const productCard = await productCards.findAllGroupByProductStorageAndStatus(product_id, storage_id, status)
//     res.json(productCard)
// })

// router.post('/productCards/findAllGroupByProductAndStatus', async (req, res) => {
//     const { product_id, status } = req.body
//     const productCard = await productCards.findAllGroupByProductAndStatus(product_id, status)
//     res.json(productCard)
// })

// router.post('/productCards/updateStatus', async (req, res) => {
//     const { id, status } = req.body
//     const productCard = await productCards.updateStatus(id, status)
//     res.json(productCard)
// })

const statusList = {
    0: "available",
    1: "reserved",
    2: "sold",
    3: "returned",
    4: "to receive",
    5: "to dispatch",
    6: 'internal consumption'
  };

export default function useProductCards() {
    const create = async (product_id, puchase_net, purchase_gross, purchase_tax, sale_net, sale_gross, sale_tax, utility, sale_price_list_id, sale_id, sale_detail_id, purchase_id, purchase_detail_id, storage_id, reception_id, status) => {
        const productCard = await products.create(product_id, puchase_net, purchase_gross, purchase_tax, sale_net, sale_gross, sale_tax, utility, sale_price_list_id, sale_id, sale_detail_id, purchase_id, purchase_detail_id, storage_id, reception_id, status)
        return productCard
    }

    const findAllByProduct = async (product_id) => {
        const productCard = await products.findAllByProduct(product_id)
        return productCard
    }

    const countAllByProduct = async (product_id) => {
        const productCard = await products.countAllByProduct(product_id)
        return productCard
    }

    const countAllGroupByProductStorageAndStatus = async (product_id, storage_id, status) => {
        const productCard = await products.countAllGroupByProductStorageAndStatus(product_id, storage_id, status)
        return productCard
    }

    const findAllGroupByProductStorageAndStatus = async (product_id, storage_id, status) => {
        const productCard = await products.findAllGroupByProductStorageAndStatus(product_id, storage_id, status)
        return productCard
    }

    const findAllGroupByProductAndStatus = async (product_id, status) => {
        const productCard = await products.findAllGroupByProductAndStatus(product_id, status)
        return productCard
    }

    const updateStatus = async (id, status) => {
        const productCard = await products.updateStatus(id, status)
        return productCard
    }

    //function findAllGroupByProduct()

    const findAllGroupByProduct = async () => {
        const productCard = await products.findAllGroupByProduct()
        return productCard
    }

    //findFirstCardByProductAndStorage(product_id, storage_id)

    const findFirstCardByProductAndStorage = async (product_id, storage_id) => {
        const productCard = await products.findFirstCardByProductAndStorage(product_id, storage_id)
        return productCard
    }

    // findAllGroupByProductAvailable()

    const findAllGroupByProductAvailable = async () => {
        const productCard = await products.findAllGroupByProductAvailable()
        return productCard
    }

    //updateSaleId(id, sale_id) 

    const updateSaleId = async (id, sale_id) => {
        const productCard = await products.updateSaleId(id, sale_id)
        return productCard
    }

    // function findAllBySale(sale_id)

    const findAllBySale = async (sale_id) => {
        const productCard = await products.findAllBySale(sale_id)
        return productCard
    }

    // function updateSaleValues(id, sale_id, sale_net, sale_tax, sale_gross, sale_price_list_id) 

    const updateSaleValues = async (id, sale_id, sale_net, sale_tax, sale_gross, sale_price_list_id) => {
        const productCard = await products.updateSaleValues(id, sale_id, sale_net, sale_tax, sale_gross, sale_price_list_id)
        return productCard
    }


    return {
        create,
        findAllByProduct,
        countAllByProduct,
        countAllGroupByProductStorageAndStatus,
        findAllGroupByProductStorageAndStatus,
        findAllGroupByProductAndStatus,
        updateStatus,
        findAllGroupByProduct,
        findFirstCardByProductAndStorage,
        findAllGroupByProductAvailable,
        updateSaleId,
        findAllBySale,
        updateSaleValues
    }

}
