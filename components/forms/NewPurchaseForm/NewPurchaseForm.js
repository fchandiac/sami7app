import useProducts from "@/components/hooks/useProducts";
import useProviders from "@/components/hooks/useProviders";
import {
  Grid,
  Paper,
  Typography,
  Autocomplete,
  TextField,
  Divider,
  Box,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Finder from "./Finder";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import PurchaseProductCard from "@/components/cards/PurchaseProductCard";
import useUtils from "@/components/hooks/useUtils";
import useStorages from "@/components/hooks/useStorages";
import { useAppContext } from "@/appProvider";
import usePurchases from "@/components/hooks/usePurchases";
import useReceptions from "@/components/hooks/useReceptions";
import useProductCards from "@/components/hooks/useProductCards";

export default function NewPurchaseForm(props) {
  // prop para definir uso cambiar luego cuando se cree OrdendeCompra
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });
  const products = useProducts();
  const providers = useProviders();
  const storages = useStorages();
  const purchases = usePurchases();
  const receptions = useReceptions();
  const productCards = useProductCards();

  const [description, setDescription] = useState("");

  const [providersOptions, setProvidersOptions] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [storageOptions, setStorageOptions] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(null);

  const [selectedReference, setSelectedReference] = useState(null);
  const [reference_id, setReference_id] = useState("");

  const [productList, setProductList] = useState([]);
  const { grossPrice, taxesAmount } = useUtils();

  const { user, openSnack } = useAppContext();

  useEffect(() => {
    const fetchProviders = async () => {
      const data = await providers.findAll();
      console.log("Providers", data);
      setProvidersOptions(data);
    };

    const fetchProducts = async () => {
      const data = await products.findAllToAutocomplete();
      setProductList(data);
    };

    const fetchStorages = async () => {
      const data = await storages.findAll();
      setStorageOptions(data);
    };

    fetchProviders();
    fetchProducts();
    fetchStorages();
  }, []);

  const addProduct = async (productId) => {
    const findProfuct = await products.findOneById(productId);
    const taxes = findProfuct.PurchasePrice.Taxes;
    const gross = grossPrice(findProfuct.PurchasePrice.net, taxes);

    const item = {
      id: findProfuct.id,
      name: findProfuct.name,
      code: findProfuct.code,
      quanty: 1,
      originalNet: findProfuct.PurchasePrice.net,
      net: findProfuct.PurchasePrice.net,
      tax: taxesAmount(findProfuct.PurchasePrice.net, taxes),
      taxes: taxes,
      gross: gross,
      storage: selectedStorage,
      stockControl: findProfuct.stock_control,
      subtotal: gross,
    };

    setCart({
      items: [...cart.items, item],
      total: cart.total + item.gross,
    });
  };

  const updateStockControl = async (id, stockControl, index) => {
    try {
      const response = await products.updateStockControlById(id, stockControl);
      const item = cart.items[index];
      console.log("Item", item);
      item.stockControl = stockControl;
      // setCart({

      setCart({
        items: cart.items.map((product, i) => {
          if (i === index) {
            return item;
          }
          return product;
        }),
        total: cart.total,
      });

      openSnack("Control de stock actualizado", "success");
      return response;
    } catch (error) {
      console.log("Error", error);
      openSnack("Error al actualizar el control de stock", "error");
    }
  };

  const incrementQuanty = (index) => {
    const item = cart.items[index];
    item.quanty = item.quanty + 1;
    item.subtotal = item.gross * item.quanty;
    setCart({
      items: cart.items.map((product, i) => {
        if (i === index) {
          return item;
        }
        return product;
      }),
      total: calcTotalCart(),
    });
  };

  const decrementQuanty = (index) => {
    const item = cart.items[index];
    if (item.quanty > 1) {
      item.quanty = item.quanty - 1;
      item.subtotal = item.gross * item.quanty;
      setCart({
        items: cart.items.map((product, i) => {
          if (i === index) {
            return item;
          }
          return product;
        }),
        total: calcTotalCart(),
      });
    }
  };

  const removeProduct = (index) => {
    const item = cart.items[index];
    setCart({
      items: cart.items.filter((product, i) => i !== index),
      total: cart.total - item.subtotal,
    });
    calcTotalCart();
  };

  const updateItem = (index, quanty, net, tax, taxes, gross, storage) => {
    const item = cart.items[index];
    item.quanty = quanty;
    item.net = net;
    item.tax = tax;
    item.taxes = taxes;
    item.gross = gross;
    item.subtotal = gross * quanty;
    item.storage = storage;

    setCart({
      items: cart.items.map((product, i) => {
        if (i === index) {
          return item;
        }
        return product;
      }),
      total: calcTotalCart(),
    });
  };

  const calcTotalCart = () => {
    let total = 0;
    cart.items.forEach((item) => {
      total += item.subtotal;
    });

    return total;
  };

  const save = async () => {
    if (cart.items.length === 0) {
      openSnack("No hay productos en la compra", "error");
      return;
    }

    if (!selectedProvider) {
      openSnack("Debe seleccionar un proveedor", "error");
      return;
    }

    if (!selectedReference) {
      openSnack("Debe seleccionar un tipo de referencia", "error");
      return;
    } else {
      if (selectedReference.id !== 0 && reference_id === "") {
        openSnack("Debe ingresar un número de referencia", "error");
        return;
      }
    }

    const tax = calcTotalTax();
    const net = calcTotalNet();
    const gross = calclTotalGross();
    const data = {
      user_id: user.id,
      provider_id: selectedProvider.id,
      total: cart.total,
      tax: tax,
      net: net,
      gross: gross,
      description: description,
      documentType: selectedReference.id,
      reference_id: reference_id,
    };

    console.log("Data", data);

    try {
      const newPurchase = await purchases.create(
        data.description,
        0,
        0,
        data.net,
        data.tax,
        data.total,
        user.id,
        data.provider_id,
        0, // document_type
        0, // reference_id
        false
      );
      console.log("New Purchase", newPurchase);

      cart.items.forEach(async (item) => {
        const detail = await purchases.createDetail(
          item.quanty,
          item.net,
          item.tax,
          item.gross,
          newPurchase.id,
          item.id,
          false
        );
        console.log("Detail", detail);

        if (item.stockControl) {
          for (let i = 0; i < item.quanty; i++) {
            const newCard = await productCards.create(
              item.id,
              item.net,
              item.gross,
              item.tax,
              0,
              0,
              0,
              0,
              null,
              null,
              null,
              newPurchase.id,
              detail.id,
              item.storage.id,
              null,
              0
            );
            console.log("New Card", newCard);
          }
        }
      });

      openSnack("Compra guardada", "success");
    } catch (error) {
      console.log("Error", error);
      openSnack("Error al guardar la compra", "error");
    }
  };

  const calcTotalTax = () => {
    let totalTax = 0;
    cart.items.forEach((item) => {
      totalTax += item.tax;
    });

    return totalTax;
  };

  const calcTotalNet = () => {
    let totalNet = 0;
    cart.items.forEach((item) => {
      totalNet += item.net;
    });

    return totalNet;
  };

  const calclTotalGross = () => {
    let totalGross = 0;
    cart.items.forEach((item) => {
      totalGross += item.gross;
    });

    return totalGross;
  };

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Nueva compra</Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Autocomplete
                  options={[
                    {
                      id: 0,
                      name: "Ninguna",
                      key: 0,
                    },
                    {
                      id: 1,
                      name: "Boleta",
                      key: 1,
                    },
                    {
                      id: 2,
                      name: "Factura",
                      key: 2,
                    },
                  ]}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => setSelectedReference(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de referencia"
                      size="small"
                      name="reference_id"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="N° de referencia"
                  size="small"
                  value={reference_id}
                  onChange={(e) => setReference_id(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={providersOptions}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => setSelectedProvider(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Proveedor" size="small" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={storageOptions}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => setSelectedStorage(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Almacen" size="small" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Finder addProduct={addProduct} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Paper variant="outlined" sx={{ p: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" textAlign={"center"}>
                    Detalle de compra
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontSize={14}>
                    Proveedor: {selectedProvider ? selectedProvider.name : ""}
                  </Typography>
                  <Typography fontSize={12}>
                    {selectedProvider ? selectedProvider.rut : ""}
                  </Typography>
                  <Typography fontSize={12}>
                    <HomeIcon sx={{ fontSize: 14 }} />
                    {selectedProvider ? selectedProvider.address : ""}
                  </Typography>
                  <Typography fontSize={12}>
                    <LocalPhoneIcon sx={{ fontSize: 14 }} />
                    {selectedProvider ? selectedProvider.phone : ""}
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign={"right"}>
                  <Typography fontSize={20} fontWeight={"bold"}>
                    Total:{" "}
                    {cart.total.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} display={"flex"} mt={2}>
                <Typography fontSize={14} sx={{ flexGrow: 0.1, marginLeft: 1 }}>
                  #
                </Typography>
                <Typography fontSize={14} sx={{ flexGrow: 1 }}>
                  Producto
                </Typography>
                <Typography fontSize={14}>Subtotal</Typography>
                <Box flexGrow={0.3}></Box>
              </Grid>
              <Divider />
              {cart.items.map((item, index) => (
                <PurchaseProductCard
                  product={item}
                  index={index}
                  updateStockControl={updateStockControl}
                  incrementQuanty={incrementQuanty}
                  decrementQuanty={decrementQuanty}
                  removeProduct={removeProduct}
                  updateItem={updateItem}
                />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} textAlign={"right"}>
            <Button variant="contained" color="primary" onClick={() => save()}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
