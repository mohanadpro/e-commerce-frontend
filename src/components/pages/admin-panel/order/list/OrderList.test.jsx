import React from 'react'
import { it, expect, describe } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { OrderList } from './OrderList';
import { toast } from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
    toast: {
      success: vi.fn(), // Mock success toast
      error: vi.fn(),   // Mock error toast (if needed)
    },
  }));

describe('Test Order List', ()=>{
    //  To execute this file you have to update REACT_ADMIN_TOKEN in the vitest.config.js
    it('Test render List Orders Text', async ()=>{
        render(
        <BrowserRouter>
            <OrderList isTesting={true}/>
        </BrowserRouter>
        )
        const order_list_text = screen.getByText('List Orders')
        expect(order_list_text).toBeInTheDocument()
    })

    it('Test render orders table from server', async ()=>{
        render(
        <BrowserRouter>
            <OrderList isTesting={true}/>
        </BrowserRouter>
        )
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText('Created At')).toBeInTheDocument()
        expect(screen.getByText('Total Price')).toBeInTheDocument()
        expect(screen.getByText('Customer')).toBeInTheDocument()
        expect(screen.getByText('Delivery Place')).toBeInTheDocument()

        await waitFor(()=>{
            expect(screen.getByText('22')).toBeInTheDocument()
            expect(screen.getByText('459')).toBeInTheDocument()
        })
    })

})