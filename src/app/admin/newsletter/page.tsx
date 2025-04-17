"use client"

import DashboardContainer from "@/container/DashboardContainer";
import { File } from "@phosphor-icons/react";
import React from "react";
import { Subscription, columns } from "./columns"
import { DataTable } from "./data-table"
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useSession } from "next-auth/react";

interface DateRange {
    from: Date
    to: Date | undefined
}

const Newsletter = () => {
    const [newsletter, setNewsletter] = React.useState<Subscription[]>([]);
    const [filteredNewsletter, setFilteredNewsletter] = React.useState<Subscription[]>([]);
    const { data: session } = useSession();
    const token = session?.user.accesstokens.accestoken;


    const handleDateFilter = (value: any) => {
        console.log(value);
        const from = value.range.from;
        const to = value.range.to;
        const filteredData = newsletter.filter(value => {
            if (from && !to) {
                return new Date(value.createdAt).getTime() >= from.getTime()
            } else if (!from && to) {
                return new Date(value.createdAt).getTime() <= to.getTime()
            } else if (from && to) {
                return new Date(value.createdAt).getTime() >= from.getTime() && new Date(value.createdAt).getTime() <= to.getTime()
            } else return true;
        })
        console.log(filteredData)
        setFilteredNewsletter(filteredData)
    }

    React.useEffect(() => {
        const fetchNewsletter = async () => {
            try {
                const response = await fetch(`${AtlasBackendApi}/newsletters`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setNewsletter(data.data);
                setFilteredNewsletter(data.data);
                console.log('Newsletter', data.data)
            } catch (error) {
                console.error('Error fetching Newsletter:', error);
            }
        };

        fetchNewsletter();
    }, [token]);


    return (
        <DashboardContainer>
            <main>
                <section className="bg-dash-hero-bg bg-cover text-white p-4 m-3 h-[250px] flex flex-col justify-around rounded-xl">
                    <article className="flex justify-around">
                        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1 md:w-[300px]">
                            <span className="bg-[#218b523d] p-3 flex items-center rounded-lg">
                                <File size={24} color="#080808" weight="fill" />
                            </span>
                            <h1 className="text-black my-1">Total Subscriptions</h1>
                            <div className="w-full flex items-center justify-between">
                                <h3 className="font-bold text-black text-3xl my-4">{newsletter.length}</h3>
                            </div>
                        </div>
                    </article>
                </section>
                <section className="mx-10">
                    <DataTable columns={columns} data={filteredNewsletter} dataFilterFn={handleDateFilter} />
                </section>
            </main>
        </DashboardContainer>
    );
};

export default Newsletter;

