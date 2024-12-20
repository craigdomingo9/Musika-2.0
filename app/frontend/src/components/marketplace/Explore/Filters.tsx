"use client"
import Categories from './Categories';
import CheckFilter from './CheckFilter';



function Filters() {
  
  return (
    <>
      <p className='text-opacity font-semibold ml-2 text-lg pt-0 mt-0'>Explore</p>
      <Categories />
      <div className='flex'>
        <CheckFilter label='Sale' configKey='on_sale'/>
        <CheckFilter label='Featured' configKey='is_featured' />
      </div>
    </>
  )
}

export default Filters
