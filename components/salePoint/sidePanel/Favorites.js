import React from 'react'
import { useSalePointContext } from '../salePointProvider'


export default function favorites() {
  const {openSideBar} = useSalePointContext()
  return (
    <div>favorites</div>
  )
}
