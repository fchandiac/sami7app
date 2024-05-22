import useCashregisterMovements from "@/components/hooks/useCashregisterMovements";
import React, { useEffect, useState } from "react";
import { useSalePointContext } from "../salePointProvider";
import { Grid, Typography } from "@mui/material";
import MovementCard from "./MovementCard";
import TitlePaper from "@/components/custom/TitlePaper";

export default function Movements() {
  const cashRegisterMovements = useCashregisterMovements();
  const { info } = useSalePointContext();
  const [movementsList, setMovementsList] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fecth = async () => {
      const data = await cashRegisterMovements.findAllByCashRegister(
        info.cashRegisterId
      );
      console.log(data);
      setMovementsList(data);
      const balanceAmount_ = await cashRegisterMovements.findLastByCashRegister(info.cashRegisterId);
      setBalance(balanceAmount_?.balance || 0);
    };
    fecth();
  }, []);

  return (
    <>
      <Grid container spacing={1} direction={"column"}>
        <Grid item minWidth={180}>
          <TitlePaper title={"BALANCE EN CAJA"} group>
            <Typography textAlign={"right"}>
              {balance.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
          </TitlePaper>
        </Grid>
        {movementsList.map((movement) => (
          <Grid item key={movement.id}>
            <MovementCard movement={movement} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
