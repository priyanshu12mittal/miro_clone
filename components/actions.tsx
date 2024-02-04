"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModel } from "./confirm-model";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-model";

interface ActionsProps {
    children:React.ReactNode;
    side?:DropdownMenuContentProps["side"];
    sideOffset?:DropdownMenuContentProps["sideOffset"];
    id:string;
    title:string;
};

export const Actions = ({children,side,sideOffset,id,title}:ActionsProps)=>{
    const {onOpen} = useRenameModal();
    const {mutate,pending} = useApiMutation(api.board.remove);
    const onCopyLink = ()=>{
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`).then(()=>toast.success("Copied to clipboard")).catch(()=>toast.error("Failed to copy to clipboard"));
    }
    const onDelete = ()=>{
        mutate({id}).then(()=>toast.success("Board deleted")).catch(()=>toast.error("Failed to delete board"));
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e)=>e.stopPropagation()} className=" w-60" side={side} sideOffset={sideOffset}>
                <DropdownMenuItem className=" p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className=" w-4 h-4 mr-2" strokeWidth={2} />
                    Copy board Link
                </DropdownMenuItem>
                <DropdownMenuItem className=" p-3 cursor-pointer" onClick={()=>onOpen(id,title)}>
                    <Pencil className=" w-4 h-4 mr-2" strokeWidth={2} />
                    Rename
                </DropdownMenuItem>
                <ConfirmModel header="Delete Board?" description="Are you sure you want to delete this board?" onConfirm={onDelete} disabled={pending}>
                    <Button variant="ghost" className=" p-3 cursor-pointer text-sm w-full justify-start font-normal">
                        <Trash2 className=" w-4 h-4 mr-2" strokeWidth={2} />
                        Delete
                    </Button>
                </ConfirmModel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}