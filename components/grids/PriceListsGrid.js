import React, { useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import usePriceLists from "../hooks/usePriceLists";

export default function PriceListsGrid(props) {
    const { update } = props;
    const priceLists = usePriceLists();
    const [priceListsList, setPriceListsList] = useState([]);
    const [gridApiRef, setGridApiRef] = useState(null);
    const [rowData, setRowData] = useState({ id: 0, name: "", description: "" });

    useEffect(() => {
        const fecth = async () => {
            const data = await priceLists.findAllToGrid();
            setPriceListsList(data);
        };
        fecth();
    }, [update]);

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Nombre", width: 200 },
        { field: "description", headerName: "Descripción", width: 300, headerClassName: "data-grid-last-column-header"},
    ];

    
  return (
    <>
      <InfoDataGrid
        title={"Listas de precios"}
        rows={priceListsList}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />
    </>
  )
}
