import NewPurchaseForm from "@/components/forms/NewPurchaseForm/NewPurchaseForm";
import usePurchases from "@/components/hooks/usePurchases";
import { Button, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";



export default function purchases() {
  const purchases = usePurchases();
  const [openNewPurchaseDialog, setOpenNewPurchaseDialog] = useState(false);

  const [purchasesList, setPurchasesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const purchasesList = await purchases.findAll();
      console.log(purchasesList);
      setPurchasesList(purchasesList);
    };
    fetchData();
  }, []);


  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenNewPurchaseDialog(true)}
      >
        Compras
      </Button>

      {
        purchasesList.map((purchase) => {
          return (
            <div key={purchase.id}>
              <p>proveedor:{purchase.Provider.name}</p>
              <p>total:{purchase.total}</p>
            </div>
          );
        })
      }


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
