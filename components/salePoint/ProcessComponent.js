import { Button, Dialog, Grid, Typography } from "@mui/material";
import React from "react";
import Document from "../prints/Document";

export default function ProcessComponent(props) {
  const { openDialog, setOpenDialog, documentData, finishProcess } = props;
 
  return (
    <>
      <Dialog open={openDialog}>
        <Grid container spacing={1} direction={"column"} padding={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Proceso de venta</Typography>
          </Grid>
          <Grid item xs={12}>
            <Document documentData={documentData} />
          </Grid>
          <Grid item xs={12} textAlign={"right"}>
          <Button variant="contained"  sx={{mr:1}} onClick={() => setOpenDialog(false)}
          disabled={!finishProcess}
          >
              Imprimir
            </Button>
            <Button variant="contained" onClick={() => setOpenDialog(false)}
             disabled={!finishProcess}
            >
              Cerrar
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
