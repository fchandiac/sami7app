import React, { useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useProducts from "../hooks/useProducts";

// categoryId
// :
// 1001
// code
// :
// "7"
// description
// :
// ""
// favorite
// :
// 0
// id
// :
// 1004
// ivaSubject
// :
// 1
// name
// :
// "test5"
// purchasePriceId
// :
// 1025
// sellingPriceId
// :
// 1015
// stockControl
// :
// 1
// subcategoryId
// :
// 1001
// subcategoryName
// :
// "SIN SUBCATEGORIA"

export default function ProductsGrid() {
  const products = useProducts();
  const [productsList, setProductsList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
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
    subcategory_id: 0,
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
    { field: "stockControl", headerName: "Control de stock", flex: 0.5, type: "boolean"},
    { field: "ivaSubject", headerName: "Afecto IVA", flex: 0.5,  type: "boolean" },
    { field: "favorite", headerName: "Favorito", flex: 0.5,  type: "boolean" },
    { field: "purchasePriceId", headerName: "Purchase Price Id", flex: 1, hide: true},
    { field: "sellingPriceId", headerName: "Selling Price Id", flex: 1, hide: true},
    { field: "subcategoryId", headerName: "Subcategory Id", flex: 1 , hide: true},
  ];

  return (
    <>
      <InfoDataGrid
        columns={columns}
        rows={productsList}
        title="Products"
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />
    </>
  );
}
