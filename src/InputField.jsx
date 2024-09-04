import axios from 'axios'
import React, { useState } from 'react'

const InputField = () => {
//  const  [val,setVal]=useState('')
 const  [todo ,setTodo]=useState('')

  const handleClick=async()=>{
    try {
      const response = await axios.post('http://localhost:8080/create', { todo });
      console.log(response.data)
      setTodo('')
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  }

  return (
    <>
    <div className="flex gap-3 justify-center py-8 ">

      <input required type="text" value={todo} onChange={(e)=>setTodo(e.target.value)} className='border-2 rounded-md px-3 py-2 border-yellow-600 '  placeholder='Add Something' />
        <button className='px-4 py-3 hover:bg-white  text-white hover:text-yellow-600 border-2 border-yellow-600 bg-yellow-600 text-3xl rounded-md fs- ' onClick={handleClick}  >+</button>
        </div>

    </>
  )
}

export default InputField
