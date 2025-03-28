import React from 'react'
import { it, expect, describe } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Profile } from './Profile';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Product } from '../product/Product';
import { Products } from '../product/Products';
describe('Test Profile Form', ()=>{

    it('Check if profile image exists', ()=>{
        render(<BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const image = screen.getByAltText('Profile')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', '/src/assets/images/default_profile_qdjgyp.WebP')
        expect(image).toHaveAttribute('width', '200px')
        expect(image).toHaveAttribute('height', '200px')
    })
    it('Check if textfield with Username label exists and customer is able to type in', async() => {
        render(
        <BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const username = screen.getByLabelText('Username');
        expect(username).toBeInTheDocument()
        expect(username).toHaveAttribute('type', 'text')
        await userEvent.type(username, 'Mohanad');
        expect(username).toHaveValue('Mohanad');
    })

    it('Check if textfield with Email label has type email exists and customer is able to type in', async()=>{
        render(<BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const Email = screen.getByLabelText('Email');
        expect(Email).toBeInTheDocument()
        expect(Email).toHaveAttribute('type', 'email');
        await userEvent.type(Email, 'mohanad.13.93@gmail.com');
        expect(Email).toHaveValue('mohanad.13.93@gmail.com')
    })

    it("Check if textfield with Name label exists and customer is able to type in",async ()=>{
        render(<BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const Name = screen.getByLabelText('Name');
        expect(Name).toBeInTheDocument()
        expect(Name).toHaveAttribute('type', 'text')

        await userEvent.type(Name, 'Mohanad Dahi')
        expect(Name).toHaveValue('Mohanad Dahi')
    })

    it("Check if textfield with Country label exists and customer is able to type in", async ()=>{
        render(<BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const Country = screen.getByLabelText('Country');
        expect(Country).toBeInTheDocument()
        expect(Country).toHaveAttribute('type', 'text')
        await userEvent.type(Country, 'Germany')
        expect(Country).toHaveValue('Germany')
    })

    it("Check if textfield with City label exists and customer is able to type in" , async()=>{
        render(<BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const City = screen.getByLabelText('City');
        expect(City).toBeInTheDocument()
        expect(City).toHaveAttribute('type', 'text')

        await userEvent.type(City, 'Berlin')
        expect(City).toHaveValue('Berlin')
    })
    it("Check if textfield with State label exists and customer is able to type in", async()=>{
        render(<BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const State = screen.getByLabelText('State');
        expect(State).toBeInTheDocument()
        expect(State).toHaveAttribute('type', 'text')
        await userEvent.type(State, 'Berlin')
        expect(State).toHaveValue('Berlin')
    })
    it("Check if textfield with Zip label exists and customer is able to type in", async()=>{
        render(<BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const Zip = screen.getByLabelText('Zip Code');
        expect(Zip).toBeInTheDocument()
        expect(Zip).toHaveAttribute('type', 'text')
        await userEvent.type(Zip, '1423')
        expect(Zip).toHaveValue('1423')
    })
    it("Check if textfield with Street label exists and customer is able to type in",async ()=>{
        render(<BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const Street = screen.getByLabelText('Street');
        expect(Street).toBeInTheDocument()
        expect(Street).toHaveAttribute('type', 'text')
        await userEvent.type(Street, 'My Street')
        expect(Street).toHaveValue('My Street')
    })
    it("Check if textfield with Street Number label exists and customer is able to type in",async ()=>{
        render(<BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const Street_number = screen.getByLabelText('Street Number');
        expect(Street_number).toBeInTheDocument()
        expect(Street_number).toHaveAttribute('type', 'number')
        await userEvent.type(Street_number, '432')
        expect(Street_number).toHaveValue(432)
    })

    it("Check update button exists",async ()=>{
        render(<BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('Update')
    })

    it("Test get customer profile info when open click profile link",async ()=>{
        // To be able to test you have to refresh token in vitest.config.js file

        render(<MemoryRouter initialEntries={['/profile/29']}>
                <Routes>
                    {/* isTesting is boolean variable to execute testing api by adding Authentication token */}
                    <Route path="/profile/:id" element={<Profile isTesting={true}/>} />
                </Routes>
            </MemoryRouter>)
        
        const username = screen.getByLabelText('Username');
        const email = screen.getByLabelText('Email');
        const name = screen.getByLabelText('Name');
        const country = screen.getByLabelText('Country');
        const city = screen.getByLabelText('City');
        const state = screen.getByLabelText('State');
        const zip_code = screen.getByLabelText('Zip Code');
        const Street_number = screen.getByLabelText('Street Number');
        await waitFor(()=>{
            expect(username).toHaveValue('user9')
            expect(email).toHaveValue('mohanad.13.93@gmail.com')
            expect(name).toHaveValue('Mohanad Dahi')
            expect(country).toHaveValue('Germany')
            expect(city).toHaveValue('Berlin')
            expect(state).toHaveValue('Berlin')
            expect(zip_code).toHaveValue('12051')
            expect(Street_number).toHaveValue(26)
        })
    })

    it("Test update profile info",async ()=>{
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
        
        const Street_number = screen.getByLabelText('Street Number');
        fireEvent.change( Street_number, { target: { value: 26}})


        const update_button = screen.getByRole('button')
        fireEvent.click(update_button)

        await waitFor(()=>{
            const products_page = screen.getByTestId('products-page')
            expect(products_page).toBeInTheDocument()
        })

    })
})