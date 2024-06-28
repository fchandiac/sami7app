import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoDataGrid from "../custom/InfoDataGrid";
import useCustomers from "../hooks/useCustomers";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog } from "@mui/material";
import CustomerForm from "../forms/CustomerForm";
import useLioren from "../hooks/useLioren";

export default function CustomersGrid(props) {
  const { update } = props;
  const [customersList, setCustomersList] = useState([]);
  const customers = useCustomers();
  const [gridApiRef, setGridApiRef] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [districtsOptions, setDistrictsOptions] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const lioren = useLioren();

  const [rowData, setRowData] = useState({
    id: null,
    rut: "",
    name: "",
    activity: "",
    address: "",
    phone: "",
    mail: "",
    district: null,
    city: null,
  });

  useEffect(() => {
    const fecthDistricts = async () => {
      const data = await lioren.district();
      console.log(data);
      setDistrictsOptions(data);
    };
    const fecthCities = async () => {
      const data = await lioren.cities();
      console.log(data);
      setCitiesOptions(data);
    };
    fecthDistricts();
    fecthCities();
  }, []);

  useEffect(() => {
    const fecth = async () => {
      const data = await customers.findAll();
      console.log(data);
      setCustomersList(data);
    };
    fecth();
  }, [update]);

  const columns = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "rut", headerName: "Rut", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "activity", headerName: "Activity", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "mail", headerName: "Mail", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
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
            console.log(citiesOptions.find((c) => c.id === params.row.city));
            const cityFilter = citiesOptions.find(
              (c) => c.id === params.row.city
            );
            const districtFilter = districtsOptions.find(
              (d) => d.id === params.row.district
            );
            setRowData({
              id: params.row.id,
              rut: params.row.rut,
              name: params.row.name,
              activity: params.row.activity,
              address: params.row.address,
              phone: params.row.phone,
              mail: params.row.mail,
              district:{
                id: districtFilter.id,
                name: districtFilter.nombre,
                key: districtFilter.id,
              },
              city: {
                id: cityFilter.id,
                name: cityFilter.nombre,
                key: cityFilter.id,
              },
            });
            setOpenEditDialog(true);
          }}
        />,
      ],
    },
  ];

  const afterUpdate =  (data) => {
    gridApiRef.current.updateRows([
      {
        id: rowData.id,
        name: data.name,
        activity: data.activity,
        address: data.address,
        phone: data.phone,
        mail: data.mail
      },
    ]);
    setOpenEditDialog(false);
  };

  return (
    <>
      <InfoDataGrid
        title={"Clientes"}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
        rows={customersList}
      />
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth={"sm"}
      >
        <CustomerForm data={rowData} edit={true} afterSubmit={afterUpdate}/>
      </Dialog>
    </>
  );
}
