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
  Autocomplete,
  IconButton
} from "@mui/material";
import useUtils from "../hooks/useUtils";
import TitlePaper from "../custom/TitlePaper";
import useTaxes from "../hooks/useTaxes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RedoIcon from "@mui/icons-material/Redo";
import { set } from "autonumeric";





export default function SellingPricesGrid(props) {
  const {update} = props;
  const records = useRecords();
  const taxes = useTaxes();
  const { addThousandsSeparator, grossPrice, removeThousandsSeparator, taxesAmount } = useUtils();
  const sellingPrices = useSellingPrices();
  const [sellingPricesList, setSellingPricesList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [taxesOptions, setTaxesOptions] = useState([]);
  const [taxesList, setTaxesList] = useState([]);
  const [selectedTax, setSelectedTax] = useState(null);
  const [rowData, setRowData] = useState({
    id: 0,
    productCode: "",
    productName: "",
    pricelistId: null,
    priceListName: "",
    gross: 0,
    net: 0,
    tax: 0,
    purchase_net: 0,
    utility: 0,
    taxes: [],
  });

useEffect(() => {
    const fetch = async () => {
      const data = await taxes.findAll();
      const dataFormatted = data.map((item) => {
        return {
          id: item.id,
          key: item.id,
          name: item.name,
          value: item.value,
        };
      }
      );
      setTaxesOptions(dataFormatted);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fecth = async () => {
      const data = await sellingPrices.findAll();
      console.log(data);
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
  }, [update]);

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
    // {
    //   field: "update_at",
    //   headerName: "Actualizado",
    //   flex: 1,
    //   valueFormatter: (params) =>
    //   params.value == null? '': moment(params.value).format("DD-MM-YYYY HH:mm"),
    // },
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
            console.log(params.row);
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
            setTaxesList(params.row.taxes);
            setOpenEditDialog(true);
          }}
        />,
      ],
    },
  ];

  // const addTax = () => {
  //   const tax = selectedTax;
  //   const findTax = taxesList.find((t) => t.id === tax.id);
  //   if (findTax) {
  //     return;
  //   } else {
  //     setTaxesList([...taxesList, tax]);
  //   }
  // };

  // const removeTax = (index) => {
  //   const taxes = taxesList;
  //   taxes.splice(index, 1);
  //   setTaxesList([...taxes]);
  // };


  const netToGross = () => {
    const net_ = removeThousandsSeparator(rowData.net);
    const gross = grossPrice(net_, rowData.taxes);
    console.log(gross);
    setRowData({ ...rowData, gross: addThousandsSeparator(gross), utility: addThousandsSeparator(rowData.purchase_net - net_)  });

  };

  const updateSellingPrice = async (e) => {
    const update = await sellingPrices.update(
      rowData.id,
      removeThousandsSeparator(rowData.net),
      removeThousandsSeparator(rowData.gross),
      removeThousandsSeparator(rowData.utility),
      rowData.pricelistId
    )
  
      gridApiRef.current.updateRows([
        {
          id: rowData.id,
          productCode: rowData.productCode,
          productName: rowData.productName,
          priceListId: rowData.pricelistId,
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
              <Grid item >
                <TextField
               
                  label="Precio Neto de compra"
                  value={addThousandsSeparator(rowData.purchase_net)}
                  onChange={(e) =>
                    setRowData({ ...rowData, purchase_net: e.target.value })
                  }
                  fullWidth
                  disabled
   
                
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              
              </Grid>
              <Grid item display={'flex'}>
                <TextField
                 sx={{ flexGrow: 1 }}
                  label="Precio Neto venta"
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
                  <IconButton onClick={() => netToGross()}>  <RedoIcon /></IconButton>
              </Grid>

              <Grid item>

                <TitlePaper title={"Impuestos"}>
                  <Grid container spacing={1}>
                    {/* <Grid item display={"flex"} xs={12}>
                      <Autocomplete
                        sx={{ flexGrow: 1 }}
                        options={taxesOptions}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => setSelectedTax(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Añadir impuesto"
                            fullWidth
                            size="small"
                          />
                        )}
                      />
                      <IconButton onClick={() => addTax()}>
                        <AddCircleIcon />
                      </IconButton>
                    </Grid> */}
                    {taxesList.map((tax, index) => (
                      <Grid item key={index}>
                        <Paper
                          variant={"outlined"}
                          sx={{
                            display: "flex",
                            padding: 1,
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ flexGrow: 1 }}>
                            {tax.name}
                          </Typography>
                          {/* <IconButton onClick={() => removeTax(index)}>
                            <RemoveCircleIcon />
                          </IconButton> */}
                        </Paper>
                      </Grid>
                    ))}
                    {/* <Grid item>
                      <Typography fontSize={14}>
                        {" "}
                        Total impuestos:{" $"}
                        {(rowData.gross - rowData.net).toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </Typography>
                    </Grid> */}
                  </Grid>
                </TitlePaper>
              </Grid>

              <Grid item>
                <TextField
                  label="Precio Bruto / Precio de Venta"
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
