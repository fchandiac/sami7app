const providers = require('@/services/providers')

export default function useProviders() {
    const create = async (rut, name, address, phone, mail) => {
        const provider = await providers.create(rut, name, address, phone, mail)
        return provider
    }

    const findAll = async () => {
        const provider = await providers.findAll()
        return provider
    }

    const findOneById = async (id) => {
        const provider = await providers.findOneById(id)
        return provider
    }

    const findOneByRut = async (rut) => {
        const provider = await providers.findOneByRut(rut)
        return provider
    }

    const findOneByName = async (name) => {
        const provider = await providers.findOneByName(name)
        return provider
    }

    const update = async (id, rut, name, address, phone, mail) => {
        const provider = await providers.update(id, rut, name, address, phone, mail)
        return provider
    }

    const destroy = async (id) => {
        const provider = await providers.destroy(id)
        return provider
    }

    const findAllToAutocomplete = async () => {
        const data = await providers.findAll()
        return data.map(provider => ({ id: provider.id, key: provider.id, name: provider.name }))
    }

    const findAllToGrid = async () => {
        const data = await providers.findAll()
        return data.map(provider => ({ id: provider.id, rut: provider.rut, name: provider.name, address: provider.address, phone: provider.phone, mail: provider.mail }))
    }



  
  return {
    create,
    findAll,
    findOneById,
    findOneByRut,
    findOneByName,
    update,
    destroy,
    findAllToAutocomplete,
    findAllToGrid
  }
}
