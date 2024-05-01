const sales = require('@/services/sales')

export default function useSales() {

    const create = async (description, type, discount, utility, net, tax, total, balance, pay_date, user_id, customer_id, document_type, document_id) => {
        const newSale = await sales.create(description, type, discount, utility, net, tax, total, balance, pay_date, user_id, customer_id, document_type, document_id)
        return newSale
    }

    const findAll = async () => {
        const sales_ = await sales.findAll()
        return sales_
    }

    const findOneById = async (id) => {
        const sale = await sales.findOneById(id)
        return sale
    }

    const findAllByCustomer = async (customer_id) => {
        const sales_ = await sales.findAllByCustomer(customer_id)
        return sales_
    }

    const findOneByDocument = async (document_type, document_id) => {
        const sale = await sales.findOneByDocument(document_type, document_id)
        return sale
    }

    const findAllByDocumentType = async (document_type) => {
        const sales_ = await sales.findAllByDocumentType(document_type)
        return sales_
    }

    const findAllByDocumentId = async (document_id) => {
        const sales_ = await sales.findAllByDocumentId(document_id)
        return sales_
    }

    const findAllByType = async (type) => {
        const sales_ = await sales.findAllByType(type)
        return sales_
    }

    const saleType = (type) => {
        switch (type) {
            case 1:
                return 'Venta directa'
            case 2:
                return 'Venta calzada'
            default:
                return 'Venta sin definir'
        }
    }


  return {
    create,
    findAll,
    findOneById,
    findAllByCustomer,
    findOneByDocument,
    findAllByDocumentType,
    findAllByDocumentId,
    findAllByType,
    saleType
  }
}
