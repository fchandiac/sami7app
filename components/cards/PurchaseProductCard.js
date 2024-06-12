import {
  Paper,
  Grid,
  Typography,
  Box,
  IconButton,
  Divider,
  FormControlLabel,
  Switch,
  Dialog,
  TextField,
  Autocomplete,
  Button,
  InputAdornment,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import useStorages from "../hooks/useStorages";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import useUtils from "../hooks/useUtils";
import TitlePaper from "../custom/TitlePaper";
import useTaxes from "../hooks/useTaxes";
import { useAppContext } from "@/appProvider";


//   id: findProfuct.id,
//   name: findProfuct.name,
//   code: findProfuct.code,
//   quanty: 1,
//   originalNet: findProfuct.PurchasePrice.net,
//   net: findProfuct.PurchasePrice.net,
//   tax: taxesAmount(findProfuct.PurchasePrice.net, taxes),
//   taxes: taxes,
//   gross: gross,
//   storage: selectedStorage,
//   stockControl: findProfuct.stock_control,
//   subtotal: gross,

export default function PurchaseProductCard(props) {
  const {
    product,
    index,
    updateStockControl,
    incrementQuanty,
    decrementQuanty,
    removeProduct,
    updateItem,
  } = props;
  const {
    taxesAmount,
    addThousandsSeparator,
    removeThousandsSeparator,
    grossPrice,
  } = useUtils();
  const [showMore, setShowMore] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const storages = useStorages();
  const taxes = useTaxes();
  const {openSnack} = useAppContext();
  const [storageOptions, setStorageOptions] = useState([]);
  const [taxesOptions, setTaxesOptions] = useState([]);
  const [selectedTax, setSelectedTax] = useState(null);
  const [productData, setProductData] = useState({
    id: product.id,
    name: product.name,
    code: product.code,
    quanty: product.quanty,
    originalNet: product.originalNet,
    net: addThousandsSeparator(product.net),
    tax: product.tax,
    taxes: product.taxes,
    gross: product.gross,
    storage: product.storage,
  });

  useEffect(() => {
    const fetchStorages = async () => {
      const data = await storages.findAll();
      setStorageOptions(data);
    };
    const fetchTaxes = async () => {
      const data = await taxes.findAll();
      setTaxesOptions(data);
    };
    fetchTaxes();
    fetchStorages();
  }, []);

  const updateItemData = async () => {
    if (productData.quanty <= 0) {
      return;
    }

    if (!productData.storage) {
        openSnack("Debes seleccionar un almacén", "error");
      return;
    }

    let gross =
      typeof productData.gross === "string"
        ? removeThousandsSeparator(productData.gross)
        : productData.gross;

    
        let net = typeof productData.net === "string" ? removeThousandsSeparator(productData.net) : productData.net;

    updateItem(
      index,
      productData.quanty,
      net,
      productData.tax,
      taxes,
      gross,
        productData.storage
    );

    setOpenEditDialog(false);
  };

  const addTax = () => {
    const tax = selectedTax;
    const findTax = productData.taxes.find((t) => t.id === tax.id);
    if (findTax) {
      return;
    } else {
      setProductData({
        ...productData,
        taxes: [...productData.taxes, tax],
      });
    }
  };

  const removeTax = (index) => {
    const taxes = productData.taxes;
    taxes.splice(index, 1);
    setProductData({
      ...productData,
      taxes: taxes,
    });
  };

  const netToGross = () => {
    const net = removeThousandsSeparator(productData.net);
    const taxes = productData.taxes;
    const gross = grossPrice(net, taxes);
    const tax = taxesAmount(net, taxes);
    setProductData({
      ...productData,
      gross: addThousandsSeparator(gross),
      tax: tax,
    });
  };

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1, mt: 1 }}>
        <Box display={"flex"}>
          <Box flexGrow={0.1}>
            <Typography fontSize={14}>{product.quanty}</Typography>
          </Box>

          <Box flexGrow={1}>
            <Box>
              <Typography fontSize={14} fontWeight={"Bold"}>
                {product.name}
              </Typography>
              <Box display={"flex"} alignItems={"center"}>
                <IconButton onClick={() => setShowMore(!showMore)} size="small">
                  <MoreHorizIcon sx={{ fontSize: 12 }} />
                </IconButton>
                <Typography fontSize={10}>
                  {product.id} {product.code}{" "}
                </Typography>
              </Box>
            </Box>
            {showMore && (
              <Box>
                <Divider sx={{ mb: 1 }} />

                <Box display={"flex"}>
                  <Box flexGrow={1}>
                    <Typography fontSize={10}>
                      Neto:{" "}
                      {product.net.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </Typography>
                    <Typography fontSize={10}>
                      Impuesto:{" "}
                      {product.tax.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </Typography>
                    <Typography fontSize={10}>
                      Precio de compra:{" "}
                      {product.gross.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </Typography>
                    <Typography
                      fontSize={10}
                      display={product.stockControl ? "block" : "none"}
                    >
                      Almacén: {product.storage ? product.storage.name : ""}
                    </Typography>
                  </Box>
                  <Box display={"flex-box"}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={product.stockControl}
                          onChange={(e) => {
                            updateStockControl(
                              product.id,
                              e.target.checked,
                              index
                            );
                          }}
                          color="primary"
                          size="small"
                        />
                      }
                      label={
                        <Typography fontSize={12}>
                          {product.stockControl
                            ? "Con control de stock"
                            : "Sin control de stock"}
                        </Typography>
                      }
                    />

                    <IconButton
                      onClick={() => setOpenEditDialog(true)}
                      size="small"
                      disabled={!product.stockControl}
                    >
                      <EditIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box>
            <Typography fontSize={14}>
              {product.subtotal.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
          </Box>

          <Box pl={1}>
            <IconButton onClick={() => incrementQuanty(index)} size="small">
              <AddCircleIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <IconButton onClick={() => decrementQuanty(index)} size="small">
              <RemoveCircleIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <IconButton onClick={() => removeProduct(index)} size="small">
              <DeleteIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth={"xs"}
        fullWidth
      >
        <Grid container spacing={1} direction={"column"} p={1}>
          <Grid item>
            <Typography variant={"subtitle1"}>
              Editar información de compra
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={14}> Producto: {product.name}</Typography>
            <Typography fontSize={12} lineHeight={1}>
              Id:{""} {product.id}
            </Typography>
            <Typography fontSize={12} lineHeight={1}>
              Código:{""} {product.code}
            </Typography>
          </Grid>
          <Grid item mt={2}>
            <TextField
              fullWidth
              label="Cantidad"
              variant="outlined"
              size="small"
              value={productData.quanty}
              onChange={(e) => {
                console.log("Quanty", e.target.value, typeof e.target.value);

                // Convert the input value to a number
                let quanty = parseFloat(e.target.value);

                // Check if the conversion resulted in NaN
                if (isNaN(quanty)) {
                  quanty = 0;
                }

                // Update the state with the new quantity value
                setProductData({ ...productData, quanty: quanty });
              }}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              options={storageOptions}
              value={productData.storage}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) =>
                setProductData({ ...productData, storage: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Almacén de destino"
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item display={"flex"}>
            <TextField
              sx={{ flexGrow: 1 }}
              fullWidth
              label="Neto"
              variant="outlined"
              size="small"
              value={productData.net}
              onChange={(e) => {
                setProductData({
                  ...productData,
                  net: addThousandsSeparator(e.target.value),
                });
              }}
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
                {productData.taxes.map((tax) => (
                  <Grid item>
                    <Paper
                      variant={"outlined"}
                      sx={{ display: "flex", padding: 1, alignItems: "center" }}
                    >
                      <Typography sx={{ flexGrow: 1 }}>{tax.name}</Typography>
                      <IconButton onClick={() => removeTax(index)}>
                        <RemoveCircleIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
                <Grid item sx={12}>
                  <Typography fontSize={14}>
                    {" "}
                    Total impuesto:{" "}
                    {productData.tax.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </Typography>
                </Grid>
              </Grid>
            </TitlePaper>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Precio de compra"
              variant="outlined"
              size="small"
              value={productData.gross}
              onChange={(e) => {
                setProductData({
                  ...productData,
                  gross: addThousandsSeparator(e.target.value),
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item textAlign={"right"}>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={() => {
                updateItemData();
              }}
            >
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
