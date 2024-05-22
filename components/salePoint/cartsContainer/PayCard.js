import {
  Paper,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import useUtils from "@/components/hooks/useUtils";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useSalePointContext } from "../salePointProvider";


export default function PayCard(props) {
  const {
    pay,
    cart
  } = props;
  const { removePaymentMethodFromCart, updatePaymenMethodAmountFromCart, updateCartPayments, setPaymentAmountAndTotalPaymentsValues } = useSalePointContext();
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();


    // useEffect(() => {   
    //     updatePaymenMethodFromList(payData);
    // }, [payData]);


  return (
    <>
      <Paper variant="outlined" sx={{ p: 1, mb: 1 }}>
        <Grid container spacing={1} direction={"column"}>
          <Grid item>
            <Typography variant={"subtitle1"}>{pay.name}</Typography>
          </Grid>
          <Grid item display={"flex"}>
            <TextField
              sx={{ flexGrow: 1 }}
              label="Monto"
              name="amount"
              variant="outlined"
              fullWidth
              type="number"
              value={pay.amount}
              onChange={(e) => {
                // console.log("pay", pay);
                // updatePaymenMethodAmountFromCart(cart.id, pay.id, parseInt(e.target.value));
                // updateCartPayments(cart.id);
                setPaymentAmountAndTotalPaymentsValues(cart.id, pay.id, parseInt(e.target.value));
              }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <IconButton
              onClick={() => {
                removePaymentMethodFromCart(cart.id, pay.id);
              }}
            >
              <RemoveCircleIcon />
            </IconButton>
          </Grid>
          <Grid item display={pay.credit == true ? 'block': 'none'}>
            <DesktopDatePicker
              label="Fecha de Pago"
              value={pay.payDate}
              onChange={(newValue) => {
                // setPayData({ ...payData, payDate: newValue });
              }}
              renderInput={(params) => <TextField {...params} fullWidth size={'small'} />}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

const payDataDefault = () => ({
  id: null,
  name: "",
  amount: "",
  change: 0,
  credit: false,
  payDate: new Date(),
});
