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
import EditIcon from "@mui/icons-material/Edit";
import PaidIcon from "@mui/icons-material/Paid";
import { useAppContext } from "@/appProvider";
import { set } from "autonumeric";

export default function ProductCardCart(props) {
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const {
    addItemToCart,
    removeItemToCart,
    subtractItemToCart,
    authDiscount,
    addDiscountToItem,
    changeGrossToItem,
    changeQuantityToItem,
  } = useSalePoint();
  const { item } = props;
  const theme = useTheme();
  const [discountAmount, setDiscountAmount] = useState("");
  const [newPriceAmount, setNewPriceAmount] = useState("");
  const [newQuanty, setNewQuanty] = useState(0);
  const { openSnack } = useAppContext();

  const [openDiscountDialog, setOpenDiscountDialog] = useState(false);
  const [openEditPriceDialog, setOpenEditPriceDialog] = useState(false);
  const [openEditQuantyDialog, setOpenEditQuantyDialog] = useState(false);

  const disabledAdd = (virtualStock, controlStock) => {
    if (controlStock) {
      if (virtualStock === 0) {
        return true;
      }
    } else {
      return false;
    }
  };
  return (
    <>
      <Paper variant="outlined" sx={{ p: 1, mb: 1 }}>
        <Box display={"flex"}>
          <Box display={"inline-flex"} lignItems={"center"}>
            {item.quanty}
            <IconButton
              size="small"
              onClick={() => {
                console.log("item", item);
                setOpenEditQuantyDialog(true);
              }}
            >
              <EditIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>
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
          <Box display={"inline-flex"}>
            <Stack spacing={0}>
              <Typography fontSize={9}>Stock: {item.stock}</Typography>
              <Typography fontSize={9}>
                Stock virtual: {item.virtualStock}
              </Typography>
              <Typography fontSize={9}>
                Control de Stock: {item.stockControl ? "Si" : "No"}
              </Typography>
            </Stack>
            <Stack spacing={0} ml={1}>
              <Typography fontSize={9}>
                Descuentos unidad:{" "}
                {item.unitDiscount.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </Typography>
              <Typography fontSize={9}>
                Descuento máximo unidad :{" "}
                {item.maxDiscount.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </Typography>
              <Typography fontSize={9}>
                Descuentos totales:{" "}
                {item.discount.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </Typography>
            </Stack>
            <Stack spacing={0} ml={1}>
              <Typography fontSize={9}>Lista: {item.priceListName}</Typography>
              <Typography fontSize={9}>
                Utilidad unidad:{" "}
                {item.unitUtility.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </Typography>
              <Typography fontSize={9}>
                Utilidad total:{" "}
                {item.utility.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </Typography>
            </Stack>

            <Stack spacing={0} ml={1}>
              <Typography fontSize={9}>
                Precio unidad:{" "}
                {item.gross.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                size="small"
                onClick={() => {
                  console.log("item", item);
                  setOpenEditPriceDialog(true);
                }}
              >
                <EditIcon sx={{ fontSize: 17 }} />
                <PaidIcon sx={{ fontSize: 17 }} />
              </Button>
            </Stack>
          </Box>

          <Box flexGrow={1} />
          <IconButton
            size="small"
            sx={{ display: "block", margin: "auto", display: "flex" }}
            onClick={() => {
              console.log("item", item);
              setOpenDiscountDialog(true);
            }}
          >
            <DiscountIcon sx={{ fontSize: 17 }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{ display: "block", margin: "auto", display: "flex" }}
            onClick={() => {
              removeItemToCart(item.id);
            }}
          >
            <DeleteIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{ display: "block", margin: "auto", display: "flex" }}
            onClick={() => {
              subtractItemToCart(item.id);
            }}
          >
            <RemoveCircleIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            disabled={disabledAdd(item.virtualStock, item.stockControl)}
            size="small"
            sx={{ display: "block", margin: "auto", display: "flex" }}
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
              console.log("discountAmount", discountAmount);
              const auth = await authDiscount(item.id, discountAmount);
              if (auth) {
                addDiscountToItem(item.id, discountAmount);
                setOpenDiscountDialog(false);
                openSnack("Descuento aplicado", "success");
                setDiscountAmount("");
              } else {
                openSnack("Descuento no autorizado", "error");
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

      <Dialog
        open={openEditPriceDialog}
        onClose={() => {
          setOpenEditPriceDialog(false);
        }}
        fullWidth
        maxWidth={"xs"}
      >
        <Paper variant="outlined" sx={{ p: 1 }}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log("newPriceAmount", newPriceAmount);
              changeGrossToItem(item.id, newPriceAmount);
              setOpenEditPriceDialog(false);
              openSnack("Precio modificado", "success");
              setNewPriceAmount("");
            }}
          >
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <Typography variant="subtitle">
                  Modificar precio unidad
                </Typography>
                <Typography variant="subtitle2">
                  Producto: {item.name}
                </Typography>
                <Typography variant="subtitle2">
                  Precio anterior:{" "}
                  {item.gross.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Nuevo precio unidad"
                  name="newPriceAmount"
                  value={addThousandsSeparator(newPriceAmount)}
                  onChange={(e) => {
                    setNewPriceAmount(e.target.value);
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

      <Dialog
        open={openEditQuantyDialog}
        onClose={() => {
          setOpenEditQuantyDialog(false);
        }}
        fullWidth
        maxWidth={"xs"}
      >
        <Paper variant="outlined" sx={{ p: 1 }}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log("newQuanty", newQuanty);

              if (newQuanty > item.stock) {
                openSnack("Cantidad no disponible", "error");
                return;
              }

              let newQuantyvalue = parseFloat(newQuanty);

              // Verificar si el número tiene decimales
              if (Number.isInteger(newQuantyvalue)) {
                // Si es un número entero, no se muestran decimales
                newQuantyvalue = parseInt(newQuantyvalue); // Convertir a entero
              } else {
                // Si tiene decimales, se muestran tres decimales
                newQuantyvalue = newQuantyvalue.toFixed(3); // Limitar a tres decimales
              }

              if (newQuantyvalue < 0) {
                openSnack("Cantidad no puede ser negativa", "error");
                return;
              }
              changeQuantityToItem(item.id, newQuantyvalue);

              setOpenEditQuantyDialog(false);
              openSnack("Cantidad modificada", "success");
              setNewQuanty(0);
            }}
          >
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <Typography variant="subtitle">Modificar cantidad</Typography>
                <Typography variant="subtitle2">
                  Producto: {item.name}
                </Typography>
                <Typography variant="subtitle2">
                  Cantidad anterior: {item.quanty}
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Nueva cantidad"
                  name="newQuanty"
                  value={newQuanty}
                  type="number"
                  inputProps={{ step: "0.001" }}
                  onChange={(e) => {
                    setNewQuanty(e.target.value);
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
