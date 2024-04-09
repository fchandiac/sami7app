import useUtils from "@/components/hooks/useUtils";
import {
  Box,
  IconButton,
  Paper,
  Typography,
  useTheme,
  TextField,
  Dialog,
  Grid,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import useSalePoint from "@/components/hooks/useSalePoint";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DiscountIcon from "@mui/icons-material/Discount";
import { useAppContext } from "@/appProvider";

export default function ProductCardCart(props) {
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const {
    addItemToCart,
    removeItemToCart,
    subtractItemToCart,
    authDiscount,
    addDiscountToItem,
  } = useSalePoint();
  const { item } = props;
  const theme = useTheme();
  const [discountAmount, setDiscountAmount] = useState("");
  const { openSnack } = useAppContext();

  const [openDiscountDialog, setOpenDiscountDialog] = useState(false);

  const disabledAdd = (virtualStock, controlStock) => {
    if (controlStock){
      if (virtualStock === 0){
        return true;
      }
    } else {
      return false;
    }
  }
  return (
    <>
      <Paper variant="outlined" sx={{ p: 1, mb: 1 }}>
        <Box display={"flex"}>
          <Box width={"5%"}>{item.quanty}</Box>
          <Box flexGrow={1}>{item.name}</Box>
          <Box width={"12%"}>
            {item.total.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </Box>
        </Box>
        <Box
          display={"flex"}
          pt={1}
          sx={{ borderTop: `1px solid ${theme.palette.MUIBorder.main}` }}
        >
          <Box display={"flex"}>
            <Stack spacing={0}>
              <Typography fontSize={9}>Stock: {item.stock}</Typography>
              <Typography fontSize={9}>
                Stock virtual: {item.virtualStock}
              </Typography>
            </Stack>
            <Stack spacing={0} ml={1}>
              
              <Typography fontSize={9}>Lista: {item.priceListName}</Typography>
              <Typography fontSize={9}>
                Descuento:{" "}
                {item.discount.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </Typography>
            </Stack>
            <Stack spacing={0} ml={1}>
              
              <Typography fontSize={9}>
                Precio unidad: {item.gross.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </Typography>
              <Typography fontSize={9}>
                Control de Stock: {item.stockControl ? "Si" : "No"}
              </Typography>
            </Stack>
          </Box>

          <Box flexGrow={1} />
          <IconButton
            size="small"
            onClick={() => {
              console.log("item", item);
              setOpenDiscountDialog(true);
            }}
          >
            <DiscountIcon sx={{ fontSize: 17 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              removeItemToCart(item.id);
            }}
          >
            <DeleteIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              subtractItemToCart(item.id);
            }}
          >
            <RemoveCircleIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
          disabled={disabledAdd(item.virtualStock, item.stockControl)}
            size="small"
            onClick={() => {
              addItemToCart(item.id);
            }}
          >
            <AddCircleIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Paper>
      <Dialog
        open={openDiscountDialog}
        onClose={() => {
          setOpenDiscountDialog(false);
        }}
        fullWidth
        maxWidth={"xs"}
      >
        <Paper variant="outlined" sx={{ p: 1 }}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log("Discount", discountAmount);
              const auth = await authDiscount(
                item.id,
                parseInt(removeThousandsSeparator(discountAmount))
              );
              console.log("Auth", auth);
              if (auth) {
                openSnack("Descuento no autorizado", "error");
                return;
              } else {
                addDiscountToItem(
                  item.id,
                  parseInt(removeThousandsSeparator(discountAmount))
                );
                setOpenDiscountDialog(false);
                setDiscountAmount("");
              }
            }}
          >
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <Typography variant="subtitle">Descuento</Typography>
                <Typography variant="subtitle2">
                  Producto: {item.name}
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Monto"
                  name="discountAmount"
                  value={addThousandsSeparator(discountAmount)}
                  onChange={(e) => {
                    setDiscountAmount(e.target.value);
                  }}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item textAlign={"right"}>
                <Button variant="contained" type="submit">
                  Aplicar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Dialog>
    </>
  );
}

// data = {
//   id: 0,
//   key: 0,
//   name: "Producto 1",
//   sellingPriceId: 0,
//   sellingPrice:0,
//   quanty: 0,
//   total: 1000,
//   discount: 0,
//   tax: 0,
//   stock: 0,
//   virtualStock: 0,
//   priceListId: 0,

// },
