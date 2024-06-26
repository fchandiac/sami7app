import { useAppContext } from "@/appProvider";
import { Grid, Paper, Typography, TextField, FormControlLabel, Switch, Button } from "@mui/material";
import React, { useState } from "react";
import usePaymentMethods from "../hooks/usePaymentMethods";
import useRecords from "../hooks/useRecords";



export default function PaymenthMethodForm(props) {
  const {
    data = {
      id: null,
      name: "",
      description: "",
      credit: false,
    },
    edit = false,
    afterSubmit = () => {},
  } = props;
  const {user, openSnack} = useAppContext();
  const paymentMethods = usePaymentMethods();
  const records = useRecords();
  const [paymentMethodData, setPaymentMethodData] = useState(data);

  const save = async () => {
    if (edit) {
      const updatedPaymentMethod = await paymentMethods.update(
        paymentMethodData.id,
        paymentMethodData.name,
        paymentMethodData.description,
        paymentMethodData.credit,
      );
      if (updatedPaymentMethod) {
        openSnack("Medio de pago actualizado correctamente", "success");
        setPaymentMethodData({
          id: null,
          name: "",
          description: "",
          credit: false,
        });
        afterSubmit(paymentMethodData);
        const newRecord = await records.create(
          user.id,
          'actualizar',
          'medios de pago',
          `Medio de pago ${paymentMethodData.id} actualizado`,
        )
      } else {
        openSnack("Error al actualizar el medio de pago", "error");
      }
      


    } else {
      const newPaymentMethod =  await paymentMethods.create(
        paymentMethodData.name,
        paymentMethodData.description,
        paymentMethodData.credit,
      )
      if (newPaymentMethod) {
        openSnack("Medio de pago creado correctamente", "success");
        setPaymentMethodData({
          id: null,
          name: "",
          description: "",
          credit: false,
        
        });
        afterSubmit();
        const newRecord = await records.create(
          user.id,
          'crear',
          'medios de pago',
          `Medio de pago ${newPaymentMethod.name} creado`,
        )
      } else {
        openSnack("Error al crear el medio de pago", "error");
      }
    }
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
          <Grid container spacing={1} direction={"column"}>
            <Grid item>
              <Typography variant={"subtitle1"}>
                {edit ? "Actualizar" : "Nuevo"} Medio de pago
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Nombre"
                name="paymentMethodName"
                value={paymentMethodData.name}
                onChange={(e) =>
                  setPaymentMethodData({
                    ...paymentMethodData,
                    name: e.target.value,
                  })
                }
                required
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Descripción"
                name="paymentMethodDescription"
                value={paymentMethodData.description}
                onChange={(e) =>
                  setPaymentMethodData({
                    ...paymentMethodData,
                    description: e.target.value,
                  })
                }
                fullWidth
                variant="outlined"
                size="small"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={paymentMethodData.credit}
                  onChange={(e) => {
                    setPaymentMethodData({
                      ...paymentMethodData,
                      credit: e.target.checked,
                    });
                  }}
                  color="primary"
                />
              }
              label={
                paymentMethodData.credit
                  ? "Otorga crédito"
                  : "No otorga crédito"
              }
            />
          </Grid>
          <Grid item textAlign={'right'}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              {edit ? "Actualizar" : "Guardar"}
            </Button>
            </Grid>


          </Grid>
        </form>
      </Paper>
    </>
  );
}

