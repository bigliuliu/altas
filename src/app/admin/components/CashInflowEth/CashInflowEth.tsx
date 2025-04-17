"use client";

import React from "react";
import { CashInflowEthType } from "@/types/api-types";
import { cashInflowEthSource } from "@/helpers/cashInflowEthSource";
import { CashInflowEthColumns } from "./columns";
import CashInflowEthTable from ".";

const CashInflowEth = () => {
  const generateTblData = (item: CashInflowEthType): CashInflowEthType => {
    return {
      id: item.id,
      usdSpent: item.usdSpent,
      ethUnitPrice: item.ethUnitPrice,
      etherUnitsReceived: item.etherUnitsReceived,
      time: item.time,
      date: item.date
    };
  };

  const handleDataFilter = ()=>{

  }

  const tableData = Array.isArray(cashInflowEthSource)
    ? cashInflowEthSource.map((element) => generateTblData(element))
    : [];
  return <CashInflowEthTable dataFilterFn={handleDataFilter} columns={CashInflowEthColumns} data={tableData} />;
};

export default CashInflowEth;
