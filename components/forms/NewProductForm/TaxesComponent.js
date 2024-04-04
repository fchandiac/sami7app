import TitlePapper from "@/components/custom/TitlePaper";
import useTaxes from "@/components/hooks/useTaxes";
import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  IconButton,
  Dialog,
  ButtonGroup,
  Button,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import TaxForm from "../TaxForm";
import { useNewProductFormContext } from "./newProductProvider";

export default function TaxesComponent(props) {
  const { activeStepComponent = 1, type = "purchase" } = props;
  const {
    activeStep,
    purchasePriceTaxes,
    setPurchaseTaxes,
    addPurchaseTax,
    addSellingPriceTax,
    setSellingPriceTaxes,
    sellingPriceTaxes,
  } = useNewProductFormContext();
  const taxes = useTaxes();
  const theme = useTheme();
  const [taxOptions, setTaxOptions] = useState([]);
  const [openNewTaxDialog, setOpenNewTaxDialog] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const taxes_ = await taxes.findAllToAutocomplete();
      const ivaTax = await taxes.ivaTax();
      const filteredIva = taxes_.filter((tax) => tax.id !== ivaTax.id);
      setTaxOptions(filteredIva);
    };
    fetch();
  }, []);

  const handlerList = () => {
    if (type === "purchase") {
      return renderList(purchasePriceTaxes);
    } else if (type === "selling") {
      return renderList(sellingPriceTaxes);
    }
  }


  const renderList = (taxes) => {
    // purchasePriceTaxes.map((tax, index) => (
    //   <Grid item key={index}>
    //     <ButtonGroup size="small">
    //       <Button
    //         disabled
    //         sx={{
    //           "&.Mui-disabled": {
    //             borderColor: theme.palette.primary.main,
    //             color: theme.palette.primary.main,
    //           },
    //         }}
    //       >
    //         {tax.name + " " + tax.percentage + "%"}
    //       </Button>
    //       <Button
    //         size="small"
    //         disabled={
    //           activeStep !== activeStepComponent ||
    //           tax.name == "IVA"
    //         }
    //         sx={{
    //           "&.Mui-disabled": {
    //             borderColor: theme.palette.primary.main,
    //             color: theme.palette.primary.main,
    //           },
    //         }}
    //       >
    //         <ClearIcon
    //           fontSize={"small"}
    //           onClick={() => {
    //             if (type === "purchase") {
    //               setPurchaseTaxes(
    //                 purchasePriceTaxes.filter(
    //                   (t) => t.id !== tax.id
    //                 )
    //               );
    //             } else if (type === "selling") {
    //               setSellingPriceTaxes(
    //                 purchasePriceTaxes.filter(
    //                   (t) => t.id !== tax.id
    //                 )
    //               );
    //             }
    //           }}
    //         />
    //       </Button>
    //     </ButtonGroup>
    //   </Grid>
    // ));
    return taxes.map((tax, index) => (
      <Grid item key={index}>
        <ButtonGroup size="small">
          <Button
            disabled
            sx={{
              "&.Mui-disabled": {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            {tax.name + " " + tax.percentage + "%"}
          </Button>
          <Button
            size="small"
            disabled={
              activeStep !== activeStepComponent ||
              tax.name == "IVA"
            }
            sx={{
              "&.Mui-disabled": {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            <ClearIcon
              fontSize={"small"}
              onClick={() => {
                if (type === "purchase") {
                  setPurchaseTaxes(
                    purchasePriceTaxes.filter(
                      (t) => t.id !== tax.id
                    )
                  );
                } else if (type === "selling") {
                  setSellingPriceTaxes(
                    purchasePriceTaxes.filter(
                      (t) => t.id !== tax.id
                    )
                  );
                }
              }}
            />
          </Button>
        </ButtonGroup>
      </Grid>
    ));
  }

  return (
    <>
      <TitlePapper title="Impuestos">
        <Grid container spacing={1} direction={"column"}>
          <Grid item display={"flex"}>
            <Autocomplete
              sx={{ flexGrow: 1 }}
              id="taxes"
              options={taxOptions}
              onChange={(event, newValue) => {
                if (newValue) {
                  if (type === "purchase") {
                    addPurchaseTax(newValue);
                  } else if (type === "selling") {
                    addSellingPriceTax(newValue);
                  }
                }
              }}
              disablePortal
              defaultValue={null}
              disabled={activeStep !== activeStepComponent}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Añadir impuesto"
                  fullWidth
                  size="small"
                />
              )}
            />
            <IconButton
              disabled={activeStep !== activeStepComponent}
              onClick={() => {
                setOpenNewTaxDialog(true);
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              {handlerList()}
            </Grid>
          </Grid>
        </Grid>
      </TitlePapper>
      <Dialog
        open={openNewTaxDialog}
        onClose={() => {
          setOpenNewTaxDialog(false);
        }}
        fullWidth
        maxWidth={"xs"}
      >
        <Typography>
          <TaxForm
            afterSubmit={() => {
              setOpenNewTaxDialog(false);
            }}
          />
        </Typography>
      </Dialog>
    </>
  );
}
