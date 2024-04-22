import PaymentsTab from "@/components/tabs/PaymentsTab";
import React,{useState} from "react";
import { Grid } from "@mui/material";
import PaymenthMethodForm from "@/components/forms/PaymenthMethodForm";
import PaymentsMethodsGrid from "@/components/grids/paymentsMethodsGrid";

export default function payments() {
  return (
    <>
      <PaymentsTab PaymentMethods={PaymentMethods()} />
    </>
  );
}

function PaymentMethods() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <PaymenthMethodForm 
           afterSubmit={() => {
            updateGrid();
          }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <PaymentsMethodsGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}
