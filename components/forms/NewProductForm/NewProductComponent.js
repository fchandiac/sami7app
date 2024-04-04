import {
  Grid,
  Paper,
  Step,
  Typography,
  Stepper,
  StepLabel,
  TextField,
  Button,
  Autocomplete,
  Dialog,
  Box,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNewProductFormContext } from "./newProductProvider";
import GeneralComponent from "./GeneralComponent";
import PurchasePriceComponent from "./PurchasePriceComponent";
import SellingPricesComponent from "./SellingPricesComponent";
import StockComponent from "./StockComponent";
import TitlePapper from "@/components/custom/TitlePaper";
import useUtils from "@/components/hooks/useUtils";
import { useRouter } from "next/router";
import useProducts from "@/components/hooks/useProducts";

export default function NewProductComponent() {
  const {
    setInitialState,
    activeStep,
    setActiveStep,
    general,
    purchasePrice,
    sellingPrice,
    stock,
  } = useNewProductFormContext();
  const products = useProducts();
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const [openResumeDialog, setOpenResumeDialog] = useState(false);

  useEffect(() => {
    if (activeStep === 4) {
      setOpenResumeDialog(true);
    }
  }, [activeStep]);

  const saveProduct = async () => {
    try {
      const newProduct = await products.newProduct(
        general,
        purchasePrice,
        sellingPrice,
        stock
      );
      console.log(newProduct);
      setInitialState();
      setOpenResumeDialog(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Paper variant="outlined">
        <Grid container spacing={2} p={1}>
          <Grid item xs={12} marginTop={2}>
            <Stepper activeStep={activeStep} alternativeLabel>
              <Step>
                <StepLabel>Información básica</StepLabel>
              </Step>
              <Step>
                <StepLabel>Precio de compra</StepLabel>
              </Step>
              <Step>
                <StepLabel>Precio de venta</StepLabel>
              </Step>
              <Step>
                <StepLabel>Stock</StepLabel>
              </Step>
            </Stepper>
          </Grid>
          <Grid item xs={12} md={3}>
            <GeneralComponent />
          </Grid>
          <Grid item xs={12} md={3}>
            <PurchasePriceComponent />
          </Grid>
          <Grid item xs={12} md={3}>
            <SellingPricesComponent />
          </Grid>
          <Grid item xs={12} md={3}>
            <StockComponent />
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={openResumeDialog}
        onClose={() => {
          setOpenResumeDialog(false);
          setActiveStep(3);
        }}
      >
        <Grid container spacing={2} p={2}>
          <Grid item xs={12}>
            <Typography variant={"h5"}>Resumen nuevo producto</Typography>
          </Grid>
          <Grid item xs={12}>
            <TitlePapper title={"información general"}>
              <Stack direction={"column"}>
                <Typography variant="caption">
                  Nombre: {general.name}
                </Typography>
                <Typography variant="caption">
                  Descripción: {general.description}
                </Typography>
                <Typography variant="caption">
                  Categoría: {general.category?.name}
                </Typography>
                <Typography variant="caption">
                  Subcategoría: {general.subcategory?.name}
                </Typography>
                <Typography variant="caption">
                  {general.stockControl
                    ? "Con control de stock"
                    : "Sin control de stock"}
                </Typography>
                <Typography variant="caption">
                  {general.ivaSubject ? "Afecto a IVA" : "Exento de IVA"}
                </Typography>
                <Typography variant="caption">
                  {general.favorite
                    ? "Producto favorito"
                    : "Producto no favorito"}
                </Typography>
                <Typography variant="caption">
                  Código: {general.code}
                </Typography>
              </Stack>
            </TitlePapper>
          </Grid>

          <Grid item xs={6}>
            <TitlePapper title={"Precio de compra"}>
              <Stack direction={"column"} height={100}>
                <Typography variant="caption">
                  Proveedor: {purchasePrice.provider?.name}
                </Typography>
                <Typography variant="caption">
                  Neto:{" "}
                  {removeThousandsSeparator(purchasePrice.net).toLocaleString(
                    "es-CL",
                    {
                      style: "currency",
                      currency: "CLP",
                      minimumFractionDigits: 0,
                    }
                  )}
                </Typography>
                <Typography variant="caption">
                  Impuestos:{" "}
                  {purchasePrice.taxes.map((tax) => tax.name).join(", ")}
                </Typography>
                <Typography variant="caption">
                  Bruto:{" "}
                  {removeThousandsSeparator(purchasePrice.gross).toLocaleString(
                    "es-CL",
                    {
                      style: "currency",
                      currency: "CLP",
                      minimumFractionDigits: 0,
                    }
                  )}
                </Typography>
              </Stack>
            </TitlePapper>
          </Grid>

          <Grid item xs={6}>
            <TitlePapper title={"Precio de venta"}>
              <Stack direction={"column"}>
                <Typography variant="caption">
                  Lista de precios: {sellingPrice.priceList?.name}
                </Typography>
                <Typography variant="caption">
                  Neto:{" "}
                  {removeThousandsSeparator(sellingPrice.net).toLocaleString(
                    "es-CL",
                    {
                      style: "currency",
                      currency: "CLP",
                      minimumFractionDigits: 0,
                    }
                  )}
                </Typography>
                <Typography variant="caption">
                  Impuestos:{" "}
                  {sellingPrice.taxes.map((tax) => tax.name).join(", ")}
                </Typography>
                <Typography variant="caption">
                  Bruto:{" "}
                  {removeThousandsSeparator(sellingPrice.gross).toLocaleString(
                    "es-CL",
                    {
                      style: "currency",
                      currency: "CLP",
                      minimumFractionDigits: 0,
                    }
                  )}
                </Typography>
                <Typography variant="caption">
                  Utilidad:{" "}
                  {sellingPrice.utility.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                    minimumFractionDigits: 0,
                  })}
                </Typography>
              </Stack>
            </TitlePapper>
          </Grid>

          <Grid item xs={12}>
            <TitlePapper title={"Stock"}>
              <Stack direction={"column"}>
                <Typography variant="caption">
                  Almacén: {stock.storage?.name}
                </Typography>
                <Typography variant="caption">
                  Stock total: {stock.total}
                </Typography>
                <Typography variant="caption">
                  Stock Critico: {stock.critical}
                </Typography>
              </Stack>
            </TitlePapper>
          </Grid>

          <Grid item xs={12} textAlign={"right"}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                saveProduct();
              }}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
