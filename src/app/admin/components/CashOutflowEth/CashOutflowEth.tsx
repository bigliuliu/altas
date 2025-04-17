"use client";

import React from "react";
import { CashOutflowEthType } from "@/types/api-types";
import { cashOutflowEthSource } from "@/helpers/cashOutflowEthSource";
import { CashOutflowEthColumns } from "./columns";
import CashOutflowEthTable from ".";

const CashOutflowEth = () => {
  const generateTblData = (item: CashOutflowEthType): CashOutflowEthType => {
    return {
      id: item.id,
      accountId: item.accountId,
      gasPrice: item.gasPrice,
      transactionType: item.transactionType,
      etherUnitsConsumed: item.etherUnitsConsumed,
      time: item.time,
      date: item.date,
      balance: item.balance,
    };
  };
  const handleDataFilter = ()=>{

  }
  const tableData = Array.isArray(cashOutflowEthSource)
    ? cashOutflowEthSource.map((element) => generateTblData(element))
    : [];
  return <CashOutflowEthTable dataFilterFn={handleDataFilter} columns={CashOutflowEthColumns} data={tableData} />;
};

export default CashOutflowEth;
