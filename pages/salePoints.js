import SalespointCard from "@/components/cards/SalePointCard";
import SalePointForm from '@/components/forms/SalePointForm';
import useSalePoints from '@/components/hooks/useSalePoints';
import SalePointsTabs from '@/components/tabs/SalePointsTabs';
import { Grid, Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function SalePoints() {
  return (
    <SalePointsTabs SalePoints={<SalePointsTab />} />
  );
}

function SalePointsTab() {
  const salePoints = useSalePoints();
  const [salePointsList, setSalePointsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salePointsData = await salePoints.findAll();
        setSalePointsList(salePointsData);
      } catch (error) {
        console.error('Error fetching sale points:', error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    // Update the sale points list after form submission
    console.log('Updating sale points list after form submission');
    const updatedSalePoints = await salePoints.findAll();
    setSalePointsList(updatedSalePoints);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <SalePointForm afterSubmit={handleFormSubmit} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper variant="outlined" sx={{ p: 1 }}>
          <Typography variant="subtitle1">Puntos de Venta</Typography>
          <Grid container spacing={1}>
            {salePointsList.map((salePoint) => (
              <Grid item xs={4} key={salePoint.id}>
                <SalespointCard data={salePoint} updateAfterSubmit={() => { handleFormSubmit()}} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}