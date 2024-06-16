import {
  Box,
  Grid,
  IconButton,
  Paper,
  Autocomplete,
  TextField,
  Dialog,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SidePanel from "./sidePanel/SidePanel";
import CodeFinder from "./condeFinder/CodeFinder";
import Finder from "./finder/Finder";
import CartsContainer from "./cartsContainer/CartsContainer";
import usePriceLists from "../hooks/usePriceLists";
import { useSalePointContext } from "./salePointProvider";
import useSalePoints from "../hooks/useSalePoints";
import useCashRegisters from "../hooks/useCashRegisters";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CashRegistersForm from "../forms/CashRegisterForm";
import useStorages from "../hooks/useStorages";
import { useAppContext } from "@/appProvider";

export default function SalePoint() {
  const {
    setPriceList,
    priceList,
    info,
    setInfo,
    setInfoCashRegister,
    setInfoStatus,
  } = useSalePointContext();
  const { user, openSnack, infoSatus, setInfoSatus } = useAppContext();
  const [openLoadDialog, setOpenLoadDialog] = useState(!info.status);
  const priceLists = usePriceLists();
  const salePoints = useSalePoints();
  const cashRegisters = useCashRegisters();
  const storages = useStorages();
  const [pricelistOptions, setPriceListOptions] = useState([]);
  const [salePointsOpenOptions, setSalePointsOpenOptions] = useState([]);
  const [openCashRegisterOptions, setOpenCashRegisterOptions] = useState([]);
  const [selectedCasRegister, setSelectedCashRegister] = useState(null);
  const [selectedSalePoint, setSelectedSalePoint] = useState(null);
  const [updatedCashRegisterOptions, setUpdatedCashRegisterOptions] =
    useState(false);
  const [openNewCashRegisterDialog, setOpenNewCashRegisterDialog] =
    useState(false);

  useEffect(() => {
    const fetch = async () => {
      const priceLists_ = await priceLists.findAllToAutocomplete();
      setPriceListOptions(priceLists_);

      const salePointsClosed = await salePoints.findAll();
      console.log("salePointsClosed", salePointsClosed);
      const salePointFormatted = salePointsClosed.map((salePoint) => {
        return {
          id: salePoint.id,
          key: salePoint.id,
          name: salePoint.name,
          address: salePoint.address,
          phone: salePoint.phone,
          status: salePoint.status,
          storage: { id: salePoint.storage_id, key: salePoint.Storage.id, name: salePoint.Storage.name},
          commerceName: salePoint.commerce_name,
          commerceRut: salePoint.commerce_rut,
        };
      });
      setSalePointsOpenOptions(salePointFormatted);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (selectedSalePoint) {
        const findSalePoint = await salePoints.findOneById(
          selectedSalePoint.id
        );
        const storage = await storages.findOneById(findSalePoint.storage_id);
        setInfo(
          findSalePoint.id,
          findSalePoint.name,
          findSalePoint.address,
          findSalePoint.phone,
          false,
          { id: storage.id, key: storage.id, name: storage.name },
          null
        );

        const cashRegisters_ = await cashRegisters.findAllOpenBySalePoint(
          findSalePoint.id
        );

        const cashRegistersFormatted = cashRegisters_.map((cashRegister) => {
          return {
            id: cashRegister.id,
            key: cashRegister.id,
            name: "Caja " + cashRegister.id + " - " + cashRegister.description,
          };
        });
        setOpenCashRegisterOptions(cashRegistersFormatted);
      }
    };
    fetch();
  }, [selectedSalePoint, updatedCashRegisterOptions]);


  const login = async () => {
    if (selectedSalePoint && selectedCasRegister) {
      setInfoCashRegister(selectedCasRegister.id);
      setInfoStatus(true);
      salePoints.updateStatus(selectedSalePoint.id, true);
      setOpenLoadDialog(false);

      //setInfo = ( id, name, address, phone, status, storage, cashRegisterId)

      setInfo(
        selectedSalePoint.id,
        selectedSalePoint.name,
        selectedSalePoint.address,
        selectedSalePoint.phone,
        true,
        selectedSalePoint.storage,
        selectedCasRegister.id,
        selectedSalePoint.commerceName,
        selectedSalePoint.commerceRut
      );
      setSelectedCashRegister(null);
      setSelectedSalePoint(null);
    } else if (!selectedSalePoint) {
      console.log("Debe seleccionar un punto de venta");
      openSnack("Debe seleccionar un punto de venta", "error");
    } else if (!selectedCasRegister) {
      console.log("Debe seleccionar una caja");
      openSnack("Debe seleccionar una caja", "error");
    }
  };

  return (
    <>
      <Box display={"flex"}>
        <Box>
          <SidePanel setOpenLoadDialog={setOpenLoadDialog}/>
        </Box>
        <Box marginLeft={1} minWidth={"300px"} maxWidth={"300px"}>
          <Box>
            <Paper variant="outlined" sx={{ p: 1, mb: 1 }}>
              <Autocomplete
                name="priceList"
                value={priceList}
                options={pricelistOptions}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setPriceList(newValue);
                  } else {
                    setPriceList(null);
                  }
                }}
                //defaultValue={{ id: 1001, key: 1001, name: 'MINORISTA' }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lista de precios"
                    fullWidth
                    size="small"
                  />
                )}
              />
            </Paper>
          </Box>
          <Box mb={1}>
            <CodeFinder />
          </Box>
          <Box>
            <Finder />
          </Box>
        </Box>
        <Box marginLeft={1} minWidth={"300px"} height={"84vh"} width={"100%"}>
          <CartsContainer />
        </Box>
      </Box>
      <Dialog open={openLoadDialog} fullScreen>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper variant="outlined" sx={{ p: 1, width: "50vh", mt: 20 }}>
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <Typography variant={"subtitle1"}>
                  Acceso Punto de venta
                </Typography>
              </Grid>
              <Grid item>
                <Autocomplete
                  name="salePoint"
                  value={selectedSalePoint}
                  options={salePointsOpenOptions}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setSelectedSalePoint(newValue);
                    }
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Punto de venta"
                      fullWidth
                      size="small"
                    />
                  )}
                />
              </Grid>
              <Grid item display={"flex"}>
                <Autocomplete
                  sx={{ flexGrow: 1 }}
                  name="cashRegister"
                  value={selectedCasRegister}
                  options={openCashRegisterOptions}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setSelectedCashRegister(newValue);
                    } else {
                      setSelectedCashRegister(null);
                    }
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Caja"
                      fullWidth
                      size="small"
                    />
                  )}
                />
                <IconButton
                  onClick={() => {
                    setOpenNewCashRegisterDialog(true);
                    console.log("info", info);
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              </Grid>
              <Grid item textAlign={"right"}>
                <Button
                  variant="contained"
                  onClick={() => {
                    login();
                  }}
                >
                  Ingresar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Dialog
          open={openNewCashRegisterDialog}
          fullWidth
          maxWidth={"xs"}
          onClose={() => {
            setOpenNewCashRegisterDialog(false);
          }}
        >
          <CashRegistersForm
            afterSubmit={() => {
              setOpenNewCashRegisterDialog(false);
              setUpdatedCashRegisterOptions(!updatedCashRegisterOptions);
            }}
          />
        </Dialog>
      </Dialog>
    </>
  );
}
