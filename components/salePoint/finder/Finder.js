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
import useSellingPrices from "@/components/hooks/useSellingPrices";


export default function Finder() {
  const { finderProductsList, setFinderProductsList, priceList, info } =
    useSalePointContext();
  const products = useProducts();
  const sellingPrices = useSellingPrices();
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
      const productsList = await sellingPrices.findAllByPriceList(priceList.id);

      // console.log("ProductsList", productsList);
      
      const list = await products.findAllToSalePoint(
        priceList.id,
        info.storage.id
      );
      // console.log("List", list);
    setFinderProductsList(list);
    };
    fetch();
  }, [priceList, updateList, info.storage]);

  useEffect(() => {
    if (searchWord === "") {
      setFilteredProducts([]);
    } else {
      const searchWords = searchWord.toLowerCase().split(" ");
      const filtered = finderProductsList.filter((product) => {
        const productName = product.name.toLowerCase();
        return searchWords.every((word) => productName.includes(word));
      });
      const uniqueFiltered = Array.from(new Set(filtered.map(product => product.id))).map(id => filtered.find(product => product.id === id));
      setFilteredProducts(uniqueFiltered);
      // console.log("Filtered", uniqueFiltered);
    }
  }, [searchWord]);
  

  // useEffect(() => {
  //   if (searchWord === "") {
  //     setFilteredProducts([]);
  //   } else {
  //     const filtered = finderProductsList.filter((product) => {
  //       return product.name.toLowerCase().includes(searchWord.toLowerCase());
  //     });
  //     setFilteredProducts(filtered);
  //     // console.log("Filtered", filtered);
  //   }
  // }, [searchWord]);

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

        <Box overflow="auto" height={"24.1rem"}>
          {currentProducts.map((product) => (
            <Grid item key={product.id} paddingTop={1}>
              <ProductCardFinder
                id={product.id}
                name={product.name}
                code={product.code}
                subcategory={{id: product.Subcategory.id, key: product.Subcategory.id, name: product.Subcategory.name}}
                gross={product.SellingPrices[0].gross}
                stockControl={product.stock_control}
                availableStock={product.availableStock}
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
