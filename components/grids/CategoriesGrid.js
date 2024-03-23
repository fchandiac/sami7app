import React, { useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import useCategories from "../hooks/useCategories";
import { GridActionsCellItem } from "@mui/x-data-grid";

export default function CategoriesGrid(props) {
  const { update } = props;
  const categories = useCategories();
  const [categoriesList, setCategoriesList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
  const [rowData, setRowData] = useState({ id: 0, name: "", description: "" });

  useEffect(() => {
    const fecth = async () => {
      const data = await categories.findAllToGrid();
      setCategoriesList(data);
    };
    fecth();
  }, [update]);

  const columns = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "name", headerName: "Nombre", flex: 1 },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
      headerClassName: "data-grid-last-column-header",
    },
  ];

  return (
    <>
      <InfoDataGrid
        title={"Categorias"}
        rows={categoriesList}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />
    </>
  );
}
