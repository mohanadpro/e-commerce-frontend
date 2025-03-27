import React from 'react'
import { it, expect, describe, vi } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Checkout } from './Checkout';
import { CartProvider } from '../../../contexts/CartContext';
import { AddressProvider } from '../../../contexts/AddressContext';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import userEvent from '@testing-library/user-event';
import { PaymentMethod } from '../paymnets/PaymentMethod';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Profile } from '../profile/Profile'
import { Products } from '../product/Products'
describe('Test Checkout', ()=>{
    it('Test render order details step', ()=>{
        render(
        <CartProvider value={[]}>
            <Checkout/>
        </CartProvider>
        )
        const order_details_step = screen.getByTestId('order-details-step')
        expect(order_details_step).toBeInTheDocument()
    })
    it('Test render addess details step', ()=>{
        render(<CartProvider value={[]}>
            <Checkout/>
        </CartProvider>)
        const address_details_step = screen.getByTestId('address-details-step')
        expect(address_details_step).toBeInTheDocument()
    })
    it('Test render payment step', ()=>{
        render(
            <CartProvider value={[]}>
            <Checkout/>
        </CartProvider>
        )
        const payment_step = screen.getByTestId('payment-step')
        expect(payment_step).toBeInTheDocument()
    })

    it('Test render next button', ()=>{
        render(
            <CartProvider value={[]}>
            <Checkout/>
        </CartProvider>
        )
        const next_button = screen.getByTestId('next-button')
        expect(next_button).toBeInTheDocument()
    })

    it('Test press next button when customer has an address ',async ()=>{
        const currentUser = {pk:29, username:'user9'}
        render(
            <CartProvider value={[]}>
                <AddressProvider  value={null}>
                    <CurrentUserContext value={currentUser}>
                        <Checkout isTesting={true}/>
                    </CurrentUserContext>
            </AddressProvider>
        </CartProvider>
        )
        const next_button = screen.getByTestId('next-button')
        fireEvent.click(next_button)

        const customer_address =await screen.findByTestId('customer-address')
        expect(customer_address).toBeInTheDocument()
        fireEvent.click(next_button)
    })

    it('Test press next button when customer to show pay methods',async ()=>{
       const cart = [
            {
                'product': 1,
                'name': 'Test',
                'count': 3,
                'image': 'test',
                'price': 25,
                'total_price': 75 
            },
            {
                'product': 2,
                'name': 'Test 2',
                'count': 1,
                'image': 'test',
                'price': 12,
                'total_price': 12 
            }
        ] 
        const currentUser = {pk:29, username:'user9'}
        render(
            <BrowserRouter>
                <CartProvider value={cart}>
                    <AddressProvider  value={null}>
                        <CurrentUserContext value={currentUser}>
                            <Checkout isTesting={true}/>
                        </CurrentUserContext>
                </AddressProvider>
            </CartProvider>
        </BrowserRouter>
        )

        const next_button = screen.getByTestId('next-button')

        fireEvent.click(next_button)
        
        const customer_address = await screen.findByTestId('customer-address')

        expect(customer_address).toBeInTheDocument()

        await waitFor(()=>{

            fireEvent.click(next_button)

            const payment_methods = screen.getByTestId('payment_methods')

            expect(payment_methods).toBeInTheDocument()

        })
    })

    it("Test update profile info,remove country field to test checkout if customer doesn't have shipping",async ()=>{
        // To be able to test you have to refresh token in vitest.config.js file

        render(<MemoryRouter initialEntries={['/profile/29']}>
                <Routes>
                    {/* isTesting is boolean variable to execute testing api by adding Authentication token */}
                    <Route path="/profile/:id" element={<Profile isTesting={true}/>} />
                    <Route path="/products" element={<Products/>} />
                </Routes>
            </MemoryRouter>)
        
        // try to change any value from provided values to see that the profile is updated successfully
        const name = screen.getByLabelText('Name');
        fireEvent.change( name, { target: { value : 'Mohanad Dahi'}})
        
        const email = screen.getByLabelText('Email');
        fireEvent.change( email, { target: { value : 'mohanad.13.93@gmail.com'}})

        const country = screen.getByLabelText('Country');
        fireEvent.change( country, { target: { value : ''}})
        
        const city = screen.getByLabelText('City');
        fireEvent.change( city, { target: { value : 'Berlin'}})
        
        const state = screen.getByLabelText('State');
        fireEvent.change( state, { target: { value : 'Berlin'}})
        
        const zip_code = screen.getByLabelText('Zip Code');
        fireEvent.change( zip_code, { target: { value: '12051'}})
        
        const Street_number = screen.getByLabelText('Street Number');
        fireEvent.change( Street_number, { target: { value: 26}})

        const update_button = screen.getByRole('button')
        fireEvent.click(update_button)
        const products_page = await screen.findByTestId('products-page')
        expect(products_page).toBeInTheDocument()
    })


    it("Test press next button when customer doesn not have an address ",async ()=>{
        const currentUser = {pk:29, username:'user9'}
        render(
            <BrowserRouter>
                <CartProvider value={[]}>
                    <AddressProvider  value={null}>
                        <CurrentUserContext value={currentUser}>
                            <Checkout isTesting={true}/>
                        </CurrentUserContext>
                </AddressProvider>
            </CartProvider>
        </BrowserRouter>
        )
        const next_button = screen.getByTestId('next-button')
        fireEvent.click(next_button)

        const customer_address =await screen.findByTestId('add-shipping-address')
        expect(customer_address).toBeInTheDocument()
    })

    it("Test update profile info with full data",async ()=>{
        // To be able to test you have to refresh token in vitest.config.js file

        render(<MemoryRouter initialEntries={['/profile/29']}>
                <Routes>
                    {/* isTesting is boolean variable to execute testing api by adding Authentication token */}
                    <Route path="/profile/:id" element={<Profile isTesting={true}/>} />
                    <Route path="/products" element={<Products/>} />
                </Routes>
            </MemoryRouter>)
        
        // try to change any value from provided values to see that the profile is updated successfully
        const name = screen.getByLabelText('Name');
        fireEvent.change( name, { target: { value : 'Mohanad Dahi'}})
        
        const email = screen.getByLabelText('Email');
        fireEvent.change( email, { target: { value : 'mohanad.13.93@gmail.com'}})

        const country = screen.getByLabelText('Country');
        fireEvent.change( country, { target: { value : 'Germany'}})
        
        const city = screen.getByLabelText('City');
        fireEvent.change( city, { target: { value : 'Berlin'}})
        
        const state = screen.getByLabelText('State');
        fireEvent.change( state, { target: { value : 'Berlin'}})
        
        const zip_code = screen.getByLabelText('Zip Code');
        fireEvent.change( zip_code, { target: { value: '12051'}})
        
        const Street = screen.getByLabelText('Street');
        fireEvent.change( Street, { target: { value: 'Emser Str.'}})

        const Street_number = screen.getByLabelText('Street Number');
        fireEvent.change( Street_number, { target: { value: 26}})

        const update_button = screen.getByRole('button')
        fireEvent.click(update_button)
        const products_page = await screen.findByTestId('products-page')
        expect(products_page).toBeInTheDocument()
    })
})