"use client"

import Image from "next/image";
import React from "react";

export default function Partnership() {
    return (
        <section className="p-4 md:p-10">
            <h1 className="mt-10 font-semibold text-2xl sm:text-[48px] font-clashDisplay flex justify-center">
                Partner with Us
            </h1>
            <div className="p-4 flex items-center justify-center">
                <div className="p-4 w-10/12 md:w-9/12">
                    <div className="bg-white p-6 rounded-lg text-center">
                        <p className="text-black text-lg mb-4">
                            Strategic market penetration alliances being sought with leading land selling companies including but not limited to AMG Realtors, Optiven, among others.
                        </p>
                        <p className="text-black text-lg mb-4">
                            Our partnership program offers numerous benefits including access to our extensive resources, co-branding opportunities, and the ability to reach a wider audience.
                        </p>
                        <p className="text-black text-lg mb-4">
                            If you are interested in exploring partnership opportunities with us, please contact us at <a href="mailto:partnerships@atlas-ke.net" className="text-blue-500 underline">partnerships@atlas-ke.net</a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}