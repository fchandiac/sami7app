import CustomerForm from "@/components/forms/CustomerForm";
import CustomersTab from "@/components/tabs/CustomersTab";
import React, { useState, useEffect, use } from "react";
import {
  Autocomplete,
  Grid,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import CustomersGrid from "@/components/grids/CustomersGrid";
import useCustomers from "@/components/hooks/useCustomers";
import useCustomerAccountMovements from "@/components/hooks/useCustomerAccountMovements";
import CustomerAccountMovementsGrid from "@/components/grids/CustomerAccountMovementsGrid";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import useSales from "@/components/hooks/useSales";
import SalesGrid from "@/components/grids/SalesGrid";

export default function customers() {
  return (
    <>
      <CustomersTab
        Customers={Customers()}
        Accounts={Accounts()}
        CustomerSales={CustomerSales()}
      />
    </>
  );
}

function Customers() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <CustomerForm
          afterSubmit={() => {
            updateGrid();
          }}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <CustomersGrid update={gridState} />
      </Grid>
    </Grid>
  );
}

function Accounts() {
  const customers = useCustomers();
  const customerAccountMovements = useCustomerAccountMovements();
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [movementsList, setMovementsList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const customers_ = await customers.findAll();
      const data = customers_.map((customer) => {
        return {
          id: customer.id,
          key: customer.id,
          name: customer.rut + " - " + customer.name,
        };
      });
      setCustomerOptions(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (selectedCustomer) {
        const data = await customerAccountMovements.findAllByCustomerId(
          selectedCustomer.id
        );
        const formattedData = data.map((movement) => {
          return {
            id: movement.id,
            description: movement.description,
            type: customerAccountMovements.customerAccountMovementType(
              movement.type
            ),
            previous_balance: movement.previous_balance,
            debit: movement.debit,
            credit: movement.credit,
            balance: movement.balance,
            referenceId: movement.reference_id,
            customerId: movement.customer_id,
            userId: movement.user_id,
            userName: movement.User.name,
            createdAt: movement.createdAt,
          };
        });
        setMovementsList(formattedData);
      }
    };
    fetch();
  }, [selectedCustomer]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: 1 }}>
          <Grid container spacing={1} direction={"column"}>
            <Grid item>
              <Typography variant="subtitle1">Filtro</Typography>
            </Grid>
            <Grid item>
              <Autocomplete
                name="customerFilter"
                defaultValue={null}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setSelectedCustomer(newValue);
                  }
                }}
                options={customerOptions}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Cliente" size="small" />
                )}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <CustomerAccountMovementsGrid
          movementsList={movementsList}
          title={"Movimientos de cuenta Cliente: " + selectedCustomer?.name}
        />
      </Grid>
    </Grid>
  );
}

function CustomerSales() {
  const customers = useCustomers();
  const sales = useSales();
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterDates, setFilterDates] = useState({
    start: moment(new Date()).format("YYYY-MM-DD"),
    end: moment(new Date()).format("YYYY-MM-DD 23:59"),
  });
  const [salesList, setSalesList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const customers_ = await customers.findAll();
      const data = customers_.map((customer) => {
        return {
          id: customer.id,
          key: customer.id,
          name: customer.rut + " - " + customer.name,
        };
      });
      setCustomerOptions(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (selectedCustomer) {
        const data = await sales.findAllBetweenDatesByCustomer(
          filterDates.start,
          filterDates.end,
          selectedCustomer.id
        );
        setSalesList(data);
      }
    };
    fetch();
  }, [selectedCustomer, filterDates]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: 1 }}>
          <Grid container spacing={1} direction={"column"}>
            <Grid item>
              <Typography variant="subtitle1">Filtro</Typography>
            </Grid>
            <Grid item>
              <Autocomplete
                name="customerFilter"
                defaultValue={null}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setSelectedCustomer(newValue);
                  }
                }}
                options={customerOptions}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Cliente" size="small" />
                )}
              />
            </Grid>
            <Grid item>
              <DesktopDatePicker
                label="Fecha inicial"
                inputFormat="DD-MM-YYYY"
                value={new Date()}
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
                value={new Date()}
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
  );
}
