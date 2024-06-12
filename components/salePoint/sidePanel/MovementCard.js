import {
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  TextField,
  Dialog,
  Stack,
  Alert,
  Button,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useCashregisterMovements from "@/components/hooks/useCashregisterMovements";
import InfoIcon from "@mui/icons-material/Info";
import { Title } from "@mui/icons-material";
import TitlePaper from "@/components/custom/TitlePaper";
import SaleDetailCard from "@/components/cards/SaleDetailCard";
import DeleteIcon from "@mui/icons-material/Delete";
import useSalePoint from "@/components/hooks/useSalePoint";


export default function MovementCard(props) {
  const { movement } = props;
  const cashregisterMovements = useCashregisterMovements();
  const {voidSaleProcess} = useSalePoint();
  const [showDetail, setShowDetail] = useState(false);
  const [openSaleDetailDialog, setOpenSaleDetailDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [voidDescription, setVoidDescription] = useState("");

  const [movementData, setMovementData] = useState({
    id: 0,
    type: "",
    createdAtString: "",
    paymentMethodName: "test",
    amount: 0,
    description: "",
    previous_balance: 0,
    balance: 0,
    documentType: "",
    referenceId: 0,
  });

  useEffect(() => {
    const debit = movement.debit || 0;
    const credit = movement.credit || 0;

    console.log("Movement", movement);

    setMovementData({
      id: movement.id,
      type: cashregisterMovements.types(movement.type),
      createdAtString: moment(movement.createdAt).format("DD-MM-YYYY HH:ss"),
      paymentMethodName:
        movement.paymentMethod == null ? "" : movement.paymentMethod.name,
      amount: debit - credit,
      description: movement.description,
      previous_balance: movement.previous_balance,
      balance: movement.balance,
      referenceId: movement.reference_id || "sin referencia",
      nulled: movement.nulled,
    });
  }, []);

  const voidSale = async () => {

    const voidSale = await voidSaleProcess(
      movementData.referenceId, 
      voidDescription,
      movementData.id
    );

    console.log("voidSale");
  }

  return (
    <>
      <Box minWidth={500}>
        <Paper variant="outlined" sx={{ p: 1, backgroundColor:(movementData.nulled? '#ffcdd2':'') }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <IconButton
                  onClick={() => {
                    console.log("showDetail", showDetail);
                    setShowDetail(!showDetail);
                  }}
                >
                  <MoreHorizIcon sx={{ fontSize: 12 }} />
                </IconButton>
                <Typography fontSize={14} fontWeight={"bold"} pl={1}>
                  {movementData.type}
                </Typography>
                <Typography fontSize={14} pl={1} sx={{ flexGrow: 1 }}>
                  {movementData.createdAtString}
                </Typography>

                <Typography fontSize={14}>
                  {movementData.amount.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={11} display={showDetail ? "block" : "none"}>
              <Typography fontSize={10} pl={1}>
                {"Balance: " +
                  movementData.balance.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
              </Typography>

              <Typography fontSize={10} sx={{ flexGrow: 1 }} pl={1}>
                {"Balance anterior: " +
                  movementData.previous_balance.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
              </Typography>

              <Typography fontSize={10} pl={1}>
                {"Movimiento: " +
                  movementData.type +
                  " " +
                  movementData.referenceId}
              </Typography>

              <Typography fontSize={10} pl={1}>
                {"Medio de pago: " + movementData.paymentMethodName}
              </Typography>

              <Typography fontSize={10} pl={1}>
                {"Descripción: " + movementData.description}
              </Typography>
            </Grid>

            <Grid item xs={1} display={showDetail ? "block" : "none"}>
              <Stack direction={"column"} spacing={1}>
                <IconButton
                onClick={() => {
                  setOpenDeleteDialog(true);
                }}
                disabled={movementData.type == "Venta directa" ? false : true}
                >
                  <DeleteIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton
                  disabled={movementData.type == "Venta directa" ? false : true}
                  onClick={() => {
                    setOpenSaleDetailDialog(true);
                  }}
                >
                  <InfoIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Dialog
        open={openSaleDetailDialog}
        onClose={() => {
          setOpenSaleDetailDialog(!openSaleDetailDialog);
        }}
      >
        <SaleDetailCard saleId={movementData.referenceId} />
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(!openDeleteDialog);
        }}
      >
        <Grid container spacing={1} p={1} direction={'column'}>
          <Grid item>
            <Alert severity="warning">
              {'¿Está seguro que desea anular la venta ' + movementData.referenceId + ' ?'}
            </Alert>
          </Grid>
          <Grid item>
            <Alert severity="warning">
            Al anular una venta, se restablecerá el stock de los productos vendidos, se actualizará el saldo en caja, y se generará una nota de crédito/debito de anulación de venta que revertirá los movimientos registrados en la cuenta del cliente correspondiente.
            </Alert>    
            </Grid>
            <Grid item>
              <TextField
                label="Motivo de anulación"
                fullWidth
                size="small"
                multiline
                rows={2}
                value={voidDescription}
                onChange={(e) => {
                  setVoidDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid item textAlign={'right'}>
              <Button variant="contained"
               color="error"
               onClick={ () => {voidSale()}}
               >
                Anular venta
              </Button>
              </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
