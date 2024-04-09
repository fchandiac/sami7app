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
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductCardCart from "./ProductCardCart";
import { useSalePointContext } from "../salePointProvider";
import PaymentsComponent from "./PaymentsComponent";
import Document from "@/components/prints/Document";

export default function ShoppingCart(props) {
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const { cart } = props;
  const { setDocumentType, setCustomer } = useSalePointContext();
  const customers = useCustomers();
  const [customerOptions, setCustomerOptions] = useState([]);
  const [documentsTypesOptions, setDocumentsTypesOptions] = useState([
    { id: 1, key: 1, name: "Ticket" },
    { id: 2, key: 2, name: "Boleta" },
    { id: 3, key: 3, name: "Factura" },
  ]);

  useEffect(() => {
    const fetch = async () => {
      const customers_ = await customers.findAll();
      setCustomerOptions(customers_);
    };
    fetch();
  }, []);

  return (
    <>
      <Box sx={{ maxHeight: "75vh", overflowY: "auto" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} textAlign={"right"}>
            <Typography fontSize={25}>
              Total ${addThousandsSeparator(cart.total)}
            </Typography>
            <Typography variant={"subtitle1"}>
              descuentos ${cart.discounts}
            </Typography>
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <Box display={"flex"} sx={{ p: 1 }}>
              <Box width={"5%"}>{"#"}</Box>
              <Box flexGrow={1}>{"Producto"}</Box>
              <Box width={"12%"}>{"Subtotal"}</Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} minHeight={"40vh"}>
            {cart.items.map((item) => (
              <Grid item xs={12} key={item.id}>
                <ProductCardCart item={item} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} pb={2}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              name="customer"
              options={customerOptions}
              value={cart.customer}
              onChange={(event, newValue) => {
                if (newValue) {
                  setCustomer(newValue);
                } else {
                  setCustomer({ id: 1001, key: 1001, name: "SIN CLIENTE" });
                }
              }}
              disablePortal
              defaultValue={null}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Cliente" fullWidth size="small" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <PaymentsComponent cart={cart}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
