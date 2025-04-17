"use client"

import { useState } from "react"
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

export default function AtlasFAQ() {
    const [openItems, setOpenItems] = useState<string[]>([])

    const faqData = [
        {
            question: "What is Atlas Blockchain Solutions?",
            answer: "Atlas is a private digital land registry platform backed by blockchain technology. It provides a transparent, secure and immutable way for property owners to register and verify their land property ownership, ensuring trust and eliminating disputes."
        },
        {
            question: "How does Atlas ensure the security of land titles?",
            answer: "Atlas leverages blockchain technology to create an immutable record of land titles. Once registered, the details cannot be altered without consensus, ensuring that your title is securely stored and protected from fraud."
        },
        {
            question: "What are the benefits of using Atlas over traditional land registries?",
            answer: "Atlas offers several advantages:\n• Transparency: All transactions are visible on the blockchain, reducing instances of corruption and manipulation.\n• Efficiency: Transactions are faster and automated, reducing the time needed for title verification and transfers.\n• Security: Blockchain's decentralized nature makes it nearly impossible for unauthorized individuals to alter title information.\n• Cost-effective: By automating processes, Atlas reduces the need for intermediaries, saving you money on transactions."
        },
        {
            question: "How do I verify my land title on Atlas?",
            answer: "Once your title is registered with Atlas, you will be provided with a unique digital token (hash) linked to your title. This hash is used to retrieve details of property ownership stored on the blockchain which forms the basis of property ownership verification. The hash is publicly available and provides ownership data on demand at any time, hence entrenching transparency and proprietary rights."
        },
        {
            question: "Can Atlas help in resolving land disputes?",
            answer: "Yes, Atlas has a built-in dispute registration feature. Any disputes about land ownership can be registered on the platform to warn members of the public, but more importantly, to allow for the channeling of the disputes to the respective authorities to facilitate a speedy resolution/conclusion of the same."
        },
        {
            question: "What if my title is already registered with a government registry?",
            answer: "Atlas works in collaboration with existing government registries. Atlas seeks to complement government land registry efforts by extending the reach of digitization while safeguarding land titles from fraud and manipulation. If your title is already registered, Atlas can complement the current public registry framework by offering an additional layer of security and transparency through blockchain verification."
        },
        {
            question: "How do I enlist my property on Atlas?",
            answer: "Enlisting your property on Atlas is simple. You will need to first create an account by signing-up on Atlas. Proceed to log-in to your account and verify the account by providing the required KYC information. Once your account is verified, you are now free to search, enlist, transfer or update properties on the Atlas platform. Proceed to enlist your first property by filling out critical details of the property as per the enlist property form. Once done, navigate to the ‘my properties’ section of the Atlas portal and prompt the verification of the property. Once verified, the property details are automatically stored on the blockchain and a corresponding blockchain hash (link) is provided. Use this hash to retrieve details stored on the blockchain."
        },
        {
            question: "Can Atlas facilitate property transfers?",
            answer: "Yes, Atlas makes property transfers simple and secure. The platform facilitates property transfers between verified users. The verified property owner is the only party that can initiate a property transfer, and is required to provide details of the recipient. Provided the recipient is a verified Atlas member, the transfer can then be triggered effectively, otherwise, the transfer will not be successful. Remember to make sure your account wallet is sufficiently funded to facilitate the transfer request."
        },
        {
            question: "Who can access the land title information on Atlas?",
            answer: "Land title information on Atlas is accessible to all members of the public, provided one has an Atlas account. Atlas is committed to enhancing transparency of land ownership in Kenya, and therefore strives to collect, verify and avail land ownership data to the public to facilitate land ownership verification, easily spot and deal with instances of fraud, as well as facilitate speedy resolution of conflicts – all in a bid to safeguard property rights of land owners."
        },
        {
            question: "How does Atlas help prevent fraud?",
            answer: "By recording all land ownership data on a publicly accessible and immutable blockchain ledger. By storing critical ownership data on an immutable blockchain ledger, Atlas ensures that no party can alter title information using underhand techniques. This reduces the risk of fraudulent claims and subsequent ownership disputes – allowing property owners to enjoy peace of mind and focus on productivity rather than worrying about the possibility of losing their property."
        },
        {
            question: "What is the cost of using Atlas?",
            answer: "The costs vary based on the service required. Atlas provides a range of services including but not limited to enlisting property, verification of property, online property search, property transfer and property updates. Each of these services attracts a specific cost which are directed towards the facilitation of the service. By automating processes, eliminating intermediaries, and having a transparent cost structure, Atlas is a more affordable option relative to traditional systems."
        },
        {
            question: "What do I need to get started with Atlas?",
            answer: "To get started, you simply need to register with Atlas and provide the necessary documentation KYC information to facilitate the verification of your account. Thereafter, you are free to register as many properties as you legally own by providing title/property specific details for each. Once verified, your property data will be securely stored on the blockchain, guaranteeing you the safety and security of your property, and ushering you to the benefits of Atlas’s services."
        },
        {
            question: "How does Atlas benefit landowners and investors?",
            answer: "Atlas benefits landowners by providing a secure, efficient, and cost-effective way to manage and verify land titles. For investors, it offers a reliable method of conducting due diligence, reducing risks related to land ownership and transfers."
        },
        {
            question: "How do I top-up my account?",
            answer: "Once your account is verified, you can top-up your account by using mobile money (MPESA). Navigate to the wallet section of your account, click top-up, type-in your preferred top-up mobile number, type-in the amount, and click send. MPESA will pop-up the prompt, allowing you to confirm the details and then type-in your PIN number. Thereafter, type-in the MPESA payment code and click submit. Your account will immediately reflect the top-up amount, allowing you to access the suite of Atlas services."
        }
        // Add more FAQ items here...
    ]

    const handleToggle = (value: string) => {
        setOpenItems(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        )
    }

    return (
        <div className="w-full px-40 mt-24">
            <h2 className="text-4xl font-semibold mb-5 text-center text-[#11171E] font-sans">Frequently Asked Questions about Atlas</h2>
            <p className="font-jakarta text-xl font-normal text-[#535862] text-center">Everything you need to know about Atlas. Can’t find the answer you’re looking for? <br /> Please <span className="underline underline-offset-4"><Link href="contact">contact us</Link></span>.</p>
            <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
                {faqData.map((item, index) => (
                    <div key={index}>
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger onClick={() => handleToggle(`item-${index}`)}>
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                {item.answer.split('\n').map((paragraph, pIndex) => (
                                    <p key={pIndex} className="mb-2">{paragraph}</p>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <Separator className="h-[2px] bg-gray-100" />
                    </div>
                ))}
            </Accordion>
        </div>
    )
}