import React, { useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useRecords from "../hooks/useRecords"
import moment from "moment"

export default function RecordsGrid() {
  const records = useRecords();
  const [recordsList, setRecordsList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
  const [rowData, setRowData] = useState({
    id: 0,
    userId: "",
    userName: "",
    action: "",
    table: "",
    description: "",
    createdAt: "",
  });

  useEffect(() => {
    const fecth = async () => {
      const data = await records.findAllToGrid();
      setRecordsList(data);
    };
    fecth();
  }, []);

  const columns = [
    { field: "id", headerName: "Id", flex: .4 },
    { field: "userName", headerName: "Funcionario", flex: 1 },
    { field: "action", headerName: "Acción", flex: .6 },
    { field: "table", headerName: "Tabla", flex: .6 },
    { field: "description", headerName: "Descripción", flex: 1.5 },
    {
      field: "createdAt",
      headerName: "Fecha",
      headerClassName: "data-grid-last-column-header",
      flex: 1,
      valueFormatter: (params) =>
        moment(params.value).format("DD-MM-YYYY HH:mm"),
    },
  ];
  return (
    <>
        <InfoDataGrid
            title={"Registros"}
            rows={recordsList}
            columns={columns}
            setGridApiRef={setGridApiRef}
            height="85vh"
        />
    </>
  )
}
