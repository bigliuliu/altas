"use client";

import React from "react";
import { CashOutflowKesType } from "@/types/api-types";
import { cashOutflowKesSource } from "@/helpers/cashOutflowKesSource";
import { CashOutflowKesColumns } from "./columns";
import CashOutflowKesTable from ".";

const CashOutflowKes = () => {
  const generateTblData = (item: CashOutflowKesType): CashOutflowKesType => {
    return {
      id: item.id,
      accountId: item.accountId,
      accountName: item.accountName,
      transactionType: item.transactionType,
      amountCharged: item.amountCharged,
      time: item.time,
      date: item.date
    };
  };
  const handleDataFilter = ()=>{

  }
  const tableData = Array.isArray(cashOutflowKesSource)
    ? cashOutflowKesSource.map((element) => generateTblData(element))
    : [];
  return <CashOutflowKesTable dataFilterFn={handleDataFilter} columns={CashOutflowKesColumns} data={tableData} />;
};

export default CashOutflowKes;
