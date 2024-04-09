import { Grid, Paper, Typography, Box, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import WidgetsIcon from "@mui/icons-material/Widgets";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import useUtils from "@/components/hooks/useUtils";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSalePointContext } from "../salePointProvider";
import useSalePoint from "@/components/hooks/useSalePoint";
import { useAppContext } from "@/appProvider";


// id: 5,
//         name: "Producto 5",
//         code: "0005",
//         subcategory: null,
//         sellingPriceNet: 0,
//         taxes: null,
//         availableStock: null,
//         virtualAvailableStock: null,

export default function ProductCardFinder(props) {
  const {
    id,
    name,
    code,
    subcategory,
    gross,
    stockControl,
    availableStock,
  } = props;
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const { activeCart, carts, priceList } = useSalePointContext();
  const { user, openSnack } = useAppContext();
  const salePoint = useSalePoint();

  

  return (
    <>
      <Paper variant="outlined">
        <Grid container>
          <Grid item xs={9} padding={1}>
            <Grid item xs={12} display={"flex"}>
              <Typography fontSize={8} flexGrow={1}>
                id: {id}
              </Typography>
              <Typography fontSize={8}>código: {code}</Typography>
            </Grid>
            <Grid item xs={12} marginBottom={1}>
              <Typography fontSize={14} style={{ fontWeight: "bold" }}>
                {name}
              </Typography>
              <Typography fontSize={8}>
                Subcategoría:{" "}
                {subcategory ? subcategory.name : "Sin Subcategoría"}
              </Typography>
            </Grid>
            <Grid item xs={12} display={"flex"} alignItems={"center"}>
              <Typography fontSize={8}>
                {stockControl ? <WidgetsIcon /> : <WidgetsOutlinedIcon />}
              </Typography>
              <Typography fontSize={8} flexGrow={1} paddingLeft={0.5}>
                Stock Disponible: {availableStock}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={3}
            borderLeft={"1px solid rgba(0, 0, 0, 0.12)"}
            paddingBottom={1}
            sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
          >
            <Box
              sx={{ height: "100%" }}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box p={1} textAlign={"center"} flexGrow={1}>
                <IconButton
                  onClick={async () => {
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
                    
                  }}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </Box>
              <Box width={"100%"} textAlign={"center"}>
                <Box display={"flex"}>
                  <Typography
                    fontSize={12}
                    flexGrow={1}
                    alignSelf={"center"}
                    style={{ fontWeight: "bold" }}
                  >
                    ${addThousandsSeparator(gross)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
