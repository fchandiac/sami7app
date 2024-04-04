import { Grid, Paper, Autocomplete, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import useStocks from "../hooks/useStocks";
import { useAppContext } from "@/appProvider";
import { set } from "autonumeric";


export default function StockMovementForm(props) {
  const { product, afterSubmit, storage } = props;
  const {openSnack, user} = useAppContext();
  const stocks = useStocks();
  const [movementOptions, setMovementOptions] = useState([
    // { id: 0, key: 0, name: "creación de stock" },
    // { id: 1, key: 1, name: "venta" },
    // { id: 2, key: 2, name: "devolución" },
    { id: 3, key: 3, name: "ajuste" },
    { id: 4, key: 4, name: "consumo" },
    { id: 5, key: 5, name: "recepción" },
    { id: 6, key: 6, name: "despacho" },
  ]);
  const [movementFeatures, setMovementFeatures] = useState([
    {
      id: 1,
      key: 1,
      name: "incremento de stock",
    },
    {
      id: 2,
      key: 2,
      name: "descuento de stock",
    },
  ]);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [quanty, setQuanty] = useState(null);


  const authAdd = (type, feature) => {
    const authMap = {
        "3-1": true,
        "3-2": true,
        "4-1": false,
        "4-2": true,
        "5-1": true,
        "5-2": false,
        "6-1": false,
        "6-2": true
    };

    const key = `${type}-${feature}`;
    return authMap[key] ?? null;
};

  const save = async () => {
    console.log(product)
    if(product === null ){
        openSnack("Debe seleccionar un producto", "error");
    } else if(storage === null){
        openSnack("Debe seleccionar un almacén", "error");
    } else {
        let auth = authAdd(selectedMovement.id, selectedFeature.id);

        if (auth === false){
            console.log("no se puede realizar esta operación")
            openSnack("No se puede realizar esta operación", "error");
        } else{
            const stock = await stocks.findOneByStorageAndProduct(
                storage.id,
                product.id
              );
              console.log(stock);
        
            if(selectedFeature.id === 1){
                const stockUpdate = await stocks.addStock(stock.id, parseInt(quanty));
                const movement = await stocks.createAddMovement(stock.id, parseInt(quanty), null, selectedMovement.id);
                afterSubmit()
                openSnack("Stock actualizado", "success");
            } else if(selectedFeature.id === 2){
                const stockUpdate = await stocks.decrementStock(stock.id, parseInt(quanty));
                const movement = await stocks.createDecrementMovement(stock.id, parseInt(quanty), null, selectedMovement.id);
                afterSubmit()
                openSnack("Stock actualizado", "success");
            }
        
        }
    

    }
  };

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <form onSubmit={(e)=>{
            e.preventDefault();
            save();
            
        }}>
        <Grid container spacing={1} direction={"column"}>
          <Grid item>
            <Autocomplete
              name="stock-movement"
              options={movementOptions}
              value={selectedMovement}
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
                  label="Tipo de movimiento"
                  fullWidth
                  size="small"
                  required
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              name="stock-movement-feature"
              options={movementFeatures}
              value={selectedFeature}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSelectedFeature(newValue);
                } else {
                    setSelectedFeature(null);
                }
              }}
              disablePortal
              defaultValue={null}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Característica de movimiento"
                  fullWidth
                  size="small"
                  required
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Cantidad"
              variant="outlined"
              name="quanty"
              type="number"
              fullWidth
              value={quanty}
              onChange={(e) => {
                setQuanty(e.target.value);
              }}
              size="small"
              required
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item textAlign={"right"}>
            <Button variant="contained" type="submit">
              Guardar
            </Button>
          </Grid>
        </Grid>
        </form>
      </Paper>
    </>
  );
}
