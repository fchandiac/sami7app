import React, { useState } from "react";
import { Grid, TextField, Autocomplete, Button, Typography, Paper } from "@mui/material";
import useUtils from "@/components/hooks/useUtils";
import useCashregisterMovements from "@/components/hooks/useCashregisterMovements";
import useCashRegisters from "@/components/hooks/useCashRegisters";
import { useSalePointContext } from "../salePointProvider";
import { useAppContext } from "@/appProvider";



export default function Exchange() {
  const [movementOptions, setMovementOptions] = useState([
    {
      id: 1,
      key: 1,
      name: "Ingreso",
    },
    {
      id: 2,
      key: 2,
      name: "Egreso",
    },
  ]);
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const {info} = useSalePointContext();
  const { user, openSnack } = useAppContext();
  const cashRegisters = useCashRegisters();
  const cashregisterMovements = useCashregisterMovements();
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const saveMovement = async () => {
    if (selectedMovement.id === 1) {
      const lastMovement = await cashregisterMovements.findLastByCashRegister(info.cashRegisterId)
      const balance = lastMovement.balance + parseInt(removeThousandsSeparator(amount))
      const newMovement = await cashregisterMovements.create(
        true,
        description,
        4,
        lastMovement.balance,
        parseInt(removeThousandsSeparator(amount)),
        0,
        balance,
        null,
        user.id,
        info.cashRegisterId
      );
      if (newMovement) {
        openSnack("Movimiento guardado", "success");
        setAmount("");
        setDescription("");
      } else {
        openSnack("Error al guardar el movimiento", "error");
      }
    } else if (selectedMovement.id === 2) {
      const lastMovement = await cashregisterMovements.findLastByCashRegister(info.cashRegisterId)
      const balance = lastMovement.balance - parseInt(removeThousandsSeparator(amount))
      const newMovement = await cashregisterMovements.create(
        true,
        description,
        3,
        lastMovement.balance,
        parseInt(removeThousandsSeparator(amount)),
        0,
        balance,
        null,
        user.id,
        info.cashRegisterId
      );
      if (newMovement) {
        openSnack("Movimiento guardado", "success");
        setAmount("");
        setDescription("");
      } else {
        openSnack("Error al guardar el movimiento", "error");
      }
    }

  };

  return (
    <>
    <Paper variant="outlined" sx={{ padding: 1 }}>
      <form onSubmit={(e) => {e.preventDefault(); saveMovement()}}>
      <Grid container spacing={1} direction={"column"} minWidth={"200px"}>
        <Grid item>
            <Typography variant={'subtitle1'}>Ingreso / Egreso</Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            sx={{ flexGrow: 1 }}
            name="Movement"
            options={movementOptions}
            onChange={(event, newValue) => {
              if (newValue) {
                setSelectedMovement(newValue);
              } else {
                setSelectedMovement(null);
              }
            }}
            disablePortal
            defaultValue={null}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Movimiento"
                fullWidth
                size="small"
                required
              />
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Monto"
            name="amount"
            fullWidth
            size="small"
            value={addThousandsSeparator(amount)}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Descripción"
            fullWidth
            size="small"
            multiline
            rows={2}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />
        </Grid>
        <Grid item textAlign={"right"}>
          <Button
            variant="contained"
            onClick={() => {
              saveMovement();
            }}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
      </form>
    </Paper>
    </>
  );
}
