import { Dialog, Grid, IconButton, Paper, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useProducts from "@/components/hooks/useProducts";
import useSalePoint from "@/components/hooks/useSalePoint";
import { useAppContext } from "@/appProvider";
import { useSalePointContext } from "../salePointProvider";





export default function CodeFinder() {
  const [code, setCode] = useState("");
  const { openSnack} = useAppContext();
  const { info, priceList } = useSalePointContext();
  const inputCodeRef = useRef(null);
  const products = useProducts();
  const salePoint = useSalePoint();

  const [openDupicateDialog, setOpenDupicateDialog] = useState(false);
  const [duplicateList, setDuplicateList] = useState([]);

  const addTocart = async () => {
    setDuplicateList([]);
    const productByCode = await products.findAllByCode(code);
    console.log("productByCode", productByCode);

    if (productByCode.length === 0) {
      openSnack("Producto no encontrado", "error");
      return;
    }

    if (productByCode.length > 1){
      setOpenDupicateDialog(true);
      setCode("");
      inputCodeRef.current.focus();
      openSnack("Producto duplicado", "error");
      return;
    }

    const product = await products.findOneByIAndStorageAndPriceList(
      productByCode[0].id,
      info.storage.id,
      priceList.id
    )

    let id = product.id;


    if(priceList){
      const authSubmit =  await salePoint.authSubmitItemToCart(id);
      if(authSubmit){
      salePoint.submitItemToCart(id);
      } else {
        openSnack("Stock insuficiente", "error");
      }
    } else {
      openSnack("Debe seleccionar una lista de precios", "error");
    }

    setCode("");
    inputCodeRef.current.focus();


  };

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTocart();
          }}
        >
          <Grid container spacing={1} direction={'column'}>
            <Grid item display={'flex'}>
              <TextField
                label="Código"
                name="code"
                inputRef={inputCodeRef}
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                size="small"
                fullWidth
                autoFocus
              />
              <IconButton type="submit">
                <AddShoppingCartIcon />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Dialog open={openDupicateDialog} onClose={() => setOpenDupicateDialog(false)}>
        <Paper>
          <Grid container>
            <Grid item>
              <h1>Producto duplicado</h1>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    </>
  );
}
