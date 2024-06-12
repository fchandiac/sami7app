import React from 'react'
const receptions = require('@/services/receptions')


// router.post('/receptions/create', async (req, res) => {
//     const { description, type, status, date, user_id, reception_id, document_type, document_id, nulled } = req.body
//     const reception = await receptions.create(description, type, status, date, user_id, reception_id, document_type, document_id, nulled)
//     res.json(reception)
// })

// router.get('/receptions/findAll', async (req, res) => {
//     const reception = await receptions.findAll()
//     res.json(reception)
// })

// router.post('/receptions/findAllBetweenDates', async (req, res) => {
//     const { start, end } = req.body
//     const reception = await receptions.findAllBetweenDates(start, end)
//     res.json(reception)
// })

// router.post('/receptions/finAllByPurchase', async (req, res) => {
//     const { purchase_id } = req.body
//     const reception = await receptions.finAllByPurchase(purchase_id)
//     res.json(reception)
// })

export default function useReceptions() {

    const create =  async (description, type, status, date, user_id, reception_id, document_type, document_id, nulled) => {
        const reception = await receptions.create(description, type, status, date, user_id, reception_id, document_type, document_id, nulled)
        return reception
    }

    const findAll = async () => {
        const reception = await receptions.findAll()
        return reception
    }

    const findAllBetweenDates = async (start, end) => {
        const reception = await receptions.findAllBetweenDates(start, end)
        return reception
    }

    const finAllByPurchase = async (purchase_id) => {
        const reception = await receptions.finAllByPurchase(purchase_id)
        return reception
    }

    return {
        create,
        findAll,
        findAllBetweenDates,
        finAllByPurchase
    }
    

}
