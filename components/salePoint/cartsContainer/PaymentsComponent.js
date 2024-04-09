import TitlePaper from "@/components/custom/TitlePaper";
import usePaymentMethods from "@/components/hooks/usePaymentMethods";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Dialog,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import useUtils from "@/components/hooks/useUtils";
import useSalePoint from "@/components/hooks/useSalePoint";
import { useAppContext } from "@/appProvider";
import { useReactToPrint } from "react-to-print";
import Document from "@/components/prints/Document";
import PrintDialog from "@/components/prints/PrintDialog";
import { set } from "autonumeric";
import ProcessComponent from "../ProcessComponent";
import useDte from "@/components/hooks/useDte";




export default function PaymentsComponent(props) {
  const { cart } = props;
  const [payments, setPayments] = useState([
    {
      paymentMethodId: 1001,
      paymentMethodName: "EFECTIVO",
      amount: "",
      credit: false,
      change: 0,
    },
  ]);
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const { globalSaleProcess } = useSalePoint();
  const paymentMethods = usePaymentMethods();
  const dte = useDte();
  const [paymentMethodsOptions, setPaymentMethodsOptions] = useState([]);
  const [sumPayments, setSumPayments] = useState(0);
  const [sumNoCashPayments, setSumNoCashPayments] = useState(0);
  const [change, setChange] = useState(0);
  const [balancePayments, setBalancesPyments] = useState(0);
  const { openSnack } = useAppContext();
  const [openProcessDialog, setOpenProcessDialog] = useState(false);
  const [disableProcessButton, setDisableProcessButton] = useState(false);
  const [documentData, setDocumentData] = useState(dte.documenteDataDefault());
  const [finishProcess, setFinishProcess] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const paymentMethods_ = await paymentMethods.findAll();
      console.log(paymentMethods_);
      setPaymentMethodsOptions(paymentMethods_);
    };
    fetch();
  }, []);

  useEffect(() => {
    let sum = 0;
    let change = 0;
    let balanceAmount = 0;
    let cashPaymentAmount = 0;
    let sumNoCash = 0;

    payments.forEach((payment) => {
      const isCrashPayment = payment.paymentMethodId === 1001;

      if (isCrashPayment) {
        cashPaymentAmount = isNaN(parseInt(removeThousandsSeparator(payment.amount))) ? 0 : parseInt(removeThousandsSeparator(payment.amount));
      } else {
        sumNoCash += isNaN(parseInt(removeThousandsSeparator(payment.amount))) ? 0 : parseInt(removeThousandsSeparator(payment.amount));
      }
      

    });

 

    sum = sumNoCash + cashPaymentAmount;
    balanceAmount = cart.total - sum;

    let preChange =cart.total - sumNoCash;
    change = (cashPaymentAmount - preChange) < 0 ?  0: cashPaymentAmount - preChange;

    console.log('preChange', preChange);

    console.log("sumNoCash", sumNoCash);
    console.log("cashPaymentAmount", cashPaymentAmount);
    console.log("cart.total", cart.total);
    console.log("sumNoCash + cashPaymentAmount", sumNoCash + cashPaymentAmount);

    setSumPayments(isNaN(sum) ? 0 : sum);
    setChange(isNaN(change) ? 0 : change);
    setBalancesPyments(isNaN(balanceAmount) ? 0 : balanceAmount);
    setSumNoCashPayments(isNaN(sumNoCash) ? 0 : sumNoCash);
  }, [payments, cart.total]);

  const addPaymentMethodToList = (paymentMethod) => {
    console.log("Agregando método de pago", paymentMethod);
    const paymentMethodIdToAdd = paymentMethod.id;
    const isPaymentMethodAlreadyAdded = payments.some(
      (payment) => payment.paymentMethodId === paymentMethodIdToAdd
    );
    console.log("isPaymentMethodAlreadyAdded", isPaymentMethodAlreadyAdded);

    if (!isPaymentMethodAlreadyAdded) {
      setPayments([
        ...payments,
        {
          paymentMethodId: paymentMethod.id,
          paymentMethodName: paymentMethod.name,
          amount: "",
          credit: paymentMethod.credit,
          change: 0,
        },
      ]);
    } else {
      openSnack("El método de pago ya fue agregado", "error");
    }
  };

  const processSale = async () => {
    console.log("sumNoCashPayments", sumNoCashPayments);
    if (sumNoCashPayments > cart.total) {
      openSnack(
        "El monto pagado con métodos de pago no efectivo excede el total de la venta",
        "error"
      );
      return;
    }
    if (sumPayments < cart.total) {
      openSnack("El monto pagado es menor al total de la venta", "error");
      return;
    }
    if (payments.length === 0) {
      openSnack("Debe ingresar al menos un pago", "error");
      return;
    }
    if (cart.items.length === 0) {
      openSnack("No hay productos en el carro", "error");
      return;
    }

    console.log("Procesando venta", payments);
    // setDocumentData(
    //   ...documentData,
    //   documentType: 1,
    // )

    setDocumentData({
      ...documentData,
      documentType: 1,
      total: cart.total,
      items: cart.items,
      payments: payments,
      change: change,
    })
    //const cartToDocument = dte.cartToDocument(1, cart, payments, cart.total, cart.discounts, cart.subjectTotal, cart.exemptTotal, cart.iva, change, 0, 0, 0);
    setOpenProcessDialog(true);
    const procces = globalSaleProcess(payments,change);
    setFinishProcess(true);
    // console.log(procces);
  };

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
                        addPaymentMethodToList(paymentMethod);
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
                        <Grid item display={"flex"}>
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
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
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
                <Grid item textAlign={"center"}>
                  <Typography variant="body">Resumen de venta</Typography>
                </Grid>
                <Grid item>
                  <Typography fontSize={12}>
                    Total:{" "}
                    {cart.total.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontSize={12}>
                    Descuentos:{" "}
                    {cart.discounts.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography fontSize={12}>
                    Pagos:
                    {sumPayments.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontSize={12}>
                    Saldo:
                    {balancePayments.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography fontSize={12}>
                    Cambio:
                    {change.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </Typography>
                </Grid>
                <Grid item textAlign={"right"}>
                  <Button
                    disabled={sumPayments < cart.total}
                    variant={"contained"}
                    onClick={async () => {
                      processSale();
                    }}
                  >
                    Procesar venta
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
      </TitlePaper>

      <ProcessComponent openDialog={openProcessDialog} setOpenDialog={setOpenProcessDialog} documentData={documentData} finishProcess={finishProcess}/>


    </>
  );
}
