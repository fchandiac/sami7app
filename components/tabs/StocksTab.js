import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
            {value === index && (
                <Box sx={{ p: 1 }}>
                    {children}
                </Box>
            )}
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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function StocksTab(props) {
    const { Stocks, Alerts, Storages, Movements } = props
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Stocks" {...a11yProps(0)} />
                    <Tab label="Movimientos" {...a11yProps(1)} />
                    {/* <Tab label="Alertas" {...a11yProps(2)} /> */}
                    <Tab label="Almacenes" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {Stocks}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {Movements}
            </TabPanel>
            {/* <TabPanel value={value} index={2}>
                {Alerts}
            </TabPanel> */}
            <TabPanel value={value} index={2}>
                {Storages}
            </TabPanel>
       
        </Box>
    );
}
