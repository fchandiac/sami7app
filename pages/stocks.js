import StorageForm from "@/components/forms/StorageForm";
import SotoragesGrid from "@/components/grids/SotoragesGrid";
import StocksGrid from "@/components/grids/StocksGrid";
import StocksTab from "@/components/tabs/StocksTab";
import { Grid } from "@mui/material";
import React, { useState } from "react";

export default function stocks() {
  return (
    <>
      <StocksTab Stocks={Stocks()} Storages={Storages()} />
    </>
  );
}

function Stocks() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
    <StocksGrid update={gridState} />
    </>
  );
}

function Storages() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <StorageForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <SotoragesGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}
