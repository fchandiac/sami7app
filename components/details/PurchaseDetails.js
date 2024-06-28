import React, { useEffect, useState } from "react";
import usePurchases from "../hooks/usePurchases";
import {
  Grid,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  Box,
} from "@mui/material";

export default function PurchaseDetails(props) {
  const { purchaseId } = props;
  const purchases = usePurchases();
  const [purchaseData, setPurchaseData] = useState({});
  const [itemsList, setItemsList] = useState([
    {
      id: 1,
      Product: {
        name: "Producto 1",
      },
      quanty: 0,
      net: 0,
      tax: 0,
      price: 0,
      total: 0,
    },
  ]);

  useEffect(() => {
    const fetch = async () => {
      const items = await purchases.findDetailByPurchase(purchaseId);
      setItemsList(items);
    };
    fetch();
  }, []);

  return (
    <>
      <Grid container spacing={1} direction={"column"} p={1}>
        <Grid item>
          <Typography variant={"subtitle1"}>Detalle de la compra</Typography>
        </Grid>
        <Grid item>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>#</TableCell>
                  <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                    Producto
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                    Precio de compra
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                    Neto unidad
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                    Impuestos unidad
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemsList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                      {item.quanty}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                      {item.Product ? item.Product.name : ""}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                      {item.price.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                      {item.net.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                      {item.tax.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                      {item.total.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter >
                <Box textAlign={'right'}>
                <Typography fontSize={12} p={0} pl={1} >
                    Total:{" "}
                    {itemsList.reduce((acc, item) => acc + item.total, 0).toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                    })}
                </Typography>
                </Box>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
