import React, { useEffect, useState } from "react";
import usePurchasePrices from "../hooks/usePurchasePrices";
import useProviders from "../hooks/useProviders";
import {
  Autocomplete,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import providers from "@/pages/providers";
import RedoIcon from '@mui/icons-material/Redo';
import useUtils from "../hooks/useUtils";
import TitlePaper from "../custom/TitlePaper";
import useRecords from "../hooks/useRecords";
import { useAppContext } from "@/appProvider";
import useSellingPrices from "../hooks/useSellingPrices";





export default function PurchasePriceForm(props) {
  const { purchasePriceId, productName, afterSubmit, productId } = props;
  const providers = useProviders();
  const records = useRecords();
  const sellingPrices = useSellingPrices();
  const {user} = useAppContext();
  const {
    addThousandsSeparator,
    removeThousandsSeparator,
    grossPrice,
    taxesAmount,
  } = useUtils();
  const purchasePrices = usePurchasePrices();
  const [proviedersOptions, setProvidersOptions] = useState([]);
  const [purchasePriceData, setPurchasePriceData] = useState({
    id: null,
    net: '',
    gross: '',
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
          net: addThousandsSeparator(price.net),
          gross: addThousandsSeparator(price.gross),
          provider: price.Provider,
          taxes: price.Taxes,
        });
      };
      fetchPrice();
    }
  }, [purchasePriceId]);

  const calcGross = () => {
    const net = removeThousandsSeparator(purchasePriceData.net);
    const taxes = purchasePriceData.taxes;
    const gross = grossPrice(net, taxes);
    setPurchasePriceData({
      ...purchasePriceData,
      gross: addThousandsSeparator(gross),
    });
  };

  const save = async () => {
    try {
      const updatedPrice = await purchasePrices.update(
        purchasePriceData.id,
        removeThousandsSeparator(purchasePriceData.net),
        removeThousandsSeparator(purchasePriceData.gross),
        purchasePriceData.provider.id
      );

      //Update selling price

      const sellingPrice = await sellingPrices.updatePurchaseNetByProduct(productId, removeThousandsSeparator(purchasePriceData.net));

      const newRecord = await records.create(
        user.id,
        'actualizar',
        'precios de compra',
        'actualiza precio de compra producto ' + productName + ' a ' + purchasePriceData.gross,
      )
      console.log(updatedPrice)
      afterSubmit(removeThousandsSeparator(purchasePriceData.gross), productId);

    
    } catch (error) {
      console.log(error);
    }
    
    
  }

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <form onSubmit={(e) => {e.preventDefault(); save()}}>

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
          <Grid item display={'flex'}>
            <TextField
            sx={{ flexGrow: 1 }}
              name="net"
              value={addThousandsSeparator(purchasePriceData.net) || ''}
              onChange={(e) =>
                setPurchasePriceData({
                  ...purchasePriceData,
                  net: e.target.value,
                })
              }
              label="Precio neto"
              variant="outlined"
              size="small"
              fullWidth
            />
            <IconButton onClick={() => calcGross()}>
              <RedoIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <TitlePaper title="Impuestos">
            <Grid container spacing={1}>
              {purchasePriceData.taxes.map((tax) => (
                <Grid item key={tax.id}>
                  <Typography variant="body2">
                    {tax.name} ({tax.percentage}%)
                  </Typography>
                </Grid>
              ))}
            </Grid>
            </TitlePaper>
          </Grid>
          <Grid item>
            <TextField
              name="gross"
              value={addThousandsSeparator(purchasePriceData.gross) || ''}
              onChange={(e) =>
                setPurchasePriceData({
                  ...purchasePriceData,
                  gross: e.target.value,
                })
              }
              label="Precio de compra"
              variant="outlined"
              size="small"
              fullWidth
            />
            </Grid>
          <Grid item textAlign={'right'}>
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </Grid>
            
        </Grid>
        </form>
      </Paper>
    </>
  );
}
