import React, { use, useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import {
  Grid,
  Paper,
  Autocomplete,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  ButtonGroup,
  useTheme,
  FormControlLabel,
  Switch,
} from "@mui/material";
import useSellingPrices from "../hooks/useSellingPrices";
import usePriceLists from "../hooks/usePriceLists";
import TitlePaper from "../custom/TitlePaper";
import useUtils from "../hooks/useUtils";
import useTaxes from "../hooks/useTaxes";
import ClearIcon from "@mui/icons-material/Clear";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import { useAppContext } from "@/appProvider";
import useRecords from "../hooks/useRecords";


export default function SellingPriceForm(props) {
  const {
    data = {
      product: {
        id: 0,
        key: 0,
        name: "",
        purchasePrice: null,
        purchasePriceId: 0,
        netPurchasePrice: 0,
        ivaSubject: true,
      },
      taxes: [],
      net: 0,
      gross: 0,
      amountUtility: 0,
      priceList: { id: 0, key: 0, name: "" },
    },
    edit = false,
    afterSubmit = () => {},
  } = props;
  const [sellingPriceData, setSellingPriceData] = useState(data);
  const { addThousandsSeparator, grossPrice, netPrice } = useUtils();
  const { user, openSnack } = useAppContext();
  const products = useProducts();
  const records = useRecords();
  const sellingPrices = useSellingPrices();
  const priceLists = usePriceLists();
  const taxes = useTaxes();
  const [taxOptions, setTaxOptions] = useState([]);
  const [productsOptions, setProductsOptions] = useState([]);
  const [sellingPriceOptions, setSellingPriceOptions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await products.finalAllToSellingPrice();
      // console.log(data);
      setProductsOptions(data);
    };

    const fetchPriceLists = async () => {
      const data = await priceLists.findAllToAutocomplete();
      setSellingPriceOptions(data);
    };

    const fetchTaxes = async () => {
      const data = await taxes.findAllToAutocomplete();
      setTaxOptions(data);
    };

    fetchPriceLists();
    fetchProducts();
    fetchTaxes();
  }, []);

  const setUtility = (utility) => {
    console.log('Utility', utility) 
    setSellingPriceData({
      ...sellingPriceData,
      amountUtility: utility,
    });
  };

  const setNetPrice = (netPrice) => {
    console.log('NetPrice', netPrice)
    setSellingPriceData({
      ...sellingPriceData,
      net: netPrice,
    });
  };


  const setNetAndUtility = (netPrice, utility) => {
    setSellingPriceData({
      ...sellingPriceData,
      net: netPrice,
      amountUtility: utility,
    });
  }


  const setGrossPrice = (grossPrice) => {
    setSellingPriceData({
      ...sellingPriceData,
      gross: grossPrice,
    });
  };

  const addTaxToSellingPrice = (tax) => {
    const updatedTaxes = [...sellingPriceData.taxes, tax];
    setSellingPriceData({
      ...sellingPriceData,
      taxes: updatedTaxes,
    });
  };

  const evaluateIvaTax = (ivaSubject) => {
    const taxes = [...sellingPriceData.taxes]; // Copia el array de impuestos actual
    const ivaTax = taxOptions.find((tax) => tax.name === "IVA");

    // Verifica si el impuesto "IVA" ya está presente en el array de impuestos
    const isIvaAlreadyAdded = taxes.some((tax) => tax.name === "IVA");

    // Si el sujeto del IVA es verdadero y el impuesto "IVA" no está presente, agrégalo
    if (ivaSubject && !isIvaAlreadyAdded) {
      taxes.push(ivaTax);
    }

    return taxes;
  };

  const netToGross = () => {
    const net = sellingPriceData.net;
    const taxes = sellingPriceData.taxes;
    if (taxes.length === 0) {
      openSnack("Debe seleccionar al menos un impuesto", "error");
      return;
    }
    const gross = grossPrice(net, taxes);
    setSellingPriceData({
      ...sellingPriceData,
      gross: gross,
    });
  };

  const grossToNet = () => {
    const gross = sellingPriceData.gross;
    const taxes = sellingPriceData.taxes;
    if (taxes.length === 0) {
      openSnack("Debe seleccionar al menos un impuesto", "error");
      return;
    }
    const net = netPrice(gross, taxes);
    setSellingPriceData({
      ...sellingPriceData,
      net: net,
    });
  };

  const save =  async () => {
    if (edit) {
      console.log("Actualizar precio de venta");
    } else {

      console.log(sellingPriceData);

      const findInList = await sellingPrices.findAllByProductAndPriceList(sellingPriceData.product.id, sellingPriceData.priceList.id)

      if (findInList.length > 0) {
        openSnack("Ya existe un precio de venta para este producto y lista de precios", "error");
        return;
      }


      // console.log("Nuevo precio de venta");
      if (sellingPriceData.net === 0) {
        openSnack("El precio neto no puede ser 0", "error");
        return;
      }
      if (sellingPriceData.gross === 0) {
        openSnack("El precio de venta no puede ser 0", "error");
        return;
      }

      const newPrice =  sellingPrices.create(
        sellingPriceData.gross,
        sellingPriceData.net,
        sellingPriceData.amountUtility,
        sellingPriceData.product.netPurchasePrice,
        sellingPriceData.priceList.id,
        sellingPriceData.product.id,
        sellingPriceData.taxes
      )

      const record = records.create(user.id, "crear", "precios de venta", "crea nuevo precio de venta para el producto " + sellingPriceData.product.name + ' en la lista de precios ' + sellingPriceData.priceList.name)

      setSellingPriceData({
        product: {
          id: 0,
          key: 0,
          name: "",
          purchasePrice: null,
          purchasePriceId: 0,
          netPurchasePrice: 0,
          ivaSubject: true,
        },
        taxes: [],
        net: 0,
        gross: 0,
        amountUtility: 0,
        priceList: { id: 0, key: 0, name: "" },
      })

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
                {edit ? "Actualizar" : "Nuevo"} Precio de Venta
              </Typography>
            </Grid>
            <Grid item>
              <Autocomplete
                name="product"
                options={productsOptions}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setSellingPriceData({
                      ...sellingPriceData,
                      product: newValue,
                      taxes: evaluateIvaTax(newValue.ivaSubject),
                    });
                  } else {
                    setSellingPriceData({
                      ...sellingPriceData,
                      product: {
                        id: 0,
                        key: 0,
                        name: "",
                        PurchasePrice: null,
                        purchasePriceId: 0,
                        netPurchasePrice: 0,
                        ivaSubject: true,
                      },
                    });
                    setSellingPriceData({
                      ...sellingPriceData,
                      taxes: [],
                    });
                  }
                }}
                disablePortal
                defaultValue={null}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Producto"
                    fullWidth
                    size="small"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Precio de Compra Neto"
                name="purchasePrice"
                variant="outlined"
                size="small"
                value={addThousandsSeparator(
                  sellingPriceData.product.netPurchasePrice
                )}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item>
              <Autocomplete
                name="priceList"
                options={sellingPriceOptions}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setSellingPriceData({
                      ...sellingPriceData,
                      priceList: newValue,
                    });
                  } else {
                    setSellingPriceData({
                      ...sellingPriceData,
                      priceList: { id: 0, key: 0, name: "" },
                    });
                  }
                }}
                disablePortal
                defaultValue={null}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lista de Precios"
                    fullWidth
                    size="small"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item>
              <SellingTaxesComponent
                taxes={sellingPriceData.taxes}
                taxOptions={taxOptions}
              />
            </Grid>
            <Grid item>
              <UtilityComponent
                setNetAndUtility={setNetAndUtility}
                netPurchasePrice={sellingPriceData.product.netPurchasePrice}
              />
            </Grid>

            <Grid item display={"flex"}>
              <TextField
                sx={{ flexGrow: 1 }}
                label="Precio Neto"
                name="netPrice"
                variant="outlined"
                required
                fullWidth
                value={addThousandsSeparator(sellingPriceData.net)}
                onChange={(e) => {
                  setSellingPriceData({
                    ...sellingPriceData,
                    net: e.target.value,
                  });
                }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <IconButton
                onClick={() => {
                  netToGross();
                }}
              >
                <RedoIcon />
              </IconButton>
            </Grid>

            <Grid item display={"flex"}>
              <TextField
                sx={{ flexGrow: 1 }}
                label="Precio de Venta"
                name="sellingPrice"
                variant="outlined"
                required
                fullWidth
                value={addThousandsSeparator(sellingPriceData.gross)}
                onChange={(e) => {
                  setSellingPriceData({
                    ...sellingPriceData,
                    gross: e.target.value,
                  });
                }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <IconButton
                onClick={() => {
                  grossToNet();
                }}
              >
                <UndoIcon />
              </IconButton>
            </Grid>

            <Grid item textAlign={"right"}>
              <Button variant="contained" color="primary" type="submit">
                {edit ? "Actualizar" : "Guardar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

const SellingTaxesComponent = (props) => {
  const { taxes, addPurchaseTax, addSellingPriceTax, taxOptions } = props;
  const theme = useTheme();

  return (
    <>
      <TitlePaper title="Impuestos">
        <Grid container spacing={1} direction={"column"}>
          <Grid item display={"flex"}>
            <Autocomplete
              sx={{ flexGrow: 1 }}
              id="taxes"
              options={taxOptions}
              onChange={(event, newValue) => {
                if (newValue) {
                }
              }}
              disablePortal
              defaultValue={null}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Añadir impuesto"
                  fullWidth
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid item>
            {taxes.map((tax, index) => (
              <Grid item>
                <ButtonGroup size="small">
                  <Button
                    disabled
                    sx={{
                      "&.Mui-disabled": {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {tax.name + " " + tax.percentage + "%"}
                  </Button>
                  <Button
                    size="small"
                    disabled={tax.name == "IVA"}
                    sx={{
                      "&.Mui-disabled": {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <ClearIcon
                      fontSize={"small"}
                      onClick={() => {
                        if (type === "purchase") {
                          setPurchaseTaxes(
                            purchasePriceTaxes.filter((t) => t.id !== tax.id)
                          );
                        } else if (type === "selling") {
                          setSellingPriceTaxes(
                            purchasePriceTaxes.filter((t) => t.id !== tax.id)
                          );
                        }
                      }}
                    />
                  </Button>
                </ButtonGroup>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </TitlePaper>
    </>
  );
};

const UtilityComponent = (props) => {
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const { setNetAndUtility, netPurchasePrice } = props;
  const sellingPrices = useSellingPrices();
  const [percentUtility, setPercentUtility] = useState(30);
  const [amountUtility, setAmountUtility] = useState(0);
  const [usePercentUtility, setUsePercentUtility] = useState(true);

  const netPriceFromPurchase = () => {
    const purchaseNet = netPurchasePrice;
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

    setAmountUtility(addThousandsSeparator(utility.amount));
    setPercentUtility(utility.percentage);
    setNetAndUtility(netPrice, utility.amount);

  };

  return (
    <>
      <TitlePaper title="Utilidad">
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
              disabled={!usePercentUtility}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
              inputProps={{
                max: 100,
                min: 0,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Monto"
              name="amountUtility"
              variant="outlined"
              fullWidth
              value={addThousandsSeparator(amountUtility)}
              onChange={(e) => {
                setAmountUtility(e.target.value);
              }}
              disabled={usePercentUtility}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
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
                />
              }
              label={usePercentUtility ? "%" : "$"}
            />

            <IconButton
              onClick={() => {
                netPriceFromPurchase();
              }}
            >
              <RedoIcon />
            </IconButton>
          </Grid>
        </Grid>
      </TitlePaper>
    </>
  );
};
