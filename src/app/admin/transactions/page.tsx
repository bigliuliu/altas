"use client"

import DashboardContainer from "@/container/DashboardContainer";
import { File } from "@phosphor-icons/react";
import React from "react";
import { Transaction, columns } from "./columns"
import { DataTable } from "./data-table"
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useSession } from "next-auth/react";

interface DateRange {
    from: Date
    to: Date | undefined
}

const TransactionPage = () => {
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [filteredTransaction, setFilteredTransaction] = React.useState<Transaction[]>([]);
    const { data: session } = useSession();
    const token = session?.user.accesstokens.accestoken;

    const filterTransactionsByType = (type: string, note = '') => {
        if (type === 'billing') {
            return filteredTransaction.filter(transaction => transaction.note.toLowerCase().includes(note.toLowerCase()));
        }
        return filteredTransaction.filter(transaction => transaction.transactionType.toLowerCase().includes(type.toLowerCase()));
    };
    const sumTransactionAmount = (type: string, value = '') => {
        const filteredData = filterTransactionsByType(type, value);
        const sum = filteredData.reduce((acc, transaction) => acc + transaction.amount, 0);
        return sum;
    };
    const getTotalBillingAmount = () => {
        const billingTransactions = transactions.filter(transaction => transaction.transactionType.toLowerCase() === 'billing');
        const totalBillingAmount = billingTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        return totalBillingAmount;
    };

    const handleDateFilter = (value: any) => {
        console.log(value);
        const from = value.range.from;
        const to = value.range.to;
        const filteredData = transactions.filter(value => {
            if (from && !to) {
                return new Date(value.createdAt).getTime() >= from.getTime()
            } else if (!from && to) {
                return new Date(value.createdAt).getTime() <= to.getTime()
            } else if (from && to) {
                return new Date(value.createdAt).getTime() >= from.getTime() && new Date(value.createdAt).getTime() <= to.getTime()
            } else return true;
        })
        console.log(filteredData)
        setFilteredTransaction(filteredData)
    }

    React.useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${AtlasBackendApi}/transactions/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setTransactions(data.data);
                setFilteredTransaction(data.data);
                console.log('Transactions', data.data)
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [token]);


    return (
        <DashboardContainer>
            <main>
                <section className="bg-dash-hero-bg bg-cover text-white p-4 m-3 h-[250px] flex flex-col justify-around rounded-xl">
                    <article className="flex justify-around">
                        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
                            <span className="bg-[#218b523d] p-3 flex items-center rounded-lg">
                                <File size={24} color="#080808" weight="fill" />
                            </span>
                            <h1 className="text-black">Updates</h1>
                            <div className="w-full flex items-center justify-between">
                                <h3 className="font-bold text-black text-3xl my-2">{filterTransactionsByType('billing', 'UPDATE').length}</h3>
                                <h3 className="font-medium text-black text-lg my-2">KES {sumTransactionAmount('billing', 'UPDATE')}</h3>
                            </div>
                        </div>
                        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
                            <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
                                <File size={24} color="#080808" weight="fill" />
                            </span>
                            <h1 className="text-black">Search</h1>
                            <div className="w-full flex items-center justify-between">
                                <h3 className="font-bold text-black text-3xl my-2">{filterTransactionsByType('billing', 'SEARCH').length}</h3>
                                <h3 className="font-medium text-black text-lg my-2">KES {sumTransactionAmount('billing', 'SEARCH')}</h3>
                            </div>
                        </div>
                        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
                            <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
                                <File size={24} color="#080808" weight="fill" />
                            </span>
                            <h1 className="text-black">Verify</h1>
                            <div className="w-full flex items-center justify-between">
                                <h3 className="font-bold text-black text-3xl my-2">{filterTransactionsByType('billing', 'VERIFY').length}</h3>
                                <h3 className="font-medium text-black text-lg my-2">KES {sumTransactionAmount('billing', 'VERIFY')}</h3>
                            </div>
                        </div>
                        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
                            <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
                                <File size={24} color="#080808" weight="fill" />
                            </span>
                            <h1 className="text-black">Transfer</h1>
                            <div className="w-full flex items-center justify-between">
                                <h3 className="font-bold text-black text-3xl my-2">{filterTransactionsByType('billing', 'TRANSFER').length}</h3>
                                <h3 className="font-medium text-black text-lg my-2">KES {sumTransactionAmount('billing', 'TRANSFER')}</h3>
                            </div>
                        </div>
                        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
                            <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
                                <File size={24} color="#080808" weight="fill" />
                            </span>
                            <h1 className="text-black">Revenue</h1>
                            <div className="w-full flex items-center justify-between">
                                <h3 className="font-bold text-black text-3xl my-2">KES {getTotalBillingAmount()}</h3>
                            </div>
                        </div>
                    </article>
                </section>
                <section className="mx-10">
                    <DataTable columns={columns} data={filteredTransaction} dataFilterFn={handleDateFilter} />
                </section>
            </main>
        </DashboardContainer>
    );
};

export default TransactionPage;

