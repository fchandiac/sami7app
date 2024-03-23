import { Paper, Typography, useTheme, Box } from '@mui/material'
import React from 'react'

export default function TitlePapper(props) {
    const { title } = props 
    const theme = useTheme()
    return (
        <>


            <Paper variant='outlined' sx={{ borderColor: theme.palette.papperBorder.main}}>
                <Typography
                    variant='caption'
                    sx={{
                        position: 'relative',
                        top: '-8px', // Ajusta este valor según sea necesario
                        left: '8px', // Ajusta este valor según sea necesario
                        zIndex: '1',
                        bgcolor: 'background.paper', // Color del fondo del texto para que sea legible
                        padding: '2px 4px', // Ajusta el espaciado interior del texto según sea necesario
                        color: theme.palette.papperTitle.main,
                    }}
                >
                    {title}
                </Typography>
                <Box sx={{ pl: 1, pr:1, pb:1 }}>
                    {props.children}
                </Box>
            
            </Paper>

        </>
    )
}
