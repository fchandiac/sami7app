import React, { useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useTaxes from "../hooks/useTaxes";

// valueFormatter: (params) => params.value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 2  })

export default function TaxesGrid(props) {
  const { update } = props;
  const taxes = useTaxes();
  const [taxesList, setTaxesList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
  const [rowData, setRowData] = useState({
    id: 0,
    name: "",
    percentage: '',
    description: "",
  });

  useEffect(() => {
    const fecth = async () => {
      const data = await taxes.findAllToGrid();
      setTaxesList(data);
    };
    fecth();
  }, [update]);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.4 },
    { field: "name", headerName: "Nombre", flex: 1 },
    {
      field: "percentage",
      headerName: "Porcentaje",
      flex: 0.6,
      valueFormatter: (params) => `${params.value.toLocaleString("es-CL")} %`,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1.5,
      headerClassName: "data-grid-last-column-header",
    },
  ];

  return (
    <InfoDataGrid
      title={"Inpuestos"}
      rows={taxesList}
      columns={columns}
      setGridApiRef={setGridApiRef}
      height={"80vh"}
    />
  );
}
