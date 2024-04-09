import { useAppContext } from '@/appProvider'
import usePaymentMethods from './usePaymentMethods'

const cashRegisterMovements = require('@/services/cashRegistersMovements')



export default function useCashregisterMovements() {
    const { user } = useAppContext()
    const paymentMethods = usePaymentMethods()

    const create = async (cash, description, type, previous_balance, debit, credit, balance, reference_id, user_id, cash_register_id) => {
        const newCashRegisterMovement = await cashRegisterMovements.create(cash, description, type, previous_balance, debit, credit, balance, reference_id, user_id, cash_register_id)
        return newCashRegisterMovement
    }

    const findAllByCashRegister = async (cash_register_id) => {
        const cashRegisterMovements = await cashRegisterMovements.findAllByCashRegister(cash_register_id)
        return cashRegisterMovements
    }

    const findLastByCashRegister = async (cash_register_id) => {
        const cashRegisterMovement = await cashRegisterMovements.findLastByCashRegister(cash_register_id)
        return cashRegisterMovement
    }

    const types = (type) => {
        switch (type) {
            case 1:
                return 'Apertura'
            case 2:
                return 'Cierre'
            case 3:
                return 'Egreso'
            case 4:
                return 'Ingreso'
            case 5:
                return 'Gasto'
            case 6:
                return 'Pago'
            case 7:
                return 'Venta directa'
            default:
                return 'N/A'
        }
    }

    const createOpen = async ( cash_register_id, amount) => {
        const openMovement = await create(
            true,
            'Apertura',
            1,
            0,
            amount,
            0,
            amount,
            null,
            user.id,
            cash_register_id,
            1001
        )
        return openMovement
    }

    const cerateInput = async (cashRegisterId, amount, description) =>{
        const lastMovement = await findLastByCashRegister(cashRegisterId)
        const balance = lastMovement.balance + amount
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
        )
        return newMovement
    }

    const createOutput = async (cashRegisterId, amount, description) =>{
        const lastMovement = await findLastByCashRegister(cashRegisterId)
        const balance = lastMovement.balance - amount
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
        )
        return newMovement
    }

    const cashAmount = async (cash_register_id) => {
        const lastMovement = await findLastByCashRegister(cash_register_id)
        return lastMovement.balance
    }

    const createSaleMovement = async (cashRegisterId, amount, reference_id, cash) => {
        const lastMovement = await findLastByCashRegister(cashRegisterId)
        const balance = lastMovement.balance + amount
        const newMovement = await create(
            cash,
            'Venta directa: ' + reference_id,
            7,
            lastMovement.balance,
            amount,
            0,
            balance,
            reference_id,
            user.id,
            cashRegisterId
        )
       
        
        return newMovement
    }

    return {
        create,
        findAllByCashRegister,
        findLastByCashRegister,
        types,
        createOpen,
        cerateInput,
        createOutput,
        cashAmount,
        createSaleMovement
    }


}
