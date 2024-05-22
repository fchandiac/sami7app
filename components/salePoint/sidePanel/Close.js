import { useAppContext } from "@/appProvider";
import useCashregisterMovements from "@/components/hooks/useCashregisterMovements";
import React, { use, useEffect, useState } from "react";
import { useSalePointContext } from "../salePointProvider";
import {
  Paper,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import useCashRegisters from "@/components/hooks/useCashRegisters";
import PrintContainer from "@/components/prints/PrintContainer";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import usePaymentMethods from "@/components/hooks/usePaymentMethods";
import moment from "moment";

export default function Close(props) {
  const { setOpenLoadDialog } = props;
  const { info, setCashAmountCashRegister, setInfo, setInfoStatus } =
    useSalePointContext();
  const { user, openSnack } = useAppContext();
  const cashregisterMovements = useCashregisterMovements();
  const paymentMethods = usePaymentMethods();
  const cashRegisters = useCashRegisters();
  const [openCloseDialog, setOpenCloseDialog] = useState(false);

  const [balance, setBalance] = useState(0);
  const [paymentsMethodhodAmounts, setPaymentsMethodhodAmounts] = useState([]);
  const [movementsTypeAmounts, setMovementsTypeAmounts] = useState([]);

  const [printState, setPrintState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el último movimiento de caja
        const lastMovement = await cashregisterMovements.findLastByCashRegister(
          info.cashRegisterId
        );
        const balance = lastMovement ? lastMovement.balance : 0;
        setBalance(balance);
      } catch (error) {
        console.error("Error al recuperar datos:", error);
      }
    };

    // Llamar a la función fetchData al montar el componente
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la lista de métodos de pago
        const paymentMethodsList = await paymentMethods.findAll();

        // Para cada método de pago, obtener los movimientos de la caja registradora
        const amountsList = await Promise.all(
          paymentMethodsList.map(async (paymentMethod) => {
            // Obtener los movimientos de la caja registradora asociados a este método de pago
            const movements =
              await cashregisterMovements.findAllByCashRegisterAndPaymentMethod(
                info.cashRegisterId,
                paymentMethod.id
              );

            // Calcular la suma de los montos de los movimientos
            const amount = movements.reduce(
              (total, movement) => total + (movement.debit - movement.credit),
              0
            );

            // Devolver un objeto con el método de pago y la cantidad total
            return { paymentMethod, amount };
          })
        );

        console.log("amountsList:", amountsList);

        // Actualizar el estado con la lista de montos por método de pago
        setPaymentsMethodhodAmounts(amountsList);
      } catch (error) {
        console.error("Error al recuperar datos:", error);
      }
    };

    // Llamar a la función fetchData al montar el componente
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = cashregisterMovements.movementTypeList();
        const movementsTypeAmountsList = await Promise.all(
          list.map(async (type) => {
            const movements =
              await cashregisterMovements.findAllByCashRegisterAndType(
                info.cashRegisterId,
                type.id
              );
            const amount = movements.reduce(
              (total, movement) => total + (movement.debit - movement.credit),
              0
            );
            return { type, amount };
          })
        );
        console.log("movementsTypeAmountsList:", movementsTypeAmountsList);
        setMovementsTypeAmounts(movementsTypeAmountsList);
      } catch (error) {
        console.error("Error al recuperar datos:", error);
      }
    };

    // Llamar a la función fetchData al montar el componente
    fetchData();
  }, []);

  const closeCashRegister = async () => {
    const close = await cashRegisters.closeCashRegister(
      info.cashRegisterId,
      user.id
    );
    if (close) {
      setOpenLoadDialog(true);
      openSnack("Caja cerrada", "success");
      setCashAmountCashRegister(0);
      setInfoStatus(false);
    } else {
      openSnack("Error al cerrar caja", "error");
    }
  };
  return (
    <>
      <Paper variant="outlined" sx={{ padding: 1 }}>
        <Grid container spacing={1} direction={"column"} >
          <Grid item>
            <Box sx={{ maxHeight: "400px", overflowY: "auto"}}>

              <PrintContainer printState={printState}>
                <Box m={1} mr={2}>
                  <Grid container spacing={1} minWidth={'80mm'} direction={'column'}>
                    <Grid item textAlign={"center"} xs={12}>
                      <Typography variant={"subtitle1"}>
                        RESUMEN CIERRE DE CAJA
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Paper variant="outlined" sx={{ padding: 1 }}>
                        <Typography fontSize={12}>
                          {"Caja: " + info.cashRegisterId}
                        </Typography>
                        <Typography fontSize={12}>
                          {"Usuario: " + user.name}
                        </Typography>
                        <Typography fontSize={12}>
                          {"Fecha: " +
                            moment(new Date()).format("DD-MM-YYYY HH:mm")}
                        </Typography>
                        <Typography fontSize={12}>
                          {"Punto de venta: " + info.name}
                        </Typography>
                        <Typography fontSize={12}></Typography>
                        <Typography fontSize={12}></Typography>
                      </Paper>
                    </Grid>

                    <Grid item textAlign={"right"} xs={12}>
                      <Typography variant={"subtitle1"}>Balance</Typography>
                      <Typography
                        variant={"subtitle1"}
                        sx={{ lineHeight: 0.5 }}
                      >
                        {balance.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    
                    <Box mb={2} />

                    <Grid item xs={12}>
                      <Typography variant={"subtitle1"}>
                        Movimientos de caja
                      </Typography>
                    </Grid>

                    {movementsTypeAmounts.map((movementTypeAmount, index) => (
                      <Grid item key={index} textAlign={"right"} xs={6}>
                        <Paper variant="outlined" sx={{ padding: 1, pt: .5, pb:.5 }}>
                          <Typography fontSize={12} lineHeight={1}>
                            {movementTypeAmount.type.name}
                          </Typography>
                          <Typography fontSize={10}  lineHeight={1.2}>
                            {movementTypeAmount.amount.toLocaleString("es-CL", {
                              style: "currency",
                              currency: "CLP",
                            })}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}

                    <Box mb={2} />

                    <Grid item xs={12}>
                      <Typography variant={"subtitle1"}>
                        Medios de pago
                      </Typography>
                    </Grid>

                    {paymentsMethodhodAmounts.map(
                      (paymentMethodAmount, index) => (
                        <Grid item key={index} textAlign={"right"} xs={6}>
                          <Paper variant="outlined" sx={{ padding: 1, pt: .5, pb:.5 }}>
                            <Typography fontSize={12} lineHeight={1}>
                              {paymentMethodAmount.paymentMethod.name}
                            </Typography>
                            <Typography fontSize={10} lineHeight={1.2}>
                              {paymentMethodAmount.amount.toLocaleString(
                                "es-CL",
                                {
                                  style: "currency",
                                  currency: "CLP",
                                }
                              )}
                            </Typography>
                          </Paper>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              </PrintContainer>
            </Box>
          </Grid>

          <Grid item textAlign={"right"}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                closeCashRegister();
              }}
            >
              Cerrar Caja
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
