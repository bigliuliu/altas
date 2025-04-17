import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Description } from "@radix-ui/react-toast"

interface Slide {
  title: string
  description: string
  imageSrc: string
}

interface SharedSliderProps {
  slides: Slide[]
}

const slides = [
  {
    title: "The first of its kind. Digital registry",
    description: "Atlas is committed to providing verifiable land records to support a rigorous and smooth due diligence experience",
    imageSrc: "/img/search.jpeg"
  },
  {
    title: "Accurate & Verifiable land records",
    description: "Ease of access to land records will promote the rigour and general due diligence experience",
    imageSrc: "/img/accessible.jpg"
  },
  {
    title: "Decentralized & tamper-proof platform",
    description: "Atlas is backed on the blockchain, a decentralized immutable platform that is tamper-proof, to safeguard the rights of bona fide landowners Immutability is an especially critically element given the ease of title manipulation to pave way for fraud",
    imageSrc: "/img/security.jpeg"
  },
  {
    title: "Due deligence at a click of button",
    description: "Atlas is keen to improve the due diligence experience by availing the much-required data to the public in a convenient channel",
    imageSrc: "/img/convenience.jpg"
  }
]

export function FeaturedSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="bg-[#258C4E] pb-8 md:w-1/2 text-white flex flex-col justify-between">
      <div className="w-full mb-8">
        <Image
          src={slides[currentSlide].imageSrc}
          alt={slides[currentSlide].title}
          width={320}
          height={340}
          className="w-full h-64"
        />
        <div className="px-8 py-10">
          <h3 className="text-2xl font-bold mb-4">{slides[currentSlide].title}</h3>
          <p>{slides[currentSlide].description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#258C4E]"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`inline-block w-2 h-2 bg-white rounded-full ${index === currentSlide ? 'opacity-100' : 'opacity-50'}`}
            ></span>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#258C4E]"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}