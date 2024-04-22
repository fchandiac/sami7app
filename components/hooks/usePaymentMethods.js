const paymentMethods = require('@/services/paymentMethods')

export default function usePaymentMethods() {

    const create = async (name, description, credit) => {
        const paymentMethod = await paymentMethods.create(
            name,
            description,
            credit
        )
        return paymentMethod
    }

    const findAll = async () => {
        const paymentMethod = await paymentMethods.findAll()
        return paymentMethod
    }

    const findOneById = async (id) => {
        const paymentMethod = await paymentMethods.findOneById(id)
        return paymentMethod
    }

    const update = async (id, name, description, credit) => {
        const paymentMethod = await paymentMethods.update(id, name, description, credit)

        return paymentMethod
    }

    const destroy = async (id) => {
        const paymentMethod = await paymentMethods.destroy(id)
        return paymentMethod
    }


  return {
    create,
    findAll,
    findOneById,
    update,
    destroy
  }
}
