import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

export default function SalePointsTabs(props) {
  const { SalePointsTab, OpenCashRegistersTab } = props;
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
          <Tab label="Puntos de Venta" {...a11yProps(0)} />
          <Tab label="Cajas abiertas" {...a11yProps(1)} />
          {/* <Tab label="Cajas cerradas" {...a11yProps(2)} /> } */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {SalePointsTab}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {OpenCashRegistersTab}
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
                {CloseCashRegister}
            </TabPanel> */}
    </Box>
  );
}
