

import { redirect } from 'next/navigation'



const DashBoardGoverment= async () => {
  
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-2xl font-bold'>
          This is a <span className='text-emerald-500'>Government</span>{' '}
          Dash Board
        </h1>
        <h2 className='mt-4 font-medium'>You are logged in as:</h2>
        <p className='mt-4'>Role: </p>
        <p className='mt-4'>Phone Number : </p>
      </div>
    </section>
  )
}

export default DashBoardGoverment;
