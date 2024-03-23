const stocks = require('@/services/stocks')
const stocksMovements = require('@/services/stockMovements')



export default function useStocks() {


    const movementType = (type) => {
        switch (type) {
            case 0:
                return 'creación de stock'
            case 1:
                return 'venta'
            default:
                return ''
        }
    }

    const create = async (total, available, reserve, critical, storage_id, product_id) => {
        const stock = await stocks.create(total, available, reserve, critical, storage_id, product_id)
        return stock
    }

    const findAll = async () => {
        const stock = await stocks.findAll()
        return stock
    }

    const findOneById = async (id) => {
        const stock = await stocks.findOneById(id)
        return stock
    }

    const findAllByStorage = async (storage_id) => {
        const stock = await stocks.findAllByStorage(storage_id)
        return stock
    }

    const findOneByStorageAndProduct = async (storage_id, product_id) => {
        const stock = await stocks.findOneByStorageAndProduct(storage_id, product_id)
        return stock
    }

    const addStock = async (id, quanty) => {
        const stock = await stocks.addStock(id, quanty)
        return stock
    }

    const decrementStock = async (id, quanty) => {
        const stock = await stocks.decrementStock(id, quanty)
        return stock
    }

    const findLastMovementByStock = async (stock_id) => {
        const stockMovement = await stocksMovements.findLastByStock(stock_id)
        return stockMovement
    }

    const createProductMovement = async (total, critical, product_id, storage_id) => {
        const newStock = await stocks.create(total, total, 0, critical, storage_id, product_id)
        const stockMovement = await stocksMovements.create(total, 0, total, 0, newStock.id, newStock.id)

        return stockMovement
    }


    const findAllGroupByProduct = async () => {
        const stock = await stocks.findAllGroupByProduct()
        return stock
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
        findAllGroupByProduct
    }
}
