"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import 'swiper/css/navigation';

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from 'next/image'
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

export default function HeroSlider() {
    return (
        <Swiper
            autoplay={{
                delay: 8000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper hero-slider"
        >

            <SwiperSlide>
                <div className="grid grid-cols-1 md:grid-cols-2 h-[70vh]">
                    <div className="flex flex-col justify-start 2xl:justify-center items-start w-10/12 mx-auto py-6">
                        <h2 className="text-white uppercase text-left text-xl 2xl:text-2xl my-4"> | Atlas</h2>
                        <h1 className="text-white font-black text-2xl md:text-4xl uppercase my-4 text-start">
                            The first of its kind <br className="lg:block hidden" />
                            <span>Digital registry</span>
                        </h1>
                        <p className="text-start text-white text-lg my-4">Backed on blockchain technology.</p>
                        <p className="text-start text-white mb-8">
                            Atlas is committed to providing verifiable land records to support a rigorous and smooth due diligence experience
                        </p>
                        <CTAButton />
                    </div>
                    <div>
                        <Image
                            src="/img/search.jpeg"
                            alt="Atlas Backed on blockchain technology"
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover object-center"
                            priority={true}
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="grid grid-cols-1 md:grid-cols-2 h-[70vh]">
                    <div className="flex flex-col justify-start 2xl:justify-center items-start w-10/12 mx-auto py-6">
                        <h2 className="text-white uppercase text-left text-xl 2xl:text-2xl my-4"> | Accessiblity & Transparency</h2>
                        <h1 className="text-white font-black text-2xl md:text-4xl uppercase my-4 text-start">
                            Accurate & Verifiable land records
                        </h1>
                        {/* <p className="text-start text-white text-lg my-4">Backed on blockchain technology.</p> */}
                        <p className="text-start text-white mb-8">
                            Ease of access to land records will promote the rigour and general due diligence experience
                            Accessibility also serves to improve transparency around land ownership in the country which reinforces property rights
                        </p>
                        <CTAButton />
                    </div>
                    <div>
                        <Image
                            src="/img/accessible.jpg"
                            alt="Atlas Accessiblity & Transparency"
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover object-center"
                            priority={true}
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="grid grid-cols-1 md:grid-cols-2 h-[70vh]">
                    <div className="flex flex-col justify-start 2xl:justify-center items-start w-10/12 mx-auto py-6">
                        <h2 className="text-white uppercase text-left text-xl 2xl:text-2xl my-4"> | Security</h2>
                        <h1 className="text-white font-black text-2xl md:text-4xl uppercase my-4 text-start">
                            Decentralized & tamper-proof platform
                        </h1>
                        {/* <p className="text-start text-white text-lg my-4">Backed on blockchain technology.</p> */}
                        <p className="text-start text-white mb-8">
                            Atlas is backed on the blockchain, a decentralized immutable platform that is tamper-proof, to safeguard the rights of bona fide landowners
                            Immutability is an especially critically element given the ease of title manipulation to pave way for fraud
                        </p>
                        <CTAButton />
                    </div>
                    <div>
                        <Image
                            src="/img/security.jpeg"
                            alt="Atlas security"
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover object-center"
                            priority={true}
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="grid grid-cols-1 md:grid-cols-2 h-[70vh]">
                    <div className="flex flex-col justify-start 2xl:justify-center items-start w-10/12 mx-auto py-6">
                        <h2 className="text-white uppercase text-left text-xl 2xl:text-2xl my-4"> | Reinforce property rights</h2>
                        <h1 className="text-white font-black text-2xl md:text-4xl uppercase my-4 text-start">
                            Best alternative & compliment to GoK Registry
                        </h1>
                        {/* <p className="text-start text-white text-lg my-4">Backed on blockchain technology.</p> */}
                        <p className="text-start text-white mb-8">
                            The manual nature of GoK registries makes it vulnerable to manipulation leaving landowners exposed to fraudulent schemes
                            Atlas will stand to complement, but also to keep GoK registries in check to ensure no Kenyan is disenfranchised of their property rights
                        </p>
                        <CTAButton />
                    </div>
                    <div>
                        <Image
                            src="/img/property-rights.webp"
                            alt="Atlas Reinforce property rights"
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover object-center"
                            priority={true}
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="grid grid-cols-1 md:grid-cols-2 h-[70vh]">
                    <div className="flex flex-col justify-start 2xl:justify-center items-start w-10/12 mx-auto py-6">
                        <h2 className="text-white uppercase text-left text-xl 2xl:text-2xl my-4"> | Convenience</h2>
                        <h1 className="text-white font-black text-2xl md:text-4xl uppercase my-4 text-start">
                            Due deligence at a click of button
                        </h1>
                        {/* <p className="text-start text-white text-lg my-4">Backed on blockchain technology.</p> */}
                        <p className="text-start text-white mb-8">
                            Atlas is keen to improve the due diligence experience by availing the much-required data to the public in a convenient channel
                        </p>
                        <CTAButton />
                    </div>
                    <div>
                        <Image
                            src="/img/convenience.jpg"
                            alt="Atlas convenience"
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover object-center"
                            priority={true}
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="grid grid-cols-1 md:grid-cols-2 h-[70vh]">
                    <div className="flex flex-col justify-start 2xl:justify-center items-start w-10/12 mx-auto py-6">
                        <h2 className="text-white uppercase text-left text-xl 2xl:text-2xl my-4">| Witness</h2>
                        <h1 className="text-white font-black text-2xl md:text-4xl uppercase my-4 text-start">
                            Safeguard & witness to your property rights
                        </h1>
                        {/* <p className="text-start text-white text-lg my-4">Backed on blockchain technology.</p> */}
                        <p className="text-start text-white mb-8">
                            In the face of runaway corruption and abuse of office in Kenya, Atlas is here to safeguard and bear witness to the rights of property owners
                        </p>
                        <CTAButton />
                    </div>
                    <div>
                        <Image
                            src="/img/witness.jpg"
                            alt="Atlas witness to your property ownership"
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover object-center"
                            priority={true}
                        />
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}


const CTAButton = () => {
    return (
        <Link
            className="group w-full lg:w-1/2 border text-white flex items-center justify-center py-4 px-6 hover:bg-white hover:text-black transition-all delay-150"
            href="/register"
        >
            Try Atlas for free
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-2" />
        </Link>
    )
}