import React, { use, useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useRecords from "../hooks/useRecords";
import moment from "moment";
import useSellingPrices from "../hooks/useSellingPrices";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import useUtils from "../hooks/useUtils";


export default function SellingPricesGrid() {
  const records = useRecords();
  const { addThousandsSeparator } = useUtils();
  const sellingPrices = useSellingPrices();
  const [sellingPricesList, setSellingPricesList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [rowData, setRowData] = useState({
    id: 0,
    productCode: "",
    productName: "",
    priclistId: null,
    priceListName: "",
    gross: 0,
    net: 0,
    purchase_net: 0,
    utility: 0,
    taxes: [],
  });

  useEffect(() => {
    const fecth = async () => {
      const data = await sellingPrices.findAll();
      const dataFormatted = data.map((item) => {
        return {
          id: item.id,
          gross: item.gross,
          net: item.net,
          purchase_net: item.purchase_net,
          utility: item.utility,
          updatedAt: item.updatedAt,
          priceListId: item.PriceList.id,
          priceListName: item.PriceList.name,
          productId: item.ProductId,
          productName: item.Product.name,
          productCode: item.Product.code,
          taxes: item.Taxes,
        };
      });
      setSellingPricesList(dataFormatted);
    };
    fecth();
  }, []);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.4 },
    { field: "productCode", headerName: "Código", flex: 0.6 },
    { field: "productName", headerName: "Producto", flex: 1 },
    { field: "priceListName", headerName: "Lista de precios", flex: 0.9 },
    {
      field: "gross",
      headerName: "Bruto",
      flex: 0.6,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
    },
    {
      field: "net",
      headerName: "Neto",
      flex: 0.6,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
    },
    {
      field: "purchase_net",
      headerName: "Neto de compra",
      flex: 0.9,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
    },
    {
      field: "utility",
      headerName: "Utilidad",
      flex: 0.6,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
    },
    {
      field: "update_at",
      headerName: "Actualizado",
      flex: 1,
      valueFormatter: (params) =>
      params.value == null? '': moment(params.value).format("DD-MM-YYYY HH:mm"),
    },
    {
      field: "actions",
      headerName: "",
      headerClassName: "data-grid-last-column-header",
      type: "actions",
      flex: 0.2,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label={"Editar"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              productCode: params.row.productCode,
              productName: params.row.productName,
              priceListId: params.row.priceListId,
              priceListName: params.row.priceListName,
              gross: params.row.gross,
              net: params.row.net,
              purchase_net: params.row.purchase_net,
              utility: params.row.utility,
              taxes: params.row.taxes,
            });
            setOpenEditDialog(true);
          }}
        />,
      ],
    },
  ];

  const updateSellingPrice = async (e) => {
    const update = await sellingPrices.update(
      rowData.id,
      rowData.net,
      rowData.gross,
      rowData.priclistId,
    )
  
      gridApiRef.current.updateRows([
        {
          id: rowData.id,
          productCode: rowData.productCode,
          productName: rowData.productName,
          priceListId: rowData.priceListId,
          priceListName: rowData.priceListName,
          gross: rowData.gross,
          net: rowData.net,
          purchase_net: rowData.purchase_net,
          utility: rowData.utility,
          taxes: rowData.taxes,
        }]);
    setOpenEditDialog(false);
      
  };

  return (
    <>
      <InfoDataGrid
        title={"Precios de venta"}
        rows={sellingPricesList}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height="85vh"
      />
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <Paper variant="outlined" sx={{ padding: 2 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateSellingPrice();
            }}
          >
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <Typography variant={"subtitle1"}>
                  Editar precio de venta
                </Typography>
              </Grid>

              <Grid item mb={2}>
                <Typography variant={"subtitle2"}>
                  Producto: {rowData.productName}
                </Typography>
                <Typography variant={"subtitle2"}>
                  Código: {rowData.productCode}
                </Typography>
              </Grid>

              <Grid item>
                <TextField
                  label="Precio Bruto"
                  value={addThousandsSeparator(rowData.gross)}
                  onChange={(e) =>
                    setRowData({ ...rowData, gross: e.target.value })
                  }
                  fullWidth
                  required
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Precio Neto"
                  value={addThousandsSeparator(rowData.net)}
                  onChange={(e) =>
                    setRowData({ ...rowData, net: e.target.value })
                  }
                  fullWidth
                  required
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Utilidad"
                  value={addThousandsSeparator(rowData.utility)}
                  onChange={(e) =>
                    setRowData({ ...rowData, utility: e.target.value })
                  }
                  fullWidth
                  required
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item textAlign={"right"}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Dialog>
    </>
  );
}
