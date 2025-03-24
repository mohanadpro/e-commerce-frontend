import React from 'react'
import { it, expect, describe, vi } from 'vitest' 
import { findByTestId, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Checkout } from '../checkout/Checkout';
import { CurrentUserProvider } from '../../../contexts/CurrentUserContext';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';
import { ProductProvider } from '../../../contexts/ProductContext';
import { CartProvider } from '../../../contexts/CartContext';
import { AddressProvider } from '../../../contexts/AddressContext';
import { Products } from '../product/Products';


describe('Test search component', () => {
    it('test get categories when write letter',async ()=>{
        render(<Search/>)
        const search_component = screen.getByTestId('search-result')
        expect(search_component).toBeInTheDocument()
        const searchTextfield= screen.getByTestId('search-box')
        await userEvent.type(searchTextfield,'P')
        expect(searchTextfield).toHaveValue('P')
        await userEvent.type(searchTextfield,'a')
        expect(searchTextfield).toHaveValue('Pa')
        await waitFor(() => {
            expect(screen.queryByText('Pants')).toBeInTheDocument();
        });
    })

    it('test select category to get products',async ()=>{
        render(
        <BrowserRouter>
            <ProductProvider value={[]}>
                <Search/>
                <Products/>
            </ProductProvider>
        </BrowserRouter>
        )
        const search_component = screen.getByTestId('search-result')
        expect(search_component).toBeInTheDocument()
        const searchTextfield= screen.getByTestId('search-box')
        await userEvent.type(searchTextfield,'S')
        expect(searchTextfield).toHaveValue('S')
        await userEvent.type(searchTextfield,'h')
        expect(searchTextfield).toHaveValue('Sh')
        await waitFor( async () => {
            const selected_shoes =screen.queryByText('Shoes')
            fireEvent.click(selected_shoes)

            const first_shoes =screen.queryByText('Nike Air Max')
            expect(first_shoes).toBeInTheDocument()

            const second_shoes =screen.queryByText('Nike Shoes')
            expect(second_shoes).toBeInTheDocument()

        });
    })
})