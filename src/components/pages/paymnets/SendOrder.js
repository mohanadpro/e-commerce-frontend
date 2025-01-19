import toast from "react-hot-toast";
import axios from "axios";

export const SendOrderToServer = async(amount, Cart, setCart, currentUser, delivery_place, setAddress, navigate)=>{
    const formData = new FormData();
    formData.append('cart', JSON.stringify(Cart));
    formData.append('total_price', amount)
    delete delivery_place.image
    delete delivery_place.created_at
    delete delivery_place.updated_at
    formData.append('delivery_place', JSON.stringify(delivery_place))
    formData.append('customer', currentUser.pk)
    axios.post('orders/',formData).then(res=>{
        setCart([])
        setAddress({})
        toast.success('Your order has been done successfully... ', {duration:4000})
        navigate('/products')

    })
    .catch(err=>{

    });

    }
