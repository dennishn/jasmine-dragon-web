# Jasmine Dragon — Frontend Discord Auth Handoff

## Backend URLs

- API: `https://ffnymsg0fb.execute-api.eu-north-1.amazonaws.com`
- Swagger: `https://ffnymsg0fb.execute-api.eu-north-1.amazonaws.com/docs`
- OpenAPI: `https://ffnymsg0fb.execute-api.eu-north-1.amazonaws.com/openapi.yaml`

## 1. Start Discord login

The login button must redirect the browser to:

```ts
const returnUrl = `${window.location.origin}/auth`;

window.location.assign(
    `/backend/auth/discord/start?returnUrl=${encodeURIComponent(returnUrl)}`,
);
```

Do not call Discord directly and do not use `fetch()` for this step.

## 2. Handle the callback

AWS redirects the browser back to:

```text
/auth?code=<one-time-code>
```

The `/auth` page must read the `code` query parameter and exchange it immediately:

```ts
const response = await fetch("/backend/auth/session/exchange", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
});
```

The code is short-lived and single-use.

## 3. Store the application session

Read the returned `data.accessToken` and store it for the current browser session:

```ts
sessionStorage.setItem("jasmineDragonAccessToken", result.data.accessToken);
```

Remove the one-time code from the visible URL after reading it:

```ts
window.history.replaceState({}, "", "/auth");
```

## 4. Authenticate API requests

Include the application token in later requests:

```ts
const token = sessionStorage.getItem("jasmineDragonAccessToken");

const response = await fetch("/backend/me", {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
```

After `/me` succeeds, redirect to `/dashboard`.

## 5. Vercel rewrite

Set this Vercel environment variable:

```text
AWS_API_BASE_URL=https://ffnymsg0fb.execute-api.eu-north-1.amazonaws.com
```

Configure `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: `${process.env.AWS_API_BASE_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
```

## Important

- The frontend does not need a Discord client secret.
- The frontend does not receive Discord access tokens.
- The backend verifies Jasmine Dragon membership and officer roles.
- Authenticated API requests use `Authorization: Bearer <accessToken>`.
- Discord bot publishing remains disabled and is unrelated to website login.
