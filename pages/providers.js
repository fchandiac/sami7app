import React, {useState} from 'react'
import { Grid } from '@mui/material'
import ProviderForm from '@/components/forms/ProviderForm'
import ProvidersGrid from '@/components/grids/ProvidersGrid'

export default function providers() {
    const [gridState, setGridState] = useState(false)

    const updateGrid = () => {
        setGridState(!gridState)
    }
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                    <ProviderForm afterSubmit={() => { updateGrid() }} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <ProvidersGrid update={gridState} />
                </Grid>
            </Grid>
        </>
    )
}
