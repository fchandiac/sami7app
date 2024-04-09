import TitlePapper from "@/components/custom/TitlePaper";
import {
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ProductCardFinder from "./ProductCardFinder";
import useUtils from "@/components/hooks/useUtils";
import { useSalePointContext } from "../salePointProvider";
import useProducts from "@/components/hooks/useProducts";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Finder() {
  const { finderProductsList, setFinderProductsList, priceList, info } =
    useSalePointContext();
  const products = useProducts();
  const [searchWord, setSearchWord] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [updateList, setUpdateList] = useState(false);
  const productsPerPage = 5; // Define el número de productos por página
  const [currentPage, setCurrentPage] = useState(1); // Estado de la página actual

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  useEffect(() => {
    // console.log("Finder: ", priceList, info.storage);
    const fetch = async () => {
      const list = await products.findAllToSalePoint(
        priceList.id,
        info.storage.id
      );
      //console.log("List", list);
      setFinderProductsList(list);
    };
    fetch();
  }, [priceList, updateList, info.storage]);

  useEffect(() => {
    if (searchWord === "") {
      setFilteredProducts([]);
    } else {
      const filtered = finderProductsList.filter((product) => {
        return product.name.toLowerCase().includes(searchWord.toLowerCase());
      });
      setFilteredProducts(filtered);
      // console.log("Filtered", filtered);
    }
  }, [searchWord]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    Math.min(indexOfLastProduct, filteredProducts.length)
  );

  // height={"57.1vh"}

  return (
    <>
      <TitlePapper title="Buscador de Productos" group={true}>
        <Grid item display={'flex'}>
          <TextField
            sx={{ marginBottom: 1, flexGrow: 1 }}
            label="Nombre del Producto"
            name="searchWord"
            variant="outlined"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            size="small"
            fullWidth
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={() => {setUpdateList(!updateList)}} sx={{ marginBottom: 1, flexGrow: 1 }}>
            <RefreshIcon />
          </IconButton>
        </Grid>

        <Divider sx={{ marginBottom: 1 }} />

        <Box overflow="auto" height={"23.2rem"}>
          {currentProducts.map((product) => (
            <Grid item key={product.id} paddingTop={1}>
              <ProductCardFinder
                id={product.id}
                name={product.name}
                code={product.code}
                subcategory={{id: product.Subcategory.id, key: product.Subcategory.id, name: product.Subcategory.name}}
                gross={product.SellingPrices[0].gross}
                stockControl={product.stock_control}
                availableStock={product.Stocks[0].available}
              />
            </Grid>
          ))}
        </Box>

        <Box display={"flex"}>
          <Box flexGrow={1}>
            <IconButton onClick={prevPage} disabled={currentPage === 1}>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              onClick={nextPage}
              disabled={indexOfLastProduct >= filteredProducts.length}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </TitlePapper>
    </>
  );
}
