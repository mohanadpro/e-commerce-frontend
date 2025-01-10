
import {createBrowserRouter} from 'react-router-dom'
import { MainComponent } from '../components/pages/main_component/MainComponent';
import SignInForm  from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import { Product } from './pages/product/Product';
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
            element:<Product/>
        }
    ]
}])

export default router;