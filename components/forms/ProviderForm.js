import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import useProviders from "../hooks/useProviders";
import { useAppContext } from "@/appProvider";
import useRecords from "../hooks/useRecords";
import useUtils from "../hooks/useUtils";

export default function ProviderForm(props) {
  const {
    data = {
      id: null,
      rut: "",
      name: "",
      address: "",
      phone: "",
      mail: "",
    },
    edit = false,
    afterSubmit = () => {},
  } = props;
  const providers = useProviders();
  const records = useRecords();
  const utils = useUtils();
  const { openSnack, user } = useAppContext();

  const [providerData, setProviderData] = useState(data);

  const save = async () => {
    if (edit) {
      console.log("edit");
    } else {
      try {
        const newProvider = await providers.create(
          providerData.rut,
          providerData.name,
          providerData.address,
          providerData.phone,
          providerData.mail
        );
        setProviderData({
          id: 0,
          rut: "",
          name: "",
          address: "",
          phone: "",
          mail: "",
        });
        afterSubmit();
        await records.createProvider(user.id, newProvider.name);
        openSnack("Proveedor creado", "success");
      } catch (err) {
        openSnack(err.errors[0].message, "error");
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
                {edit ? "Actualizar" : "Nuevo"} Proveedor
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Rut"
                name="providerRut"
                variant="outlined"
                fullWidth
                value={providerData.rut}
                onChange={(e) => {
                  setProviderData({
                    ...providerData,
                    rut: utils.formatRut(e.target.value),
                  });
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Nombre / Razón Social"
                name="providerName"
                variant="outlined"
                fullWidth
                value={providerData.name}
                onChange={(e) => {
                  setProviderData({ ...providerData, name: e.target.value });
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Dirección"
                name="providerAddress"
                variant="outlined"
                fullWidth
                value={providerData.address}
                onChange={(e) => {
                  setProviderData({ ...providerData, address: e.target.value });
                }}
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Teléfono"
                name="providerPhone"
                variant="outlined"
                fullWidth
                value={providerData.phone}
                onChange={(e) => {
                  setProviderData({ ...providerData, phone: e.target.value });
                }}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            +56
                        </InputAdornment>
                    ),
                }}
                inputProps={{
                    maxLength: 9, // Máximo de 9 caracteres
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Correo"
                name="providerMail"
                variant="outlined"
                fullWidth
                value={providerData.mail}
                onChange={(e) => {
                  setProviderData({ ...providerData, mail: e.target.value });
                }}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <MailOutlineIcon />
                        </InputAdornment>
                    ),
                }}
                inputProps={{
                    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
                    title: 'Ingrese una dirección de correo electrónico válida',
                }}
              />
            </Grid>
            <Grid item textAlign={"right"}>
              <Button type="submit" variant="contained" color="primary">
                {edit ? "Actualizar" : "Guardar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
