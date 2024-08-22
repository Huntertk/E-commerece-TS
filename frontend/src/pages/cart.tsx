import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId:"98aw7d98aw4d",
    photo:"https://m.media-amazon.com/images/I/618d5bS2lUL._SX679_.jpg",
    name:"Macbook",
    price:3000,
    quantity:3,
    stock:10

  }
];

const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subtotal + tax + shippingCharges;

const Cart = () => {
  const [coupounCode, setCoupounCode] = useState<string>("")
  const [isValidCoupounCode, setIsValidCoupounCode] = useState<boolean>(false)

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(Math.random() > 0.5){
        setIsValidCoupounCode(true)
      } else {
        setIsValidCoupounCode(false)
      }
      
    },1000)
    
    return () => {
      clearTimeout(timeOutId)
      setIsValidCoupounCode(false)
    }
  },[coupounCode])

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? cartItems.map((i, idx) => (
          <CartItem key={idx} cartItem={i} />
        )) : <h1>No Items Added</h1>}
      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>Total : ₹{total}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>          
        </p>
        <p>
          <b>Total : ₹{total} </b>
        </p>
        <input 
        type="text" 
        placeholder="Coupoun Code" 
        value={coupounCode} onChange={(e) => setCoupounCode(e.target.value)} 
        />
        {coupounCode && (
            isValidCoupounCode ? (
              <span className="green">₹ {discount} off using the <code>{coupounCode}</code></span>
            ) : 
            <span className="red">Invalid Coupoun <VscError /></span>
          ) 
        }

        {
          cartItems.length > 0 && <Link to="/shipping"> Checkout</Link>
        }
      </aside>
    </div>
  )
}

export default Cart