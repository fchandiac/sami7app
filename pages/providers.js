import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import ProviderForm from "@/components/forms/ProviderForm";
import ProvidersGrid from "@/components/grids/ProvidersGrid";
import ProvidersTab from "@/components/tabs/ProvidersTab";
import useProviders from "@/components/hooks/useProviders";
import useProviderAccountMovements from "@/components/hooks/useProviderAccountMovements";
import ProviderAccountMovementsGrid from "@/components/grids/ProviderAccountMovementsGrid";
import usePurchases from "@/components/hooks/usePurchases";
import PurchasesGrid from "@/components/grids/PurchasesGrid";

export default function providers() {
  return (
    <ProvidersTab
      Providers={<Providers />}
      Accounts={<Accounts />}
      Purchases={<Purchases />}
    />
  );
}

function Providers() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <ProviderForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <ProvidersGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}

function Accounts() {
  const providers = useProviders();
  const providerAccountMovements = useProviderAccountMovements();
  const [providerOptions, setProviderOptions] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [movementsList, setMovementsList] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const providersList = await providers.findAll();
      setProviderOptions(providersList);
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    if (selectedProvider) {
      const fetchMovements = async () => {
        const movements = await providerAccountMovements.findAllByProvider(
          selectedProvider.id
        );
        setMovementsList(movements);
        console.log("movements", movements);
      };
      fetchMovements();
    }
  }, [selectedProvider]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Paper variant="outlined" sx={{ p: 1 }}>
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <Typography variant="subtitle1">Filtro</Typography>
              </Grid>
              <Grid item>
                <Autocomplete
                  options={providerOptions}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    setSelectedProvider(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Proveedor" size="small" />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <ProviderAccountMovementsGrid
            movementsList={movementsList}
            title={
              "Cuenta proveedor: " +
              (selectedProvider ? selectedProvider.name : "")
            }
          />
        </Grid>
      </Grid>
    </>
  );
}



function Purchases() {
  const purchases = usePurchases();
  const providers = useProviders();
  const [providerOptions, setProviderOptions] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [purchasesList, setPurchasesList] = useState([]);



  useEffect(() => {
    const fetchProviders = async () => {
      const providersList = await providers.findAll();
      setProviderOptions(providersList);
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    if (selectedProvider) {
      const fetchPurchases = async () => {
        const list = await purchases.findAllByProvider(
          selectedProvider.id
        );
        setPurchasesList(list);
      };
      fetchPurchases();
    }
  }, [selectedProvider]);

  return (

      <>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <Paper variant="outlined" sx={{ p: 1 }}>
              <Grid container spacing={1} direction={"column"}>
                <Grid item>
                  <Typography variant="subtitle1">Filtro</Typography>
                </Grid>
                <Grid item>
                  <Autocomplete
                    options={providerOptions}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      setSelectedProvider(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Proveedor" size="small" />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <PurchasesGrid
              purchasesList={purchasesList}
              title={
                "Compras proveedor: " +
                (selectedProvider ? selectedProvider.name : "")
              }
            />
          </Grid>
        </Grid>
      </>

  );
}
