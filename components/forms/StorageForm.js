import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button, FormControlLabel, Switch } from "@mui/material";
import { useAppContext } from "@/appProvider";
import useRecords from "../hooks/useRecords";
import useStorages from "../hooks/useStorages";

export default function StorageForm(props) {
  const {
    data = {
      id: null,
      name: "",
      description: "",
      salesRoom: true,
    },
    edit = false,
    afterSubmit = () => {},
  } = props;
  const storages = useStorages();
  const records = useRecords();
  const { openSnack, user } = useAppContext();
  const [storageData, setStorageData] = useState(data);

  const save = async () => {
    if (edit) {
      console.log("edit");
    } else {
      try {
        const newStorage = await storages.create(
          storageData.name,
          storageData.description,
          storageData.salesRoom
        );
        setStorageData({ id: 0, name: "", description: "", salesRoom: true });
        afterSubmit();
        openSnack("Almacén creado", "success");
        await records.createStorage(user.id, newStorage.name);
      } catch (err) {
        console.log(err)
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
                {edit ? "Actualizar" : "Nuevo"} Almacén
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Nombre"
                name="storageName"
                variant="outlined"
                size="small"
                fullWidth
                value={storageData.name}
                onChange={(e) => {
                  setStorageData({ ...storageData, name: e.target.value });
                }}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Descripción"
                name="storageDescription"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={2}
                value={storageData.description}
                onChange={(e) => {
                  setStorageData({
                    ...storageData,
                    description: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={storageData.salesRoom}
                    onChange={(e) => {
                        setStorageData({
                            ...storageData,
                            salesRoom: e.target.checked,
                        });
                    }}
                    color="primary"
                  />
                }
                label={
                    storageData.salesRoom
                    ? "Sala de ventas"
                    : "Almacén interno"
                }
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
