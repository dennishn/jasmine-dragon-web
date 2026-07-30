import {
    createEncounterTemplate as sdkCreateEncounterTemplate,
    updateEncounterTemplate as sdkUpdateEncounterTemplate,
    deleteEncounterTemplate as sdkDeleteEncounterTemplate,
} from "@/lib/api/__generated/openapi.ts/sdk.gen";
import {
    zCreateEncounterTemplateBody,
    zUpdateEncounterTemplateBody,
} from "@/lib/api/__generated/openapi.ts/zod.gen";
import { updateTag } from "next/cache";

const createTemplate = async (data: FormData) => {
    const parsed = zCreateEncounterTemplateBody.safeParse({
        name: data.get("name"),
        instanceName: data.get("instanceName"),
        bossKey: data.get("bossKey"),
        bossName: data.get("bossName"),
        generalNotes: data.get("generalNotes"),
        tankTargetLabels: data.get("tankTargetLabels"),
        healGroupLabels: data.get("healGroupLabels"),
        interruptLabels: data.get("interruptLabels"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const {
        name,
        instanceName,
        bossKey,
        bossName,
        generalNotes,
        tankTargetLabels,
        healGroupLabels,
        interruptLabels,
    } = parsed.data;

    try {
        const { data, error } = await sdkCreateEncounterTemplate({
            body: {
                name,
                instanceName,
                bossKey,
                bossName,
                generalNotes,
                tankTargetLabels,
                healGroupLabels,
                interruptLabels,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to create template",
                ok: false as const,
            };
        }

        updateTag("templates");

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to create template", ok: false as const };
    }
};

const updateTemplate = async (templateId: string, data: FormData) => {
    const parsed = zUpdateEncounterTemplateBody.safeParse({
        name: data.get("name"),
        instanceName: data.get("instanceName"),
        bossKey: data.get("bossKey"),
        bossName: data.get("bossName"),
        generalNotes: data.get("generalNotes"),
        tankTargetLabels: data.get("tankTargetLabels"),
        healGroupLabels: data.get("healGroupLabels"),
        interruptLabels: data.get("interruptLabels"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message, ok: false as const };
    }

    const {
        name,
        instanceName,
        bossKey,
        bossName,
        generalNotes,
        tankTargetLabels,
        healGroupLabels,
        interruptLabels,
    } = parsed.data;

    try {
        const { data, error } = await sdkUpdateEncounterTemplate({
            path: {
                templateId,
            },
            body: {
                name,
                instanceName,
                bossKey,
                bossName,
                generalNotes,
                tankTargetLabels,
                healGroupLabels,
                interruptLabels,
            },
        });

        if (error?.error || !data?.data) {
            return {
                error: error?.error?.message ?? "Failed to update template",
                ok: false as const,
            };
        }

        updateTag(`template:${templateId}`);
        updateTag("templates");

        return { ok: true as const, data: data?.data };
    } catch {
        return { error: "Failed to update template", ok: false as const };
    }
};

const deleteTemplate = async (templateId: string) => {
    try {
        const { error } = await sdkDeleteEncounterTemplate({
            path: {
                templateId,
            },
        });

        if (error?.error) {
            return {
                error: error?.error?.message ?? "Failed to delete template",
                ok: false as const,
            };
        }

        updateTag(`template:${templateId}`);
        updateTag("templates");

        return { ok: true as const };
    } catch {
        return { error: "Failed to delete template", ok: false as const };
    }
};

export { createTemplate, updateTemplate, deleteTemplate };
