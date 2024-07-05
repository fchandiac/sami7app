import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoDataGrid from "../custom/InfoDataGrid";
import usePayments from "../hooks/usePayments";
import moment from "moment";

export default function PaymentsGrid(props) {
  const {
    filterDates = {
      start: moment(new Date()).format("YYYY-MM-DD"),
      end: moment(new Date()).format("YYYY-MM-DD 23:59"),
    },
    status = 3,
  } = props;
  const [paymentsList, setPaymentsList] = useState([]);
  const payments = usePayments();
  const [gridApiRef, setGridApiRef] = useState(null);

  // {
  //     "id": 1019,
  //     "description": "",
  //     "type": 1,
  //     "amount": 0,
  //     "balance": 0,
  //     "sale_id": 1010,
  //     "user_id": 1001,
  //     "pay_date": "2024-05-03T07:48:05.000Z",
  //     "payment_method_id": 1001,
  //     "customer_id": 1002,
  //     "cash_register_movement_id": 1029,
  //     "createdAt": "2024-05-03T07:52:19.000Z",
  //     "updatedAt": "2024-05-03T07:52:19.000Z",
  //     "SaleId": 1010,
  //     "UserId": 1001,
  //     "paymentMethodId": 1001,
  //     "CustomerId": 1002,
  //     "CashRegisterMovementId": 1029,
  //     "User": {
  //         "id": 1001,
  //         "user_name": "admin",
  //         "name": "Administrador",
  //         "password": "admin",
  //         "profile_id": 1001,
  //         "createdAt": "2024-05-03T06:35:41.000Z",
  //         "updatedAt": "2024-05-03T06:35:41.000Z",
  //         "ProfileId": 1001
  //     },
  //     "Customer": {
  //         "id": 1002,
  //         "rut": "16.822.404-4",
  //         "name": "FELIPE DEL TRANSITO CHANDIA CASTILLO",
  //         "activity": "OTRAS ACTIVIDADES DE SERVICIOS PERSONALES N.C.P.",
  //         "district": 141,
  //         "city": 93,
  //         "address": "Su Casa Esquina",
  //         "phone": "",
  //         "mail": "",
  //         "createdAt": "2024-05-03T07:20:47.000Z",
  //         "updatedAt": "2024-05-03T07:20:47.000Z"
  //     }
  // }

  useEffect(() => {
    const fetch03 = async () => {
      const data = await payments.findAllBetweenDates(
        filterDates.start,
        filterDates.end
      );
      const formatedData = data.map((item) => formatData(item));
      console.log("data", data);
      setPaymentsList(formatedData);
    };

    const fetch01 = async () => {
      const data = await payments.findAllBetweenDatesPositiveBalance(
        filterDates.start,
        filterDates.end
      );
      const formatedData = data.map((item) => formatData(item));
      setPaymentsList(formatedData);
    };

    const fetch02 = async () => {
      const data = await payments.findAllBetweenDatesZeroBalance(
        filterDates.start,
        filterDates.end
      );
      const formatedData = data.map((item) => formatData(item));
      setPaymentsList(formatedData);
    };

    if (status === 1) {
      fetch01();
    } else if (status === 2) {
      fetch02();
    } else {
      fetch03();
    }
  }, [filterDates, status]);

  const formatData = (data) => ({
    id: data.id,
    description: data.description,
    type: data.type,
    amount: data.amount,
    balance: data.balance,
    status: data.balance === 0 ? true : false,
    sale_id: data.sale_id,
    userName: data.User.name,
    payDate: data.pay_date,
    paymentMethodName: data.paymentMethod.name,
    customerName: data.Customer.name,
    cashRegisterMovementId: data.cash_register_movement_id,
  });

  const columns = [
    { field: "id", headerName: "Id", flex: .5 },
    { field: "description", headerName: "Descripción", flex: 1, hide: true },
    { field: "type", headerName: "Tipo", flex: 1, hide: true },
    { field: "amount", headerName: "Monto", flex: 1,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
     },
    { field: "balance", headerName: "Saldo", flex: 1,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
     },
    { field: "status", headerName: "Estado", flex: 1, type: "boolean"},
    { field: "sale_id", headerName: "Venta", flex: 1, hide: true},
    { field: "userName", headerName: "Usuario", flex: 1, hide: true },
    { field: "payDate", headerName: "Pay Date", flex: 1, valueFormatter: (params) => moment(params.value).format("DD-MM-YYYY HH:ss") },
    { field: "paymentMethodName", headerName: "Medio de pago", flex: 1 },
    { field: "customerName", headerName: "Cliente", flex: 1 },

  ];

  return (
    <>
      <InfoDataGrid
        title={"Pagos"}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
        rows={paymentsList}
      />
    </>
  );
}
