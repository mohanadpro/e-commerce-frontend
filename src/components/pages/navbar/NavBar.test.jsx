import React from 'react'
import { it, expect, describe, vi } from 'vitest' 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import NavBar, { logoutApiCall } from './NavBar';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../../../contexts/CartContext';
import { MainComponent } from '../main_component/MainComponent'
import { Products } from '../product/Products'
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import { Checkout } from '../checkout/Checkout';
import { CurrentUserProvider } from '../../../contexts/CurrentUserContext';
import { Profile } from '../profile/Profile';
import userEvent from '@testing-library/user-event';
import { Order } from '../order/Order';

vi.mock('./NavBar', async (importModule) => {
    const actualModule = await importModule();
    return {
    ...actualModule, // Import everything else normally
    logoutApiCall: vi.fn().mockResolvedValue({ message: 'Logged out successfully' })
    } // Mock the API
});

describe('Test NavBar', ()=>{
    let cart;
    let currentUser;
    beforeAll(() => {
        global.matchMedia = vi.fn().mockImplementation((query) => ({
          matches: false,  // Default mock return value
          media: query,
          addListener: vi.fn(),
          removeListener: vi.fn(),
        }));
      });
      
      afterAll(() => {
        global.matchMedia.mockRestore();
      });


    it('Test render logo icon if user is not logged in', ()=>{
        render(
            <BrowserRouter>
                <NavBar/>
        </BrowserRouter>)
        const logo_icon = screen.getByAltText('logo')
        expect(logo_icon).toBeInTheDocument()
        expect(logo_icon).toHaveAttribute('height', "45")
    })

    it('Test disappear logo icon if user is logged in as admin and when click render products page', ()=>{
        currentUser =  { username: 'test',
            profile_image:'/src/assets/images/default_profile_qdjgyp.WebP',
            first_name: 'mohanad',
            last_name: 'dahi',
            is_admin: true,
            profile_id: 27}
        render(
            <CurrentUserProvider value={currentUser}>
                <MemoryRouter initialEntries={['/']}>
                    <NavBar/>
                </MemoryRouter>
            </CurrentUserProvider>        
    )
        const home_link = screen.queryByAltText('logo')
        expect(home_link).not.toBeInTheDocument()
    })


    it('Test disappear cart icon if user is logged in as admin and when click render products page', ()=>{
        currentUser =  { username: 'test',
            profile_image:'/src/assets/images/default_profile_qdjgyp.WebP',
            first_name: 'mohanad',
            last_name: 'dahi',
            is_admin: true,
            profile_id: 27}
        render(
            <CurrentUserProvider value={currentUser}>
                <MemoryRouter initialEntries={['/']}>
                    <NavBar/>
                </MemoryRouter>
            </CurrentUserProvider>        
    )
        const cart_icon = screen.queryByTestId('cart-link')
        expect(cart_icon).toBeNull()
    })

    it('Test render profile image', async ()=>{
        currentUser =  { username: 'test',
            profile_image:'/src/assets/images/default_profile_qdjgyp.WebP',
            first_name: 'mohanad',
            last_name: 'dahi',
            is_admin: false,
            profile_id: 27}
        render(<CurrentUserProvider value={currentUser}>
                    <MemoryRouter initialEntries={['/']}>
                        <NavBar/>
                    </MemoryRouter>
                </CurrentUserProvider>
            )
        const profile_image = screen.getByTestId('profile_image')
        expect(profile_image).toBeInTheDocument()
    })

    it('Test render username and move to profile page when it is clicked', async ()=>{
        currentUser =  { 
                        username: 'test',
                        profile_image:'/src/assets/images/default_profile_qdjgyp.WebP',
                        first_name: 'mohanad',
                        last_name: 'dahi',
                        is_admin: false,
                        profile_id: 27
                    }
        render(<CurrentUserProvider value={currentUser}>
                    <MemoryRouter initialEntries={['/']}>
                        <NavBar/>
                        <Routes>
                            <Route path='/profile/:id' element={<Profile/>}/>
                        </Routes>
                    </MemoryRouter>
                </CurrentUserProvider>)
        const profile_image = screen.getByTestId('profile_image');
        userEvent.click(profile_image);
        const usernameItem =await screen.findByTestId('username');
        expect(usernameItem).toBeInTheDocument()
        fireEvent.click(usernameItem)
        const profile_page = screen.getByTestId('profile-page')
        expect(profile_page).toBeInTheDocument()
    })


    it('Test render order link if user is logged in as normal user and move to order page when it is clicked', async ()=>{
        currentUser =  { 
                        username: 'test',
                        profile_image:'/src/assets/images/default_profile_qdjgyp.WebP',
                        first_name: 'mohanad',
                        last_name: 'dahi',
                        is_admin: false,
                        profile_id: 27
                    }
        render(<CurrentUserProvider value={currentUser}>
                    <MemoryRouter initialEntries={['/']}>
                        <NavBar/>
                        <Routes>
                            <Route path='/orders/' element={<Order/>}/>
                        </Routes>
                    </MemoryRouter>
                </CurrentUserProvider>)
        const profile_image = screen.getByTestId('profile_image');
        userEvent.click(profile_image);
        const ordersItem =await screen.findByTestId('orders');
        expect(ordersItem).toBeInTheDocument()
        fireEvent.click(ordersItem)
        const orders_page = screen.getByTestId('order-page')
        expect(orders_page).toBeInTheDocument()
    })

    it('Test disappear order link if user logged in as an admin user', async ()=>{
        currentUser =  { 
                        username: 'test',
                        profile_image:'/src/assets/images/default_profile_qdjgyp.WebP',
                        first_name: 'mohanad',
                        last_name: 'dahi',
                        is_admin: true,
                        profile_id: 27
                    }
        render(<CurrentUserProvider value={currentUser}>
                    <MemoryRouter initialEntries={['/']}>
                        <NavBar/>
                        <Routes>
                            <Route path='/orders/' element={<Order/>}/>
                        </Routes>
                    </MemoryRouter>
                </CurrentUserProvider>)
        const profile_image = screen.getByTestId('profile_image');
        userEvent.click(profile_image);
        const ordersItem = screen.queryByTestId('orders');
        expect(ordersItem).not.toBeInTheDocument()
    })

    it('Test render home icon if user is not admin and when click render products page', ()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<MainComponent />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
          </MemoryRouter>        
    )
        const home_link = screen.getByTestId('home-link')
        expect(home_link).toBeInTheDocument()
        fireEvent.click(home_link)
        const product_page = screen.getByTestId('products-page')
        expect(product_page).toBeInTheDocument()
    })

    it('Test disappear home icon if user is logged in as admin and when click render products page', ()=>{
        currentUser =  { username: 'test',
            profile_image:'/src/assets/images/default_profile_qdjgyp.WebP',
            first_name: 'mohanad',
            last_name: 'dahi',
            is_admin: true,
            profile_id: 27}
        render(
            <CurrentUserProvider value={currentUser}>
                <MemoryRouter initialEntries={['/']}>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<MainComponent />} />
                        <Route path="/products" element={<Products />} />
                    </Routes>
                </MemoryRouter>
            </CurrentUserProvider>        
    )
        const home_link = screen.queryByText('home-link')
        expect(home_link).not.toBeInTheDocument()
    })

    it('Test render cart icon and when click render checkout page when user is not logged in',()=>{
        cart = [
            {
                'product': 1,
                'name': 'Test',
                'count': 3,
                'image': 'test',
                'price': 25,
                'total_price': 75 
            }] 
        render(
                <CartProvider value={cart}>  
                  <MemoryRouter initialEntries={['/']}>
                  <NavBar/>
                  <Routes>
                    <Route path="/" element={<MainComponent />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/signin" element={<SignInForm />} />
                  </Routes>
                  </MemoryRouter>
                </CartProvider>
            )
        const cart_link = screen.getByTestId('cart-link')
        expect(cart_link).toBeInTheDocument()
        fireEvent.click(cart_link)
        const checkout_link = screen.getByTestId('signin-page')
        expect(checkout_link).toBeInTheDocument()
    })

    it('Test render cart icon and when click render checkout page when cart has products and user is logged in',()=>{
        cart = [
            {
                'product': 1,
                'name': 'Test',
                'count': 3,
                'image': 'test',
                'price': 25,
                'total_price': 75 
            }] 
        currentUser = { username: 'test', first_name: 'mohanad', last_name: 'dahi' , is_admin: false, profile_id:27}
        render(
            <>
                <CurrentUserProvider value={currentUser}>
                    <CartProvider value={cart}>  
                        <MemoryRouter initialEntries={['/']}>
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<MainComponent />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/signin" element={<SignInForm />} />
                            <Route path="/checkout" element={<Checkout />} />
                        </Routes>
                        </MemoryRouter>
                    </CartProvider>
                </CurrentUserProvider>
            </>
            )
        const cart_link = screen.getByTestId('cart-link')
        expect(cart_link).toBeInTheDocument()
        fireEvent.click(cart_link)
        const checkout_link = screen.getByTestId('checkout-page')
        expect(checkout_link).toBeInTheDocument()
    })

    it('Test render cart icon and when click and the cart is empty, stay in the same page',()=>{
        cart = [] 
        render(
                <CartProvider value={cart}>  
                  <MemoryRouter initialEntries={['/']}>
                  <NavBar/>
                  <Routes>
                    <Route path="/" element={<MainComponent />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/signin" element={<SignInForm />} />
                  </Routes>
                  </MemoryRouter>
                </CartProvider>
            )
        const cart_link = screen.getByTestId('cart-link')
        expect(cart_link).toBeInTheDocument()
        fireEvent.click(cart_link)
        const checkout_link = screen.getByTestId('products-page')
        expect(checkout_link).toBeInTheDocument()
    })

    it('Test render sign in link and when click render sign in page', ()=>{
        render(<MemoryRouter initialEntries={['/']}>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<MainComponent />} />
                    <Route path="/signin" element={<SignInForm />} />
                </Routes>
          </MemoryRouter>)
        const signin_link = screen.getByTestId('signin-link')
        expect(signin_link).toBeInTheDocument()
        fireEvent.click(signin_link)
        const signin_page = screen.getByTestId("signin-page")
        expect(signin_page).toBeInTheDocument()
    })
    it('Test render sign up link and when click render sign up page', ()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<MainComponent />} />
                    <Route path="/signup" element={<SignUpForm />} />
                </Routes>
          </MemoryRouter>)
        const signup_link = screen.getByTestId('signup-link')
        expect(signup_link).toBeInTheDocument()
        fireEvent.click(signup_link)
        const signup_page = screen.getByTestId('signup-page')
        expect(signup_page).toBeInTheDocument()
    })

})