"use client"

import DashboardContainer from "@/container/DashboardContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { convertToShortDateMonthDay, formatDateString } from "@/lib/utils";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import Affiliates from "./affiliates";
import Promotions from "./promotions";

type Billing = {
    _id: string,
    status: string,
    amount: number,
    billing_type: string;
    createdAt: string,
    updatedAt: string
}

export default function BillingPage() {
    const [billingUpdate, setBillingUpdate] = useState<Billing>()
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const getbilling = async () => {
        const response = await fetch(`${AtlasBackendApi}/wallet/billing`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "omit",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch billing data");
        }
        return response.json();
    };

    const { data: billingData, error: billingError, isLoading: billingIsLoading, refetch } = useQuery({
        queryKey: ["billing"],
        queryFn: getbilling,
    });
    console.log("billing data", billingData);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBillingUpdate((prevBillingUpdate) => ({
            ...prevBillingUpdate!,
            [name]: parseInt(value),
        }));
    };
    const updateStatus = (value: string) => {
        setBillingUpdate((prevBillingUpdate) => ({
            ...prevBillingUpdate!,
            status: value,
        }));
    };
    const showBillingDialog = (bill: any) => {
        setBillingUpdate(bill);
        setShowDialog(true);
    }

    const updateBilling = async () => {
        setShowLoader(true)
        const payload = {
            billingId: billingUpdate?._id,
            status: billingUpdate?.status,
            amount: billingUpdate?.amount
        }
        const response = await fetch(`${AtlasBackendApi}/wallet/billing`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            credentials: "omit",
        });
        if (!response.ok) {
            throw new Error("Failed to update billing data");
        }
        const result = await response.json();
        console.log('update billing', result)
        refetch();
        setShowLoader(false)
        setShowDialog(false);
        setBillingUpdate(undefined)
    }


    return (
        <DashboardContainer>
            <main className="m-3 rounded-lg p-3 bg-white shadow-md w-ful">
                <Tabs defaultValue="billing" className="w-full">
                    <TabsList>
                        <TabsTrigger value="billing">Atlas Billing</TabsTrigger>
                        <TabsTrigger value="promotions">Atlas Promotions</TabsTrigger>
                        <TabsTrigger value="affiliates">Atlas Affiliates</TabsTrigger>
                    </TabsList>
                    <TabsContent value="billing">
                        <div className="p-4 text-sm">
                            <h1>
                                Atlas uses these types of billing to charge the user.
                            </h1>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">UpdatedAt</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Billing</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {billingData && billingData.data.map((bill: Billing) => (
                                    <TableRow key={bill._id}>
                                        <TableCell className="font-medium">{convertToShortDateMonthDay(bill.updatedAt)}</TableCell>
                                        <TableCell className="capitalize">{bill.status}</TableCell>
                                        <TableCell>{bill.billing_type}</TableCell>
                                        <TableCell className="text-right">KES {bill.amount}</TableCell>
                                        <TableCell className="text-right">
                                            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                                                <DialogTrigger asChild>
                                                    <Button onClick={() => showBillingDialog(bill)} variant="outline" className="hover:bg-[#218B53] hover:text-white">Update</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit {bill.billing_type} Billing</DialogTitle>
                                                        <DialogDescription>
                                                            Make changes to billing. Click save when  done.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="name" className="text-right">
                                                                Amount (KES)
                                                            </Label>
                                                            <Input
                                                                id="amount"
                                                                name="amount"
                                                                className="bg-white col-span-3"
                                                                value={billingUpdate && billingUpdate.amount}
                                                                onChange={handleChange}
                                                                type="number"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="username" className="text-right">
                                                                Status
                                                            </Label>
                                                            <Select defaultValue={billingUpdate ? billingUpdate.status : bill.status} onValueChange={updateStatus}>
                                                                <SelectTrigger className={`w-[180px] ${bill.status === 'inactive' ? 'border-red-400' : 'border-[#218B53]'}`}>
                                                                    <SelectValue placeholder="Select a state" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Status</SelectLabel>
                                                                        <SelectItem value="active">Active</SelectItem>
                                                                        <SelectItem value="inactive">Inactive</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" className="flex items-center bg-[#218B53]" onClick={() => updateBilling()}>
                                                            Save changes
                                                            {showLoader &&
                                                                <Loader2 size={24} className="mx-2" />
                                                            }
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="promotions">
                        <div className="p-4 text-sm">
                            <h1>
                                Atlas uses these promotions to apply credits.
                            </h1>
                        </div>
                        <Promotions />
                    </TabsContent>
                    <TabsContent value="affiliates">
                        <div className="p-4 text-sm">
                            <h1>
                                These are Atlas affiliate users.
                            </h1>
                        </div>
                        <Affiliates />
                    </TabsContent>
                </Tabs>
            </main>
        </DashboardContainer>
    )
}