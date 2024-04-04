import PaymentsTab from "@/components/tabs/PaymentsTab";
import React from "react";
import { Grid } from "@mui/material";
import PaymenthMethodForm from "@/components/forms/PaymenthMethodForm";

export default function payments() {
  return (
    <>
      <PaymentsTab PaymentMethods={PaymentMethods()} />
    </>
  );
}

function PaymentMethods() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <PaymenthMethodForm />
        </Grid>
        <Grid item xs={12} md={9}></Grid>
      </Grid>
    </>
  );
}
