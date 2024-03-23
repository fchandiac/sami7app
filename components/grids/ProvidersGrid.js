import React, { useEffect, useState } from 'react'
import InfoDataGrid from '../custom/InfoDataGrid'
import { GridActionsCellItem } from '@mui/x-data-grid'
import useProviders from '../hooks/useProviders'


export default function ProvidersGrid(props) {
    const { update } = props
    const providers = useProviders()
    const [providersList, setProvidersList] = useState([])
    const [gridApiRef, setGridApiRef] = useState(null)
    const [rowData, setRowData] = useState({ id: 0, rut: '', name: '', address: '', phone: '', mail: '' })

    useEffect(() => {
        const fecth = async () => {
            const data = await providers.findAllToGrid()
            setProvidersList(data)
        }
        fecth()
    }, [update])

    const columns = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'rut', headerName: 'Rut', flex: 1 },
        { field: 'name', headerName: 'Nombre', flex: 1 },
        { field: 'address', headerName: 'Dirección', flex: 1 },
        { field: 'phone', headerName: 'Teléfono', flex: 1 },
        { field: 'mail', headerName: 'Correo', flex: 1, headerClassName: 'data-grid-last-column-header' },

    ]
    return (
        <>
            <InfoDataGrid title={'Proveedores'} rows={providersList} columns={columns} setGridApiRef={setGridApiRef}  height='80vh'/>
        </>
    )
}
