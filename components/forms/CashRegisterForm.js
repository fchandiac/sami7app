import React, { useState } from "react";
import useCashRegisters from "../hooks/useCashRegisters";
import useRecords from "../hooks/useRecords";
import { useAppContext } from "@/appProvider";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import useUtils from "../hooks/useUtils";
import { useSalePointContext } from "../salePoint/salePointProvider";
import useCashregisterMovements from "../hooks/useCashregisterMovements";
import OpenCashRegister from "../prints/OpenCashRegister";

//description, status, open, balance, close, open_user_id, close_user_id, sale_point_id
export default function CashRegistersForm(props) {
  const {
    data = {
      description: "",
      status: true,
      open: "",
      balance: 0,
      close: 0,
      open_user_id: null,
      close_user_id: null,
      sale_point_id: null,
    },
    afterSubmit = () => {},
    edit = false,
  } = props;
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const cashRegisters = useCashRegisters();
  const cashRegisterMovements = useCashregisterMovements();
  const records = useRecords();
  const { user, openSanck } = useAppContext();
  const { info } = useSalePointContext();
  const [cashRegisterData, setCashRegisterData] = useState(data);
  const [openMovementToPrint, setOpenMovementToPrint] = useState({});
  const [printState, setPrintState] = useState(false);

  const save = async () => {
    if (edit) {
      console.log("edit");
    } else {
      const newCashRegister = await cashRegisters.create(
        cashRegisterData.description,
        true,
        removeThousandsSeparator(cashRegisterData.open),
        removeThousandsSeparator(cashRegisterData.open),
        0,
        user.id,
        null,
        info.id
      );
      await records.createCashRegister(user.id, newCashRegister.id);

      const movement_ = await cashRegisterMovements.createOpen(
        newCashRegister.id,
        parseInt(removeThousandsSeparator(cashRegisterData.open))
      );

      setOpenMovementToPrint(movement_);

      console.log("movement", movement_);
      print()
      setTimeout(() => {
        afterSubmit();
      }, 2000);


     
    }
  };

  const print = () => {
    setPrintState(true);
  };

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <Grid container spacing={2} direction={"column"}>
            <Grid item>
              <Typography variant={"subtitle1"}>
                {edit ? "Actualizar" : "Nueva"} Caja
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Descripción"
                name="description"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                value={cashRegisterData.description}
                onChange={(e) => {
                  setCashRegisterData({
                    ...cashRegisterData,
                    description: e.target.value,
                  });
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Monto de apertura"
                name="open"
                variant="outlined"
                fullWidth
                value={cashRegisterData.open}
                onChange={(e) => {
                  setCashRegisterData({
                    ...cashRegisterData,
                    open: addThousandsSeparator(e.target.value),
                  });
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item textAlign={"right"}>
              <Button variant="contained" type="submir">
                {edit ? "Actualizar" : "Guardar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Box display={"block"}>
        <OpenCashRegister
          movement={openMovementToPrint}
          printState={printState}
        />
      </Box>
    </>
  );
}
