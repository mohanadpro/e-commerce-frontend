import React from 'react'
import { it, expect, describe, vi } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductList } from './ProductList';
import CreateEditProduct from '../create-edit-product/CreateEditProduct';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { toast } from 'react-hot-toast'


vi.mock('react-hot-toast', () => ({
    toast: {
      success: vi.fn(), // Mock success toast
      error: vi.fn(),   // Mock error toast (if needed)
    },
  }));

// Correctly mock the default export of SweetAlert2
vi.mock('sweetalert2', () => ({
    default: {
      fire: vi.fn().mockResolvedValue({
      isConfirmed: true, // Mock response of Swal.fire() to simulate user confirmation
    }),
    isVisible: vi.fn().mockReturnValue(true), // Mock the isVisible method to return true
    getTitle: vi.fn().mockReturnValue({ textContent: 'Are you sure to delete test11 product' }), 
    clickConfirm: vi.fn().mockImplementation(() => { // Mock clickConfirm if needed
        return Promise.resolve({ isConfirmed: true });
      }),
    clickCancel: vi.fn().mockImplementation(() => { // Mock clickCancel method
        return Promise.resolve({ isDismissed: true }); // Simulate cancel action
      }),
}}))

describe('Test Product List', ()=>{
    //  To execute this file you have to update REACT_ADMIN_TOKEN in the vitest.config.js
    // Before you test this file try to test CreateEditProduct.test.js file to create a new product to delete it
    it('Test render List Products Text', async ()=>{
        render(
        <BrowserRouter>
            <ProductList isTesting={true}/>
        </BrowserRouter>
        )
        const product_list = screen.getByTestId('List_Products_Text')
        expect(product_list).toBeInTheDocument()
    })


    it('Test render create product link', async ()=>{
        render(
        <BrowserRouter>
            <ProductList isTesting={true}/>
            <Routes>
                <Route path='create-edit-product' element={<CreateEditProduct/>}/>
            </Routes>
        </BrowserRouter>
        )
        const create_product = screen.getByTestId('create-product-link')
        expect(create_product).toBeInTheDocument()
        fireEvent.click(create_product)
        const create_product_page = screen.getByTestId('create-edit-product-page')
        expect(create_product_page).toBeInTheDocument()
    })

    it('Test render products table from server', async ()=>{
        render(
        <BrowserRouter>
            <ProductList isTesting={true}/>
        </BrowserRouter>
        )
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText('Product Name')).toBeInTheDocument()
        expect(screen.getByText('Category')).toBeInTheDocument()
        expect(screen.getByText('Price')).toBeInTheDocument()
        expect(screen.getByText('Size')).toBeInTheDocument()
        expect(screen.getByText('Color')).toBeInTheDocument()
        expect(screen.getByText('Gender')).toBeInTheDocument()
        expect(screen.getByText('Actions')).toBeInTheDocument()

        await waitFor(()=>{
            expect(screen.getByText('Yellow T-shirt')).toBeInTheDocument()
        })
    })

    it('Test render edit product link', async ()=>{
        render(
        <BrowserRouter>
            <ProductList isTesting={true}/>
            <Routes>
                <Route path='create-edit-product' element={<CreateEditProduct/>}/>
            </Routes>
        </BrowserRouter>
        )
        await waitFor(()=>{
            const product_list = screen.getAllByTestId('edit-product-link')
            expect(product_list.length).toBeGreaterThanOrEqual(1)
            fireEvent.click(product_list[0])
            const edit_product = screen.getByTestId('create-edit-product-page')
            expect(edit_product).toBeInTheDocument()
            const edit_product_button = screen.getByTestId('create-edit-button')
            expect(edit_product_button).toBeInTheDocument()
        })        
    })


    it('Test render delete product button',async ()=>{
        render(
        <BrowserRouter>
            <ProductList isTesting={true}/>
            <Routes>
                <Route path='product-edit-product' element={<CreateEditProduct/>}/>
            </Routes>
        </BrowserRouter>
        )
        await waitFor(()=>{
            const delete_product_list =  screen.getAllByTestId('delete_product_button')
            expect(delete_product_list.length).toBeGreaterThanOrEqual(1)

        })
    })

    it('Test render delete product button to show confirm message',async ()=>{
        render(
        <BrowserRouter>
            <ProductList isTesting={true}/>
        </BrowserRouter>
        )

        const delete_product_list = await screen.findAllByTestId('delete_product_button');
        
        fireEvent.click(delete_product_list[0]);

        expect(Swal.isVisible()).toBeTruthy();
        
        expect(Swal.getTitle().textContent).toEqual('Are you sure to delete test11 product');
    })

    it('Test click on confirm message',async ()=>{

        render(
        <BrowserRouter>
            <ProductList isTesting={true}/>
        </BrowserRouter>
        )
        const delete_product_list = await screen.findAllByTestId('delete_product_button');
        
        fireEvent.click(delete_product_list[0]);

        expect(Swal.isVisible()).toBeTruthy();
        
        expect(Swal.getTitle().textContent).toEqual('Are you sure to delete test11 product');

        Swal.clickConfirm();
        
        await waitFor(()=>{
            expect(toast.success).toHaveBeenCalledWith('product deleted');
        })           
    })
})