import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoneyIcon from "@mui/icons-material/Money";
import { Box, Grid, IconButton, Paper } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { useSalePointContext } from "../salePointProvider";
import Info from "./Info";
import Exchange from "./Exchange";
import CashAmount from "./CashAmount";
import Close from "./Close";
import ListAltIcon from '@mui/icons-material/ListAlt';
import Movements from "./movements";


export default function SidePanel(props) {
  const {setOpenLoadDialog} = props;
  const { sideBarOpen, toogleSideBar } = useSalePointContext();
  const [selected, setSelected] = useState(0);

  const openContent = (index) => {
    setSelected(index);
    if (!sideBarOpen) {
      toogleSideBar();
    }
  };

  const content = () => {
    switch (selected) {
      case 0:
        return <></>;
      case 1:
        return <div>favorites</div>;
      case 2:
        return <CashAmount />;
      case 3:
        return <Exchange />;
      case 4:
        return <div>lock</div>;
      case 5:
        return <Close setOpenLoadDialog={setOpenLoadDialog}/>;
      case 6:
        return <Info />;
      case 7:
        return <Movements />;
      case 8:
        return <div>Settings</div>;
      default:
        return <div>default</div>;
    }
  };

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <Box display={"flex"}>
          <Grid container direction={"column"} alignContent={"center"}>
            <Grid item>
              <IconButton onClick={() => openContent(1)}>
                <FavoriteIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => openContent(2)}>
                <MoneyIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => openContent(3)}>
                <CurrencyExchangeIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => openContent(4)}>
                <LockIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => openContent(5)}>
                <PointOfSaleIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => openContent(6)}>
                <InfoIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => openContent(7)}>
                <ListAltIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => openContent(8)}>
                <SettingsIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Box
            sx={{ flexGrow: 1 }}
            display={sideBarOpen ? "flex" : "none"}
            flexDirection={"column"}
          >
            <Box width={"100%"} flexGrow={1}>
              {content()}
            </Box>
            <Box textAlign={"right"} width={"100%"}>
              <IconButton
                onClick={() => {
                  toogleSideBar();
                  setSelected(0);
                }}
              >
                <NavigateBeforeIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
