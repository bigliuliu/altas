"use client"

import { Person, SealCheck } from "@phosphor-icons/react"
import { Blocks, BookKey, BookText, BoxIcon, Calendar, LucideMapPin, Map, PinIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlockchainData() {
    return (
        <main className="w-full flex flex-col items-center pt-4">
            <Image
                src="/img/land.png"
                width={400}
                height={200}
                className="w-10/12 h-96"
                alt="Atlas blockchain listed property"
            />
            <div className="w-full px-[10%] flex items-start">
                <div className="m-2 w-full">
                    <span className="flex items-center ">
                        <SealCheck size={24} color="#398DEE" weight="fill" />
                        <h4 className="my-2 text-[#398DEE]">
                            verified
                        </h4>
                    </span>
                    <h1 className="uppercase text-4xl font-bold">
                        NAIROBI / CBD / 017
                    </h1>
                    <h1 className="uppercase text-lg mt-4">
                        WESTLANDS / NAIROBI
                    </h1>
                    <h1 className="flex items-center text-blue-400 my-4">
                        <LucideMapPin size={20} className="mx-1" />
                        <Link href="https://www.google.com/maps" target="_blank" className="hover:underline">View on Map</Link>
                    </h1>
                </div>
                <div className="w-1/2 border-t-2 border-gray-400 mt-4">
                    <div className="border-b-2 p-2">
                        <span className="flex items-center font-thin text-sm">
                            <Person size={15} className="mx-1" />
                            Owner
                        </span>
                        <h1 className="text-sm">
                            Sentrim Hotel Ltd
                        </h1>
                    </div>
                    <div className="border-b-2 p-2">
                        <span className="flex items-center font-thin text-sm">
                            <Map size={15} className="mx-1" />
                            Size
                        </span>
                        <h1 className="text-sm">
                            3.75 HA
                        </h1>
                    </div>
                    <div className="border-b-2 p-2">
                        <span className="flex items-center font-thin text-sm">
                            <BoxIcon size={15} className="mx-1" />
                            Parcel No / Block No
                        </span>
                        <h1 className="text-sm">
                            3B / 19
                        </h1>
                    </div>
                    <div className="border-b-2 p-2">
                        <span className="flex items-center font-thin text-sm">
                            <Calendar size={15} className="mx-1" />
                            Acquisition Date
                        </span>
                        <h1 className="text-sm">
                            4 July 2007
                        </h1>
                    </div>
                    <div className="border-b-2 p-2">
                        <span className="flex items-center font-thin text-sm">
                            <BookKey size={15} className="mx-1" />
                            Lease Type
                        </span>
                        <h1 className="text-sm">
                            Leasehold
                        </h1>
                    </div>
                    <div className="border-b-2 p-2">
                        <span className="flex items-center font-thin text-sm">
                            <BookText size={15} className="mx-1" />
                            Acquisition Type
                        </span>
                        <h1 className="text-sm">
                            Gorvernment Lease
                        </h1>
                    </div>
                    <div className="border-b-2 p-2">
                        <span className="flex items-center font-thin text-sm">
                            <Blocks size={15} className="mx-1" />
                            Blockchain Contract Hash
                        </span>
                        <h1 className="text-sm">
                            jhbcvuygvqwrehfq71eojvjksbcj0912wbcbcd98123ecwedc2893e1
                        </h1>
                    </div>
                </div>
            </div>
            <div className="bg-dash-hero-bg bg-cover w-full h-10">
            </div>
        </main>
    )
}