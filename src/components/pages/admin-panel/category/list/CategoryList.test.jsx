import React from 'react'
import { it, expect, describe, vi } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CategoryList } from './CategoryList';
import CreateEditCategory from '../create-edit-category/CreateEditCategory';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { toast } from 'react-hot-toast';

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
    getTitle: vi.fn().mockReturnValue({ textContent: 'Are you sure to delete test category' }), 
    clickConfirm: vi.fn().mockImplementation(() => { // Mock clickConfirm if needed
        return Promise.resolve({ isConfirmed: true });
      }),
    clickCancel: vi.fn().mockImplementation(() => { // Mock clickCancel method
        return Promise.resolve({ isDismissed: true }); // Simulate cancel action
      }),
}}))
  


describe('Test Category List', ()=>{
    //  To execute this file you have to update REACT_ADMIN_TOKEN in the vitest.config.js
    it('Test render List Categories Text', async ()=>{
        render(
        <BrowserRouter>
            <CategoryList isTesting={true}/>
        </BrowserRouter>
        )
        const category_list = screen.getByTestId('List_Categories_Text')
        expect(category_list).toBeInTheDocument()
    })


    it('Test render create category link', async ()=>{
        render(
        <BrowserRouter>
            <CategoryList isTesting={true}/>
            <Routes>
                <Route path='category-edit-category' element={<CreateEditCategory/>}/>
            </Routes>
        </BrowserRouter>
        )
        const create_category = screen.getByTestId('create-category-link')
        expect(create_category).toBeInTheDocument()
        fireEvent.click(create_category)
        const create_category_page = screen.getByTestId('create-edit-category-page')
        expect(create_category_page).toBeInTheDocument()
    })

    it('Test render categories table from server', async ()=>{
        render(
        <BrowserRouter>
            <CategoryList isTesting={true}/>
        </BrowserRouter>
        )
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText('Category Name')).toBeInTheDocument()
        expect(screen.getByText('Actions')).toBeInTheDocument()

        await waitFor(()=>{
            expect(screen.getByText('T-shirts')).toBeInTheDocument()
            expect(screen.getByText('Shoes')).toBeInTheDocument()
            expect(screen.getByText('Pants')).toBeInTheDocument()
        })
    })
    it('Test render edit category link', async ()=>{
        render(
        <BrowserRouter>
            <CategoryList isTesting={true}/>
            <Routes>
                <Route path='category-edit-category' element={<CreateEditCategory/>}/>
            </Routes>
        </BrowserRouter>
        )
        await waitFor(()=>{

            const category_list = screen.getAllByTestId('edit-category-link')
            expect(category_list.length).toBeGreaterThanOrEqual(1)
            fireEvent.click(category_list[0])
            const edit_category = screen.getByTestId('create-edit-category-page')
            expect(edit_category).toBeInTheDocument()
            const edit_category_button = screen.getByTestId('create-edit-button')
            expect(edit_category_button).toBeInTheDocument()
        })        
    })
    
    it('Test render delete category button to show confirm message',async ()=>{
        render(
        <BrowserRouter>
            <CategoryList isTesting={true}/>
            <Routes>
                <Route path='category-edit-category' element={<CreateEditCategory/>}/>
            </Routes>
        </BrowserRouter>
        )
        
        const delete_category_list = await screen.findAllByTestId('delete_category_button');
        
        fireEvent.click(delete_category_list[3]);

        expect(Swal.isVisible()).toBeTruthy();
        
        expect(Swal.getTitle().textContent).toEqual('Are you sure to delete test category');
    })

    it('Test click on confirm message',async ()=>{
        render(
        <BrowserRouter>
            <CategoryList isTesting={true}/>
            <Routes>
                <Route path='category-edit-category' element={<CreateEditCategory/>}/>
            </Routes>
        </BrowserRouter>
        )
        const delete_category_list = await screen.findAllByTestId('delete_category_button');
        
        fireEvent.click(delete_category_list[3]);

        expect(Swal.isVisible()).toBeTruthy();
        
        expect(Swal.getTitle().textContent).toEqual('Are you sure to delete test category');

        Swal.clickConfirm();
        
        await waitFor(()=>{
            expect(toast.success).toHaveBeenCalledWith('category deleted');
        })           
    })
})
