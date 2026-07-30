import {
    listEncounterTemplates,
    getEncounterTemplate as sdkGetEncounterTemplate,
} from "@/lib/api/__generated/openapi.ts/sdk.gen";
import { cacheTag } from "next/cache";

const getTemplates = async () => {
    "use cache";
    cacheTag("templates");

    try {
        const { data, error } = await listEncounterTemplates();

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get templates",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get templates", ok: false as const };
    }
};

const getTemplateById = async (templateId: string) => {
    "use cache";
    cacheTag(`template:${templateId}`);

    try {
        const { data, error } = await sdkGetEncounterTemplate({
            path: {
                templateId,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to get template",
                ok: false as const,
            };
        }

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to get template", ok: false as const };
    }
};

export { getTemplates, getTemplateById };
