import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "./ResponsiveDialog";
import Link from "next/link";

interface AddEntityButtonProps {
  buttonLabel: string;
  dialogTitle: string;
  dialogDescription: string;
  url?: string;
}

export const AddEntityButton: React.FC<AddEntityButtonProps> = ({
  buttonLabel,
  dialogTitle,
  dialogDescription,
  url,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowDialog(!showDialog)} className="h-8 w-full md:w-auto">
        {buttonLabel}
      </Button>
      <ResponsiveDialog
        isOpen={showDialog}
        setIsOpen={setShowDialog}
        title={dialogTitle}
        description={dialogDescription}
      >
        {/* <FormComponent setShowDialog={setShowDialog} /> */}
        {url && <Link href={url}>{url}</Link>}
      </ResponsiveDialog>
    </>
  );
};
