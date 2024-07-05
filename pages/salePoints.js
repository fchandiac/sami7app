import OpenCashRegisterCard from "@/components/cards/OpenCashRegisterCard";
import SalespointCard from "@/components/cards/SalespointCard";
import SalePointForm from "@/components/forms/SalePointForm";
import useCashRegisters from "@/components/hooks/useCashRegisters";
import useSalePoints from "@/components/hooks/useSalePoints";
import SalePointsTabs from "@/components/tabs/SalePointsTabs";
import { Grid, Paper, Typography, Box } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function SalePoints() {
  return (
    <>
      <SalePointsTabs
        SalePointsTab={SalePointsTab()}
        OpenCashRegistersTab={OpenCashRegistersTab()}
      />
    </>
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
        console.error("Error fetching sale points:", error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    // Update the sale points list after form submission
    console.log("Updating sale points list after form submission");
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
                <SalespointCard
                  data={salePoint}
                  updateAfterSubmit={() => {
                    handleFormSubmit();
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

function OpenCashRegistersTab() {
  const cashRegisters = useCashRegisters();
  const [cashRegistersList, setCashRegistersList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cashRegistersData = await cashRegisters.findAllByStatus(true);
        console.log("cashRegistersData", cashRegistersData);
        setCashRegistersList(cashRegistersData);
      } catch (error) {
        console.error("Error fetching open cash registers:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Grid container spacing={1} direction={'row'} wrap="nowrap">
        {cashRegistersList.map((cashRegister) => (
          <Grid item key={cashRegister.id} xs={4} minWidth={400}>
            <OpenCashRegisterCard data={cashRegister} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
