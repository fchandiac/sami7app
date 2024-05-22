import React from "react";
import { useSalePointContext } from "../salePointProvider";
import { Grid, Paper, Typography } from "@mui/material";
useSalePointContext;

export default function Info() {
  const { openSideBar, info } = useSalePointContext();

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1, minWidth:'300px' }} >
        <Grid container spacing={1} direction={"column"}>
          <Grid item>
            <Typography variant={"subtitle1"}>
              Información Punto de Venta
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12}>Id: {info.id}</Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12}>Nombre: {info.name}</Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12}>
              Dirección: {info.address}
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12}>
              Teléfono: {info.phone}
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12}>
              Nombre Comercial: {info.commerceName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12}>
              Rut del comercio: {info.commerceRut}
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12}>
              Almacén: {info.storage.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12}>
              Id de Caja: {info.cashRegisterId}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
