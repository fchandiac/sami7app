import React from 'react'

const providerAccountMovements = require('@/services/providerAccountMovements')

const types = {
    0: 'Compra',
    1: 'Pago proveedor',
}

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
        console.log('movement', movement)
        return movement
    }

    const createPurchaseMovemente = async (credit, reference_id, provider_id, user_id) => {

      console.log('provider_id', provider_id)
      console.log('user_id', user_id)

      const lastMovement = await providerAccountMovements.findLastByProvider(provider_id)
      const description = 'Compra de produtos'
      let previous_balance = 0
     

      if (lastMovement) {
        previous_balance = lastMovement.balance
      }

      let balance = previous_balance + credit
      const newMovement = await create(
        description,
        0,
        previous_balance,
        0,
        credit,
        balance,
        reference_id,
        provider_id,
        user_id

      )
      return newMovement
    }

    const createPaymentMovemente = async (debit, reference_id, provider_id, user_id) => {
        
        console.log('provider_id', provider_id)
        console.log('user_id', user_id)
  
        const lastMovement = await providerAccountMovements.findLastByProvider(provider_id)
        const description = 'Pagamento de fatura'
        let previous_balance = 0
      
  
        if (lastMovement) {
          previous_balance = lastMovement.balance
        }
  
        let balance = previous_balance - debit
        const newMovement = await create(
          description,
          1,
          previous_balance,
          debit,
          0,
          balance,
          reference_id,
          provider_id,
          user_id
  
        )
        return newMovement
      }


      const accountMovementType = (type) =>{
        return types[type]
      }
   



    return {
        create,
        findOneById,
        findAllByProvider,
        findLastByProvider,
        createPurchaseMovemente,
        createPaymentMovemente,
        accountMovementType


    }
}
