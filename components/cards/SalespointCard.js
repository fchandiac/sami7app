import { Dialog, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SalePointForm from "../forms/SalePointForm";

export default function SalespointCard(props) {
  const {
    data = {
      id: null,
      name: "",
      description: "",
      commerce_name: "",
      commerce_rut: "",
      address: "",
      phone: "",
      storage: null,
      status: false,
    },
    updateAfterSubmit = () => {},
  } = props;

  const [salePointData, setSalePointData] = useState(data);
  const [openEditDialog, setOpenEditDialog] = useState(false);


  const afterSubmit = () => {
    updateAfterSubmit();
    setOpenEditDialog(false);
    console.log("afterSubmit");
  }

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <Grid container spacing={1} direction={"column"}>
          <Grid item>
            <Typography fontSize={10}>{salePointData.id}</Typography>
            <Typography variant="subtitle1">{salePointData.name}</Typography>
            <Typography fontSize={12}>{salePointData.commerceName}</Typography>
            <Typography fontSize={12}>{salePointData.commerceRut}</Typography>
            <Typography fontSize={10}>{salePointData.phone}</Typography>
            <Typography fontSize={10}>{salePointData.address}</Typography>
            <Typography fontSize={10}>{salePointData.status ? "Abierto" : "Cerrado"}</Typography>
            <Typography fontSize={10}>{salePointData.Storage.name}</Typography>
          </Grid>
          <Grid item textAlign={'right'}>
            <IconButton 
            onClick={() => {
              setOpenEditDialog(true);
            }}
            >
              <EditIcon  sx={{fontSize: 17}}/>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth={'sm'} fullWidth>
        <SalePointForm data={salePointData}  edit={true} afterSubmit={afterSubmit}/>
        </Dialog>
    </>
  );
}
