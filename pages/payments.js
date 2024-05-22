import PaymentsTab from "@/components/tabs/PaymentsTab";
import React,{useState, useEffect} from "react";
import { Grid, Paper, Typography, TextField, Autocomplete } from "@mui/material";
import PaymenthMethodForm from "@/components/forms/PaymenthMethodForm";
import PaymentsMethodsGrid from "@/components/grids/PaymentsMethodsGrid";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import usePayments from "@/components/hooks/usePayments";
import PaymentsGrid from "@/components/grids/PaymentsGrid";

export default function payments() {
  return (
    <>
      <PaymentsTab Payments={Payments()} PaymentMethods={PaymentMethods()} />
    </>
  );
}

function PaymentMethods() {
  const [gridState, setGridState] = useState(false);


  const updateGrid = () => {
    setGridState(!gridState);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <PaymenthMethodForm 
           afterSubmit={() => {
            updateGrid();
          }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <PaymentsMethodsGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}

function Payments() {
  const payments = usePayments();
  const [filterDates, setFilterDates] = useState({ start: moment(new Date).format('YYYY-MM-DD'), end: moment(new Date).format('YYYY-MM-DD 23:59') })
  const [status, setStatus] = useState(3)



  return (
    <>
       <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 1 }} variant="outlined">
            <Grid container spacing={1} direction={'column'}>
              <Grid item>
                <Typography variant="subtitle1">Filtro</Typography>
              </Grid>
              <Grid item>
                <DesktopDatePicker
                  label="Fecha inicial"
                  inputFormat="DD-MM-YYYY"
                  value={new Date()}
                  onChange={(newValue) => {
                    setFilterDates({ ...filterDates, start: moment(newValue).format('YYYY-MM-DD') })
                  }}
                  renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                />
              </Grid>
              <Grid item>
                <DesktopDatePicker
                  label="Fecha final"
                  inputFormat="DD-MM-YYYY"
                  value={new Date()}
                  onChange={(newValue) => {
                    setFilterDates({ ...filterDates, end: moment(newValue).format('YYYY-MM-DD 23:59') })
                  }}
                  renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  options={[
                    {id: 1, name: 'Pendiente', key: 1},
                    {id: 2, name: 'Cancelado', key: 2},
                    {id: 3, name: 'Todos', key: 3},
                  ]}
                  onChange={(e, newValue) => {
                    if (newValue){
                      setStatus(newValue.key)
                    } else {
                      setStatus(3)
                    }
                    
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label="Estado"  size="small" fullWidth/>}
                />
                  </Grid>
            </Grid>

          </Paper>
         
        </Grid>
        <Grid item xs={12} md={9}>
         <PaymentsGrid filterDates={filterDates} status={status} />
        </Grid>
      </Grid>
    </>
    </>
  );
}
