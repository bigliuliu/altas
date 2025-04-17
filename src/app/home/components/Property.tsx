import Image from 'next/image'
import React from 'react'

interface Property {
    image:any;
    title: string;
    subtitle: string;
    size: number;
    type: string;
    color: any;
}

const Property = ({image, title, size, type, color}:Property) => {
  return (
    <article style={{backgroundColor:color}} className='flex flex-col justify-around px-2 m-2 rounded-2xl min-h-[500px]'>
        <Image src={image} alt='' className='min-w-[300px] min-h-[200px] rounded-lg' />
        <h2 className='text-xl'>{title}</h2>
        <div className='flex justify-between'>
            <span>
                <h4 className='text-opacity-40'>size</h4>
                <h4 className='text-xl font-bold'>{size} Ha</h4>
            </span>
            <span>
                <h4>type</h4>
                <h4 className='text-xl font-bold'>{type}</h4>
            </span>
        </div>

    </article>
  )
}

export default Property