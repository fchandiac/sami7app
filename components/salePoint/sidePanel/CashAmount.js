import useCashregisterMovements from "@/components/hooks/useCashregisterMovements";
import useSalePoint from "@/components/hooks/useSalePoint";
import useUtils from "@/components/hooks/useUtils";
import { Paper, Typography, Grid } from "@mui/material";
import React, {useEffect, useState} from "react";
import { useSalePointContext } from "../salePointProvider";



//NO SE ESTA UTILIZANDO CASHAMOUNTCASREGISTER
export default function CashAmount() {
const { info, sideBarOpen, cashAmountCashRegister } = useSalePointContext();
  const cashregisterMovements = useCashregisterMovements();
  const { addThousandsSeparator } = useUtils();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
        console.log("Info", info);  
      const amount_ = await cashregisterMovements.cashAmount(info.cashRegisterId);
      console.log("Amount", amount_);
      setAmount(amount_);
    };
    fetch();
  }, [sideBarOpen]);

  return (
    <>
      <Paper variant="outlined" sx={{ padding: 1 }}>
        <Grid container spacing={1} direction={"column"} minWidth={"200px"}>
          <Grid item>
            <Typography variant={"subtitle1"}>Efectivo en caja</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"h6"}>
                {amount.toLocaleString('CLP', { style: 'currency', currency: 'CLP' })}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
