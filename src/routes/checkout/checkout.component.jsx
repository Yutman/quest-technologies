import {useContext} from 'react';

import {CartContext} from '../../contexts/cart.context';

import './checkout.styles.scss';


const Checkout = () => {
    const {cartItems, addItemToCart, removeItemFromCart} = useContext(CartContext);


    return(
        <div className='checkout-container'>
            <div className='checkout-header'> 
                <div className='header-block'>
                    
                </div>
                <div className='header-block'>
                </div>
                <div className='header-block'>
                </div>
                <div className='header-block'>
                </div>
                <div className='header-block'>
                </div>
            </div>
            <h1>Checkout Page</h1>
            <div>
                {
                cartItems.map((cartItem) => {
                        const {name, id, quantity} = cartItem;
                    return ( 
                            <div key={id}>
                        <h2>{name}</h2>
                        <span>{quantity}</span>
                        <br/>
                        <span onClick={() => removeItemFromCart(cartItem)}>decrement</span>
                        <br/>
                        <span onClick={() => addItemToCart(cartItem)}>increment</span>
                        <br/>
                            </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Checkout;