import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }) {

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
 const [user, setUser] = useState({value: null})
 const [key, setKey] = useState()
  const router = useRouter()
  // To save cart items even after re-loading the window
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.log(error);
      localStorage.clear()
    }
    const token = localStorage.getItem("token")
    if(token){
      setUser({value: token})
      setKey(Math.random())
    }
  }, [router.query])

  const logout = ()=>{
    localStorage.removeItem('token')
    setUser({value : null})
    setKey(Math.random())
  }

  // To save the cart
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }

    setSubTotal(subt)
  }

  // To add items in cart & (When clicked on plus button of specific item)
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant }
    }
    setCart(newCart)
    saveCart(newCart)
  }


  // Buy Now Functionality

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    saveCart({})
    let newCart = {itemCode: { qty: 1, price, name, size, variant }}
    
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }




  // To clear the cart
  const clearCart = () => {
    setCart({})
    saveCart({})
    console.log("Cart has been cleared :)")
  }

  // To remove items from cart - (When clicked on minus button)
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));

    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }

    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }

  return <>
  {key && <Navbar logout={logout} key={key} user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} buyNow={buyNow} />}
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} buyNow={buyNow} />
    <Footer />
  </>
}

export default MyApp
