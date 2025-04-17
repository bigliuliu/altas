"use client";

import React from "react";
import { CashOutflowUsdType } from "@/types/api-types";
import { cashOutflowUsdSource } from "@/helpers/cashOutflowUsdSource";
import { CashOutflowUsdColumns } from "./columns";
import CashOutflowUsdTable from ".";

const CashOutflowUsd = () => {
  const generateTblData = (item: CashOutflowUsdType): CashOutflowUsdType => {
    return {
      id: item.id,
      usdAmount: item.usdAmount,
      etherSeller: item.etherSeller,
      etherUnitPrice: item.etherUnitPrice,
      etherUnitsReceived: item.etherUnitsReceived,
      time: item.time,
      date: item.date
    };
  };
  const handleDataFilter = ()=>{

  }
  const tableData = Array.isArray(cashOutflowUsdSource)
    ? cashOutflowUsdSource.map((element) => generateTblData(element))
    : [];
  return <CashOutflowUsdTable dataFilterFn={handleDataFilter} columns={CashOutflowUsdColumns} data={tableData} />;
};

export default CashOutflowUsd;
