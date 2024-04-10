import TitlePapper from "@/components/custom/TitlePaper";
import { Shop } from "@mui/icons-material";
import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState, useEffect } from "react";
import ShoppingCart from "./ShoppingCart";
import { useSalePointContext } from "../salePointProvider";
import CartsTab from "@/components/salePoint/cartsContainer/CartsTab";

export default function CartsContainer() {
  const { getCartById, carts, cart1, cart2, cart3, cart4 } = useSalePointContext();

  return (
    <>
      <TitlePapper title="Carros de compra" group>
        <Box sx={{ width: "100%" }} height={"83vh"}>
          <CartsTab
            Cart1={<ShoppingCart cart={cart1} />}
            Cart2={<ShoppingCart cart={cart2} />}
            Cart3={<ShoppingCart cart={cart3}/>}
            Cart4={<ShoppingCart cart={cart4}/>}
          />
        </Box>
      </TitlePapper>
    </>
  );
}

function cartDataDefault() {
  return {
    id: 0,
    name: "Carro de compra",
    total: 0,
    net: 0,
    tax: 0,
    discounts: 0,
    customer: null,
    items: [],
  };
}
