import { Grid, Paper, Typography, TextField } from "@mui/material";
import React, { useState } from "react";

export default function PaymenthMethodForm(props) {
  const {
    data = {
      id: null,
      name: "",
      description: "",
      credit: false,
    },
    edit = false,
    afterSubmit = () => {},
  } = props;

  const [paymentMethodData, setPaymentMethodData] = useState(data);

  const save = async () => {
    console.log("save");
  };

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <Grid container spacing={1} direction={"column"}>
            <Grid item>
              <Typography variant={"subtitle1"}>
                {edit ? "Actualizar" : "Nuevo"} Medio de pago
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Nombre"
                name="paymentMethodName"
                value={paymentMethodData.name}
                onChange={(e) =>
                  setPaymentMethodData({
                    ...paymentMethodData,
                    name: e.target.value,
                  })
                }
                required
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Descripción"
                name="paymentMethodDescription"
                value={paymentMethodData.description}
                onChange={(e) =>
                  setPaymentMethodData({
                    ...paymentMethodData,
                    description: e.target.value,
                  })
                }
                fullWidth
                variant="outlined"
                size="small"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

const sale_point = {
  id: 0,
  name: "",
  description: "",
  address: "",
  phone: "",
  storage: { id: 1001, key: 1001, name: "SALA DE VENTAS" },
  status: false,
};

const cash_registers = {
  id: 0,
  status: false,
  open: 0,
  balance: 0,
  close: 0,
  open_user_id: null,
  close_user_id: null,
  sale_point_id: null,
};

const sale = {
  id: null,
  description: "",
  type: 0,
  discount: 0,
  utility: 0,
  net: 0,
  tax: 0,
  total: 0,
  balance: 0,
  pay_date: new Date(),
  user_id: null,
  customer_id: null,
  document_type: null,
  document_id: null,
};

const paymentMethod = {
  id: null,
  name: "",
  description: "",
};

const cash_register_movements = {
  id: null,
  cash: true,
  description: "",
  type: 0,
  previous_balance: 0,
  debit: 0,
  credit: 0,
  balance: 0,
  user_id: null,
  reference_id: null,
  paymentMethod_id: null,
  user_id: null,
};

const payment = {
  id: null,
  description: "",
  type: null,
  amount: 0,
  user_id: null,
  payment_method_id: null,
  customer_id: null,
  reference_id: null,
  cash_register_movement_id: null,
};

const customer_account_movements = {
  id: null,
  description: "",
  type: 0,
  previous_balance: 0,
  debit: 0,
  credit: 0,
  balance: 0,
  reference_id: null,
  customer_id: null,
  user_id: null,
};
