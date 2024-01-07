import React from 'react'
import { FaLandmark } from "react-icons/fa";


const Header = () => {
  return (
    <nav className='bg-white h-12 w-full flex items-center justify-between'>
        <h1 className='m-2 font-Merriweather flex items-center gap-2'><FaLandmark /> Philippines Territories</h1>
    </nav>
  )
}

export default Header