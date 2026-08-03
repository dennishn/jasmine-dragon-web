import { exchangeDiscordLoginCode as sdkExchangeDiscordLoginCode } from "@/lib/api/__generated/openapi.ts/sdk.gen";

type ExchangeDiscordCodeSuccess = {
    ok: true;
    accessToken: string;
    expiresAt: string;
};

type ExchangeDiscordCodeFailure = {
    ok: false;
    error: string;
};

type ExchangeDiscordCodeResult =
    ExchangeDiscordCodeSuccess | ExchangeDiscordCodeFailure;

const exchangeDiscordCode = async (
    code: string,
): Promise<ExchangeDiscordCodeResult> => {
    try {
        const { data, error } = await sdkExchangeDiscordLoginCode({
            body: { code },
        });

        if (error?.error || !data?.data.accessToken) {
            return {
                error:
                    error?.error?.message ?? "Failed to exchange Discord code",
                ok: false,
            };
        }

        return {
            ok: true,
            accessToken: data.data.accessToken,
            expiresAt: data.data.expiresAt,
        };
    } catch {
        return {
            error: "Failed to exchange Discord code",
            ok: false,
        };
    }
};

export { exchangeDiscordCode };
export type { ExchangeDiscordCodeResult };
