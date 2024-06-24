import React, { useEffect, useState } from "react";
import useSales from "../hooks/useSales";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
} from "@mui/material";
import moment from "moment";
import PrintContainer from "../prints/PrintContainer";

export default function SaleDetailCard(props) {
  const { saleId, minimal = true } = props;
  const sales = useSales();

  const [saleData, setSaleData] = useState({});
  const [saleDetailData, setSaleDetailData] = useState([]);

  console.log(saleId);

  useEffect(() => {
    const fetch = async () => {
      const sale = await sales.findOneById(saleId);
      setSaleData(sale);
      console.log("sale", sale);
      const detail = await sales.findAllSaleDetailBySaleId(saleId);
      console.log("detail", detail);
      setSaleDetailData(detail);
    };
    fetch();
  }, []);

  const documentTypeString = (documentType) => {
    const typeList = [
      { id: 1, key: 1, name: "Ticket" },
      { id: 2, key: 2, name: "Boleta" },
      { id: 3, key: 3, name: "Factura" },
    ];

    const type = typeList.find((item) => item.id === documentType);
    return type ? type.name : "";
  };

  const ItemList = (items) => {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>#</TableCell>
              <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>Producto</TableCell>
              <TableCell
                sx={{
                  fontSize: 12,
                  p: 0,
                  pl: 1,
                  display: minimal ? "none" : "table-cell",
                }}
              >
                Utilidad
              </TableCell>
              <TableCell sx={{ fontSize: 12, p: 0, pl: 1,
                  display: minimal ? "none" : "table-cell" }}>
                Impuestos
              </TableCell>
              <TableCell sx={{ fontSize: 12, p: 0, pl: 1,
                  display: minimal ? "none" : "table-cell" }}>
                Precio de venta
              </TableCell>
              <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>Subtotal</TableCell>
              <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>Desc.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                  {item.quanty}
                </TableCell>
                <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                  {item.Product.name}
                </TableCell>
                <TableCell sx={{ fontSize: 12, p: 0, pl: 1,
                  display: minimal ? "none" : "table-cell" }}>
                  {item.utility.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </TableCell>
                <TableCell sx={{ fontSize: 12, p: 0, pl: 1,
                  display: minimal ? "none" : "table-cell" }}>
                  {item.tax.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </TableCell>
                <TableCell sx={{ fontSize: 12, p: 0, pl: 1,
                  display: minimal ? "none" : "table-cell" }}>
                  {item.price.toLocaleString("es-CL", {
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
                <TableCell sx={{ fontSize: 12, p: 0, pl: 1 }}>
                  {item.discount.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <PrintContainer>
        <Grid container spacing={1} direction={"column"} p={1}>
          <Grid item>
            <Typography variant="subtitle" fontWeight={"bold"}>
              Detalle venta N° {saleData.id}
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={12} lineHeight={1.2}>
              Fecha: {moment(saleData.createdAt).format("DD-MM-YYYY HH:mm")}
            </Typography>
            <Typography fontSize={12} lineHeight={1.2}>
              Cliente: {saleData.Customer ? saleData.Customer.name : ""}
            </Typography>
            <Typography fontSize={12} lineHeight={1.2}>
              Rut: {saleData.Customer ? saleData.Customer.rut : ""}
            </Typography>
            <Typography fontSize={12} lineHeight={1.2}>
              Usuario: {saleData.User ? saleData.User.name : ""}
            </Typography>
            <Typography fontSize={12} lineHeight={1.2}>
              Documento: {documentTypeString(saleData.document_type)}
            </Typography>
            <Typography fontSize={12} lineHeight={1.2}>
              Referencia:{" "}
              {saleData.document_id ? saleData.document_id : "Sin referencia"}
            </Typography>
            <Typography fontSize={12} lineHeight={1.2}>
              Tipo de venta: {sales.saleType(saleData.type)}
            </Typography>
            <Typography fontSize={12} lineHeight={1.2}>
              Descripción: {saleData.description}
            </Typography>
          </Grid>

          <Grid item minWidth={minimal ? "80mm" : 500}>
            {ItemList(saleDetailData)}
          </Grid>
          <Grid item>
            <Typography fontSize={12} lineHeight={1.2} textAlign={"right"}>
              Total:{" "}
              {saleData.total
                ? saleData.total.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })
                : ""}
            </Typography>
          </Grid>
        </Grid>
      </PrintContainer>
    </>
  );
}
