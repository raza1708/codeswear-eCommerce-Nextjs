/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';

const Navbar = ({logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown, setDropdown] = useState(false)
 
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }

  const ref = useRef()

  return (

    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10'>
      <div className="logo mr-auto md:mx-5">
        <Link href={'/'}>
          <a><Image width={220} height={40} src="/logo.webp" alt="" /></a>
        </Link>

      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link href={'/tshirts'}><a href="#"><li className='hover:text-pink-600'>Tshirts</li></a></Link>
          <Link href={'/hoodies'}><a href="#"><li className='hover:text-pink-600'>Hoodies</li></a></Link>
          <Link href={'/mugs'}><a href="#"><li className='hover:text-pink-600'>Mugs</li></a></Link>
          <Link href={'/stickers'}><a href="#"><li className='hover:text-pink-600'>Stickers</li></a></Link>
        </ul>
      </div>
      <div className="flex items-center absolute cursor-pointer cart right-0 top-4 mx-5">
        <span onMouseOver={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)}>
        
      {dropdown && <div onMouseOver={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)} className="absolute right-8 top-7 px-5 py-4 w-32 rounded-md bg-pink-300">
        <ul>
          <Link href={'/myaccount'}><a><li className='py-1 hover:text-pink-700 text-sm'>My Account</li></a></Link>
          <Link href={'/orders'}><a><li className='py-1 hover:text-pink-700 text-sm'>Orders</li></a></Link>
         <li onClick={logout} className='py-1 hover:text-pink-700 text-sm'>Logout</li>
        </ul>
      </div>}
      {user.value && <MdAccountCircle onMouseOver={toggleDropdown} onMouseLeave={toggleDropdown} className='text-xl md:text-2xl mx-2' />}
      </span>
      
        {!user.value && <Link href={'/login'}><a>
          <button className='bg-pink-600 px-2 py-1 mx-2 rounded-md text-sm text-white '>Login</button>
          </a></Link>}
        <AiOutlineShoppingCart  onClick={toggleCart} className='text-xl md:text-2xl' />
      </div>
      
      {/* SideBar */}
      <div ref={ref} className={`z-10 w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0 right-0 px-8 py-10 bg-pink-100 transform transition-transform
       ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className='font-bold text-xl text-center '>Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Cart has been cleared</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                <div className='flex items-center justify-center w-1/3 text-sm'>
                  <AiFillMinusCircle
                    onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }}
                    className={'cursor-pointer text-pink-500'} /><span className='mx-2'>{cart[k].qty}</span>
                  <AiFillPlusCircle
                    onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }}
                    className={'cursor-pointer text-pink-500'} />
                </div>
              </div>
            </li>
          })}
        </ol>
        <div className="font-bold my-2">Subtotal: ₹{subTotal} </div>
        {/* Buttons */}
        <div className="flex">
          <Link href={'/checkout'}><button className='flex text-white bg-pink-500 mr-2 border-0 py-2 px-2 focus:outline-none
        hover:bg-pink-600 rounded text-sm'><BsFillBagCheckFill className='m-1' /> Checkout</button></Link>
          <button onClick={clearCart} className='flex text-white bg-pink-500 mr-2 border-0 py-2 px-2 focus:outline-none
        hover:bg-pink-600 rounded text-sm'>Clear Cart</button>

        </div>
      </div>
    </div>
  )
}

export default Navbar



