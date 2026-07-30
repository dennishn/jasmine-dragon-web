"use client";

import { Suspense, useActionState } from "react";
import { exchangeBootstrapAdminToken } from "../admin-actions";
import {
    FieldGroup,
    FieldSet,
    FieldLabel,
    Field,
    FieldContent,
    FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TokenInput, TokenInputGhost } from "./token-input";

type FormState = { error?: string } | null;

const action = async (
    _prev: FormState,
    formData: FormData,
): Promise<FormState> => {
    const result = await exchangeBootstrapAdminToken(formData);

    if (!result.ok) {
        return { error: result.error };
    }

    return null;
};

const AdminSignInForm = () => {
    const [state, formAction, isPending] = useActionState(action, null);

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <FieldGroup>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="token">Token</FieldLabel>
                            <Suspense fallback={<TokenInputGhost />}>
                                <TokenInput
                                    type="text"
                                    id="token"
                                    name="token"
                                    required
                                    autoComplete="off"
                                />
                            </Suspense>
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
