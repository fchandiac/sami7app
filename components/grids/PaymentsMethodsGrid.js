import React, { useEffect, useState } from "react";
import InfoDataGrid from "../custom/InfoDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import usePaymentMethods from "../hooks/usePaymentMethods";
import { Dialog } from "@mui/material";
import PaymenthMethodForm from "../forms/PaymenthMethodForm";
import EditIcon from "@mui/icons-material/Edit";


export default function PaymentsMethodsGrid(props) {
    const {update} = props;
    const paymentMethods = usePaymentMethods();
    const [paymentMethodsList, setPaymentMethodsList] = useState([]);
    const [gridApiRef, setGridApiRef] = useState(null);

    const [rowData, setRowData] = useState({
        id: 0,
        name: "",
        description: "",
        credit: false,
    });
    const [openEditDialog, setOpenEditDialog] = useState(false);

    useEffect(() => {
        const fecth = async () => {
            const data = await paymentMethods.findAll();
            console.log(data);
            setPaymentMethodsList(data);
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
        },
        {
            field: "credit",
            type: "boolean",
            headerName: "Credito",
            flex: 1,
        },
          {
            field: "actions",
            headerName: "",
            headerClassName: "data-grid-last-column-header",
            type: "actions",
            flex: 0.3,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label={"Ver"}
                    onClick={() => {
                        setRowData({
                            id: params.row.id,
                            name: params.row.name,
                            description: params.row.description,
                            credit: params.row.credit,
                        });
                        setOpenEditDialog(true);
                        
                    }}
                />,

            ]
        }
    ];


    const afterUpdate = (data) => {
      gridApiRef.current.updateRows([
        {
          id: data.id,
          name: data.name,
          description: data.description,
          credit: data.credit,
        },
      
      ])
      setOpenEditDialog(false);
    }


  return (
    <>
      <InfoDataGrid
        title={"Metodos de Pago"}
        rows={paymentMethodsList}
        setGridApiRef={setGridApiRef}
        columns={columns}
        height={"80vh"}
      />
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        >
          <PaymenthMethodForm data={rowData} afterSubmit={afterUpdate} edit={true}/>
        </Dialog>
    </>
  )
}
