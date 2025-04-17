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
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function DeletePromo({ data }: { data: any }) {
    const { toast } = useToast()
    const [showLoader, setShowLoader] = useState(false)
    const { data: session } = useSession();


    const handleDeletePromo = () => {
        setShowLoader(true);
        const token = session?.user.accesstokens as unknown as string;
        const id = data?.original?._id as string;
        fetch(`${AtlasBackendApi}/admin/promotions/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete promotion');
                }
                setShowLoader(false);
                return response.json();
            })
            .then(data => {
                toast({
                    title: "Promotion deleted ✅"
                })
                window.location.reload();
                setShowLoader(false);
            })
            .catch(error => {
                console.error('Error deleting promotion:', error);
                setShowLoader(true);
                toast({
                    title: "⚠️ Something went wrong can not delete this promotion"
                })
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="mx-1">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Promotion: {data?.getValue('name')}</DialogTitle>
                    <DialogDescription>
                        This change is irreversable
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Button onClick={() => handleDeletePromo()}
                        variant={'destructive'} type="submit" className="flex items-center">
                        Delete Promotion
                        {showLoader &&
                            <Loader2 size={15} className="mx-1 animate-spin" />
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
