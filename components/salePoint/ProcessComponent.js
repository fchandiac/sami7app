import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import Document from "../prints/Document";
import PrintContainer from "../prints/PrintContainer";
import { useReactToPrint } from 'react-to-print' 

export default function ProcessComponent(props) {
  const { openDialog, setOpenDialog, documentData, finishProcess } = props;
  const printRef = useRef(null);

  const print = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <>
      <Dialog open={openDialog}>
        <Grid container spacing={1} direction={"column"} padding={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Proceso de venta</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box ref={printRef}>
              <Document documentData={documentData} />
            </Box>
          </Grid>
          <Grid item xs={12} textAlign={"right"}>
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              onClick={() => {
                print();
                setOpenDialog(false);
              }}
              disabled={!finishProcess}
            >
              Imprimir
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpenDialog(false);
              }}
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
