import React from 'react'
import { NavLink } from 'react-router-dom'
import './Pages.css'
import banner from '../components/Images/Candles-banner.jpg'

export default function HomePage() {
  return (
    <>
      <div className="imageContainer">
        <img src={banner} alt="Description" className="headerImage" />
      </div>
      <main>
        <p>Welcome to My website, You can find great things</p>
        <NavLink to="/products" className="products-button">
          Here more Products
        </NavLink>
      </main>
    </>
  )
}
