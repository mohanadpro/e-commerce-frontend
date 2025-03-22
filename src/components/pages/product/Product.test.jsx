import React from 'react'
import { it, expect, describe } from 'vitest' 
import { fireEvent, render, screen } from '@testing-library/react';
import { Product } from './Product';
import NavBar from '../navbar/NavBar';
import { BrowserRouter } from 'react-router-dom';


describe('Test Product', ()=>{
    it('Test render product image', ()=>{
        const product = {name: 'Product 1', price: 26, Color: 'White', Size: 'Gender', image:'/src/assets/images/default_profile_qdjgyp.WebP'}
        render(<Product product={product}/>)
        const image = screen.getByAltText('product');
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', '/src/assets/images/default_profile_qdjgyp.WebP')
    })
    it('Test render product name', ()=>{
        const product = {name: 'Product 1', price: 26, Color: 'White', Size: 'Gender', image:'/src/assets/images/default_profile_qdjgyp.WebP'}
        render(<Product product={product}/>)
        const name = screen.getByText('Product 1');
        expect(name).toBeInTheDocument()
    })
    it('Test render product price', ()=>{
        const product = {name: 'Product 1', price: 26, Color: 'White', Size: 'Gender', image:'/src/assets/images/default_profile_qdjgyp.WebP'}
        render(<Product product={product}/>)
        const price = screen.getByTestId('price')
        expect(price).toBeInTheDocument()
        expect(price).toHaveTextContent('26$')
    })

    it('Test render product color', ()=>{
        const product = {name: 'Product 1', price: 26, color: 'White', size: 'XL', image:'/src/assets/images/default_profile_qdjgyp.WebP'}
        render(<Product product={product}/>)
        const color = screen.getByTestId('color')
        expect(color).toBeInTheDocument()
        expect(color).toHaveTextContent('White')
    })
    it('Test render product size', ()=>{
        const product = {name: 'Product 1', price: 26, color: 'White', size: 'XL', image:'/src/assets/images/default_profile_qdjgyp.WebP'}
        render(<Product product={product}/>)
        const size = screen.getByTestId('size')
        expect(size).toBeInTheDocument()
        expect(size).toHaveTextContent('XL')
    })
    it('Test render select count', ()=>{
        const product = {name: 'Product 1', price: 26, color: 'White', size: 'XL', image:'/src/assets/images/default_profile_qdjgyp.WebP'}
        render(<Product product={product}/>)
        const count = screen.getByTestId('select-count')
        expect(count).toBeInTheDocument()
        expect(count).toHaveTextContent('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25');
    })
    it('Test select count of product', ()=>{
        const product = {name: 'Product 1', price: 26, color: 'White', size: 'XL', image:'/src/assets/images/default_profile_qdjgyp.WebP'}
        render(<Product product={product}/>)
        const count = screen.getByTestId('select-count')
        fireEvent.change(count, { target: { value: '2' } });
        expect(count).toHaveValue('2');

        fireEvent.change(count, { target: { value: '25' } });
        expect(count).toHaveValue('25');
    })


    it('Test add product to cart', async()=>{
        const product = {id:0, name: 'Product 1', price: 26, color: 'White', size: 'XL', image:'/src/assets/images/default_profile_qdjgyp.WebP'}
        render(
            <BrowserRouter>
                <CartProvider value={[]}>
                    <NavBar/>
                    <Product product={product}/>
                </CartProvider>
            </BrowserRouter>)

        const count = screen.getByTestId('select-count')
        fireEvent.change(count, { target: { value: '2' } });
        expect(count).toHaveValue('2');

        const selected_product = screen.getByTestId('add-product')
        fireEvent.click(selected_product)

        const shopping_cart = screen.getByTestId('shopping-cart')
        expect(shopping_cart).toBeInTheDocument()
        expect(shopping_cart).toHaveTextContent('1')
    })

    it('Test add another product to cart', async()=>{
        const product = {id:1, name: 'Product 2', price: 26, color: 'White', size: 'XL', image:'/src/assets/images/default_profile_qdjgyp.WebP'}
        const cart = [product]
        render(
            <BrowserRouter>
                <CartProvider value={cart}>
                    <NavBar/>
                    <Product product={product}/>
                </CartProvider>
            </BrowserRouter>)

        const count = screen.getByTestId('select-count')
        fireEvent.change(count, { target: { value: '2' } });
        expect(count).toHaveValue('2');

        const selected_product = screen.getByTestId('add-product')
        fireEvent.click(selected_product)

        const shopping_cart = screen.getByTestId('shopping-cart')
        expect(shopping_cart).toBeInTheDocument()
        expect(shopping_cart).toHaveTextContent('2')
    })
})