import { Autocomplete, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStorages from "../hooks/useStorages";
import { useAppContext } from "@/appProvider";
import useRecords from "../hooks/useRecords";
import useSalePoints from "../hooks/useSalePoints";




// const sale_point = {
//   id: 0,
//   name: "",
//   description: "",
//   address: "",
//   phone: "",
//   storage: { id: 1001, key: 1001, name: "SALA DE VENTAS" },
//   status: false,
//   commerceNAme
//   comerce_rut
// };

export default function SalePointForm(props) {
  const {
    data = {
      id: null,
      name: "",
      description: "",
      commerce_name: "",
      commerce_rut: "",
      address: "",
      phone: "",
      Storage: null,
      status: false,
    },
    edit = false,
    afterSubmit = () => {},
  } = props;
  const { user, openSnack } = useAppContext();
  const records = useRecords();
  const salePoints = useSalePoints();
  const [salePointData, setSalePointData] = useState(data);
  const [storagesOptions, setStoragesOptions] = useState([]);
  const storages = useStorages();

  useEffect(() => {
    const fetch = async () => {
      const storagesData = await storages.findAllToAutocomplete();
      setStoragesOptions(storagesData);
    }
    fetch();
  }, []);



  const save = async () => {
    if (edit == true) {
      try {
        const updateSalePoint = await salePoints.update(
          salePointData.id,
          salePointData.name,
          salePointData.description,
          salePointData.address,
          salePointData.phone,
          salePointData.status,
          salePointData.Storage.id,
          salePointData.commerce_name,
          salePointData.commerce_rut
        );

    
          setSalePointData({
            id: null,
            name: "",
            description: "",
            commerce_name: "",
            commerce_rut: "",
            address: "",
            phone: "",
            Storage: null,
            status: false,
          });
          afterSubmit();
          openSnack("Punto de Venta actualizado", "success");
        
       
      } catch (err) {
        console.log(err);
        openSnack(err.errors[0].message, "error");

      }
    } else {
      try {
        const newSalePoint = await salePoints.create(
          salePointData.name,
          salePointData.description,
          salePointData.address,
          salePointData.phone,
          salePointData.status,
          salePointData.Storage.id,
          salePointData.commerce_name,
          salePointData.commerce_rut
        );
        setSalePointData({
          id: null,
          name: "",
          description: "",
          commerce_name: "",
          commerce_rut: "",
          address: "",
          phone: "",
          Storage: null,
          status: false,
        });
        afterSubmit();
        await records.createSalePoint(user.id, newSalePoint.name);
        openSnack("Punto de Venta creado", "success");

      } catch (err) {
        console.log(err);
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
                {edit ? "Actualizar" : "Nuevo"} Punto de Venta
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Nombre"
                value={salePointData.name}
                onChange={(e) =>
                  setSalePointData({ ...salePointData, name: e.target.value })
                }
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Descripción"
                value={salePointData.description}
                onChange={(e) =>
                  setSalePointData({
                    ...salePointData,
                    description: e.target.value,
                  })
                }
                multiline
                rows={2}
                fullWidth
                size="small"
              />
              </Grid>
              <Grid item>
              <TextField
                label="Nombre Comercio"
                value={salePointData.commerce_name}
                onChange={(e) =>
                  setSalePointData({
                    ...salePointData,
                    commerce_name: e.target.value,
                  })
                }
                fullWidth
                required
                size="small"
              />
              </Grid>
              <Grid item>
              <TextField
                label="Rut Comercio"
                value={salePointData.commerce_rut}
                onChange={(e) =>
                  setSalePointData({
                    ...salePointData,
                    commerce_rut: e.target.value,
                  })
                }
                fullWidth
                required
                size="small"
              />
              </Grid>
              <Grid item>
              <TextField
                label="Dirección"
                value={salePointData.address}
                onChange={(e) =>
                  setSalePointData({
                    ...salePointData,
                    address: e.target.value,
                  })
                }
                fullWidth
                required
                size="small"
              />
              </Grid>
              <Grid item>
              <TextField
                label="Teléfono"
                value={salePointData.phone}
                onChange={(e) =>
                  setSalePointData({
                    ...salePointData,
                    phone: e.target.value,
                  })
                }
                fullWidth
                required
                size="small"
              />
              </Grid>
              <Grid item>
              <Autocomplete
              name="Storage"
              value={salePointData.Storage}
              options={storagesOptions}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSalePointData({ ...salePointData, Storage: newValue });
                } else {
                  setSalePointData({ ...salePointData, Storage: null });
                }
              }}
        
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Almacén"
                  fullWidth
                  size="small"
                  required
             
                />
              )}
            />
                </Grid>
                <Grid item textAlign={'right'}>
                  <Button type="submit" variant="contained">
                    {edit ? "Actualizar" : "Guardar"}
                  </Button>
                  </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
