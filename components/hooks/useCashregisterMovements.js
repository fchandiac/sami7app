import { useAppContext } from "@/appProvider";
import usePaymentMethods from "./usePaymentMethods";
import useSales from "./useSales";
const cashRegisters = require("@/services/cashRegisters");

const cashRegisterMovements = require("@/services/cashRegistersMovements");

export default function useCashregisterMovements() {
  const { user } = useAppContext();
  const paymentMethods = usePaymentMethods();
  const sales = useSales();

  const create = async (
    cash,
    description,
    type,
    previous_balance,
    debit,
    credit,
    balance,
    reference_id,
    user_id,
    cash_register_id,
    payment_method_id
  ) => {

    

    
    const newCashRegisterMovement = await cashRegisterMovements.create(
      cash,
      description,
      type,
      previous_balance,
      debit,
      credit,
      balance,
      reference_id,
      user_id,
      cash_register_id,
      payment_method_id
    );
    await cashRegisters.balanceCashRegister(cash_register_id, debit, credit, type);
    return newCashRegisterMovement;
  };

  const findAllByCashRegister = async (cash_register_id) => {
    const cashRegisterMovements_ =
      await cashRegisterMovements.findAllByCashRegister(cash_register_id);

    // Map and wait for all async operations to complete
    const updatedCashRegisterMovements = await Promise.all(
      cashRegisterMovements_.map(async (cashRegisterMovement) => {
        if (cashRegisterMovement.type === 7) {
          const sale = await sales.findOneById(
            cashRegisterMovement.reference_id
          );
          cashRegisterMovement.sale = sale;
        } else {
          cashRegisterMovement.sale = null;
        }
        return cashRegisterMovement;
      })
    );

    return updatedCashRegisterMovements;
  };

  const findLastByCashRegister = async (cash_register_id) => {
    const cashRegisterMovement =
      await cashRegisterMovements.findLastByCashRegister(cash_register_id);
    return cashRegisterMovement;
  };

  const types = (type) => {
    switch (type) {
      case 1:
        return "Apertura";
      case 2:
        return "Cierre";
      case 3:
        return "Egreso";
      case 4:
        return "Ingreso";
      case 5:
        return "Gasto";
      case 6:
        return "Pago";
      case 7:
        return "Venta directa";
      case 8:
        return "Anulación venta directa";
      default:
        return "N/A";
    }
  };

  const movementTypeList = () => [
    {
      id: 1,
      name: "Apertura",
    },
    {
      id: 2,
      name: "Cierre",
    },
    {
      id: 3,
      name: "Egreso",
    },
    {
      id: 4,
      name: "Ingreso",
    },
    {
      id: 5,
      name: "Gasto",
    },
    {
      id: 6,
      name: "Pago",
    },
    {
      id: 7,
      name: "Venta directa",
    },
    {
      id: 8,
      name: "Anulación venta directa",
    },
  ];

  const createOpen = async (cash_register_id, amount) => {
    // cash,
    //   description,
    //   type,
    //   previous_balance,
    //   debit,
    //   credit,
    //   balance,
    //   reference_id,
    //   user_id,
    //   cash_register_id,
    //   payment_method_id;

    const openMovement = await create(
        true,
        'Apertura de caja',
        1,
        0,
        amount,
        0,
        amount,
        null,
        user.id,
        cash_register_id
    )
    return openMovement;
  };

  const cerateInput = async (cashRegisterId, amount, description) => {
    const lastMovement = await findLastByCashRegister(cashRegisterId);
    const balance = lastMovement.balance + amount;
    const newMovement = await create(
      true,
      description,
      4,
      lastMovement.balance,
      amount,
      0,
      balance,
      null,
      user.id,
      cashRegisterId
    );
    return newMovement;
  };

  const createOutput = async (cashRegisterId, amount, description) => {
    const lastMovement = await findLastByCashRegister(cashRegisterId);
    const balance = lastMovement.balance - amount;
    const newMovement = await create(
      true,
      description,
      3,
      lastMovement.balance,
      0,
      amount,
      balance,
      null,
      user.id,
      cashRegisterId
    );
    return newMovement;
  };

  const createVoid = async (cashRegisterId, amount, description, originalMovement) => {
    const lastMovement = await findLastByCashRegister(cashRegisterId);
    const balance = lastMovement.balance - amount;

    const cash = originalMovement.paymentMethod.id === 1001 ? true : false;
    const paymentMethodId = originalMovement.paymentMethod.id;


    const newMovement = await create(
      cash,
      description,
      8,
      lastMovement.balance,
      0,
      amount,
      balance,
      originalMovement.id,
      user.id,
      cashRegisterId,
      paymentMethodId
    );

    console.log("newMovement", newMovement);

    return newMovement


  }


  const cashAmount = async (cash_register_id) => {
    const value = await cashRegisterMovements.cashAmount(cash_register_id);
    return value;
  };

  const createSaleMovement = async (
    cashRegisterId,
    amount,
    reference_id,
    cash,
    paymentMethodId
  ) => {
    const lastMovement = await findLastByCashRegister(cashRegisterId);
    const balance = lastMovement.balance + amount;
    const newMovement = await create(
      cash,
      "",
      7,
      lastMovement.balance,
      amount,
      0,
      balance,
      reference_id,
      user.id,
      cashRegisterId,
      paymentMethodId
    );

    return newMovement;
  };

  const noCashAmount = async (cash_register_id) => {
    const value = await cashRegisterMovements.noCashAmount(cash_register_id);
    return value;
  };

  //findAllByCashRegisterAndPaymentMethod(cash_register_id, payment_method_id)

  const findAllByCashRegisterAndPaymentMethod = async (
    cash_register_id,
    payment_method_id
  ) => {
    const cashRegisterMovements_ =
      await cashRegisterMovements.findAllByCashRegisterAndPaymentMethod(
        cash_register_id,
        payment_method_id
      );
    return cashRegisterMovements_;
  };

  // findAllByCashRegisterAndType(cash_register_id, type)

  const findAllByCashRegisterAndType = async (cash_register_id, type) => {
    const cashRegisterMovements_ =
      await cashRegisterMovements.findAllByCashRegisterAndType(
        cash_register_id,
        type
      );
    return cashRegisterMovements_;
  };

  // function voidById(id)
  const voidById = async (id) => {
    const cashRegisterMovement = await cashRegisterMovements.voidById(id);
    return cashRegisterMovement;
  };

  const createVoidSaleMovement = async (
    cashRegisterId,
    amount,
    reference_id
  ) => {
    const lastMovement = await findLastByCashRegister(cashRegisterId);
    const balance = lastMovement.balance + amount;
    const newMovement = await create(
      false,
      "Venta directa: " + reference_id,
      7,
      lastMovement.balance,
      amount,
      0,
      balance,
      reference_id,
      user.id,
      cashRegisterId,
      null
    );

    return newMovement;
  };

  return {
    create,
    findAllByCashRegister,
    findLastByCashRegister,
    types,
    createOpen,
    cerateInput,
    createOutput,
    cashAmount,
    createSaleMovement,
    noCashAmount,
    findAllByCashRegisterAndPaymentMethod,
    findAllByCashRegisterAndType,
    movementTypeList,
    voidById,
    createVoid
  };
}
