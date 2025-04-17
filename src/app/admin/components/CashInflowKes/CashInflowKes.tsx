"use client";

import React from "react";
import { CashInflowKesType } from "@/types/api-types";
import { cashInflowKesSource } from "@/helpers/cashInflowKesSource";
import { CashInflowKesColumns } from "./columns";
import CashInflowKesTable from ".";

const CashInflowKes = () => {
  const generateTblData = (item: CashInflowKesType): CashInflowKesType => {
    return {
      id: item.id,
      accountId: item.accountId,
      accountName: item.accountName,
      topUp: item.topUp,
      time: item.time,
      date: item.date
    };
  };
  const handleDataFilter = ()=>{

  }

  const tableData = Array.isArray(cashInflowKesSource)
    ? cashInflowKesSource.map((element) => generateTblData(element))
    : [];
  return <CashInflowKesTable dataFilterFn={handleDataFilter} columns={CashInflowKesColumns} data={tableData} />;
};

export default CashInflowKes;
