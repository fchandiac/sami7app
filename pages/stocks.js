import StockMovementForm from "@/components/forms/StockMovementForm";
import StorageForm from "@/components/forms/StorageForm";
import SotoragesGrid from "@/components/grids/SotoragesGrid";
import StocksGrid from "@/components/grids/StocksGrid";
import StockMovementsGrid from "@/components/grids/StockMovementsGrid";
import useProducts from "@/components/hooks/useProducts";
import useStocks from "@/components/hooks/useStocks";
import useStorages from "@/components/hooks/useStorages";
import StocksTab from "@/components/tabs/StocksTab";
import {
  Grid,
  Autocomplete,
  TextField,
  Paper,
  Typography,
  InputAdornment
} from "@mui/material";
import React, { useState, useEffect } from "react";
import useProductCards from "@/components/hooks/useProductCards";
import StockCard from "@/components/cards/StockCard";
import SearchIcon from "@mui/icons-material/Search";




export default function stocks() {
  
  return (
    <>
      <StocksTab
        Stocks={<Stocks />}
        Movements={<Movements />}
        Storages={<Storages />}
      />
    </>
  );
}

function Stocks() {
  const [gridState, setGridState] = useState(false);
  const productCards = useProductCards();
  const [stockList, setStockList] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const fetchProductCards = async () => {
      const productCardsList = await productCards.findAllGroupByProductAvailable();
      setStockList(productCardsList);
      setFilteredList(productCardsList);
    };
    fetchProductCards();
  }, []);


  useEffect(() => {
    if (searchWord === "") {
      setFilteredList([]);
    } else {
      const searchWords = searchWord.toLowerCase().split(" ");

      const filtered = stockList.filter((stock) => {
        const productName = stock.Product.name.toLowerCase();
        return searchWords.every((word) => productName.includes(word));
      })
      setFilteredList(filtered);


    }

    }, [searchWord]);



  const updateGrid = () => {
    setGridState(!gridState);
  };




  return (
    <>
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
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
      </Grid>
    {
      filteredList.map((stock, index) => {
        return (
          <Grid item xs={12} key={index}>

         <StockCard productId={stock.product_id} />
          </Grid>

        );
      })
    }
    </Grid>
      {/* <StocksGrid update={gridState} /> */}
    </>
  );
}

function Movements() {
  const products = useProducts();
  const storages = useStorages();
  const stocks = useStocks();
  const [productOptions, setProductOptions] = useState([]);
  const [storageOptions, setStorageOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [movementsList, setMovementsList] = useState([]);
  const [updateMovementList, setUpdateMovementList] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await products.findAllToAutocomplete();
      setProductOptions(productsData);

      const storagesData = await storages.findAllToAutocomplete();
      setStorageOptions(storagesData);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchMovements = async () => {
      if (selectedProduct && selectedStorage) {

      
        const movements =  await stocks.findAllStockMovementsByProductAndStorage(selectedProduct.id, selectedStorage.id);
        console.log(movements);
        const movementsList = movements.map((movement) => {
          return {
            id: movement.id,
            description: movement.description,
            add: movement.add,
            decrement: movement.decrement,
            balance: movement.balance,
            reference: movement.reference,
            type: movement.type,
            created_at: movement.created_at,
          };
        })
        // console.log(movements);
        setMovementsList(movementsList);
      }
    };
    fetchMovements();
  }, [selectedProduct, selectedStorage, updateMovementList]);


  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Grid container spacing={1} direction={"column"}>
            <Grid item>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Grid container spacing={1} direction={"column"}>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Filtro de stock
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Autocomplete
                      name="product"
                      options={productOptions}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setSelectedProduct(newValue);
                        } else {
                          setSelectedProduct(null);
                        }
                      }}
                      disablePortal
                      defaultValue={null}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Producto"
                          fullWidth
                          size="small"
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Autocomplete
                      name="storage"
                      options={storageOptions}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setSelectedStorage(newValue);
                        } else {
                          setSelectedStorage(null);
                        }
                      }}
                      disablePortal
                      defaultValue={null}
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
                    </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <StockMovementForm product={selectedProduct} storage={selectedStorage} afterSubmit={()=>{
                setUpdateMovementList(!updateMovementList);
                }}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9}>
        <StockMovementsGrid movementsList={movementsList} />
        </Grid>
      </Grid>
    </>
  );
}

function Storages() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <StorageForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <SotoragesGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}
