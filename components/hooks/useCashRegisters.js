import useCashregisterMovements from './useCashregisterMovements'
import useRecords from './useRecords'


const cashRegisters = require('@/services/cashRegisters')



export default function useCashRegisters() {
    const records = useRecords()
    const cashregisterMovements = useCashregisterMovements()
    // create(description, status, open, balance, close, open_user_id, close_user_id, sale_point_id)

    const create = async (description, status, open, balance, close, open_user_id, close_user_id, sale_point_id) => {
       const newCashRegister = await cashRegisters.create(description, status, open, balance, close, open_user_id, close_user_id, sale_point_id)
         return newCashRegister
    }

    const findAll = async () => {
        const cashRegisters = await cashRegisters.findAll()
        return cashRegisters
    }

    const findOneById = async (id) => {
        const cashRegister = await cashRegisters.findOneById(id)
        return cashRegister
    }

    const updateStatus = async (id, status) => {
        const cashRegister = await cashRegisters.updateStatus(id, status)
        return cashRegister
    }

    // findAllOpenBySalePoint(sale_point_id)

    const findAllOpenBySalePoint = async (sale_point_id) => {
        const cashRegisters_ = await cashRegisters.findAllOpenBySalePoint(sale_point_id)
        return cashRegisters_
    }

    // balanceCashRegister(cash_register_id, debit, credit) 
    const balanceCashRegister = async (cash_register_id, debit, credit) => {
        const updatedCashRegister = await cashRegisters.balanceCashRegister(cash_register_id, debit, credit)
        return updatedCashRegister
    }

    const updateClose = async (id, close, close_user_id) => {
        const cashRegister = await cashRegisters.updateClose(id, close, close_user_id)
        return cashRegister
    }

    const closeCashRegister = async (cashRegisterId, userId) => {
        const lastMovement = await cashregisterMovements.findLastByCashRegister(cashRegisterId)
        const newMovement = await cashregisterMovements.create(
            false,
            "Cierre de caja",
            2,
            lastMovement.balance,
            0,
            0,
            lastMovement.balance,
            null,
            userId,
            cashRegisterId
        );
        const changeStatus = await cashRegisters.updateStatus(cashRegisterId, false)
        const close = await cashRegisters.updateClose(cashRegisterId,lastMovement.balance, userId)
        const record = await records.closeCashRegister(userId, cashRegisterId)
        return close
    }

    // function findAllByStatus(status)

    const findAllByStatus = async (status) => {
        const cashRegisters_ = await cashRegisters.findAllByStatus(status)
        return cashRegisters_
    }



  return {
    create,
    findAll,
    findOneById,
    updateStatus,
    findAllOpenBySalePoint,
    balanceCashRegister,
    closeCashRegister,
    updateClose,
    findAllByStatus
  }
}
