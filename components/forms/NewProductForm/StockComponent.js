import useStorages from "@/components/hooks/useStorages";
import React, { useState, useEffect } from "react";
import { useNewProductFormContext } from "./newProductProvider";
import {
  Grid,
  Autocomplete,
  TextField,
  Typography,
  IconButton,
  Dialog,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import StorageForm from "../StorageForm";
import useUtils from "@/components/hooks/useUtils";

export default function StockComponent() {
  const storages = useStorages();
  const { addThousandsSeparator, removeThousandsSeparator } = useUtils();
  const [storageOptions, setStorageOptions] = useState([]);
  const [updateStorages, setUpdateStorages] = useState(false);
  const [openNewStorageDialog, setOpenNewStorageDialog] = useState(false);
  const {
    activeStep,
    setActiveStep,
    setStock,
    setStockAvailable,
    setStockCritical,
    setStockStorage,
    setStockTotal,
    stock,
  } = useNewProductFormContext();

  useEffect(() => {
    const fetch = async () => {
      const data = await storages.findAllToAutocomplete();
      setStorageOptions(data);
    };
    fetch();
  }, [updateStorages]);

  const back = () => {
    setActiveStep(2);
  };

  const finalize = () => {
    setActiveStep(4);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          finalize();
        }}
      >
        <Grid container spacing={1} direction={"column"}>
          <Grid item display={"flex"}>
            <Autocomplete
              sx={{ flexGrow: 1 }}
              name="storage"
              options={storageOptions}
              onChange={(event, newValue) => {
                if (newValue) {
                  setStockStorage(newValue);
                } else {
                  setStockStorage(null);
                }
              }}
              disablePortal
              defaultValue={null}
              disabled={activeStep !== 3}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Almacén"
                  fullWidth
                  size="small"
                  required
                />
              )}
            />
            <IconButton
              onClick={() => {
                setOpenNewStorageDialog(true);
              }}
              disabled={activeStep !== 3}
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <TextField
              label="Stock total"
              variant="outlined"
              disabled={activeStep !== 3}
              type="number"
              name="stock-total"
              fullWidth
              size="small"
              value={stock.total}
              onChange={(e) => {
                setStockTotal(e.target.value);
              }}
              inputProps={{
                min: 0,
              }}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Stock crítico"
              disabled={activeStep !== 3}
              variant="outlined"
              type="number"
              name="stock-critical"
              fullWidth
              size="small"
              value={stock.critical}
              onChange={(e) => {
                setStockCritical(e.target.value);
              }}
              inputProps={{
                min: 0,
              }}
              required
            />
          </Grid>
          <Grid
            item
            textAlign={"right"}
            display={"flex"}
            justifyContent="space-between"
          >
            <Button
              disabled={activeStep !== 3}
              variant="outlined"
              color="primary"
              onClick={() => {
                back();
              }}
            >
              <ArrowBackIosNewIcon />
            </Button>
            <Button
              disabled={activeStep !== 3}
              variant="contained"
              color="primary"
              type="submit"
            >
              Finaliar
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog
        open={openNewStorageDialog}
        onClose={() => setOpenNewStorageDialog(false)}
        fullWidth
        maxWidth={"sm"}
      >
        <StorageForm
          afterSubmit={() => {
            setUpdateStorages(!updateStorages);
            setOpenNewStorageDialog(false);
          }}
        />
      </Dialog>
    </>
  );
}
