import React, { useState } from "react";
import CategoryForm from "@/components/forms/CategoryForm";
import NewProductForm from "@/components/forms/NewProductForm/NewProductForm";
import CategoriesGrid from "@/components/grids/CategoriesGrid";
import ProductsTab from "@/components/tabs/ProductsTab";
import { Grid } from "@mui/material";
import TaxForm from "@/components/forms/TaxForm";
import TaxesGrid from "@/components/grids/TaxesGrid";
import SubcategoryForm from "@/components/forms/SubcategoryForm";
import SubcategoriesGrid from "@/components/grids/SubcategoriesGrid";
import PriceListsGrid from "@/components/grids/PriceListsGrid";
import PriceListForm from "@/components/forms/PriceListform";
import ProductsGrid from "@/components/grids/ProductsGrid";
import SellingPricesGrid from "@/components/grids/SellingPricesGrid";
import SellingPriceForm from "@/components/forms/SellingPriceForm";

export default function products() {
  return (
    <>
      <ProductsTab
        Products={Products()}
        NewProduct={<NewProductForm />}
        Categories={Categories()}
        Subcategories={Subcategories()}
        PriceLists={PriceLists()}
        Taxes={Taxes()}
        SellingPrices={SellingPrices()}
      />
    </>
  );
}

function Products() {
  return (
    <>
      <ProductsGrid />
    </>
  );
}

function Categories() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <CategoryForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <CategoriesGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}

function Subcategories() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <SubcategoryForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <SubcategoriesGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}

function Taxes() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <TaxForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <TaxesGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}

function PriceLists() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <PriceListForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <PriceListsGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}

function SellingPrices() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <SellingPriceForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <SellingPricesGrid update={gridState}/>
        </Grid>
      </Grid>
    </>
  );
}
