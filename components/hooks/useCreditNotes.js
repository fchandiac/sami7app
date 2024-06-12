import React from 'react'
const creditNotes = require("@/services/creditNotes");

export default function useCreditNotes() {
   // create(description, type, amount, reference_id, user_id, customer_id) 

   const create = async (description, type, amount, reference_id, user_id, customer_id) => {
     const creditNote = await creditNotes.create(description, type, amount, reference_id, user_id, customer_id);
     return creditNote;
   }

    // findAll()
    const findAll = async () => {
      const creditNote = await creditNotes.findAll();
      return creditNote;
    }

    // findOneById(id)
    const findOneById = async (id) => {
      const creditNote = await creditNotes.findOneById(id);
      return creditNote;
    }

    // findAllByCustomerId(customer_id)

    const findAllByCustomerId = async (customer_id) => {
        const creditNote = await creditNotes.findAllByCustomerId(customer_id);
        return creditNote;
        }

    const creditNotesTypes = {

    }


    // const createVoidSale = async (description, type, amount, reference_id, user_id, customer_id) => {
    //   const creditNote = await creditNotes.createVoidSale(description, type, amount, reference_id, user_id, customer_id);
    //   return creditNote;
    // }



  return {
    create,
    findAll,
    findOneById,
    findAllByCustomerId
  }
}

