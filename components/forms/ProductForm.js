import React, { useState, useEffect, use } from "react";
import {
  Grid,
  TextField,
  IconButton,
  FormControlLabel,
  Switch,
  Autocomplete,
  Button,
  Dialog,
  Paper,
  Typography,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useCategories from "@/components/hooks/useCategories";
import useTaxes from "@/components/hooks/useTaxes";
import useSubcategories from "@/components/hooks/useSubcategories";
import useProducts from "@/components/hooks/useProducts";
import { useAppContext } from "@/appProvider";
import useRecords from "../hooks/useRecords";

export default function ProductForm(props) {
  const {
    data = {
      id: null,
      name: "",
      description: "",
      favorite: false,
      stockControl: false,
      ivaSubject: true,
      code: "",
      subcategory: {
        id: null,
        key: null,
        name: "",
        category: {
          id: null,
          key: null,
          name: "",
        },
      },
    },
    edit = true,
    afterSubmit = () => {},
  } = props;
  const categories = useCategories();
  const subcategories = useSubcategories();
  const products = useProducts();
  const records = useRecords();
  const { openSnack, user} = useAppContext();
  const [productData, setProductData] = useState(data);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categories.findAllToAutocomplete();
      setCategoryOptions(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      console.log("productData.category?.id", productData.category?.id);
      const data = await subcategories.findAllByCategoryToAutocomplete(
        productData.category?.id
      );
      setSubcategoryOptions(data);
    };
    fetchSubcategories();
  }, [productData.category?.id]);

  const save = async () => {
    if (edit) {
      try{
        // console.log("productData", productData);

        await products.generalUpdate(
            productData.id,
            productData.name,
            productData.code,
            productData.description,
            productData.stockControl,
            productData.ivaSubject,
            productData.favorite,
            productData.subcategory.id
        )
        await records.updateProductGeneral(user.id, productData)
        afterSubmit(productData);
        openSnack("Producto actualizado", "success");
      } catch (err) {
        console.log(err)
        // openSnack(err.errors[0].message, 'error')
      }
    }
  };

  return (
    <Paper variant="outlined" sx={{ padding: 1 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <Grid container spacing={1} direction={"column"}>
          <Grid item>
            <Typography variant={"subtitle1"}>
              {edit ? "Editar Producto" : "Nuevo Producto"}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Nombre"
              variant="outlined"
              name="product-name"
              fullWidth
              value={productData.name}
              onChange={(e) => {
                setProductData({ ...productData, name: e.target.value });
              }}
              size="small"
              required
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
              value={productData.description}
              onChange={(e) => {
                setProductData({ ...productData, description: e.target.value });
              }}
              size="small"
            />
          </Grid>
          <Grid item display={"flex"}>
            <Autocomplete
              sx={{ flexGrow: 1 }}
              name="category"
              value={productData.subcategory?.category}
              options={categoryOptions}
              onChange={(event, newValue) => {
                if (newValue) {
                  setProductData({ ...productData, category: newValue });
                } else {
                  setProductData({ ...productData, category: null });
                }
              }}
              disablePortal
              defaultValue={null}
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
          </Grid>
          <Grid item display={"flex"}>
            <Autocomplete
              sx={{ flexGrow: 1 }}
              name="subcategory"
              value={productData.subcategory}
              options={subcategoryOptions}
              onChange={(event, newValue) => {
                if (newValue) {
                  setProductData({ ...productData, category: newValue });
                } else {
                  setProductData({ ...productData, category: null });
                }
              }}
              disablePortal
              defaultValue={null}
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
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={productData.stockControl}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      stockControl: e.target.checked,
                    });
                  }}
                  color="primary"
                />
              }
              label={
                productData.stockControl
                  ? "Con control de stock"
                  : "Sin control de stock"
              }
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={productData.ivaSubject}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      ivaSubject: e.target.checked,
                    });
                  }}
                  color="primary"
                />
              }
              label={productData.ivaSubject ? "Afecto IVA" : "Exento de IVA"}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={productData.favorite}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      favorite: e.target.checked,
                    });
                  }}
                  color="primary"
                />
              }
              label={productData.favorite ? "Favorito" : "No favorito"}
            />
          </Grid>
          <Grid item textAlign={"right"}>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                afterSubmit(productData);
              }}
            >
              {edit ? "Actualizar" : "Guardar"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

// id: params.row.id,
// code: params.row.code,
// name: params.row.name,
// description: params.row.description,
// stock_control: params.row.stockControl,
// iva_subject: params.row.ivaSubject,
// favorite: params.row.favorite,
// subcategory: {id: params.row.Subcategory.id, key: params.row.Subcategory.id, name: params.row.Subcategory.name}
