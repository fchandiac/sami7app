import TitlePaper from "@/components/custom/TitlePaper";
import usePaymentMethods from "@/components/hooks/usePaymentMethods";
import { Box, Button, Grid, Paper, Typography, TextField, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import useUtils from "@/components/hooks/useUtils";


export default function PaymentsComponent(props) {
  const {cart} = props;
  const [payments, setPayments] = useState([
    {
      paymentMethodId: 1001,
      paymentMethodName: "EFECTIVO",
      amount: "",
      credit: false,
    },
  ]);
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const paymentMethods = usePaymentMethods();
  const [paymentMethodsOptions, setPaymentMethodsOptions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const paymentMethods_ = await paymentMethods.findAll();
      console.log(paymentMethods_);
      setPaymentMethodsOptions(paymentMethods_);
    };
    fetch();
  }, []);
  return (
    <>
      <TitlePaper title="Pagos">
        <Box display={"flex"}>
          <Box width={"30%"}>
            <Grid container spacing={1} direction={"column"}>
              {paymentMethodsOptions.map((paymentMethod) => {
                return (
                  <Grid item>
                    <Button
                      fullWidth
                      endIcon={<AddCircleIcon />}
                      variant={"outlined"}
                      sx={{ textAlign: "right" }}
                      size="small"
                      onClick={() => {
                        const newPayments = [...payments];
                        newPayments.push({
                          paymentMethodId: paymentMethod.id,
                          paymentMethodName: paymentMethod.name,
                          amount: "",
                          credit: paymentMethod.credit,
                        });
                        setPayments(newPayments);
                      }}
                    >
                      {paymentMethod.name}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box width={"30%"} pl={1}>
            <Grid container spacing={1} direction={"column"}>
              {payments.map((payment, index) => {
                return (
                  <Grid item>
                    <Paper variant="oulined" sx={{ p: 1 }}>
                      <Grid container spacing={1} direction={"column"}>
                        <Grid item>
                          <Typography fontSize={12}>
                            {index + 1 + ".- " + payment.paymentMethodName}
                          </Typography>
                        </Grid>
                        <Grid item display={'flex'}>
                          <TextField
                            fullWidth
                            name="paymentAmount"
                            variant="outlined"
                            label="Monto"
                            size="small"
                            value={addThousandsSeparator(payment.amount)}
                            onChange={(e) => {
                              const newPayments = [...payments];
                              newPayments[index].amount = e.target.value;
                              setPayments(newPayments);
                            }}
                          />
                          <IconButton
                            onClick={() => {
                              const newPayments = [...payments];
                              newPayments.splice(index, 1);
                              setPayments(newPayments);
                            }}
                            size="small"
                          >
                            <RemoveCircleIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box width={"40%"} pl={1}>
            <Paper variant="outlined" sx={{ p: 1 }}>
              <Grid container spacing={1} direction={"column"}>
                <Grid item>
                  <Typography fontSize={12}>Total: {cart.total}</Typography>
                </Grid>
                <Grid item>
                  <Typography fontSize={12}>Pagos: $1000</Typography>
                </Grid>
                <Grid item>
                  <Typography fontSize={12}>Cambio: $0</Typography>
                </Grid>
              </Grid>
            </Paper>
            </Box>

        </Box>
      </TitlePaper>
    </>
  );
}
