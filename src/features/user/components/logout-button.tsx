"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/ui/spinner";
import { LogOutIcon } from "lucide-react";

const LogoutButton = (props: ComponentProps<typeof Button>) => {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            variant="outline"
            size="icon"
            {...props}
        >
            {pending && <Spinner data-icon="inline-start" />}
            <LogOutIcon className="size-4" />
        </Button>
    );
};

LogoutButton.displayName = "LogoutButton";

export { LogoutButton };
