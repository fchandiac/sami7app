import React, { useEffect, useState } from 'react'
import InfoDataGrid from '../custom/InfoDataGrid'
import { GridActionsCellItem } from '@mui/x-data-grid'
import useStocks from '../hooks/useStocks'


// available
// : 
// 0
// critical
// : 
// 0
// id
// : 
// 1002
// productId
// : 
// 1001
// productName
// : 
// "test"
// reserve
// : 
// 0
// storageId
// : 
// 1001
// storageName
// : 
// "test"
// total
// : 
// 0


export default function StocksGrid() {
    const stocks = useStocks()
    const [stockList, setStockList] = useState([])
    const [gridApiRef, setGridApiRef] = useState(null);
    const [rowData, setRowData] = useState({ id: 0, productId: 0, productName: "", storageId: 0, storageName: "", total: 0, available: 0, reserve: 0, critical: 0});

    useEffect(() => {
        const fecth = async () => {
            const data = await stocks.findAll()
            setStockList(data)
        }
        fecth()
    }, [])

    const columns = [
        { field: 'id', headerName: 'Id', flex: .5 },
        { field: 'productName', headerName: 'Producto',  flex: 1  },
        { field: 'storageName', headerName: 'Almacén',  flex: 1  },
        { field: 'total', headerName: 'Total',  flex: .6 },
        { field: 'available', headerName: 'Disponible',flex: .6 },
        { field: 'reserve', headerName: 'Reservado',flex: .6},
        { field: 'critical', headerName: 'Crítico', flex: .6 },
    ]

  return (
    <>
        <InfoDataGrid
            columns={columns}
            rows={stockList}
            title="Stocks"
            setGridApiRef={setGridApiRef}
            height={"80vh"}
        />
        
    </>
  )
}
