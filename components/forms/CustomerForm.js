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
  InputAdornment,
} from "@mui/material";
import { useAppContext } from "@/appProvider";
import useUtils from "../hooks/useUtils";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import useRecords from "../hooks/useRecords";
import useCustomers from "@/components/hooks/useCustomers";






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
  const records = useRecords();

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

      try{
        const newCustomer = await customers.create(
          customerData.rut,
          customerData.name,
          customerData.activity,
          customerData.district.id,
          customerData.city.id,
          customerData.address,
          customerData.phone,
          customerData.mail
      
        );
        openSnack("Cliente creado correctamente", "success");
        records.create(user.id, "crear", "clientes", "crea nuevo cliente: " + customerData.name);
        setCustomerData({
          id: null,
          rut: "",
          name: "",
          activity: "",
          address: "",
          phone: "",
          mail: "",
          district: null,
          city: null,
        });
        afterSubmit();
      } catch (err) {
        console.log(err);
        openSnack(err.errors[0].message, 'error')
      }
    }
     
  };

  const findSii = async () => {
    try {
      if (customerData.rut == "") {
        openSnack("Debe completar el Rut", "error");
        return;
      } else {
        const infoSii = await customers.findFromSII(customerData.rut);
        setCustomerData({
          ...customerData,
          name: infoSii.razon_social,
          activity: infoSii.actividades[0].giro,
        });
      }
    } catch (err) {
      window.open('https://zeus.sii.cl/cvc/stc/stc.html', '_blank');
      console.log(err);
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
              <IconButton
                onClick={(e) => {
                  findSii();
                }}
              >
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <TextField
                label="Nombre / Razón Social"
                name="customerNameField"
                variant="outlined"
                fullWidth
                value={customerData.name}
                onChange={(e) => {
                  setCustomerData({ ...customerData, name: e.target.value });
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Actividad"
                name="customerActivity"
                variant="outlined"
                fullWidth
                value={customerData.activity}
                onChange={(e) => {
                  setCustomerData({
                    ...customerData,
                    activity: e.target.value,
                  });
                }}
                size="small"
              />
            </Grid>
            <Grid item>
              <Autocomplete
                sx={{ flexGrow: 1 }}
                id="districtField"
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
                id="cityField"
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
                name="customerAddressField"
                variant="outlined"
                fullWidth
                value={customerData.address}
                onChange={(e) => {
                  setCustomerData({ ...customerData, address: e.target.value });
                }}
                size="small"
                required
                inputProps={{
                  minLength: 9, // Máximo de 9 caracteres
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Teléfono"
                name="cuscomerPhone"
                variant="outlined"
                fullWidth
                value={customerData.phone}
                onChange={(e) => {
                  setCustomerData({ ...customerData, phone: e.target.value });
                }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+56</InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 9, // Máximo de 9 caracteres
                }}
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
