import SalesTab from "@/components/tabs/SalesTab";
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Grid,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import useSales from "@/components/hooks/useSales";
import SalesGrid from "@/components/grids/SalesGrid";



export default function sales() {
  return (
    <>
      <SalesTab Sales={Sales()} />
    </>
  );
}



function Sales() {
    const sales = useSales();
    const [filterDates, setFilterDates] = useState({
        start: moment(new Date()).format("YYYY-MM-DD"),
        end: moment(new Date()).format("YYYY-MM-DD 23:59"),
      });
      const [salesList, setSalesList] = useState([]);

      useEffect(() => {
        const fetchSales = async () => {
          const sales_ = await sales.findAllBetweenDates(filterDates.start, filterDates.end);
          setSalesList(sales_);
        };
        fetchSales();
      }
        , [filterDates]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Paper variant="outlined" sx={{ p: 1 }}>
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <Typography variant="subtitle1">Filtro</Typography>
              </Grid>
              <Grid item>
              <DesktopDatePicker
                label="Fecha inicial"
                inputFormat="DD-MM-YYYY"
                value={filterDates.start}
                onChange={(newValue) => {
                  setFilterDates({
                    ...filterDates,
                    start: moment(newValue).format("YYYY-MM-DD"),
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </Grid>
            <Grid item>
              <DesktopDatePicker
                label="Fecha final"
                inputFormat="DD-MM-YYYY"
                value= {filterDates.end}
                onChange={(newValue) => {
                  setFilterDates({
                    ...filterDates,
                    end: moment(newValue).format("YYYY-MM-DD 23:59"),
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
            <SalesGrid salesList={salesList} /> 
        </Grid>
      </Grid>
    </>
  );
}
