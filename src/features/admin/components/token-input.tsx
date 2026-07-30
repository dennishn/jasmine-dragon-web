"use client";

import type { ComponentProps } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

type TokenInputProps = ComponentProps<typeof Input>;

const TokenInput = (props: TokenInputProps) => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    return <Input {...props} defaultValue={token ?? undefined} />;
};

TokenInput.displayName = "TokenInput";

const TokenInputGhost = () => {
    return <Input readOnly />;
};

TokenInputGhost.displayName = "TokenInputGhost";

export { TokenInput, TokenInputGhost };
