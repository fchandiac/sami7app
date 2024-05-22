import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  IconButton,
  FormControlLabel,
  Switch,
  Autocomplete,
  Button,
  Dialog,
} from "@mui/material";
import { useNewProductFormContext } from "./newProductProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useCategories from "@/components/hooks/useCategories";
import useTaxes from "@/components/hooks/useTaxes";
import useSubcategories from "@/components/hooks/useSubcategories";
import CategoryForm from "../CategoryForm";
import SubcategoryForm from "../SubcategoryForm";
import useProducts from "@/components/hooks/useProducts";
import { useAppContext } from "@/appProvider";



export default function GeneralComponent() {
  const {
    general,
    setGeneral,
    activeStep,
    setActiveStep,
    setFavorite,
    setCategory,
    setSubcategory,
    setName,
    setDescription,
    setStockControl,
    setIvaSubject,
    setCode,
    addPurchaseTax,
    addSellingPriceTax,
    purchasePriceTaxes,
  } = useNewProductFormContext();
  const {openSnack} = useAppContext();
  const categories = useCategories();
  const subcategories = useSubcategories();
  const taxes = useTaxes();
  const products = useProducts();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [openNewCategoryDialog, setOpenNewCategoryDialog] = useState(false);
  const [updateCategories, setUpdateCategories] = useState(false);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [openNewSubcategoryDialog, setOpenNewSubcategoryDialog] =
    useState(false);
  const [updateSubcategories, setUpdateSubcategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categories.findAllToAutocomplete();
      setCategoryOptions(data);
    };
    fetchCategories();
  }, [updateCategories]);

  useEffect(() => {
    const fetchSubcategories = async () => {

        const data = await subcategories.findAllByCategoryToAutocomplete(
          general.category?.id
        );
        setSubcategoryOptions(data);
      
      
    };
    fetchSubcategories();
  }, [updateSubcategories, general.category?.id]);

  const next = async () => {
    const existProductName = await products.existByName(general.name);

    if (existProductName) {
      openSnack("El nombre del producto ya existe", "error");
      return;
    }
     

    const ivaTax = await taxes.ivaTax();

    if (general.ivaSubject) {
      addPurchaseTax(ivaTax);
      addSellingPriceTax(ivaTax);
    } 

    setActiveStep(1);
    console.log('Generalinfo', general)
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <Grid container spacing={1} direction={"column"}>
          <Grid item>
            <TextField
              label="Nombre"
              variant="outlined"
              name="product-name"
              fullWidth
              value={general.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              size="small"
              required
              disabled={activeStep !== 0}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Descripción"
              name="product-description"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={general.description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              size="small"
              disabled={activeStep !== 0}
            />
          </Grid>
          <Grid item display={"flex"}>
            <Autocomplete
              sx={{ flexGrow: 1 }}
              name="category"
              options={categoryOptions}
              onChange={(event, newValue) => {
                if (newValue) {
                  setCategory(newValue);
                } else {
                  setCategory(null);
                }
              }}
              disablePortal
              defaultValue={null}
              disabled={activeStep !== 0}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categoría"
                  fullWidth
                  size="small"
               
                />
              )}
            />
            <IconButton
              onClick={() => {
                setOpenNewCategoryDialog(true);
              }}
              disabled={activeStep !== 0}
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid item display={'flex'}>
            <Autocomplete
              sx={{ flexGrow: 1 }}
              name="subcategory"
              options={subcategoryOptions}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSubcategory(newValue);
                } else {
                  setSubcategory(null);
                }
              }}
              defaultValue={null}
              disabled={activeStep !== 0}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Subcategoría"
                  fullWidth
                  size="small"
                  required
                />
              )}
            />
            <IconButton
              onClick={() => {
                setOpenNewSubcategoryDialog(true);
              }}
              disabled={activeStep === 1}
            >
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={general.stockControl}
                  onChange={(e) => {
                    setStockControl(e.target.checked);
                  }}
                  color="primary"
                  disabled={activeStep !== 0}
                />
              }
              label={
                general.stockControl
                  ? "Con control de stock"
                  : "Sin control de stock"
              }
            />
          </Grid>

          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={general.favorite}
                  onChange={(e) => {
                    setFavorite(e.target.checked);
                  }}
                  color="primary"
                  disabled={activeStep !== 0}
                />
              }
              label={
                general.favorite ? "Producto favorito" : "Producto no favorito"
              }
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={general.ivaSubject}
                  onChange={(e) => {
                    setIvaSubject(e.target.checked);
                  }}
                  color="primary"
                  disabled={activeStep !== 0}
                />
              }
              label={general.ivaSubject ? "Afecto a IVA" : "Exento de IVA"}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Código"
              name="product-code"
              variant="outlined"
              fullWidth
              value={general.code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              size="small"
              disabled={activeStep !== 0}
              required
            />
          </Grid>

          <Grid item textAlign={"right"}>
            <Button
              variant="contained"
              type="submit"
              disabled={activeStep !== 0}
              size={"small"}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      </form>
      <Dialog
        open={openNewCategoryDialog}
        onClose={() => {
          setOpenNewCategoryDialog(false);
        }}
        fullWidth
        maxWidth={"xs"}
      >
        <CategoryForm
          afterSubmit={() => {
            setUpdateCategories(!updateCategories);
            setOpenNewCategoryDialog(false);
          }}
        />
      </Dialog>

      <Dialog
        open={openNewSubcategoryDialog}
        onClose={() => setOpenNewSubcategoryDialog(false)}
        fullWidth
        maxWidth={"xs"}
      >
        <SubcategoryForm
          afterSubmit={() => {
            setUpdateSubcategories(!updateSubcategories);
            setOpenNewSubcategoryDialog(false);
          }}
        />
      </Dialog>
    </>
  );
}
