import React, { useEffect, useState } from "react";
import usePurchasePrices from "../hooks/usePurchasePrices";
import useProviders from "../hooks/useProviders";
import {
  Autocomplete,
  Grid,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import providers from "@/pages/providers";

export default function PurchasePriceForm(props) {
  const { purchasePriceId } = props;
  const providers = useProviders();
  const purchasePrices = usePurchasePrices();
  const [proviedersOptions, setProvidersOptions] = useState([]);
  const [purchasePriceData, setPurchasePriceData] = useState({
    id: null,
    net: 0,
    gross: 0,
    provider: null,
    taxes: [],
  });

  useEffect(() => {
    const fetchProviders = async () => {
      const providersList = await providers.findAll();
      setProvidersOptions(providersList);
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    if (purchasePriceId) {
      const fetchPrice = async () => {
        const price = await purchasePrices.findByPk(purchasePriceId);

        setPurchasePriceData({
          id: price.id,
          net: price.net,
          gross: price.gross,
          provider: price.Provider,
          taxes: price.Taxes,
        });
      };
      fetchPrice();
    }
  }, [purchasePriceId]);

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <Grid container spacing={1} direction={"column"}>
          <Grid item>
            <Typography variant="subtitle1">
              Actulizar precio de compra
            </Typography>
          </Grid>
          <Grid item>
            <Autocomplete
              options={proviedersOptions}
              value={purchasePriceData.provider}
              getOptionLabel={(option) => option.name}
              onChange={(e, newValue) => {
                setPurchasePriceData({
                  ...purchasePriceData,
                  provider: newValue,
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Proveedor" size="small" />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              name="net"
              value={purchasePriceData.net}
              onChange={(e) =>
                setPurchasePriceData({
                  ...purchasePriceData,
                  net: e.target.value,
                })
              }
              label="Precio neto"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
