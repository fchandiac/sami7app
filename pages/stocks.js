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
} from "@mui/material";
import React, { useState, useEffect } from "react";



export default function stocks() {
  return (
    <>
      <StocksTab
        Stocks={Stocks()}
        Movements={Movements()}
        Storages={Storages()}
      />
    </>
  );
}

function Stocks() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <StocksGrid update={gridState} />
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
        const stock = await stocks.findOneByStorageAndProduct(
          selectedStorage.id,
          selectedProduct.id
        );
        const movements = await stocks.findAllMovementsByStock(stock.id);
        console.log(movements);
        const movementsList = movements.map((movement) => {
          return {
            id: movement.id,
            add: movement.add,
            decrement: movement.decrement,
            balance: movement.balance,
            referece: movement.reference,
            type: movement.type,
            created_at: movement.created_at,
            stock_id: movement.stock_id,
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
              <StockMovementForm product={selectedProduct} storage={selectedStorage} afterSubmit={()=>{setUpdateMovementList(!updateMovementList)}}/>
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
