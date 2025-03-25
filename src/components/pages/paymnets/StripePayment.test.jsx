import React from 'react'
import { it, expect, describe } from 'vitest' 
import { render, screen } from '@testing-library/react';
import { StripePayment } from './StripePayment';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';


describe('Test Stripe Payment', ()=>{
    it('Test render Master card word ', ()=>{
        render(
        <BrowserRouter>
            <StripePayment/>
        </BrowserRouter>
        )
        const master_card = screen.getByText('Master card')
        expect(master_card).toBeInTheDocument()
    })
    it('Test render Visa card word ', ()=>{
        render(
        <BrowserRouter>
            <StripePayment/>
        </BrowserRouter>
        )
        const visa_card = screen.getByText('Visa card')
        expect(visa_card).toBeInTheDocument()
    })

    it('Test render Card Number and type in', async ()=>{
        render(
        <BrowserRouter>
            <StripePayment/>
        </BrowserRouter>
        )
        const card_number = screen.getByTestId('card_number')
        expect(card_number).toHaveAttribute('type', 'text')
        expect(card_number).toBeInTheDocument()
        await userEvent.type(card_number, '4234');
        expect(card_number).toHaveValue('4234')
    })
    it('Test render expire month and type in', async ()=>{
        render(
        <BrowserRouter>
            <StripePayment/>
        </BrowserRouter>
        )
        const exp_month = screen.getByTestId('exp_month')
        expect(exp_month).toHaveAttribute('type', 'text')
        expect(exp_month).toBeInTheDocument()
        await userEvent.type(exp_month, '01');
        expect(exp_month).toHaveValue('01')
    })
    it('Test render expire month and type in', async ()=>{
        render(
        <BrowserRouter>
            <StripePayment/>
        </BrowserRouter>
        )
        const exp_year = screen.getByTestId('exp_year')
        expect(exp_year).toHaveAttribute('type', 'text')
        expect(exp_year).toBeInTheDocument()
        await userEvent.type(exp_year, '05');
        expect(exp_year).toHaveValue('05')
    })
    it('Test render cvv and type in', async ()=>{
        render(
        <BrowserRouter>
            <StripePayment/>
        </BrowserRouter>
        )
        const cvv = screen.getByTestId('cvv')
        expect(cvv).toHaveAttribute('type', 'text')
        expect(cvv).toBeInTheDocument()
        await userEvent.type(cvv, '123');
        expect(cvv).toHaveValue('123')
    })
    it('Test render pay button and type in', async ()=>{
        render(
        <BrowserRouter>
            <StripePayment amount={90}/>
        </BrowserRouter>
        )
        const master_card = screen.getByTestId('pay_button')
        expect(master_card).toBeInTheDocument()
        expect(master_card).toHaveTextContent('Pay 90$')
    })
    
})