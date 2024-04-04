import SalePointForm from '@/components/forms/SalePointForm'
import SalePointsTabs from '@/components/tabs/salePointsTabs'
import { Grid } from '@mui/material'
import React from 'react'

export default function salePoints() {
  return (
    <>
    <SalePointsTabs SalePoints={SalePoints()} />
    </>
  )
}

function SalePoints() {
  return (
    <>
       <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <SalePointForm  />
        </Grid>
        <Grid item xs={12} md={9}></Grid>
      </Grid>
    </>
  )
}