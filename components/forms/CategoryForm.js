import React, { useState } from 'react'
import { Grid, Paper, Typography, TextField, Button } from '@mui/material'
import useCategories from '../hooks/useCategories'
import { useAppContext } from '@/appProvider'
import useRecords from '../hooks/useRecords'




export default function CategoryForm(props) {
    const { data = {
        id: null,
        name: '',
        description: '',
    }, edit = false, afterSubmit = () => { }, dialog = false } = props
    const categories = useCategories()
    const records = useRecords()
    const { openSnack, user } = useAppContext()
    const [categoryData, setCategoryData] = useState(data)


    const save = async () => {
        if (edit) {
            console.log('edit')
        } else {
            try {
                const newCategory = await categories.create(categoryData.name, categoryData.description)
                setCategoryData({ id: 0, name: '', description: '' })
                afterSubmit()
                openSnack('Categoria creada', 'success')
                await records.createCategory(user.id, newCategory.name)
            } catch (err) {
                openSnack(err.errors[0].message, 'error')
            }
        }
    }
    return (
        <>
            <Paper variant='outlined' sx={{ p: 1 }}>
                <form onSubmit={(e) => { e.preventDefault(); save() }}>
                    <Grid container spacing={1} direction={'column'}>
                        <Grid item>
                            <Typography variant={'subtitle1'}>{edit ? 'Actualizar' : 'Nueva'} categoría</Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                label='Nombre'
                                name='categoryName'
                                variant='outlined'
                                fullWidth
                                value={categoryData.name}
                                onChange={(e) => { setCategoryData({ ...categoryData, name: e.target.value }) }}
                                size='small'
                                required
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='Descripción'
                                name='categoryDescription'
                                variant='outlined'
                                fullWidth
                                multiline
                                rows={2}
                                value={categoryData.description}
                                onChange={(e) => { setCategoryData({ ...categoryData, description: e.target.value }) }}
                                size='small'
                            />
                        </Grid>
                        <Grid item textAlign={'right'}>
                            <Button type='submit' variant='contained' color='primary'>{edit ? 'Actualizar' : 'Guardar'}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    )
}
