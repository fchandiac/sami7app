import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  IconButton,
  FormControlLabel,
  Switch,
  Autocomplete,
  Button,
  Dialog,
  InputAdornment,
} from "@mui/material";
import { useNewProductFormContext } from "./newProductProvider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import AddCircleIcon from "@mui/icons-material/AddCircle";


import TaxesComponent from "./TaxesComponent";
import ProviderForm from "../ProviderForm";
import useProviders from "@/components/hooks/useProviders";
import useUtils from "@/components/hooks/useUtils";
import usePurchasePrices from "@/components/hooks/usePurchasePrices";
import { useAppContext } from "@/appProvider";


export default function PurchasePriceComponent() {
  const {
    purchasePrice,
    activeStep,
    setActiveStep,
    setPurchaseProvider,
    setPurchaseNetPrice,
    setPurchaseGrossPrice,
    setPurchaseUse
  } = useNewProductFormContext();
  const providers = useProviders();
  const purchasePrices = usePurchasePrices();
  const { addThousandsSeparator, removeThousandsSeparator, grossPrice, netPrice } = useUtils();
  const { openSnack } = useAppContext();

  const [providerOptions, setProviderOptions] = useState([]);
  const [openNewProvider, setOpenNewProvider] = useState(false);
  const [updateProviders, setUpdateProviders] = useState(false);

  useEffect(() => {
    const fecth = async () => {
      const data = await providers.findAllToAutocomplete();
      setProviderOptions(data);
    };
    fecth();
  }, [updateProviders]);

  const netToGross = () => {
    const net = removeThousandsSeparator(purchasePrice.net);
    const taxes = purchasePrice.taxes;
    if (taxes.length === 0) {
      openSnack("Debe seleccionar al menos un impuesto", "error");
      return;
    }
    const gross = grossPrice(net, taxes);
    setPurchaseGrossPrice(addThousandsSeparator(gross));
  };

  const grossToNet = () => {
    const gross = removeThousandsSeparator(purchasePrice.gross);
    const taxes = purchasePrice.taxes;
    if (taxes.length === 0) {
      openSnack("Debe seleccionar al menos un impuesto", "error");
      return;
    }
    const net = netPrice(gross, taxes);
    setPurchaseNetPrice(addThousandsSeparator(net));
  }

  const jump = () => {
    setActiveStep(2);
    setPurchaseProvider(null);
    setPurchaseNetPrice("");
    setPurchaseGrossPrice(0);
    setPurchaseUse(false);
  }




  const next = () => {
    setActiveStep(2);
    setPurchaseUse(true);
    
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <Grid container spacing={1} direction={"column"}>
          <Grid item display={"flex"}>
            <TextField
              label="Precio neto"
              name="purchaseNetPrice"
              variant="outlined"
              fullWidth
              value={purchasePrice.net}
              onChange={(e) => {
                setPurchaseNetPrice(addThousandsSeparator(e.target.value));
              }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              disabled={activeStep !== 1}
              required
            />
            <IconButton onClick={() => netToGross()}  disabled={activeStep !== 1}>
              <RedoIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <TaxesComponent />
          </Grid>
          <Grid item display={"flex"}>
            <Autocomplete
              sx={{ flexGrow: 1 }}
              options={providerOptions}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Proveedor" variant="outlined" required/>
              )}
              onChange={(e, value) => {
                if (value) {
                  setPurchaseProvider(value);
                } else {
                  setPurchaseProvider(null);
                }
              }}
              value={purchasePrice.provider}
              size="small"
              disabled={activeStep !== 1}
            />
            <IconButton
              onClick={() => setOpenNewProvider(true)}
              disabled={activeStep !== 1}
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid item display={'flex'}>
            <TextField
              sx={{ flexGrow: 1 }}
              label="Precio bruto (con impuestos)"
              name="purchaseGrossPrice"
              variant="outlined"
              fullWidth
              value={purchasePrice.gross}
              onChange={(e) => {
                setPurchaseGrossPrice(addThousandsSeparator(e.target.value));
              }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              disabled={activeStep !== 1}
              required
            />
             <IconButton onClick={() => {grossToNet()}}  disabled={activeStep !== 1}>
              <UndoIcon />
            </IconButton>
          </Grid>
          <Grid
            item
            textAlign={"right"}
            display={"flex"}
            justifyContent="space-between"
          >
            <Button
              disabled={activeStep !== 1}
              variant="outlined"
              color="primary"
              onClick={() => setActiveStep(0)}
            >
              <ArrowBackIosNewIcon />
            </Button>

            <Button variant="outlined" color="primary" disabled={activeStep !== 1} onClick={() => {jump()}}>
              Saltar
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={activeStep !== 1}
              size={"small"}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog
        open={openNewProvider}
        onClose={() => setOpenNewProvider(false)}
        fullWidth
        maxWidth={"sm"}
      >
        <ProviderForm
          afterSubmit={() => {
            setUpdateProviders(!updateProviders);
            setOpenNewProvider(false);
          }}
        />
      </Dialog>
    </>
  );
}
