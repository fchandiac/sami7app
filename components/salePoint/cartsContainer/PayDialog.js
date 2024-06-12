import { useAppContext } from "@/appProvider";
import usePaymentMethods from "@/components/hooks/usePaymentMethods";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Autocomplete,
  Box,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Dialog,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import PayCard from "./PayCard";
import TitlePaper from "@/components/custom/TitlePaper";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useSalePointContext } from "../salePointProvider";
import useSalePoint from "@/components/hooks/useSalePoint";
import moment from "moment";
import useDte from "@/components/hooks/useDte";
import { set } from "autonumeric";
import Document from "@/components/prints/Document";
import PrintContainer from "@/components/prints/PrintContainer";
import useCustomerAccountMovements from "@/components/hooks/useCustomerAccountMovements";



export default function PayDialog(props) {
  const { cart, setOpenPayDialog } = props;
  const [paymentsOptions, setPaymentsOptions] = useState([]);
  const paymentMethods = usePaymentMethods();
  const customerAccountMovements = useCustomerAccountMovements();
  const { info } = useSalePointContext();
  const dte = useDte();
  const { user, openSnack } = useAppContext();
  const { globalSaleProcess, clearCart } = useSalePoint();
  const [paysList, setPaysList] = useState([
    // {
    //   id: 1001,
    //   name: "EFECTIVO",
    //   amount: "",
    //   change: 0,
    //   credit: false,
    //   payDate: new Date(),
    // },
  ]);
  const [totalPays, setTotalPays] = useState(0);
  const [totalChange, setTotalChange] = useState(0);
  const [balance, setBalance] = useState(0);
  const [saleDescription, setSaleDescription] = useState("");
  const [updateValues, setUpdateValues] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "Debe agregar un medio de pago"
  );
  const [authPayment, setAuthPayment] = useState(false);
  const [openDteDialog, setOpenDteDialog] = useState(false);
  const [dteData, setDteData] = useState(dte.documenteDataDefault());
  const [customerBalance, setCustomerBalance] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const payments = await paymentMethods.findAll();
      //   console.log("payments", payments);
      const paymentsFormatted = payments.map((item) => {
        return {
          id: item.id,
          key: item.id,
          name: item.name,
          credit: item.credit,
        };
      });

      setPaymentsOptions(paymentsAllowed(paymentsFormatted));

      const lastCustomerMovement = await customerAccountMovements.findLastByCustomerId(cart.customer.id);
      console.log('lastCustomerMovement',lastCustomerMovement);
      let balance = 0;
      if (lastCustomerMovement) {
        balance = lastCustomerMovement.balance;
      }
      setCustomerBalance(balance);
 

    };
    fetch();
  }, []);

  useEffect(() => {
    authPay(paysList);
  }, [totalChange, totalPays, balance]);

  const paymentsAllowed = (payments) => {
    if (cart.customer.id === null) {
      return payments;
    } else if (cart.customer.id ==  1001) {
      return payments.filter((pay) => pay.credit === false);
    } else {
      return payments;
    }
  }

  const addPaymentMethodToList = (paymentMethod) => {
    const newPayExists = paysList.find((pay) => pay.id === paymentMethod.id);

    if (!newPayExists) {
      authPay([...paysList, paymentMethod]);
      setPaysList([...paysList, paymentMethod]);
    } else {
      openSnack("El pago ya fue agregado", "error");
    }
  };

  const removePaymentMethodFromList = (id) => {
    const newPaysList = paysList.filter((pay) => pay.id !== id);
    updateTotalValues(newPaysList);
    setPaysList(newPaysList);
  };

  const updatePaymenMethodFromList = (pay) => {
    //console.log("Update", moment(pay.payDate).format("DD-MM-YYYY"));
    const newPaysList = paysList.map((item) => {
      if (item.id === pay.id) {
        return pay;
      } else {
        return item;
      }
    });
    setPaysList(newPaysList);
    setUpdateValues(!updateValues);
  };

  const updatePayDatePaymentMethodFromList = (payId, payDate) => {
    const newPaysList = paysList.map((item) => {
      if (item.id === payId) {
        item.payDate = payDate;
        return item;
      } else {
        return item;
      }
    });
    setPaysList(newPaysList);
  };

  const payDataDefault = () => ({
    id: null,
    name: "",
    amount: 0,
    change: 0,
    credit: false,
    payDate: new Date(),
  });

  const updateTotalValues = (paysList) => {
    let sum = 0;
    let change = 0;
    let balance = 0;
    let sumCash = 0;
    let sumNoCash = 0;

    paysList.forEach((pay) => {
      const isCashPayment = pay.id === 1001;
      if (isCashPayment) {
        sumCash += parseInt(pay.amount);
      } else {
        sumNoCash += parseInt(pay.amount);
      }
    });

    sum = sumCash + sumNoCash;
    balance = cart.total - sum;
    let preChange = cart.total - sumNoCash;
    change = sumCash - preChange < 0 ? 0 : sumCash - preChange;

    setTotalPays(isNaN(sum) ? 0 : sum);
    setTotalChange(isNaN(change) ? 0 : change);
    setBalance(isNaN(balance) ? 0 : balance);
  };

  const authPay = (list) => {
    let auth = true;
    let message = "";
    if (list.length === 0) {
      auth = false;
      message = "Debe agregar un medio de pago";
    } else if (cart.total > totalPays) {
      auth = false;
      message = "El monto total es mayor al total de pagos";
    } else if (getNoCashPayments(list) > cart.total) {
      auth = false;
      message = "El monto con medios no efectivo es mayor al monto total";
    }

    setAuthPayment(auth);
    setAlertMessage(message);
  };

  const getNoCashPayments = (list) => {
    const noCash = list.filter((pay) => pay.id !== 1001);
    const sumNoCash = noCash.reduce((acc, pay) => acc + pay.amount, 0);
    return sumNoCash;
  };

  const addChangeToCashPayment = (list) => {
    let cashPayment = list.find((pay) => pay.id === 1001);
    if (!cashPayment) {
      console.log("No hay pago en efectivo");
      return list;
    } else {
      list.find((pay) => pay.id === 1001).change = totalChange;
      return list;
    }
  };

  const saleProcess = async () => {
    const pays = addChangeToCashPayment(paysList);
    console.log('INFO', info);

    console.log('totalChange',totalChange);

    const saleInfo = {
      description: saleDescription,
      saleType: 1,
      total: cart.total,
      subTotal: cart.subTotal,
      tax: cart.tax,
      net: cart.net,
      discounts: cart.discounts,
      utility: cart.utility,
      userId: user.id,
      customerId: cart.customer.id,
      documentTypeId: cart.documentType.id,
      pays: pays,
      items: cart.items,
      change: totalChange,
      comerceInfo: {
        fantasyName: info.commerceName,
        name: '',
        address: info.address,
        phone: info.phone,
        rut: info.commerceRut,
      },
    };

    try {
      //console.log("saleInfo",moment( saleInfo.pays[0].payDate).format("DD-MM-YYYY"));

      const dteData = await globalSaleProcess(saleInfo);
      setDteData(dteData);
      setOpenDteDialog(true);
    } catch (err) {
      console.log("Error", err);
      openSnack("Error al procesar la venta", "error");
    }
  };

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1, minHeight: "30vh" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant={"subtitle1"}>Proceso de Pago</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant={"h5"}>
              Total{" "}
              {cart.total.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
            <Typography variant={"subtitle2"}>
              Cliente: {cart.customer.name}
            </Typography>
            <Typography variant={"subtitle2"}>
              Saldo cuenta cliente: {customerBalance}
            </Typography>
            <Typography variant={"subtitle2"}>
              Documento: {cart.documentType.name}
            </Typography>
            <Typography variant={"subtitle2"}>
              Total pagos:{" "}
              {totalPays.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
            <Typography variant={"subtitle2"}>
              Saldo:{" "}
              {balance.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
            <Typography variant={"subtitle2"}>
              Vuelto:{" "}
              {totalChange.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
            <TextField
              label="Descripción de la venta"
              name="saleDescription"
              variant="outlined"
              fullWidth
              value={saleDescription}
              onChange={(e) => setSaleDescription(e.target.value)}
              size="small"
              multiline
              rows={2}
              sx={{ mt: 1 }}
            />

            <Alert
              severity="error"
              sx={{ mt: 1, display: !authPayment ? "flex" : "none" }}
            >
              {alertMessage}
            </Alert>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <Autocomplete
                  sx={{ flexGrow: 1 }}
                  name="AddPayment"
                  options={paymentsOptions}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      let method = payDataDefault();
                      method.id = newValue.id;
                      method.name = newValue.name;
                      method.credit = newValue.credit;

                      addPaymentMethodToList(method);
                    }
                  }}
                  defaultValue={null}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Agregar medio de pago"
                      fullWidth
                      size="small"
                    />
                  )}
                />
              </Grid>
              <Box mt={1} ml={1}>
                <TitlePaper title="Medios de Pago" group={true}>
                  {paysList.map((pay) => (
                    <Grid item key={pay.id}>
                      <Typography variant={"subtitle2"}>{pay.name}</Typography>
                      <Box display={"flex"}>
                        <TextField
                          label="Monto"
                          name="amount"
                          variant="outlined"
                          fullWidth
                          type="number"
                          value={pay.amount}
                          onChange={(e) => {
                            pay.amount = parseInt(e.target.value);
                            updatePaymenMethodFromList(pay);
                            updateTotalValues(paysList);
                          }}
                          size="small"
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
                            console.log("Remove", pay);
                            removePaymentMethodFromList(pay.id);
                          }}
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                      </Box>
                      <Box
                        display={pay.credit == true ? "block" : "none"}
                        mt={1}
                      >
                        <DesktopDatePicker
                          label="Fecha de Pago"
                          value={pay.payDate}
                          onChange={(newValue) => {
                            updatePayDatePaymentMethodFromList(
                              pay.id,
                              newValue
                            );
                          }}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth size={"small"} />
                          )}
                        />
                      </Box>
                    </Grid>
                  ))}
                </TitlePaper>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item textAlign={"right"}>
              <Button
                variant="contained"
                color="primary"
                disabled={!authPayment}
                onClick={() => {
                  saleProcess();
                }}
              >
                Pagar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={openDteDialog} onClose={() => {
        setOpenDteDialog(false)
        clearCart()
        setOpenPayDialog(false)

      }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{mb:2}}>Documento</Typography>
        <PrintContainer title="Documento Tributario">
          <Document documentData={dteData} />
        </PrintContainer>
        </Box>
      </Dialog>
    </>
  );
}
