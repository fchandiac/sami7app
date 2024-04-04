import React, { useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useProducts from "../hooks/useProducts";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog } from "@mui/material";
import ProductForm from "../forms/ProductForm";

export default function ProductsGrid() {
  const products = useProducts();
  const [productsList, setProductsList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [rowData, setRowData] = useState({
    id: 0,
    name: "",
    code: "",
    description: "",
    stock_control: false,
    iva_subject: false,
    favorite: false,
    purchase_price_id: 0,
    selling_price_id: 0,
    subcategory: { id: 0, key: 0, name: "" },
  });

  useEffect(() => {
    const fecth = async () => {
      const data = await products.findAll();
      console.log(data);
      setProductsList(data);
    };
    fecth();
  }, []);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.6 },
    { field: "code", headerName: "Code", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "subcategoryName", headerName: "Subcategoría", flex: 1 },
    {
      field: "stockControl",
      headerName: "Control de stock",
      flex: 0.5,
      type: "boolean",
    },
    {
      field: "ivaSubject",
      headerName: "Afecto IVA",
      flex: 0.5,
      type: "boolean",
    },
    { field: "favorite", headerName: "Favorito", flex: 0.5, type: "boolean" },
    {
      field: "actions",
      headerName: "",
      headerClassName: "data-grid-last-column-header",
      type: "actions",
      flex: 0.2,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label={"Ver"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              code: params.row.code,
              name: params.row.name,
              description: params.row.description,
              stockControl: params.row.stockControl,
              ivaSubject: params.row.ivaSubject,
              favorite: params.row.favorite,
              subcategory: {
                id: params.row.Subcategory.id,
                key: params.row.Subcategory.id,
                name: params.row.Subcategory.name,
                category:{
                  id: params.row.Subcategory.Category.id,
                  key: params.row.Subcategory.Category.id,
                  name: params.row.Subcategory.Category.name
                }
              },
            });
            setOpenEditDialog(true);
          }}
        />,
      ],
    },
  ];

  const afterUpdate = (data) => {
    gridApiRef.current.updateRows([
      {
        id: data.id,
        code: data.code,
        name: data.name,
        description: data.description,
        stockControl: data.stockControl,
        ivaSubject: data.ivaSubject,
        favorite: data.favorite,
        subcategoryName: data.subcategory.name,
      },
    ]);
    setOpenEditDialog(false);
  }

  return (
    <>
      <InfoDataGrid
        columns={columns}
        rows={productsList}
        title="Products"
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth={"sm"}
      >
        <ProductForm data={rowData} afterSubmit={afterUpdate}/>
      </Dialog>
    </>
  );
}
