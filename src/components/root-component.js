
import {createBrowserRouter} from 'react-router-dom'
import { MainComponent } from '../components/pages/main_component/MainComponent';
import SignInForm  from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import { Products } from './pages/product/Products';
import { Profile } from './pages/profile/Profile';
import { Order } from './pages/order/Order';
import { Checkout } from './pages/checkout/Checkout';
import { OrderDetails } from './pages/order/OrderDetails';
import { ServerError } from './pages/server_error/ServerError';
import { CategoryList } from './pages/admin-panel/category/list/CategoryList';
import CreateEditCategory from './pages/admin-panel/category/create-edit-category/CreateEditCategory';
import { ProductList } from './pages/admin-panel/product/list/ProductList';
import CreateEditProduct from './pages/admin-panel/product/create-edit-product/CreateEditProduct';
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
            path:'/orders/',
            element:<Order/>,
        },
        {
            path:'orders/:id',
            element:<OrderDetails />   
        },
        {
            path:'checkout',
            element:<Checkout/>
        },
        {
            path:'category',
            element:<CategoryList/>
        },
        {
            path:'product',
            element:<ProductList/>
        },
        {
            path:'create-edit-product',
            element:<CreateEditProduct/>
        },
        {
            path:'category-edit-category',
            element:<CreateEditCategory/>
        },
        {
            path:'server-error',
            element: <ServerError/>
        }
    ]
}])

export default router;