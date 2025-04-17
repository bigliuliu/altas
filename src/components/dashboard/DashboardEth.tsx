import { File } from '@phosphor-icons/react'
import React from 'react'

const DashboardEth = () => {
  return (
    <main className="bg-dash-hero-bg bg-cover text-white p-4 m-3 h-[250px] flex flex-col justify-around rounded-xl">
      <article className="flex justify-around">
        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">RealTime Balance</h3>
          <h3 className="font-bold text-black text-3xl">ETH 56.450</h3>
        </div>
        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">Cash Inflows</h3>
          <h3 className="font-bold text-black text-3xl">ETH 21.355</h3>
        </div>
        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">Cash Outflows</h3>
          <h3 className="font-bold text-black text-3xl">ETH 79.30</h3>
        </div>
      </article>
    </main>
  )
}

export default DashboardEth