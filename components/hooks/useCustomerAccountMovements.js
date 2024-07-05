import { useAppContext } from "@/appProvider";
import React from "react";
const customerAccountMovements = require("@/services/customerAccountMovements");

// router.post('/customerAccountMovements/create', async (req, res) => {
//     const { description, type, previous_balance, debit, credit, balance, reference_id, customer_id, user_id } = req.body
//     const customerAccountMovement = await customerAccountMovements.create(description, type, previous_balance, debit, credit, balance, reference_id, customer_id, user_id)
//     res.json(customerAccountMovement)
// })

// router.post('/customerAccountMovements/findAllByCustomerId', async (req, res) => {
//     const { customer_id } = req.body
//     const customerAccountMovement = await customerAccountMovements.findAllByCustomerId(customer_id)
//     res.json(customerAccountMovement)
// })

// router.post('/customerAccountMovements/findLastByCustomerId', async (req, res) => {
//     const { customer_id } = req.body
//     const customerAccountMovement = await customerAccountMovements.findLastByCustomerId(customer_id)
//     res.json(customerAccountMovement)
// })

export default function useCustomerAccountMovements() {
  const { user } = useAppContext();

  const create = async (
    description,
    type,
    previous_balance,
    debit,
    credit,
    balance,
    reference_id,
    customer_id,
    user_id
  ) => {
    const newCustomerAccountMovement = await customerAccountMovements.create(
      description,
      type,
      previous_balance,
      debit,
      credit,
      balance,
      reference_id,
      customer_id,
      user_id
    );
    return newCustomerAccountMovement;
  };

  const findAllByCustomerId = async (customer_id) => {
    const customerAccountMovements_ =
      await customerAccountMovements.findAllByCustomerId(customer_id);
    return customerAccountMovements_;
  };

  const findLastByCustomerId = async (customer_id) => {
    const customerAccountMovement =
      await customerAccountMovements.findLastByCustomerId(customer_id);
    return customerAccountMovement;
  };

  const customerAccountMovementType = (type) => {
    switch (type) {
      case 1:
        return "Venta directa";
      case 2:
        return "Pago venta directa";
      case 3:
        return "Devolución";
      case 4:
        return "Ajuste";
      case 5:
        return "Crédito";
      case 6:
        return "Anulación venta directa";
      case 7:
        return "Anulación pago";
      default:
        return "N/A";
    }
  };

  const createSaleMovement = async (
    description,
    debit,
    reference_id,
    customer_id
  ) => {
    const lastMovement = await findLastByCustomerId(customer_id);
    let previous_balance = lastMovement ? lastMovement.balance : 0;
    let credit = 0;
    let balance = previous_balance - debit;
    const type = 1;
    const newCustomerAccountMovement = await create(
      description,
      type,
      previous_balance,
      debit * -1,
      credit,
      balance,
      reference_id,
      customer_id,
      user.id
    );

    return newCustomerAccountMovement;
  };

  const createPayMovement = async (description, credit, reference_id, customer_id) => {
    const lastMovement = await findLastByCustomerId(customer_id);
    let previous_balance = lastMovement ? lastMovement.balance : 0;
    let debit = 0;
    let balance = previous_balance + credit;
    const type = 2;
    const newCustomerAccountMovement = await create(
      description,
      type,
      previous_balance,
      debit,
      credit,
      balance,
      reference_id,
      customer_id,
      user.id
    );

    return newCustomerAccountMovement;
  }

  // function voidById(id)
  const voidById = async (id) => {
    const customerAccountMovement = await customerAccountMovements.voidById(id);
    return customerAccountMovement;
  };



  return {
    create,
    findAllByCustomerId,
    findLastByCustomerId,
    createSaleMovement,
    customerAccountMovementType,
    createPayMovement,
    voidById,
  };
}
