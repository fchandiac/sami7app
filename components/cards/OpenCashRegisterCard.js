import { Paper, Typography, Button } from "@mui/material";
import moment from "moment";
import React from "react";

export default function OpenCashRegisterCard(props) {
  const { data, updateAfterSubmit } = props;

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <Typography fontSize={12}>Id: {data.id}</Typography>
        <Typography fontSize={16}>{data.description}</Typography>
        <Typography fontSize={12}>
          Monto de apertura:{" "}
          {data.open.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </Typography>
        <Typography fontSize={12}>
          Fecha de apertura: {moment(data.created_at).format("DD-MM-YYYY HH:mm")}
        </Typography>
        <Typography fontSize={12}>
          balance de caja:{" "}
          {data.balance.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </Typography>
        <Typography fontSize={12}>
          Punto de venta: {data.sale_point_id}
        </Typography>

  
      </Paper>
    </>
  );
}
