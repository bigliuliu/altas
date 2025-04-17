"use client"

import { convertToShortDateMonthDay } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default function TransferTimeline({ history, property }: { history: any[], property: any }) {
    console.log(history)
    return (
        <main id="transfer-history" className="relative flex flex-col justify-center bg-slate-50 overflow-hidden">
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
                <div className="flex flex-col justify-center divide-y divide-slate-200">
                    <h1 className="text-xl font-bold py-2">Property Ownership History</h1>
                    <div className="w-full max-w-3xl mx-auto">
                        {/* <!-- Vertical Timeline #1 --> */}
                        <div className="-my-4 py-2">
                            {history && history.length > 0 &&
                                <>
                                    <div className="relative pl-8 sm:pl-32 py-4 group">
                                        {/* <!-- Purple label --> */}
                                        <div className="font-caveat font-medium text-2xl text-[#218B53]/80 mb-1 sm:mb-0">{history[0]?.ownerId?.fullName}</div>
                                        {/* <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) --> */}
                                        <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                                            <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-24 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">{convertToShortDateMonthDay(property?.createdAt)}</time>
                                        </div>
                                        <div className="text-slate-500">
                                            <span>Enlisted Property</span>
                                        </div>
                                    </div>
                                    {history.map((prop, index) => (
                                        <div key={prop._id} className="relative pl-8 sm:pl-32 py-4 group">
                                            {/* <!-- Purple label --> */}
                                            <div className="font-caveat font-medium text-2xl text-[#218B53]/80  mb-1 sm:mb-0">{prop?.recipientId?.fullName}</div>
                                            {/* <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) --> */}
                                            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                                                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-24 p-1 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">{convertToShortDateMonthDay(prop?.createdAt)}</time>
                                                <div className="text-xl font-bold text-slate-900">
                                                </div>
                                            </div>
                                            {/* <!-- Content --> */}
                                            <div className="text-slate-500">
                                                {index === history.length - 1 ?
                                                    <span>This is the current owner</span> :
                                                    <div>
                                                        {/* Acquisition: Gift <br /> */}
                                                        <Link href={prop?.attachDocument} target="_blank" className="flex items-center group hover:underline hover:text-[#218B53]">
                                                            View Agreement
                                                            <ExternalLink size={15} className="mx-1 hidden group-hover:block" />
                                                        </Link>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </>
                            }
                            {history && history.length === 0 &&
                                <div className="relative pl-8 sm:pl-32 py-4 group">
                                    {/* <!-- Purple label --> */}
                                    <div className="font-caveat font-medium text-2xl text-[#218B53]/80 mb-1 sm:mb-0">{property?.ownerName}</div>
                                    {/* <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) --> */}
                                    <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                                        <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-24 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">{convertToShortDateMonthDay(property?.createdAt)}</time>
                                    </div>
                                    <div className="text-slate-500">
                                        <span>Enlisted Property</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}