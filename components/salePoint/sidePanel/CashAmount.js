import useCashregisterMovements from "@/components/hooks/useCashregisterMovements";
import useSalePoint from "@/components/hooks/useSalePoint";
import useUtils from "@/components/hooks/useUtils";
import { Paper, Typography, Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSalePointContext } from "../salePointProvider";
import TitlePaper from "@/components/custom/TitlePaper";

//NO SE ESTA UTILIZANDO CASHAMOUNTCASREGISTER
export default function CashAmount() {
  const { info, sideBarOpen, cashAmountCashRegister } = useSalePointContext();
  const cashregisterMovements = useCashregisterMovements();
  const { addThousandsSeparator } = useUtils();
  const [amount, setAmount] = useState(0);
  const [otherAmount, setOtherAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      console.log("Info", info);
      const amount_ = await cashregisterMovements.cashAmount(
        info.cashRegisterId
      );

      console.log("Amount", amount_);
      setAmount(amount_);

      const balanceAmount_ = await cashregisterMovements.findLastByCashRegister(info.cashRegisterId);
      setBalanceAmount(balanceAmount_?.balance || 0);

      const otherAmount_ = await cashregisterMovements.noCashAmount(info.cashRegisterId);
      setOtherAmount(otherAmount_);
    };
    fetch();
  }, [sideBarOpen]);


  

  return (
    <>
    
      
     
      <TitlePaper title={"EFECTIVO EN CAJA"} group={true}>
        <Grid container spacing={1} direction={"column"}>
          <Grid item>
            <Typography  textAlign={'right'}>
              {amount.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
          </Grid>
        </Grid>
      </TitlePaper>

      <Box mt={1} minWidth={200}/>

      <TitlePaper title={"OTROS MEDIOS DE PAGO"} group={true}>
            <Typography  textAlign={'right'}>
              {otherAmount.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
      </TitlePaper>

      <Box mt={1} />

      <TitlePaper title={"BALANCE EN CAJA"} group={true}>

            <Typography  textAlign={'right'}>
              {balanceAmount.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>

      </TitlePaper>
     
    </>
  );
}
