"use client";

import { AlertDialog,AlertDialogAction,AlertDialogContent,AlertDialogCancel,AlertDialogDescription,AlertDialogHeader,AlertDialogFooter,AlertDialogTitle,AlertDialogTrigger } from "./ui/alert-dialog";

interface ConfirmModelProps {
    children: React.ReactNode;
    header:string;
    description: string;
    disabled: boolean;
    onConfirm: () => void;
}

export const ConfirmModel = ({ children, header, description, disabled, onConfirm }: ConfirmModelProps) => {
    const handleConfirm = () => {
        onConfirm();
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                     <AlertDialogTitle>
                        {header}
                     </AlertDialogTitle>
                     <AlertDialogDescription>
                        {description}
                     </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        cancel
                    </AlertDialogCancel>
                    <AlertDialogAction disabled={disabled} onClick={handleConfirm}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}