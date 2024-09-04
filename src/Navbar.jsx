import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div  className='flex justify-between ' >
        <div>
        <p className='font-bold text-yellow-400' >ToDo</p>

        </div>
    <Link to='/login'  className='font-bold text-white text-xl ' >login</Link>

      </div>
    </>
  )
}

export default Navbar
