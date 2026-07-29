"use client";

import { useActionState } from "react";
import { signInAdmin } from "../admin-user-actions";
import {
    FieldGroup,
    FieldSet,
    FieldLabel,
    Field,
    FieldContent,
    FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";

type FormState = { error?: string } | null;

const action = async (
    _prev: FormState,
    formData: FormData,
): Promise<FormState> => {
    const result = await signInAdmin(formData);

    if (!result.ok) {
        return { error: result.error };
    }

    return null;
};

const AdminSignInForm = () => {
    const [state, formAction, isPending] = useActionState(action, null);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <FieldGroup>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="token">Token</FieldLabel>
                            <Input
                                type="text"
                                id="token"
                                name="token"
                                required
                                autoComplete="off"
                                defaultValue={token ?? undefined}
                            />
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending && <Spinner data-icon="inline-start" />}
                        {isPending ? "Signing in..." : "Sign In"}
                    </Button>
                </Field>
                {state?.error && (
                    <FieldContent>
                        <FieldError>{state.error}</FieldError>
                    </FieldContent>
                )}
            </FieldGroup>
        </form>
    );
};

AdminSignInForm.displayName = "AdminSignInForm";

export { AdminSignInForm };
