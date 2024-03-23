import React, {useState} from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppContext } from '@/appProvider'
import { useRouter } from 'next/router'
import Snack from './Snack'



export default function Layout(props) {
    const { children } = props
    const { user, pageTitle, setPageTitle, openSnack } = useAppContext()
    const router = useRouter()
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size={'large'}
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => { setOpenDrawer(true)}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {pageTitle}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant={'subtitle1'}>{user.userName + ' - ' + user.name}</Typography>
                    <IconButton
                        sx={{ marginLeft: 2 }}
                        onClick={(e) => { openSnack('Hola', 'success') }}
                        color={'inherit'}
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box p={2}>
                {children}
            </Box>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => { setOpenDrawer(false) }}
            >
                 <List>
                 <ListItem button>
                        <ListItemText primary="Dashboard" 
                        onClick={() => { 
                            router.push('/')
                            setPageTitle('Dashboard') 
                            setOpenDrawer(false)
                        }}
                        />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Productos" 
                        onClick={() => { 
                            router.push('/products')
                            setPageTitle('Productos') 
                            setOpenDrawer(false)
                        }}
                        />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Stocks" 
                        onClick={() => { 
                            router.push('/stocks')
                            setPageTitle('Stocks') 
                            setOpenDrawer(false)
                        }}
                        />
                    </ListItem>
                    {/* <ListItem button>
                        <ListItemText primary="Ventas" />
                    </ListItem> */}
                    <ListItem button>
                        <ListItemText primary="Proveedores" 
                        onClick={() => { 
                            router.push('/providers')
                            setPageTitle('Proveedores') 
                            setOpenDrawer(false)
                        }}
                        />
                    </ListItem>

                    <ListItem button>
                        <ListItemText primary="Registros" 
                        onClick={() => { 
                            router.push('/records')
                            setPageTitle('Registros') 
                            setOpenDrawer(false)
                        }}
                        />
                    </ListItem>
          
                </List>
            </Drawer>

            <Snack />


        </>
    )
}
