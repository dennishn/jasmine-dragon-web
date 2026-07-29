"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/ui/spinner";

const LogoutButton = (props: ComponentProps<typeof Button>) => {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            variant="outline"
            size="sm"
            {...props}
        >
            {pending && <Spinner data-icon="inline-start" />}
            Log out
        </Button>
    );
};

LogoutButton.displayName = "LogoutButton";

export { LogoutButton };
