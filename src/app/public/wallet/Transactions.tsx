"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Transactions as Transaction } from "@/types/api-types";
// import { transactionSource } from "@/helpers/transactionSource";
import { DotsThreeOutline, PaperPlaneTilt } from "@phosphor-icons/react";
import { LucideWaypoints } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { formatDateString } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Transactions = () => {
  const [transactionSource, setTransactionSource] = React.useState<Transaction[]>([])
  const { data: session } = useSession();

  const fetchUserTransactions = React.useCallback(async () => {
    try {
      let user_id: any = session?.user.userdata._id;
      if (user_id === undefined) return
      console.log('user_id', user_id);
      const response = await fetch(`${AtlasBackendApi}/transactions/user/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }, [session]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const transactions = await fetchUserTransactions();
      console.log(transactions)
      setTransactionSource(transactions.data);
    };

    fetchTransactions();
  }, [fetchUserTransactions]);

  return (
    <main className="w-full">
      <div className="flex items-center justify-between px-4">
        <h4>Recent Transactions</h4>
        <DotsThreeOutline size={24} color="#080808" weight="fill" />
      </div>
      <article className="p-4 grid grid-cols-2 gap-2">
        {transactionSource && transactionSource.map((element, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between border-2 p-3 rounded-xl mt-3"
            >
              <div className="flex">
                <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg mx-3">
                  <PaperPlaneTilt size={24} color={`${element.status === 'success' ? '#218B53' : '#e53935'}`} weight="fill" />
                </span>
                <span className="w-full">
                  <h3 className="font-bold text-[#718096]">MpesaID: {element.mpesaReceiptID}</h3>
                  <h5 className="text-[#718096]">{formatDateString(element.transactionDate)}</h5>
                </span>
              </div>
              <span className="text-end">
                <p
                  className="font-bold text-2xl">
                  KES {element.amount}
                </p>
                <h3 className="text-[#718096] font-bold capitalize">
                  {element.transactionType === 'billing' ? element.note : 'DEPOSIT'}
                </h3>
              </span>
            </div>

          );
        })}
      </article>
      {
        transactionSource && transactionSource.length == 0 &&
        <div className="w-1/2 mx-auto text-center mt-24">
          <LucideWaypoints size="80" className="text-red-400 mx-auto" /><br />
          <p className="opacity-75 italic text-xl mt-10">This transaction list is a ghost town! <br /> Add some activity by toping up!</p>
        </div>
      }
    </main>
  );
};

export default Transactions;
