import { getCurrentUser } from "@/lib/api/__generated/openapi.ts/sdk.gen";

const UserDebug = async () => {
    const { data } = await getCurrentUser();
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

UserDebug.displayName = "UserDebug";

export { UserDebug };
