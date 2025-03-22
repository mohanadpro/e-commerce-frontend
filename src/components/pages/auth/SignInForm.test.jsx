import React from 'react'
import { it, expect, describe, vi } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CurrentUserProvider } from '../../../contexts/CurrentUserContext';
import SignInForm from './SignInForm';
import userEvent from '@testing-library/user-event';
import SignUpForm from './SignUpForm';
import { Products } from '../product/Products';
import { AdminMainPage } from '../admin-panel/main-page/AdminMainPage';
import { CartProvider } from '../../../contexts/CartContext';


describe('Test Sign in form',()=>{
    it('Test render username textfield and type in', async ()=>{
        render(<BrowserRouter>
            <SignInForm/>
        </BrowserRouter>)
        const usernameTextfield= screen.getByTestId('username')
        expect(usernameTextfield).toBeInTheDocument()
        expect(usernameTextfield).toHaveAttribute('type', 'text')
        await userEvent.type(usernameTextfield, 'username1')
        expect(usernameTextfield).toHaveValue('username1')
    })

    it('Test render password textfield and type in ', async()=>{
        render(<BrowserRouter>
            <SignInForm/>
        </BrowserRouter>)
        const passwordTextfield = screen.getByTestId('password')
        expect(passwordTextfield).toBeInTheDocument()
        expect(passwordTextfield).toHaveAttribute('type', 'password')
        await userEvent.type(passwordTextfield,'12324')
        expect(passwordTextfield).toHaveValue('12324')
    })
    it('Test render sign up link ', ()=>{
        render(<BrowserRouter>
            <SignInForm onSignIn={vi.fn()}/>
            <Routes>
                <Route path='/signup' element={<SignUpForm/>}/>
            </Routes>
        </BrowserRouter>)
        const signup_link = screen.getByTestId('signup-link')
        expect(signup_link).toBeInTheDocument()
        fireEvent.click(signup_link)
        const signup_page = screen.getByTestId('signup-page')
        expect(signup_page).toBeInTheDocument()
    })
    it('Test render sign in button ', ()=>{
        render(<BrowserRouter>
            <SignInForm onSignIn={vi.fn()}/>
        </BrowserRouter>)
        const signin_button = screen.getByTestId('signin-button')
        expect(signin_button).toBeInTheDocument()
        expect(signin_button).toHaveTextContent('Sign in')
    })
    it('Test click on sign in button when empty data',async ()=>{
        render(<BrowserRouter>
            <SignInForm onSignIn={vi.fn()}/>
        </BrowserRouter>)
        const signin_button = screen.getByTestId('signin-button')
        fireEvent.click(signin_button)
        const message =await screen.findByText(/This field may not be blank/i)
        expect(message).toBeInTheDocument()
    })

    it('Test click on sign in button when sign in data is empty',async ()=>{
        render(<BrowserRouter>
            <SignInForm onSignIn={vi.fn()}/>
        </BrowserRouter>)
        const signin_button = screen.getByTestId('signin-button')
        fireEvent.click(signin_button)
        const message =await screen.findByText(/This field may not be blank/i)
        expect(message).toBeInTheDocument()
    })

    it('Test click on sign in button when credential is not correct',async ()=>{
        render(<BrowserRouter>
            <SignInForm onSignIn={vi.fn()}/>
        </BrowserRouter>)
        const usernameTextfield= screen.getByTestId('username')
        const passwordTextfield = screen.getByTestId('password')

        fireEvent.change(usernameTextfield, { target: { value: 'wrongusername' } });
        fireEvent.change(passwordTextfield, { target: { value: 'wrongpassword' } });
        
        const signin_button = screen.getByTestId('signin-button')
        fireEvent.click(signin_button)
        const message =await screen.findByText(/Unable to log in with provided credentials./i)
        expect(message).toBeInTheDocument()
    })

    it('Test click on sign in button when credential is normal user',async ()=>{
        render(<BrowserRouter>
                <CurrentUserProvider value={{}}>
                    <SignInForm onSignIn={vi.fn()}/>
                    <Routes>
                        <Route path='/products' element={<Products/>}/>
                    </Routes>
                </CurrentUserProvider>
        </BrowserRouter>)
        const usernameTextfield= screen.getByTestId('username')
        const passwordTextfield = screen.getByTestId('password')

        fireEvent.change(usernameTextfield, { target: { value: 'user9' } });
        fireEvent.change(passwordTextfield, { target: { value: 'Mohanad@123' } });
        
        const signin_button = screen.getByTestId('signin-button')
        fireEvent.click(signin_button)
        const product_page =await screen.findByTestId('products-page')
        expect(product_page).toBeInTheDocument()
    })
    
    it('Test click on sign in button when credential is admin user',async ()=>{
        render(<BrowserRouter>
                <CurrentUserProvider value={{}}>
                    <CartProvider value={[]}>
                        <SignInForm onSignIn={vi.fn()}/>
                        <Routes>
                            <Route path='/admin' element={<AdminMainPage/>}/>
                        </Routes>
                    </CartProvider>
                </CurrentUserProvider>
        </BrowserRouter>)
        const usernameTextfield= screen.getByTestId('username')
        const passwordTextfield = screen.getByTestId('password')

        fireEvent.change(usernameTextfield, { target: { value: 'mohanad' } });
        fireEvent.change(passwordTextfield, { target: { value: 'Mohanad@123' } });

        const signin_button = screen.getByTestId('signin-button')
        fireEvent.click(signin_button)
        const product_page =await screen.findByTestId('admin-page')
        expect(product_page).toBeInTheDocument()
    })
})