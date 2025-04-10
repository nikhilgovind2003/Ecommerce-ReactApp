import React from 'react'
import PriceFilter from './PriceFilter'

const Sidebar = () => {


    

  return (
      <div className=' fixed h-screen hidden md:flex text-sm flex-col p-4 w-[15%] mt-20 border-r-2'>
          <div className=' pl-4'>
              <h1 className='font-semibold text-lg underline mb-12 text-center'>Price</h1>
            <PriceFilter />
          </div>
    </div>
  )
}

export default Sidebar
