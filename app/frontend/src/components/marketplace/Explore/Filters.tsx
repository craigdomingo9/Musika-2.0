"use client"
import Categories from './Categories';
import CheckFilter from './CheckFilter';



function Filters() {
  
  return (
    <div>
      <Categories />
      <div className='flex'>
        <CheckFilter label='Sale' configKey='on_sale'/>
        <CheckFilter label='Featured' configKey='is_featured' />
      </div>
    </div>
  )
}

export default Filters
