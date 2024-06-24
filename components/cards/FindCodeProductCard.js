import React, {useEffect, useState} from 'react'
import useProducts from '../hooks/useProducts'
import { useAppContext } from '@/appProvider'



export default function FindCodeProductCard(props) {
    const {productId, closeDialog} = props
    const products = useProducts()

  return (
    <div>FindCodeProductCard</div>
  )
}
