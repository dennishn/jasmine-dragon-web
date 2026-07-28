export const ACCESS_TOKEN_COOKIE = "jd_access_token";

export function getApiBaseUrl(): string {
    return process.env.JD_API_BASE_URL ?? "http://localhost:3000/api/mock";
}

export function apiUrl(path: string): string {
    const base = getApiBaseUrl().replace(/\/$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${base}${normalizedPath}`;
}
