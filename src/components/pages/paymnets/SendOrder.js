import toast from "react-hot-toast";
import { axiosRes } from "../../../api/axiosDefault";

export const SendOrderToServer = async(amount, Cart, setCart, currentUser, delivery_place, setAddress, navigate)=>{
    const formData = new FormData();
    const sended_delivery_place =  (delivery_place.name
        + ' ' + delivery_place.country
        + ' ' + delivery_place.zipcode
        + ', ' + delivery_place.city
        + ' ' + delivery_place.street 
        + '. ' + delivery_place.street_number)
    
    formData.append('cart', JSON.stringify(Cart));
    formData.append('total_price', amount)
    delete delivery_place.image
    delete delivery_place.created_at
    delete delivery_place.updated_at
    formData.append('email', delivery_place.email)
    formData.append('delivery_place', sended_delivery_place)
    formData.append('customer', currentUser.pk)
    axiosRes.post('orders/',formData).then(res=>{
        setCart([])
        setAddress({})
        toast.success('Your order has been done successfully... ', {duration:4000})
        navigate('/products')

    }).catch(err=>{
    });

    }
