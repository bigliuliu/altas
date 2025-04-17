"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, PlusIcon } from "lucide-react"
import { useState } from 'react'
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Question } from "@phosphor-icons/react"
import { AtlasBackendApi } from "@/constants/atlas-backend-api"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function UpdatePromo({ data }: { data: any }) {
    const [formData, setFormData] = useState({
        name: data?.getValue('name'),
        startDate: data?.getValue('startDate'),
        endDate: data?.getValue('endDate'),
        creditAmount: data?.getValue('creditAmount'),
        apply_to: data?.getValue('apply_to'),
        promo_code: data?.getValue('promo_code'),
        status: data?.getValue('status'),
        max_user: data?.getValue('max_user'),
    });
    const [showLoader, setShowLoader] = useState(false)
    const { toast } = useToast()

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const { data: session } = useSession();
    const token = session?.user.accesstokens as unknown as string;

    const handleApplyChange = (selectedValue: string) => {
        setFormData({ ...formData, apply_to: selectedValue });
    };
    const handleStatusChange = (selectedValue: string) => {
        setFormData({ ...formData, status: selectedValue });
    };


    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('FORM DATA', formData)
        setShowLoader(true)
        fetch(`${AtlasBackendApi}/admin/promotions/${data?.original?._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Ensure you have a valid token variable in scope
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update promotion');
                }
                setShowLoader(false)
                return response.json();
            })
            .then(data => {
                console.log('Promotion created successfully', data);
                // Optionally reset form or provide further instructions to the user
                setShowLoader(false)
                toast({
                    title: "Promotion addedd ✅",
                    description: formData.name,
                })
                window.location.reload()
            })
            .catch(error => {
                console.error('Error creating promotion:', error);
                setShowLoader(false)
            });
    };

    const createDateObj = (date: string) => {
        let dateObj = new Date(date)
        return dateObj.toISOString().substr(0, 10);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="hover:bg-[#218B53] hover:text-white font-bold">
                    Update
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-gray-100">
                <DialogHeader className="">
                    <DialogTitle className="text-[#218B53] font-bold">
                        Update Promotion
                    </DialogTitle>
                    <Separator orientation="horizontal" className="bg-[#218B53]" />
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <Label htmlFor="name" className="my-1">
                            Name:
                        </Label>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Promotion Name"
                            className="py-2 text-sm"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label htmlFor="name" className="my-1">
                            Start Date:
                        </Label>
                        <Input
                            name="startDate"
                            type="date"
                            className="py-2 text-sm"
                            onChange={handleChange}
                            value={createDateObj(formData.startDate)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label htmlFor="name" className="my-1">
                            Start Date:
                        </Label>
                        <Input
                            name="endDate"
                            type="date"
                            className="py-2 text-sm"
                            onChange={handleChange}
                            value={createDateObj(formData.endDate)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <div className="flex flex-row items-center">
                            Credits
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><Question size={15} className="mx-1 mb-2 mr-4" /> </TooltipTrigger>
                                    <TooltipContent className="bg-[#218B53]">
                                        <p>1 Credit is same as 1 Ksh</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Input
                            name="creditAmount"
                            type="number"
                            className="py-2 text-sm"
                            onChange={handleChange}
                            value={formData.creditAmount}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label htmlFor="name" className="my-1">
                            Apply to:
                        </Label>
                        <Select required value={formData.apply_to} onValueChange={handleApplyChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select target</SelectLabel>
                                    <SelectItem value="NEW_USER">New users</SelectItem>
                                    <SelectItem value="ALL">All users</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label htmlFor="name" className="my-1">
                            Create unique Code:
                        </Label>
                        <Input
                            name="promo_code"
                            type="text"
                            placeholder="eg. WELCOME10"
                            className="py-2 text-sm uppercase"
                            onChange={handleChange}
                            value={formData.promo_code}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label htmlFor="name" className="my-1">
                            Set status:
                        </Label>
                        <Select required value={formData.status} onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">InActive</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <div className="flex flex-row items-center">
                            Set Maximum Users ( 0 for no limit)
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><Question size={15} className="mx-1 mb-2 mr-4" /> </TooltipTrigger>
                                    <TooltipContent className="bg-[#218B53]">
                                        <p>The maximum times this promo code can be applied. Put 0 to have no limit</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Input
                            name="max_user"
                            type="number"
                            className="py-2 text-sm"
                            onChange={handleChange}
                            value={formData.max_user}
                        />
                    </div>
                    <div>
                        <Button type="submit" className="bg-[#218B53] text-white hover:bg-[#218B53]/80 flex items-center">
                            Update Promotion
                            {showLoader &&
                                <Loader2 size={15} className="mx-1 animate-spin" />
                            }
                        </Button>
                    </div>
                </form>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
