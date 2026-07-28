import { apiUrl } from "@/lib/auth/config";
import { getAccessToken } from "@/lib/auth/cookies";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/lib/auth/types";

export class ApiError extends Error {
    readonly status: number;
    readonly code: string;
    readonly details: unknown;

    constructor(status: number, body: ApiErrorResponse["error"]) {
        super(body.message);
        this.name = "ApiError";
        this.status = status;
        this.code = body.code;
        this.details = body.details;
    }
}

export async function fetchApi<T>(
    path: string,
    init: RequestInit = {},
): Promise<T> {
    const token = await getAccessToken();
    const headers = new Headers(init.headers);

    if (!headers.has("Content-Type") && init.body) {
        headers.set("Content-Type", "application/json");
    }

    if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(apiUrl(path), {
        ...init,
        headers,
        cache: "no-store",
    });

    if (response.status === 204) {
        return undefined as T;
    }

    const body = (await response.json()) as
        ApiSuccessResponse<T> | ApiErrorResponse;

    if (!response.ok) {
        const errorBody =
            "error" in body
                ? body.error
                : {
                      code: "unknown_error",
                      message: "Request failed.",
                      details: null,
                  };
        throw new ApiError(response.status, errorBody);
    }

    if (!("data" in body)) {
        throw new ApiError(500, {
            code: "invalid_response",
            message: "API response was missing a data field.",
            details: null,
        });
    }

    return body.data;
}
