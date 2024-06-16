import { Paper, Grid } from '@mui/material'
import moment from 'moment'
import React, {useState, useEffect} from 'react'
import usePurchases from '../hooks/usePurchases'



export default function PurchaseDetailCard(props) {
    const {id} = props
    const purchases = usePurchases()
    const [purchaseData, setPurchaseData] = useState({
        id: 0,
        description: "",
        documentType: 0,
        documentId: 0,
        net: 0,
        tax: 0,
        total: 0,
        userName: "",
        providerName: "",
        createdAt: moment().format('DD-MM-YYYY HH:mm'),
        details: []
    })

    useEffect(() => {
        const fetchData = async () => {
            const purchase = await purchases.findById(id)
            console.log(purchase)
            setPurchaseData(purchase)
        }
        fetchData()
    }, [id])

    


  return (
    <>
    <Paper variant='outlined'>
        <Grid >

        </Grid>
    </Paper>
    </>
  )
}
