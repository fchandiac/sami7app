import { Grid, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import PDF417 from "pdf417-generator";
import moment from "moment";

const code =
  "12345678901234567890123456789012345678901234567890123456789012345678901234567890jhgjhgjhgjhgjhgjhgjhgkjhkjhkjhkjhkjh";

export default function Document(props) {
  const {
    documentType = 1,
    total = 0,
    cart = [],
    saleId = 0,
    referenceId = 0,
    date = moment(new Date()).format("DD-MM-YYYY"),
    time = moment(new Date()).format("HH:mm:ss"),
    comerceInfo = {
      fantasyName: "Nombre del Comercio",
      name: "Razón social del Comercio",
      address: "Dirección del Comercio",
      phone: "Teléfono del Comercio",
      rut: "Rut del Comercio",
    },
  } = props;

  const typeDocument = () => {
    switch (documentType) {
      case 1:
        return "Ticket";
      case 2:
        return "Boleta";
      case 3:
        return "Factura";
      default:
        return "Sin tipo de documento";
    }
  };

  useEffect(() => {
    const canvas = document.getElementById("barcodeCanvas");
    PDF417.draw(code, canvas);
  }, []);

  return (
    <>
      <Grid container spacing={1} direction={"column"}>
        <Grid item textAlign={"center"}>
          <Typography variant={"h6"}>{comerceInfo.fantasyName}</Typography>
          <Typography variant={"subtitle2"}>{comerceInfo.name}</Typography>
          <Typography variant={"subtitle2"}>{comerceInfo.rut}</Typography>
          <Typography variant={"subtitle2"}>{comerceInfo.address}</Typography>
          <Typography variant={"subtitle2"}>{comerceInfo.phone}</Typography>
        </Grid>
        <Grid item display={documentType == 1 ? "none" : "block"}>
          <Typography variant={"subtitle2"}>{typeDocument()}</Typography>
        </Grid>

        <Grid item textAlign={"center"}>
          <canvas id="barcodeCanvas" height={"90px"} width={"90px"} />
        </Grid>
        <Grid item>
          <Typography variant={"subtitle2"} textAlign={"center"}>
            Fecha: {date} Hora: {time}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
