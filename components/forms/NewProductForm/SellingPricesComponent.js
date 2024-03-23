import React, { useState, useEffect, use } from "react";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import useCategories from "@/components/hooks/useCategories";
import useTaxes from "@/components/hooks/useTaxes";
import usePriceLists from "@/components/hooks/usePriceLists";
import PriceListForm from "../PriceListform";
import useUtils from "@/components/hooks/useUtils";
import TaxesComponent from "./TaxesComponent";
import { set } from "autonumeric";
import TitlePapper from "@/components/custom/TitlePapper";
import useSellingPrices from "@/components/hooks/useSellingPrices";
import { useAppContext } from "@/appProvider";


export default function SellingPricesComponent() {
  const {
    activeStep,
    setActiveStep,
    sellingPrice,
    setSellingPriceList,
    setSellingPriceNet,
    setSellingPriceGross,
    purchasePrice,
    setPurchaseUse,
    setPurchaseNetPrice,
    setSellingUtility
  } = useNewProductFormContext();
  const {openSnack} = useAppContext();
  const taxes = useTaxes();
  const sellingPrices = useSellingPrices();
  const {
    addThousandsSeparator,
    removeThousandsSeparator,
    grossPrice,
    netPrice,
  } = useUtils();
  const priceLists = usePriceLists();
  const [priceListOptions, setPriceListOptions] = useState([]);
  const [updatePriceList, setUpdatePriceList] = useState(false);
  const [openNewPriceListDialog, setOpenNewPriceListDialog] = useState(false);
  const [percentUtility, setPercentUtility] = useState(30);
  const [amountUtility, setAmountUtility] = useState("");
  const [usePercentUtility, setUsePercentUtility] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const priceListDataOptions = await priceLists.findAllToAutocomplete();
      setPriceListOptions(priceListDataOptions);
    };
    fetch();
  }, [updatePriceList]);

  const back = () => {
    setActiveStep(1);
    // setSellingPriceList(null);
    // setSellingPriceNet("");
    // setSellingPriceGross("");
    setPurchaseUse(true);
  };

  const purchaseNetFromUtilities = () => {
  
    const net = removeThousandsSeparator(sellingPrice.net);
    let percentage = percentUtility;
    let amount = removeThousandsSeparator(amountUtility);

    if (usePercentUtility === true) {
      const percentageValue = percentage / 100 ;
      amount = net * percentageValue;
    } else {
      percentage = (amount / net) * 100;
    }
     let utility =  { amount, percentage }
    
    console.log("utility", utility );
    const purchaseNet = sellingPrices.purchaseFromNetPrice(net, utility);
    setPercentUtility(percentage)
    setAmountUtility(addThousandsSeparator(amount));
    setPurchaseNetPrice(addThousandsSeparator(purchaseNet));
  }

  const netPriceFromPurchase = () => {
    const purchaseNet = removeThousandsSeparator(purchasePrice.net);
    let percent = 0;
    let amount = 0;
    if (usePercentUtility === true) {
      amount = 0;
      percent = percentUtility || 0;
    } else {
      amount = removeThousandsSeparator(amountUtility);
      percent = 0;
    }

    const utility = sellingPrices.utilityAmount(
      purchaseNet,
      usePercentUtility,
      percent,
      amount
    );
    const netPrice = sellingPrices.netPriceFromPurchase(purchaseNet, utility);
    setSellingPriceNet(addThousandsSeparator(netPrice));
    setAmountUtility(addThousandsSeparator(utility.amount));
    setPercentUtility(utility.percentage);
  };

  const utilitiesFromnNetAndPuchaseNet = () => {
    let net = 0;
    let purchaseNet = 0;

    
    if (sellingPrice.net == "") {
      openSnack("Debe ingresar un precio neto", "error");
      return;
    } else {
      net = removeThousandsSeparator(sellingPrice.net);
    }

    if (purchasePrice.net == "") {
      openSnack("Debe ingresar un precio de compra neto", "error");
      return;
    } else {
      purchaseNet = removeThousandsSeparator(purchasePrice.net);
    }

    let utility = sellingPrices.inverseUtilityAmount(net, purchaseNet);
    console.log("utility", utility);
    setAmountUtility(addThousandsSeparator(utility.amount));
    setPercentUtility(utility.percentage);
  };

  const netToGross = () => {
    const net = removeThousandsSeparator(sellingPrice.net);
    const taxes = sellingPrice.taxes;
    if (taxes.length === 0) {
      openSnack("Debe seleccionar al menos un impuesto", "error");
      return;
    }
    const gross = grossPrice(net, taxes);
    setSellingPriceGross(addThousandsSeparator(gross));
  };

  const grossToNet = () => {
    const gross = removeThousandsSeparator(sellingPrice.gross);
    const taxes = sellingPrice.taxes;
    if (taxes.length === 0) {
      openSnack("Debe seleccionar al menos un impuesto", "error");
      return;
    }
    const net = netPrice(gross, taxes);
    setSellingPriceNet(addThousandsSeparator(net));
  };

  const next = () => {
    if (amountUtility === "") {
      openSnack("Debe ingresar un monto de utilidad", "error");
      return;
    }
    setSellingUtility(removeThousandsSeparator(amountUtility));
    setActiveStep(3);
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
            <Autocomplete
              sx={{ flexGrow: 1 }}
              name="priceList"
              options={priceListOptions}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSellingPriceList(newValue);
                } else {
                  setSellingPriceList(null);
                }
              }}
              disabled={activeStep !== 2}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Lista de precios"
                  fullWidth
                  size="small"
                  required
                />
              )}
            />
            <IconButton
              onClick={() => {
                setOpenNewPriceListDialog(true);
              }}
              disabled={activeStep !== 2}
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <TaxesComponent type="selling" activeStepComponent={2} />
          </Grid>
          <Grid
            item
            display={purchasePrice.use == true ? "none" : "inline-block"}
          >
            <TextField
              disabled={activeStep !== 2}
              label="Precio de compra Neto"
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
            />
          </Grid>

          <Grid item>
            <TitlePapper title="Utilidad">
              <Grid container spacing={1} direction={"column"}>
                <Grid item>
                  <TextField
                    label="Porcentaje"
                    name="percentUtility"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={percentUtility}
                    onChange={(e) => {
                      setPercentUtility(e.target.value);
                    }}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                    }}
                    disabled={activeStep !== 2 || !usePercentUtility}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Monto"
                    name="amountUtility"
                    variant="outlined"
                    fullWidth
                    value={amountUtility}
                    onChange={(e) => {
                      setAmountUtility(addThousandsSeparator(e.target.value));
                    }}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    disabled={activeStep !== 2 || usePercentUtility}
                  />
                </Grid>
                <Grid item display={"flex"}>
                  <FormControlLabel
                      sx={{ flexGrow: 1 }}
                    control={
                      <Switch
                        checked={usePercentUtility}
                        onChange={(e) => {
                          setUsePercentUtility(e.target.checked);
                        }}
                        color="primary"
                        disabled={activeStep !== 2}
                      />
                    }
                    label={usePercentUtility ? "%" : "$"}
                  />
                  <IconButton onClick={() => {purchaseNetFromUtilities()}}  disabled={activeStep !== 2}>
                    <UndoIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      netPriceFromPurchase();
                    }}
                    disabled={activeStep !== 2}
                  >
                    <RedoIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </TitlePapper>
          </Grid>

          <Grid item display={"flex"}>
            <TextField
              label="Precio neto"
              sx={{ flexGrow: 1 }}
              name="sellingPriceNet"
              variant="outlined"
              fullWidth
              value={sellingPrice.net}
              onChange={(e) => {
                setSellingPriceNet(addThousandsSeparator(e.target.value));
              }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              disabled={activeStep !== 2}
              required
            />
            <IconButton
              onClick={() => {
                utilitiesFromnNetAndPuchaseNet();
              }}
              disabled={activeStep !== 2}
            >
              <UndoIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                netToGross();
              }}
              disabled={activeStep !== 2}
            >
              <RedoIcon />
            </IconButton>
          </Grid>
          <Grid item display={"flex"}>
            <TextField
              sx={{ flexGrow: 1 }}
              label="Precio de venta"
              name="sellingPriceGross"
              variant="outlined"
              fullWidth
              value={sellingPrice.gross}
              onChange={(e) => {
                setSellingPriceGross(addThousandsSeparator(e.target.value));
              }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              required
              disabled={activeStep !== 2}
            />
            <IconButton
              onClick={() => {
                grossToNet();
              }}
              disabled={activeStep !== 2}
            >
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
              disabled={activeStep !== 2}
              variant="outlined"
              color="primary"
              onClick={() => {
                back();
              }}
            >
              <ArrowBackIosNewIcon />
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={activeStep !== 2}
              size={"small"}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog
        open={openNewPriceListDialog}
        onClose={() => setOpenNewPriceListDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <PriceListForm
          afterSubmit={() => {
            setUpdatePriceList(!updatePriceList);
            setOpenNewPriceListDialog(false);
          }}
        />
      </Dialog>
    </>
  );
}
