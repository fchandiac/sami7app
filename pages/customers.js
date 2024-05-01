import CustomerForm from "@/components/forms/CustomerForm";
import CustomersTab from "@/components/tabs/CustomersTab";
import React, {useState} from "react";
import { Grid } from "@mui/material";
import CustomersGrid from "@/components/grids/CustomersGrid";

export default function customers() {
  return (
    <>
      <CustomersTab
        Customers={Customers()}
        Accounts={Accounts()}
      />
    </>
  );
}

function Customers() {
    const [gridState, setGridState] = useState(false);

    const updateGrid = () => {
      setGridState(!gridState);
    };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <CustomerForm
          afterSubmit={() => {
            updateGrid();
          }}
        />
      </Grid>
      <Grid item xs={12} md={9}>
          <CustomersGrid update={gridState} />
      </Grid>
    </Grid>
  );
}

function Accounts() {
  return (
    <div>
      <h1>Accounts</h1>
    </div>
  );
}
