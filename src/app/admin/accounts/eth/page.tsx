"use client"

import DashboardContainer from '@/container/DashboardContainer'
import React from 'react'
import CashInflowEth from '../../components/CashInflowEth/CashInflowEth'
import CashOutflowEth from '../../components/CashOutflowEth/CashOutflowEth'
import DashboardEth from '@/components/dashboard/DashboardEth'

const Eth = () => {
  return (
    <DashboardContainer>
    <>
      <DashboardEth />
      <CashInflowEth />
      <CashOutflowEth />
    </>
  </DashboardContainer>
  )
}

export default Eth