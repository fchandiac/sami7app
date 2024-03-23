import React from 'react'
import { NewProductFormProvider } from './newProductProvider'
import NewProductComponent from './NewProductComponent'

export default function NewProductForm() {
    return (
        <NewProductFormProvider>
            <NewProductComponent />
        </NewProductFormProvider>
    )
}
