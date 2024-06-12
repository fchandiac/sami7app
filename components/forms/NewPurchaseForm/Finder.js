import TitlePaper from "@/components/custom/TitlePaper";
import useProducts from "@/components/hooks/useProducts";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Box,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Finder(props) {
    const {addProduct} = props;
  const products = useProducts();
  const [searchWord, setSearchWord] = useState("");
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const productsPerPage = 5; // Define el número de productos por página
  const [currentPage, setCurrentPage] = useState(1); // Estado de la página actual

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  useEffect(() => {
    const fetch = async () => {
      const list = await products.findAll();
      setProductList(list);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (searchWord === "") {
      setFilteredProducts([]);
    } else {
      const searchWords = searchWord.toLowerCase().split(" ");
      const filtered = productList.filter((product) => {
        const productName = product.name.toLowerCase();
        return searchWords.every((word) => productName.includes(word));
      });
      const uniqueFiltered = Array.from(
        new Set(filtered.map((product) => product.id))
      ).map((id) => filtered.find((product) => product.id === id));
      setFilteredProducts(uniqueFiltered);
      // console.log("Filtered", uniqueFiltered);
    }
  }, [searchWord]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <TitlePaper title="Buscador de productos">
        <Grid item display={"flex"}>
          <TextField
            sx={{ marginBottom: 1 }}
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
        </Grid>
        <Divider sx={{ marginBottom: 1 }} />
        <Box overflow="auto" height={"20.1rem"}>
          {filteredProducts
            .slice(
              indexOfFirstProduct,
              Math.min(indexOfLastProduct, filteredProducts.length)
            )
            .map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                justifyContent={"space-between"}
                marginBottom={1}
              >
                <Paper variant="outlined" sx={{ p: 1 }}>
                  <Stack direction="row" spacing={1}>
                    <Box flexGrow={1}>
                      <Typography fontSize={10} flexGrow={1}>
                        id: {product.id}
                      </Typography>
                      <Typography fontSize={14} flexGrow={1}>
                        {product.name}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        onClick={() => addProduct(product.id)}
                        size="small"
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Box>
                  </Stack>
                </Paper>
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
      </TitlePaper>
    </>
  );
}
