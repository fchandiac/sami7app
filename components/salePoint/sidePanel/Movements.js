import useCashregisterMovements from '@/components/hooks/useCashregisterMovements'
import React, {useEffect, useState} from 'react'
import { useSalePointContext } from '../salePointProvider'



export default function Movements() {
    const cashRegisterMovements = useCashregisterMovements()
    const {info} = useSalePointContext()



    useEffect(() => {
        const fecth = async () => {
            const data = await cashRegisterMovements.findAllByCashRegister(info.cashRegisterId)
            console.log(data)
        }
        fecth()
    }, [])


  return (
    <div>movements</div>
  )
}
