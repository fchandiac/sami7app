import React, { useEffect, useState } from 'react'
import InfoDataGrid from '../custom/InfoDataGrid'
import { GridActionsCellItem } from '@mui/x-data-grid'
import useSubcategories from '../hooks/useSubcategories'

export default function SubcategoriesGrid(props) {
    const {update} = props
    const subcategories = useSubcategories()
    const [subcategoriesList, setSubcategoriesList] = useState([])
    const [gridApiRef, setGridApiRef] = useState(null)

    useEffect(() => {
        const fecth = async () => {
            const data = await subcategories.findAllToGrid()
            setSubcategoriesList(data)
        }
        fecth()
    }, [update])

    const columns = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'name', headerName: 'Nombre', flex: 1 },
        { field: 'description', headerName: 'Descripción', flex: 1 },
        { field: 'categoryName', headerName: 'Categoria', flex: 1, headerClassName: 'data-grid-last-column-header' },
    ]
  return (
    <>
      <InfoDataGrid title={'Subcategorias'} rows={subcategoriesList} columns={columns} setGridApiRef={setGridApiRef} height='80vh' />
   
    </>
  )
}
