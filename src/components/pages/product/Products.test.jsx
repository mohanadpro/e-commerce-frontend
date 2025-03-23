import React from 'react'
import { it, expect, describe } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Products } from './Products';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserProvider } from '../../../contexts/CurrentUserContext';
import { CartProvider } from '../../../contexts/CartContext';
import { ProductProvider } from '../../../contexts/ProductContext';


describe('Test Products', ()=>{

    it('Getting products', async()=>{
    render(<BrowserRouter>
            <CurrentUserProvider>
                <CartProvider value={[]}>
                    <ProductProvider value={[]}>
                        <Products />
                    </ProductProvider>
                </CartProvider>
            </CurrentUserProvider>
        </BrowserRouter>);

        await waitFor(() => {
            // You might want to display an error message or something else in your component
            expect(screen.queryByText('Cargo Pants')).toBeInTheDocument();
            expect(screen.queryByText('Unisex 69 black')).toBeInTheDocument();
        });
    })
})