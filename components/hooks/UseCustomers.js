const customers = require('@/services/customers.js')

export default function UseCustomers() {
    const create =  async (rut, name, address, phone, mail) => {
        const customer = await customers.create(rut, name, address, phone, mail)
        return customer
    }

    const findAll = async () => {
        const customer = await customers.findAll()
        return customer
    }

    const findOneById = async (id) => {
        const customer = await customers.findOneById(id)
        return customer
    }

    const findByRut = async (rut) => {
        const customer = await customers.findByRut(rut)
        return customer
    }

    const update = async (id, rut, name, address, phone, mail) => {
        const customer = await customers.update(id, rut, name, address, phone, mail)
        return customer
    }

    const destroy = async (id) => {
        const customer = await customers.destroy(id)
        return customer
    }

    return {
        create,
        findAll,
        findOneById,
        findByRut,
        update,
        destroy
    }

}
