import React from 'react'
import { it, expect, describe, vi } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateEditCategory from './CreateEditCategory';
import { CategoryList } from '../list/CategoryList';

describe('Test edit category', ()=>{
    it('create category' , async()=>{
        render(
            <BrowserRouter>
                <CreateEditCategory/>
                <Routes>
                    <Route path='/category' element={<CategoryList isTesting={true}/>}/>
                </Routes>
        </BrowserRouter>
        )

        const category_textfield = screen.getByTestId('category_textfield')
        fireEvent.change(category_textfield, { target : { value : 'test' }})

        const create_edit_button = screen.getByTestId('create-edit-button')
        fireEvent.click(create_edit_button);

        const category_list_page =await screen.findByTestId('category-list-page')
        expect(category_list_page).toBeInTheDocument()

    })
    it('Test edit category', async ()=>{
        render(
            <BrowserRouter>
            <CategoryList isTesting={true}/>
            <Routes>
                <Route path='category-edit-category' element={<CreateEditCategory istTesting={true}/>}/>
            </Routes>
        </BrowserRouter>
        )
        await waitFor(()=>{

            const category_list = screen.getAllByTestId('edit-category-link')
            
            expect(category_list.length).toBeGreaterThanOrEqual(1)
            
            fireEvent.click(category_list[3])

            const category_textfield = screen.getByTestId('category_textfield')

            fireEvent.change(category_textfield, { target : { value : 'test 2'}})

            const edit_category_button = screen.getByTestId('create-edit-button')
            
            fireEvent.click(edit_category_button)
        })
        
    })
})