import { useAppContext } from "@/appProvider";
import { Grid, Paper, Typography, TextField, FormControlLabel, Switch, Button } from "@mui/material";
import React, { useState } from "react";
import usePaymentMethods from "../hooks/usePaymentMethods";
import useRecords from "../hooks/useRecords";



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
  const {user, openSnack} = useAppContext();
  const paymentMethods = usePaymentMethods();
  const records = useRecords();
  const [paymentMethodData, setPaymentMethodData] = useState(data);

  const save = async () => {
    if (edit) {
      console.log("Actualizar");
    } else {
      const newPaymentMethod =  await paymentMethods.create(
        paymentMethodData.name,
        paymentMethodData.description,
        paymentMethodData.credit,
      )
      if (newPaymentMethod) {
        openSnack("Medio de pago creado correctamente", "success");
        setPaymentMethodData({
          id: null,
          name: "",
          description: "",
          credit: false,
        
        });
        afterSubmit();
      } else {
        openSnack("Error al crear el medio de pago", "error");
      }
    }
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
            <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={paymentMethodData.credit}
                  onChange={(e) => {
                    setPaymentMethodData({
                      ...paymentMethodData,
                      credit: e.target.checked,
                    });
                  }}
                  color="primary"
                />
              }
              label={
                paymentMethodData.credit
                  ? "Otorga crédito"
                  : "No otorga crédito"
              }
            />
          </Grid>
          <Grid item textAlign={'right'}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              {edit ? "Actualizar" : "Guardar"}
            </Button>
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
  user_id: null,
  customer_id: null,
  document_type: null,
  document_id: null,
  nulled: false,
};



const sale_detail = {
  id: null,
  quanty: 0,
  price: 0,
  discount: 0,
  utility: 0,
  net: 0,
  tax: 0,
  total: 0,
  sale_id: null,
  product_id: null,
};

const credit_notes = {
  id: null,
  description: "",
  type: 0,
  amount: 0,
  reference_id_id: null,
  user_id: null,
  customer_id: null,
  
}

const paymentMethod = {
  id: null,
  name: "",
  description: "",
  credit: false,
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
  nulled: false,
};

const payments = {
  id: null,
  description: "",
  type: null,
  amount: 0,
  balance: 0,
  sale_id: null,
  user_id: null,
  pay_date: null,
  payment_method_id: null,
  customer_id: null,
  cash_register_movement_id: null,
  nulled: false,
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
  nulled: false,
};



