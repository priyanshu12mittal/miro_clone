"use client";

import { useRenameModal } from "@/store/use-rename-model";
import { Dialog,DialogContent,DialogTrigger,DialogClose,DialogHeader,DialogFooter,DialogTitle,DialogDescription } from "../ui/dialog";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = ()=>{
    const {mutate,pending} = useApiMutation(api.board.update);
    const {isOpen,onClose,initialValues} = useRenameModal();
    const [title,setTitle] = useState(initialValues.title);
    useEffect(()=>{
        setTitle(initialValues.title);
    },[initialValues]);
    const onSubmit:FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault();
        mutate({
            id:initialValues.id,
            title
        }).then(()=>{toast.success("Board title updated");onClose();}).catch(()=>toast.error("Failed to update board title"));
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board Title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for your board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input disabled={pending} required maxLength={60} value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Board title" />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}