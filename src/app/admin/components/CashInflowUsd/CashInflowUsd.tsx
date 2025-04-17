"use client";

import React from "react";
import { CashInflowUsdType } from "@/types/api-types";
import { cashInflowUsdSource } from "@/helpers/cashInflowUsdSource";
import { CashInflowUsdColumns } from "./columns";
import CashInflowUsdTable from ".";

const CashInflowUsd = () => {
  const generateTblData = (item: CashInflowUsdType): CashInflowUsdType => {
    return {
      id: item.id,
      bankSeller: item.bankSeller,
      usdUnitPrice: item.usdUnitPrice,
      usdPurchased: item.usdPurchased,
      time: item.time,
      date: item.date
    };
  };
  const handleDataFilter = ()=>{

  }
  const tableData = Array.isArray(cashInflowUsdSource)
    ? cashInflowUsdSource.map((element) => generateTblData(element))
    : [];
  return <CashInflowUsdTable dataFilterFn={handleDataFilter} columns={CashInflowUsdColumns} data={tableData} />;
};

export default CashInflowUsd;
