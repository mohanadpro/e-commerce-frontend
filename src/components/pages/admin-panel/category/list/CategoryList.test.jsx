import React from 'react'
import { it, expect, describe } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CategoryList } from './CategoryList';
import CreateEditCategory from '../create-edit-category/CreateEditCategory';


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
    it('Test render delete category button',async ()=>{
        render(
        <BrowserRouter>
            <CategoryList isTesting={true}/>
            <Routes>
                <Route path='category-edit-category' element={<CreateEditCategory/>}/>
            </Routes>
        </BrowserRouter>
        )
        await waitFor(()=>{
            const delete_category_list =  screen.getAllByTestId('delete_category_button')
            expect(delete_category_list.length).toBeGreaterThanOrEqual(1)

        })
    })
})