import { useAppContext } from "@/appProvider";
import useCashregisterMovements from "@/components/hooks/useCashregisterMovements";
import React from "react";
import { useSalePointContext } from "../salePointProvider";
import { Paper, Grid, Typography, Button } from "@mui/material";
import useCashRegisters from "@/components/hooks/useCashRegisters";

export default function Close(props) {
  const { setOpenLoadDialog } = props;
  const { info, setCashAmountCashRegister, setInfo, setInfoStatus } =
    useSalePointContext();
  const { user, openSnack } = useAppContext();
  const cashregisterMovements = useCashregisterMovements();
  const cashRegisters = useCashRegisters();

  const closeCashRegister = async () => {
    const close = await cashRegisters.closeCashRegister(
      info.cashRegisterId,
      user.id
    );
    if (close) {
      setOpenLoadDialog(true);
      openSnack("Caja cerrada", "success");
      setCashAmountCashRegister(0);
      setInfo({
        id: null,
        name: "",
        description: "",
        address: "",
        phone: "",
        status: false,
        storage: { id: 1001, key: 1001, name: "SALA DE VENTAS" },
        cashRegisterId: null,
      });
      setInfoStatus(false);
    } else {
      openSnack("Error al cerrar caja", "error");
    }
  };
  return (
    <>
      <Paper variant="outlined" sx={{ padding: 1 }}>
        <Grid container spacing={1} direction={"column"} minWidth={"200px"}>
          <Grid item>
            <Typography variant={"subtitle1"}>Cierre de Caja</Typography>
          </Grid>
          <Grid item textAlign={"center"}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                closeCashRegister();
              }}
            >
              Cerrar Caja
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
