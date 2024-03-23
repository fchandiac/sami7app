import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { useAppContext } from "@/appProvider";
import useRecords from "../hooks/useRecords";
import usePriceLists from "../hooks/usePriceLists";

export default function PriceListForm(props) {
  const {
    data = {
      id: null,
      name: "",
      description: "",
    },
    edit = false,
    afterSubmit = () => {},
    dialog = false,
  } = props;
  const { openSnack, user } = useAppContext();
  const records = useRecords();
  const priceLists = usePriceLists();
  const [priceListData, setPriceListData] = useState(data);

  const save = async () => {
    if (edit) {
      console.log("edit");
    } else {
      try {
        const newPriceList = await priceLists.create(
          priceListData.name,
          priceListData.description
        );
        setPriceListData({ id: 0, name: "", description: "" });
        afterSubmit();
        openSnack("Lista de precios creada", "success");
        // await records.createPriceList(user.id, newPriceList.name);
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
                {edit ? "Actualizar" : "Nueva"} Lista de precios
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Nombre"
                name="priceListName"
                variant="outlined"
                fullWidth
                value={priceListData.name}
                onChange={(e) => {
                  setPriceListData({ ...priceListData, name: e.target.value });
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Descripción"
                name="priceListDescription"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={priceListData.description}
                onChange={(e) => {
                  setPriceListData({
                    ...priceListData,
                    description: e.target.value,
                  });
                }}
                size="small"
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
