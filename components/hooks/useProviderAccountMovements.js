import React from 'react'

const providerAccountMovements = require('@/services/providerAccountMovements')

export default function useProviderAccountMovements() {
  const create = async (description, type, previous_balance, debit, credit, balance, reference_id, provider_id, user_id) => {
    const newMovement = await providerAccountMovements.create(description, type, previous_balance, debit, credit, balance, reference_id, provider_id, user_id)
    return newMovement
  }

  const findOneById = async (id) => {
    const movement = await providerAccountMovements.findOneById(id)
    return movement
  }

    const findAllByProvider = async (provider_id) => {
        const movements = await providerAccountMovements.findAllByProvider(provider_id)
        return movements
    }

    const findLastByProvider = async (provider_id) => {
        const movement = await providerAccountMovements.findLastByProvider(provider_id)
        return movement
    }

    return {
        create,
        findOneById,
        findAllByProvider,
        findLastByProvider
    }
}
