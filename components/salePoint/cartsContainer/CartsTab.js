import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSalePointContext } from "../salePointProvider";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CartsTab(props) {
  const { Cart1, Cart2, Cart3, Cart4 } = props;
  const { setActiveCart } = useSalePointContext();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Carro Nº1"
            {...a11yProps(0)}
            onClick={() => {
              setActiveCart(1);
            }}
          />
          <Tab
            label="Carro Nº2"
            {...a11yProps(1)}
            onClick={() => {
              setActiveCart(2);
            }}
          />
          <Tab
            label="Carro Nº3"
            {...a11yProps(2)}
            onClick={() => {
              setActiveCart(3);
            }}
          />
          <Tab
            label="Carro Nº4"
            {...a11yProps(3)}
            onClick={() => {
              setActiveCart(4);
            }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {Cart1}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {Cart2}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {Cart3}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {Cart4}
      </TabPanel>
    </Box>
  );
}
