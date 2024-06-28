import useCustomers from "@/components/hooks/useCustomers";
import useUtils from "@/components/hooks/useUtils";
import {
  Grid,
  Paper,
  Autocomplete,
  TextField,
  Typography,
  Divider,
  Box,
  IconButton,
  Dialog,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductCardCart from "./ProductCardCart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useSalePointContext } from "../salePointProvider";
import PaymentsComponent from "./PaymentsComponent";
import Document from "@/components/prints/Document";
import CustomerForm from "@/components/forms/CustomerForm";
import useSalePoint from "@/components/hooks/useSalePoint";
import PayDialog from "./PayDialog";
import { useAppContext } from "@/appProvider";

export default function ShoppingCart(props) {
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const { cart } = props;
  const { openSnack, user } = useAppContext();
  const { preProcessCart, clearCart } = useSalePoint();
  const { setDocumentType, setCustomer } = useSalePointContext();
  const customers = useCustomers();
  const [customerOptions, setCustomerOptions] = useState([]);
  const [updateCustomerOptions, setUpdateCustomerOptions] = useState(false);
  const [openNewCustomerDialog, setOpenNewCustomerDialog] = useState(false);
  const [openPayDialog, setOpenPayDialog] = useState(false);
  const [documentsTypesOptions, setDocumentsTypesOptions] = useState([
    { id: 1, key: 1, name: "Ticket" },
    { id: 2, key: 2, name: "Boleta" },
    { id: 3, key: 3, name: "Factura" },
    { id: 4, key: 4, name: "Cotización"}
  ]);

  useEffect(() => {
    const fetch = async () => {
      const customers_ = await customers.findAll();
      const customersFormatted = customers_.map((item) => {
        return {
          id: item.id,
          key: item.id,
          name: item.rut + " - " + item.name,
        };
      });

      setCustomerOptions(customersFormatted);
    };
    fetch();
  }, [updateCustomerOptions]);

  const afterSubmitNewCustomer = () => {
    setUpdateCustomerOptions(!updateCustomerOptions);
    setOpenNewCustomerDialog(false);
  };

  const saleProcess = () => {
    setOpenPayDialog(true);
    console.log("cart", cart);
  };

  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={7}>
            <Box sx={{ p: 1 }}>
              <Box mb={1} display={"flex"}>
                <Autocomplete
                  sx={{ flexGrow: 1 }}
                  name="customer"
                  options={customerOptions}
                  value={cart.customer}
                  onChange={(event, newValue) => {
                    setCustomer(cart.id, newValue);
                  }}
             
                  defaultValue={null}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cliente"
                      fullWidth
                      size="small"
                    />
                  )}
                />
                <IconButton
                  onClick={() => {
                    setOpenNewCustomerDialog(true);
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              </Box>
              <Autocomplete
                name="documentType"
                options={documentsTypesOptions}
                value={cart.documentType}
                onChange={(event, newValue) => {
                  if (newValue) {
                    console.log("newValue", newValue);
                    console.log("cart.id", cart.id);
                    setDocumentType(cart.id, newValue);

                    console.log("cart", cart);
                  }
                }}
                defaultValue={null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                disablePortal
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Documento"
                    fullWidth
                    size="small"
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={5} textAlign={"right"}>
            <Typography variant={"subtitle2"}>
              Subtotal {cart.subTotal.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>

            <Typography variant={"subtitle2"}>
              Descuentos {cart.discounts.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
            <Typography fontSize={25}>
              Total {cart.total.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
            <Button
              variant={"contained"}
              onClick={() => {
                if (cart.items.length === 0) {
                  openSnack("No hay productos en el carro", "error");
                  return;
                }
                if (cart.customer === null) {
                  openSnack("Debe seleccionar un cliente", "error");
                  return;
                }
                if (cart.documentType === null) {
                  openSnack("Debe seleccionar un tipo de documento", "error");
                  return;
                }
                if (cart.documentType.id === 3 && cart.customer.id === 1001) {
                  openSnack("Debe seleccionar un cliente", "error");
                  return;
                }

                preProcessCart();
                // stops on 0 products and others
                saleProcess();
              }}
            >
             {cart.documentType.id === 4 ? "Cotizar" : "Procesar pago"}
            </Button>
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <Box display={"flex"} sx={{ p: 1 }}>
              <Box width={"6%"}>{"#"}</Box>
              <Box flexGrow={1}>{"Producto"}</Box>
              <Box width={"12%"}>{"Subtotal"}</Box>
              <Box width={"12%"}>{"Descuento"}</Box>
              <Box width={"15%"}>{""}</Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <div style={{ height: "40vh", overflow: "auto" }}>
              {cart.items.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <ProductCardCart item={item} />
                </Grid>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} textAlign={"right"}>
            <IconButton
              onClick={() => {
                clearCart();
              }}
            >
              <RemoveShoppingCartIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={openNewCustomerDialog}
        onClose={() => setOpenNewCustomerDialog(false)}
      >
        <CustomerForm
          afterSubmit={() => {
            afterSubmitNewCustomer();
          }}
        />
      </Dialog>

      <Dialog
        open={openPayDialog}
        onClose={() => setOpenPayDialog(false)}
        maxWidth={"sm"}
        fullWidth
      >
        <PayDialog cart={cart} setOpenPayDialog={setOpenPayDialog} />
      </Dialog>
    </>
  );
}
