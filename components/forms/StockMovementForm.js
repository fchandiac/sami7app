import {
  Grid,
  Paper,
  Autocomplete,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import useStocks from "../hooks/useStocks";
import { useAppContext } from "@/appProvider";
import useProviders from "../hooks/useProviders";
import useUtils from "../hooks/useUtils";
import useTaxes from "../hooks/useTaxes";
import TitlePaper from "../custom/TitlePaper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import usePurchasePrices from "../hooks/usePurchasePrices";
import useProducts from "../hooks/useProducts";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RedoIcon from "@mui/icons-material/Redo";
import { set } from "autonumeric";


export default function StockMovementForm(props) {
  const { product, afterSubmit, storage } = props;
  const { openSnack, user } = useAppContext();
  const providers = useProviders();
  const stocks = useStocks();
  const taxes = useTaxes();
  const purchasePrices = usePurchasePrices();
  const products = useProducts();
  const {
    taxesAmount,
    addThousandsSeparator,
    removeThousandsSeparator,
    grossPrice,
  } = useUtils();
  const [providerOptions, setProviderOptions] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [taxesOptions, setTaxesOptions] = useState([]);
  const [selectedTax, setSelectedTax] = useState(null);
  const [movementOptions, setMovementOptions] = useState([
    // { id: 0, key: 0, name: "creación de stock" },
    // { id: 1, key: 1, name: "venta" },
    // { id: 2, key: 2, name: "devolución" },
    { id: 3, key: 3, name: "ajuste" },
    { id: 4, key: 4, name: "consumo" },
    // { id: 5, key: 5, name: "recepción" },
    // { id: 6, key: 6, name: "despacho" },
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
  const [quanty, setQuanty] = useState(0);
  const [showPurchaseDetail, setShowPurchaseDetail] = useState(false);

  const [productTaxesList, setProductTaxesList] = useState([]);
  const [net, setNet] = useState("");
  const [tax, setTax] = useState("");
  const [gross, setGross] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      const data = await providers.findAllToAutocomplete();
      setProviderOptions(data);
    };
    const fetchTaxes = async () => {
      const data = await taxes.findAll();
      setTaxesOptions(data);
    };
    fetchTaxes();
    fetchProviders();
    console.log(product);
  }, []);

  useEffect(() => {
    if (product !== null) {
      const fetchProduct = async () => {
        const findProduct = await products.findOneById(product.id);
        console.log(findProduct);
        setProductTaxesList(findProduct.PurchasePrice.Taxes);
        setNet(addThousandsSeparator(findProduct.PurchasePrice.net));
        setGross(addThousandsSeparator(findProduct.PurchasePrice.gross));
        setTax(
          addThousandsSeparator(
            taxesAmount(
              findProduct.PurchasePrice.net,
              findProduct.PurchasePrice.Taxes
            )
          )
        );

        const providerId = findProduct.PurchasePrice.provider_id;
        const findProvider = providerOptions.find((p) => p.id === providerId);
        setSelectedProvider(findProvider);
      };
      fetchProduct();
    }
  }, [product]);

  const authAdd = (type, feature) => {
    const authMap = {
      "3-1": true,
      "3-2": true,
      "4-1": false,
      "4-2": true,
      "5-1": true,
      "5-2": false,
      "6-1": false,
      "6-2": true,
    };

    const key = `${type}-${feature}`;
    return authMap[key] ?? null;
  };

  const addTax = () => {
    const tax = selectedTax;
    const findTax = productTaxesList.find((t) => t.id === tax.id);
    if (findTax) {
      return;
    } else {
      setProductTaxesList([...productTaxesList, tax]);
    }
  };

  const removeTax = (index) => {
    const taxes = productTaxesList;
    taxes.splice(index, 1);
    setProductTaxesList([...taxes]);
  };


  const netToGross = () => {
    const net_ = removeThousandsSeparator(net);
    const gross = grossPrice(net_, productTaxesList);
    const tax = taxesAmount(net_, productTaxesList);
    console.log("gross", gross);
    setGross(addThousandsSeparator(gross));
    setTax(addThousandsSeparator(tax));
  };

  const save = async () => {
    //console.log(product);
    if (product === null) {
      openSnack("Debe seleccionar un producto", "error");
    } else if (storage === null) {
      openSnack("Debe seleccionar un almacén", "error");
    } else {
      let auth = authAdd(selectedMovement.id, selectedFeature.id);

      if (auth === false) {
        console.log("no se puede realizar esta operación");
        openSnack("No se puede realizar esta operación", "error");
      } else {
        console.log("storage", storage);

        if (selectedFeature.id === 1) {
          const movement = await stocks.createAddMovement(
            description,
            parseInt(quanty),
            null,
            selectedMovement.id,
            product.id,
            storage.id,
            parseInt(removeThousandsSeparator(net)),
            parseInt(removeThousandsSeparator(tax)),
            parseInt(removeThousandsSeparator(gross)),
          );

          // console.log("movement", movement);

          afterSubmit();
          openSnack("Stock actualizado", "success");
        } else if (selectedFeature.id === 2) {
          const movement_ = await stocks.createDecrementMovement(
            description,
            parseInt(quanty),
            null,
            selectedMovement.id,
            product.id,
            storage.id,
          )
          console.log("movement", movement_);
          setQuanty(0);
          setSelectedFeature(null);
          setSelectedMovement(null);
          setDescription("");
          setNet("");
          setTax("");
          setGross("");
          setProductTaxesList([]);
          afterSubmit();
          openSnack("Stock actualizado", "success");
        }
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
              <Typography variant="subtitle1">
                Nuevo movimiento de stock
              </Typography>
            </Grid>

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

            <Grid item>
              {/* {showPurchaseDetail && ( */}
              <TextField
                label="Descripción"
                variant="outlined"
                name="description"
                fullWidth
                multiline
                rows={2}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                size="small"
              />
              {/* )} */}
            </Grid>

            <Grid
              item
              display={
                selectedFeature !== null && selectedFeature.id === 1
                  ? "flex"
                  : "none"
              }
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={showPurchaseDetail}
                    onChange={(e) => {
                      setShowPurchaseDetail(e.target.checked);
                    }}
                    color="primary"
                  />
                }
                label={
                  showPurchaseDetail
                    ? "Con detalle de compra"
                    : "Sin detalle de compra"
                }
              />
            </Grid>

            {showPurchaseDetail && (
              <Grid item>
                <Autocomplete
                  name="stock-movement-provider"
                  options={providerOptions}
                  value={selectedProvider}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setSelectedProvider(newValue);
                    } else {
                      setSelectedProvider(null);
                    }
                  }}
                  disablePortal
                  defaultValue={null}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Proveedor"
                      fullWidth
                      size="small"
                      required
                    />
                  )}
                />
              </Grid>
            )}

            {showPurchaseDetail && (
              <Grid item display={'flex'}>
                <TextField
                  label="Neto"
                  variant="outlined"
                  name="net"
                  fullWidth
                  value={net}
                  onChange={(e) => {
                    setNet(addThousandsSeparator(e.target.value));
                  }}
                  size="small"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
                     <IconButton onClick={() => netToGross()}>
              <RedoIcon />
            </IconButton>
              </Grid>
            )}

            {showPurchaseDetail && (
              <Grid item>
                <TitlePaper title={"Impuestos"}>
                  <Grid container spacing={1}>
                    <Grid item display={"flex"} xs={12}>
                      <Autocomplete
                        sx={{ flexGrow: 1 }}
                        options={taxesOptions}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => setSelectedTax(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Añadir impuesto"
                            fullWidth
                            size="small"
                          />
                        )}
                      />
                      <IconButton onClick={() => addTax()}>
                        <AddCircleIcon />
                      </IconButton>
                    </Grid>
                    {productTaxesList.map((tax, index) => (
                      <Grid item key={index}>
                        <Paper
                          variant={"outlined"}
                          sx={{
                            display: "flex",
                            padding: 1,
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ flexGrow: 1 }}>
                            {tax.name}
                          </Typography>
                          <IconButton onClick={() => removeTax(index)}>
                            <RemoveCircleIcon />
                          </IconButton>
                        </Paper>
                      </Grid>
                    ))}
                    <Grid item>
                      <Typography fontSize={14}>
                        {" "}
                        Total impuestos:{" $"}
                        {tax.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </Typography>
                    </Grid>
                  </Grid>
                </TitlePaper>
              </Grid>
            )}

            {showPurchaseDetail && (
              <Grid item>
                <TextField
                  label="Precio de compra"
                  variant="outlined"
                  name="gross"
                  fullWidth
                  value={gross}
                  onChange={(e) => {
                    setGross(addThousandsSeparator(e.target.value));
                  }}
                  size="small"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            )}

            <Grid item>
              <Grid item textAlign={"right"}>
                <Button variant="contained" type="submit">
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
