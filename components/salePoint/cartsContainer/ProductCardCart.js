import useUtils from "@/components/hooks/useUtils";
import { Box, IconButton, Paper, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import useSalePoint from "@/components/hooks/useSalePoint";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function ProductCardCart(props) {
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const { addItemToCart, removeItemToCart, subtractItemToCart } =
    useSalePoint();
  const { item } = props;
  const theme = useTheme();
  return (
    <>
      <Paper variant="outlined" sx={{ p: 1, mb: 1 }}>
        <Box display={"flex"}>
          <Box width={"5%"}>{item.quanty}</Box>
          <Box flexGrow={1}>{item.name}</Box>
          <Box width={"12%"}>${addThousandsSeparator(item.total)}</Box>
        </Box>
        <Box
          display={"flex"}
          pt={1}
          sx={{ borderTop: `1px solid ${theme.palette.MUIBorder.main}` }}
        >
          <Typography fontSize={9}>Lista: {item.priceListName} /  </Typography>
          <Typography fontSize={9}> Stock: {item.stock} /  </Typography>
          <Typography fontSize={9}> Stock virtual: {item.virtualStock}</Typography>
          <Box flexGrow={1} />
          <IconButton
            size="small"
            onClick={() => {
              removeItemToCart(item.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              subtractItemToCart(item.id);
            }}
          >
            <RemoveCircleIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              addItemToCart(item.id);
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </Box>
      </Paper>
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
