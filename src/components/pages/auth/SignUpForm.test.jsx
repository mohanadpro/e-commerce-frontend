import React from 'react'
import { it, expect, describe, vi } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CurrentUserProvider } from '../../../contexts/CurrentUserContext';
import userEvent from '@testing-library/user-event';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm'
import { Products } from '../product/Products';


describe('Test Sign up form',()=>{
    it('Test render username textfield and type in', async ()=>{
        render(<BrowserRouter>
            <SignUpForm/>
        </BrowserRouter>)
        const usernameTextfield= screen.getByTestId('username_signup')
        expect(usernameTextfield).toBeInTheDocument()
        expect(usernameTextfield).toHaveAttribute('type', 'text')
        await userEvent.type(usernameTextfield, 'username1')
        expect(usernameTextfield).toHaveValue('username1')
    })

    it('Test render password textfield and type in ', async()=>{
        render(<BrowserRouter>
            <SignUpForm/>
        </BrowserRouter>)
        const passwordTextfield = screen.getByTestId('password1_signup')
        expect(passwordTextfield).toBeInTheDocument()
        expect(passwordTextfield).toHaveAttribute('type', 'password')
        await userEvent.type(passwordTextfield,'12324')
        expect(passwordTextfield).toHaveValue('12324')
    })

    it('Test render confirm password textfield and type in ', async()=>{
        render(<BrowserRouter>
            <SignUpForm/>
        </BrowserRouter>)
        const passwordTextfield = screen.getByTestId('password2_signup')
        expect(passwordTextfield).toBeInTheDocument()
        expect(passwordTextfield).toHaveAttribute('type', 'password')
        await userEvent.type(passwordTextfield,'12324')
        expect(passwordTextfield).toHaveValue('12324')
    })

    it('Test render sign in link ', ()=>{
        render(<BrowserRouter>
            <SignUpForm onSignIn={vi.fn()}/>
            <Routes>
                <Route path='/signin' element={<SignInForm/>}/>
            </Routes>
        </BrowserRouter>)
        const signin_link = screen.getByTestId('signin-link')
        expect(signin_link).toBeInTheDocument()
        fireEvent.click(signin_link)
        const signin_page = screen.getByTestId('signin-page')
        expect(signin_page).toBeInTheDocument()
    })
    it('Test render sign in button ', ()=>{
        render(<BrowserRouter>
            <SignUpForm onSignIn={vi.fn()}/>
        </BrowserRouter>)
        const signin_button = screen.getByTestId('signup-button')
        expect(signin_button).toBeInTheDocument()
        expect(signin_button).toHaveTextContent('Sign up')
    })
    it('Test click on sign up button when empty data',async ()=>{
        render(<BrowserRouter>
            <SignUpForm onSignIn={vi.fn()}/>
        </BrowserRouter>)
        const signup_button = screen.getByTestId('signup-button')
        fireEvent.click(signup_button)
        const message =await screen.findAllByText(/This field may not be blank./i)
        expect(message.length).toBeGreaterThanOrEqual(1);
    })

    it('Test click on sign up button when credentials has short password',async ()=>{
        render(<BrowserRouter>
            <SignUpForm onSignIn={vi.fn()}/>
        </BrowserRouter>)
        const usernameTextfield= screen.getByTestId('username_signup')
        const passwordTextfield = screen.getByTestId('password1_signup')
        const confirmPasswordTextfield = screen.getByTestId('password2_signup')
        fireEvent.change(usernameTextfield, { target: { value: 'testusername' } });
        fireEvent.change(passwordTextfield, { target: { value: '123' } });
        fireEvent.change(confirmPasswordTextfield, { target: { value: '123' } });
        const signup_button = screen.getByTestId('signup-button')
        fireEvent.click(signup_button)
        const message =await screen.findAllByText(/This password is too short/i)
        expect(message.length).toBeGreaterThanOrEqual(1)
    })
    
    it('Test click on sign up button when password and confirm password field did not match',async ()=>{
        render(<BrowserRouter>
            <SignUpForm onSignIn={vi.fn()}/>
        </BrowserRouter>)
        const usernameTextfield= screen.getByTestId('username_signup')
        const passwordTextfield = screen.getByTestId('password1_signup')
        const confirmPasswordTextfield = screen.getByTestId('password2_signup')
        fireEvent.change(usernameTextfield, { target: { value: 'testusername' } });
        fireEvent.change(passwordTextfield, { target: { value: 'Test@543' } });
        fireEvent.change(confirmPasswordTextfield, { target: { value: 'Test@123' } });
        const signup_button = screen.getByTestId('signup-button')
        fireEvent.click(signup_button)
        const message =await screen.findByText(/The two password fields didn't match./i)
        expect(message).toBeInTheDocument()
    })

    it('Test click on sign up button when username is already exists',async ()=>{
        render(<BrowserRouter>
            <SignUpForm onSignIn={vi.fn()}/>
        </BrowserRouter>)
        const usernameTextfield= screen.getByTestId('username_signup')
        const passwordTextfield = screen.getByTestId('password1_signup')
        const confirmPasswordTextfield = screen.getByTestId('password2_signup')
        fireEvent.change(usernameTextfield, { target: { value: 'user9' } });
        fireEvent.change(passwordTextfield, { target: { value: 'Test@543' } });
        fireEvent.change(confirmPasswordTextfield, { target: { value: 'Test@543' } });
        const signup_button = screen.getByTestId('signup-button')
        fireEvent.click(signup_button)
        const message =await screen.findByText(/A user with that username already exists./i)
        expect(message).toBeInTheDocument()
    })

    it('Test click on sign up button when all provided data is correct',async ()=>{
        render(<BrowserRouter>
                <SignUpForm onSignIn={vi.fn()}/>
                <Routes>
                    <Route path='/signin' element={<SignInForm/>}/>
                </Routes>
        </BrowserRouter>)
        const usernameTextfield= screen.getByTestId('username_signup')
        const passwordTextfield = screen.getByTestId('password1_signup')
        const confirmPasswordTextfield = screen.getByTestId('password2_signup')
        fireEvent.change(usernameTextfield, { target: { value: 'user10' } });
        fireEvent.change(passwordTextfield, { target: { value: 'Test@543' } });
        fireEvent.change(confirmPasswordTextfield, { target: { value: 'Test@543' } });
        const signup_button = screen.getByTestId('signup-button')
        fireEvent.click(signup_button)
        const signup_page = screen.getByTestId('signin-page')
        expect(signup_page).toBeInTheDocument()
    })
})