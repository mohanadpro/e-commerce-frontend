import React from 'react'
import { it, expect, describe, vi } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateEditProduct from './CreateEditProduct';
import { ProductList } from '../list/ProductList';
import { AdminMainPage } from '../../main-page/AdminMainPage';

describe('Test product', ()=>{
    it('Test create product' , async()=>{
        render(
            <BrowserRouter>
                <CreateEditProduct isTesting={true}/>
                <Routes>
                    <Route path='/admin' element={<AdminMainPage isTesting={true}/>}/>
                </Routes>
        </BrowserRouter>
        )

        const product_name = screen.getByTestId('product_name')
        fireEvent.change(product_name, { target : { value : 'test' }})

        const product_price = screen.getByTestId('product_price')
        fireEvent.change(product_price, { target : { value : 777 }})

        const product_size = screen.getByTestId('product_size')
        fireEvent.change(product_size, { target : { value : 'L' }})

        const product_gender = screen.getByTestId('product_gender')
        fireEvent.change(product_gender, { target : { value : 'Youth' }})

        const product_color = screen.getByTestId('product_color')
        fireEvent.change(product_color, { target : { value : 'White' }})

        const product_category = await screen.findByTestId('product_category')
        fireEvent.change(product_category, { target : { value : 93 }})

        const create_edit_button = screen.getByTestId('create-edit-button')
        fireEvent.click(create_edit_button);

        const product_list_page =await screen.findByTestId('admin-page')
        expect(product_list_page).toBeInTheDocument()

    })
    it('Test edit product', async ()=>{
        render(
            <BrowserRouter>
                <ProductList isTesting={true}/>
                <Routes>
                    <Route path='/create-edit-product' element={<CreateEditProduct istTesting={true}/>}/>                
                    <Route path='/admin' element={<AdminMainPage/>}/>                
                </Routes>
        </BrowserRouter>
        )

        await waitFor(()=>{

            const product_list = screen.getAllByTestId('edit-product-link')
            
            expect(product_list.length).toBeGreaterThanOrEqual(1)
            
            fireEvent.click(product_list[0])

            const product_name = screen.getByTestId('product_name')
            fireEvent.change(product_name, { target : { value : 'test11' }})
    
            const product_price = screen.getByTestId('product_price')
            fireEvent.change(product_price, { target : { value : 11 }})
    
            const product_size = screen.getByTestId('product_size')
            fireEvent.change(product_size, { target : { value : 'L' }})
    
            const product_gender = screen.getByTestId('product_gender')
            fireEvent.change(product_gender, { target : { value : 'Men' }})

            const product_color = screen.getByTestId('product_color')
            fireEvent.change(product_color, { target : { value : 'White' }})
    
            const edit_product_button = screen.getByTestId('create-edit-button')
            fireEvent.click(edit_product_button)       
        })
    })
})