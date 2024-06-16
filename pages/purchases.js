import NewPurchaseForm from "@/components/forms/NewPurchaseForm/NewPurchaseForm";
import usePurchases from "@/components/hooks/usePurchases";
import PurchasesTab from "@/components/tabs/PurchaesTab";
import {
  Button,
  Dialog,
  Grid,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Description } from "@mui/icons-material";
import PurchasesGrid from "@/components/grids/PurchasesGrid";

export default function purchases() {
  return <PurchasesTab Purchases={<Purchases_ />} />;
}

export function Purchases_() {
  const purchases = usePurchases();
  const [openNewPurchaseDialog, setOpenNewPurchaseDialog] = useState(false);
  const [purchasesList, setPurchasesList] = useState([]);

  const [filterDates, setFilterDates] = useState({
    start: moment(new Date()).format("YYYY-MM-DD"),
    end: moment(new Date()).format("YYYY-MM-DD 23:59"),
  });

  useEffect(() => {
    const fetchData = async () => {
      const purchasesList = await purchases.findAllBetweenDates(filterDates.start, filterDates.end)
      console.log(purchasesList);
      const formattedPurchasesList = purchasesList.map((purchase) => {
        return {
          id: purchase.id,
          description: purchase.description,
          documentType: purchase.document_type,
          documentId: purchase.document_id,
          net: purchase.net,
          tax: purchase.tax,
          total: purchase.total,
          userName: purchase.User.name,
          providerName: purchase.Provider.name,
          createdAt: purchase.createdAt
        }
      })

      setPurchasesList(formattedPurchasesList);
    };
    fetchData();
  }, [filterDates.start, filterDates.end]);
  return (
    <>
      <>
        <Grid container spacing={1}>
          <Grid item xs={12} md={2}>
            <Paper variant="outlined" sx={{ p: 1 }}>
              <Grid container spacing={1} direction={"column"}>
                <Grid item>
                  <Typography variant="subtitle1">Filtro</Typography>
                </Grid>
                <Grid item>
                  <DesktopDatePicker
                    label="Fecha inicial"
                    inputFormat="DD-MM-YYYY"
                    value={filterDates.start}
                    onChange={(newValue) => {
                      setFilterDates({
                        ...filterDates,
                        start: moment(newValue).format("YYYY-MM-DD"),
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} size="small" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item>
                  <DesktopDatePicker
                    label="Fecha final"
                    inputFormat="DD-MM-YYYY"
                    value={filterDates.end}
                    onChange={(newValue) => {
                      setFilterDates({
                        ...filterDates,
                        end: moment(newValue).format("YYYY-MM-DD 23:59"),
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} size="small" fullWidth />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Grid item textAlign={'right'} mt={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenNewPurchaseDialog(true)}
              >
                Nueva compra
              </Button>
              </Grid>
          </Grid>
          <Grid item xs={12} md={10}>
           <PurchasesGrid purchasesList={purchasesList} />
          </Grid>
        </Grid>
      </>

      <Dialog
        open={openNewPurchaseDialog}
        onClose={() => setOpenNewPurchaseDialog(false)}
        maxWidth={"md"}
        fullWidth
      >
        <NewPurchaseForm />
      </Dialog>
    </>
  );
}
