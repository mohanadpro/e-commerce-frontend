
import {createBrowserRouter} from 'react-router-dom'
import { MainComponent } from '../components/pages/main_component/MainComponent';
import SignInForm  from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import { Products } from './pages/product/Products';
import { Profile } from './pages/profile/Profile';
import { Order } from './pages/order/Order';
import ShoppingCart from './pages/cart/ShoppingCart';
const router=createBrowserRouter([{
    path:'/',
    element:<MainComponent />,
    children:[
        {
            path:'signin',
            element:<SignInForm/>,
            
        },
        {
            path:'signup',
            element:<SignUpForm/>
        },
        {
            path:'products',
            element:<Products/>
        },
        {
            path:'profile/:id',
            element:<Profile/>
        },
        {
            path:'orders/:id',
            element:<Order/>
        },
        {
            path:'cart',
            element:<ShoppingCart/>
        }
    ]
}])

export default router;