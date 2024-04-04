import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { useAppContext } from "@/appProvider";
import useTaxes from "../hooks/useTaxes";
import InputAdornment from "@mui/material/InputAdornment";
import useRecords from "../hooks/useRecords";


export default function TaxForm(props) {
  const {
    data = {
      id: null,
      name: "",
      percentage: '',
      description: "",
    },
    edit = false,
    afterSubmit = () => {},
  } = props;
  const taxes = useTaxes();
  const records = useRecords();
  const { openSnack, user } = useAppContext();
  const [taxData, setTaxData] = useState(data);

  const save = async () => {
    if (edit) {
      console.log("edit");
    } else {
      try {
        await taxes.create(
          taxData.name,
          taxData.description,
          taxData.percentage
        );
        await records.createTax(user.id, taxData.name);
        setTaxData({ id: 0, name: "", percentage: '', description: "" });
        afterSubmit();
        openSnack("Impuesto creado", "success");
      } catch (err) {
        openSnack(err.errors[0].message, "error");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <Paper variant="outlined" sx={{ p: 1 }}>
          <Grid container spacing={1} direction={"column"}>
            <Grid item>
              <Typography variant={"subtitle1"}>
                {edit ? "Actualizar" : "Nuevo"} impuesto
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Nombre"
                name="tax-name"
                variant="outlined"
                fullWidth
                value={taxData.name}
                onChange={(e) => {
                  setTaxData({ ...taxData, name: e.target.value });
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Porcentaje"
                variant="outlined"
                name="tax-percentage"
                fullWidth
                value={taxData.percentage}
                onChange={(e) => {
                  setTaxData({ ...taxData, percentage: e.target.value });
                }}
                size="small"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                  inputProps: {
                    title: "Ingrese solo números enteros o decimales",
                    min: 0,
                    max: 100,
                    type: "number",
                    step: 0.01,
                  },
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={taxData.description}
                onChange={(e) => {
                  setTaxData({ ...taxData, description: e.target.value });
                }}
                size="small"
              />
            </Grid>
            <Grid item textAlign={"right"}>
              <Button variant="contained" color="primary" type="submit">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
}
