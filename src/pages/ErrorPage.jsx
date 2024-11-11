import React from 'react'
import errorImage from '../components/Images/404error2.jpg'
import './Pages.css'

export default function ErrorPage() {
  return (
    <img className="errorimg" src={errorImage} alt="An error occurred" />

  )
}
