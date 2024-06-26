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

export default function ProductsTab(props) {
    const { Products, NewProduct, Categories, Subcategories, Taxes, PriceLists , SellingPrices} = props
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Productos" {...a11yProps(0)} />
                    <Tab label="Nuevo Producto" {...a11yProps(1)} />
                    <Tab label="Categorias" {...a11yProps(2)} />
                    <Tab label="Subcategorias" {...a11yProps(3)} />
                    <Tab label="Listas de precios" {...a11yProps(4)} />
                    <Tab label="Impuestos" {...a11yProps(5)} />
                    <Tab label="Precios de venta" {...a11yProps(6)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {Products}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {NewProduct}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {Categories}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {Subcategories}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {PriceLists}
            </TabPanel>
            <TabPanel value={value} index={5}>
                {Taxes}
            </TabPanel>
            <TabPanel value={value} index={6}>
                {SellingPrices}
            </TabPanel>
        </Box>
    );
}
