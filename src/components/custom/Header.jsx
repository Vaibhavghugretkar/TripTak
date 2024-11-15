import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='bg-[#3A3737] p-2 shadow-md flex justify-between items-center'>
        <img src='/logo3.webp' className=' ml-4 rounded-full w-20 h-20'></img>
        <div>
            <Button className='mr-4 p-5'>Sign in</Button>
        </div>
    </div>
  )
}

export default Header