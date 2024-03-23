import React from 'react'
const taxes = require('@/services/taxes')

export default function useTaxes() {
    const create = async (name, description, percentage) => {
        const tax = await taxes.create(name, description, percentage)
        return tax
    }

    const findAll = async () => {
        const tax = await taxes.findAll()
        return tax
    }

    const findOneById = async (id) => {
        const tax = await taxes.findOneById(id)
        return tax
    }

    const findOneByName = async (name) => {
        const tax = await taxes.findOneByName(name)
        return tax
    }

    const update = async (id, name, description, percentage) => {
        const tax = await taxes.update(id, name, description, percentage)
        return tax
    }

    const destroy = async (id) => {
        const tax = await taxes.destroy(id)
        return tax
    }

    const findAllToAutocomplete = async () => {
        const taxes_ = await taxes.findAll()
        return taxes_.map(tax => ({ id: tax.id, key:tax.id, name: tax.name, percentage: tax.percentage}))
    }

    const findAllToGrid = async () => {
        const tax = await taxes.findAll()
        return tax.map(tax => ({
            id: tax.id,
            name: tax.name,
            percentage: tax.percentage,
            description: tax.description,
        }))
    }

    const ivaTax = async () => {
        const tax = await taxes.findOneByName('IVA')
        const formattedTax = {
            id: tax.id,
            key: tax.id,
            name: tax.name,
            percentage: tax.percentage,
        }
        return formattedTax
    }

    const exemptIvaTax = async () => {
        const tax = await taxes.findOneByName('Exento de IVA')
        const formattedTax = {
            id: tax.id,
            key: tax.id,
            name: tax.name,
            percentage: tax.percentage,
        }
        return formattedTax
    }

    return {
        create,
        findAll,
        findOneById,
        findOneByName,
        update,
        destroy,
        findAllToAutocomplete,
        findAllToGrid,
        ivaTax,
        exemptIvaTax
    }
        
}
