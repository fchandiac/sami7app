import React, { useState, useEffect } from "react";
import useLioren from "../hooks/useLioren";
import {
  Grid,
  Paper,
  Autocomplete,
  Typography,
  TextField,
  IconButton,
  Button,
  InputAdornment
} from "@mui/material";
import { useAppContext } from "@/appProvider";
import useCustomers from "../hooks/useCustomers";
import useUtils from "../hooks/useUtils";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function CustomerForm(props) {
  const {
    data = {
      id: null,
      rut: "",
      name: "",
      activity: "",
      address: "",
      phone: "",
      mail: "",
      district: null,
      city: null,
    },
    edit = false,
    afterSubmit = () => {},
  } = props;
  const { openSnack, user } = useAppContext();
  const lioren = useLioren();
  const customers = useCustomers();
  const utils = useUtils();
  const [customerData, setCustomerData] = useState(data);
  const [districtsOptions, setDistrictsOptions] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const districties = await lioren.district();
      const formattedDistricties = districties.map((d) => {
        return {
          id: d.id,
          key: d.id,
          name: d.nombre,
          number: d.numero,
          regionId: d.region_id,
        };
      });
      setDistrictsOptions(formattedDistricties);

      const cities = await lioren.cities();
      const formattedCities = cities.map((c) => {
        return {
          id: c.id,
          key: c.id,
          name: c.nombre,
          regionId: c.region_id,
        };
      });
      setCitiesOptions(formattedCities);
    };
    fetch();
  }, []);

  const save = async () => {
    if (edit) {
      console.log("edit");
    } else {
    }
  };

  const findSii= async () => {
    try {
        if (customerData.rut == ''){
            openSnack('Debe completar el Rut', 'error')
            return
        } else {
            const infoSii = await customers.findFromSII(customerData.rut)
            setCustomerData({...customerData, name: infoSii.razon_social, activity: infoSii.actividades[0].giro} )
        }
    } catch(err){
        console.log(err)
    }
  }

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
                {edit ? "Actualizar" : "Nuevo"} Cliente
              </Typography>
            </Grid>
            <Grid item display={"flex"}>
              <TextField
                label="Rut"
                name="customerRut"
                variant="outlined"
                fullWidth
                value={customerData.rut}
                onChange={(e) => {
                  setCustomerData({
                    ...customerData,
                    rut: utils.formatRut(e.target.value),
                  });
                }}
                size="small"
                required
                sx={{ flexGrow: 1 }}
              />
              <IconButton onClick={(e) => {findSii()}}>
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <TextField
                label="Nombre / Razón Social"
                name="customerName"
                variant="outlined"
                fullWidth
                value={customerData.name}
                onChange={(e) => {
                  setCustomerData({...customerData, name: e.target.value})
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item>
                <TextField
                label='Actividad'
                name="customerActivity"
                variant="outlined"
                fullWidth
                value={customerData.activity}
                onChange={(e) => {
                    setCustomerData({...customerData, activity: e.target.value})
                }}
                size="small"
                />
            </Grid>
            <Grid item>
              <Autocomplete
                sx={{ flexGrow: 1 }}
                id="district"
                options={districtsOptions}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setCustomerData({ ...customerData, district: newValue });
                  } else {
                    setCustomerData({ ...customerData, district: null });
                  }
                }}
                disablePortal
                defaultValue={null}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Comuna"
                    fullWidth
                    size="small"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                sx={{ flexGrow: 1 }}
                id="city"
                options={citiesOptions}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setCustomerData({ ...customerData, city: newValue });
                  } else {
                    setCustomerData({ ...customerData, city: null });
                  }
                }}
                disablePortal
                defaultValue={null}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ciudad"
                    fullWidth
                    size="small"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Dirección"
                name="customerAddress"
                variant="outlined"
                fullWidth
                value={customerData.address}
                onChange={(e) => {
                  setCustomerData({ ...customerData, address: e.target.value });
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
                value={customerData.phone}
                onChange={(e) => {
                  setCustomerData({ ...customerData, phone: e.target.value });
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
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Mail"
                name="providerMail"
                variant="outlined"
                fullWidth
                value={customerData.mail}
                onChange={(e) => {
                  setCustomerData({ ...customerData, mail: e.target.value });
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
            <Grid item textAlign={'right'}>
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
