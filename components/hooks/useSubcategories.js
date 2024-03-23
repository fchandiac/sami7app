const subcategories = require('@/services/subcategories')


export default function useSubcategories() {
    const create = async (name, description, category_id) => {
        const subcategory = await subcategories.create(name, description, category_id)
        return subcategory
    }

    const findAll = async () => {
        const subcategory = await subcategories.findAll()
        return subcategory
    }

    const findOneById = async (id) => {
        const subcategory = await subcategories.findOneById(id)
        return subcategory
    }

    const findAllByCategory = async (category_id) => {
        const subcategory = await subcategories.findAllByCategory(category_id)
        return subcategory
    }

    const findAllByCategoryToAutocomplete = async (category_id) => {
        const subcategory = await subcategories.findAllByCategory(category_id)
        const formattedSubcategory = subcategory.map((item) => {
            return {
                id: item.id,
                key: item.id,
                name: item.name,
            }
        })
        return formattedSubcategory
    }

    const update = async (id, name, description, category_id) => {
        const subcategory = await subcategories.update(id, name, description, category_id)
        return subcategory
    }

    const destroy = async (id) => {
        const subcategory = await subcategories.destroy(id)
        return subcategory
    }

    const findAllToGrid = async () => {
        const subcategory = await subcategories.findAll()
        const formattedSubcategory = subcategory.map((item) => {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                category: item.Category,
                categoryName: item.Category == null ? '' : item.Category.name 
            }
        })
        return formattedSubcategory
    }

    const findAllToAutocomplete = async () => {
        const subcategory = await subcategories.findAll()
        const formattedSubcategory = subcategory.map((item) => {
            return {
                id: item.id,
                key: item.id,
                name: item.name,
            }
        })
        return formattedSubcategory
    }

    return {
        create,
        findAll,
        findOneById,
        findAllByCategory,
        update,
        destroy,
        findAllToGrid,
        findAllToAutocomplete,
        findAllByCategoryToAutocomplete
    }

}
