const categories = require('@/services/categories')


export default function useCategories() {

    const create = async (name, description) => {
        return await categories.create(name, description)
    }

    const findAll = async () => {
        return await categories.findAll()
    }

    const findOneById = async (id) => {
        return await categories.findOneById(id)
    }

    const update = async (id, name, description) => {
        return await categories.update(id, name, description)
    }

    const destroy = async (id) => {
        return await categories.destroy(id)
    }

    const findAllToAutocomplete = async () => {
        const data = await categories.findAll()
        return data.map(category => ({ id: category.id, key:category.id, name: category.name }))
    }

    const findAllToGrid = async () => {
        const data = await categories.findAll()
        return data.map(category => ({ id: category.id, name: category.name, description: category.description }))
    }

  return {
    create,
    findAll,
    findOneById,
    update,
    destroy,
    findAllToAutocomplete,
    findAllToGrid
  }
}
