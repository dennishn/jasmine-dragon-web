import { ThemeToggle } from "@/components/theme-toggle";

const CORE_COLORS = [
    { token: "background", className: "bg-background text-foreground" },
    { token: "foreground", className: "bg-foreground text-background" },
    { token: "card", className: "bg-card text-card-foreground" },
    { token: "popover", className: "bg-popover text-popover-foreground" },
    { token: "primary", className: "bg-primary text-primary-foreground" },
    { token: "secondary", className: "bg-secondary text-secondary-foreground" },
    { token: "muted", className: "bg-muted text-muted-foreground" },
    { token: "accent", className: "bg-accent text-accent-foreground" },
    {
        token: "destructive",
        className: "bg-destructive text-destructive-foreground",
    },
    { token: "border", className: "bg-border text-foreground" },
    { token: "input", className: "bg-input text-foreground" },
    { token: "ring", className: "bg-ring text-primary-foreground" },
] as const;

const CHART_COLORS = [
    { token: "chart-1", className: "bg-chart-1" },
    { token: "chart-2", className: "bg-chart-2" },
    { token: "chart-3", className: "bg-chart-3" },
    { token: "chart-4", className: "bg-chart-4" },
    { token: "chart-5", className: "bg-chart-5" },
] as const;

const SIDEBAR_COLORS = [
    { token: "sidebar", className: "bg-sidebar text-sidebar-foreground" },
    {
        token: "sidebar-primary",
        className: "bg-sidebar-primary text-sidebar-primary-foreground",
    },
    {
        token: "sidebar-accent",
        className: "bg-sidebar-accent text-sidebar-accent-foreground",
    },
    { token: "sidebar-border", className: "bg-sidebar-border text-foreground" },
    {
        token: "sidebar-ring",
        className: "bg-sidebar-ring text-primary-foreground",
    },
] as const;

const CLASS_COLORS = [
    {
        token: "class-death-knight",
        label: "Death Knight",
        className: "bg-class-death-knight",
    },
    {
        token: "class-demon-hunter",
        label: "Demon Hunter",
        className: "bg-class-demon-hunter",
    },
    { token: "class-druid", label: "Druid", className: "bg-class-druid" },
    { token: "class-evoker", label: "Evoker", className: "bg-class-evoker" },
    { token: "class-hunter", label: "Hunter", className: "bg-class-hunter" },
    { token: "class-mage", label: "Mage", className: "bg-class-mage" },
    { token: "class-monk", label: "Monk", className: "bg-class-monk" },
    { token: "class-paladin", label: "Paladin", className: "bg-class-paladin" },
    { token: "class-priest", label: "Priest", className: "bg-class-priest" },
    { token: "class-rogue", label: "Rogue", className: "bg-class-rogue" },
    { token: "class-shaman", label: "Shaman", className: "bg-class-shaman" },
    { token: "class-warlock", label: "Warlock", className: "bg-class-warlock" },
    { token: "class-warrior", label: "Warrior", className: "bg-class-warrior" },
] as const;

const RADII = [
    { token: "radius-sm", className: "rounded-sm", scale: "0.6×" },
    { token: "radius-md", className: "rounded-md", scale: "0.8×" },
    { token: "radius-lg", className: "rounded-lg", scale: "1×" },
    { token: "radius-xl", className: "rounded-xl", scale: "1.4×" },
    { token: "radius-2xl", className: "rounded-2xl", scale: "1.8×" },
    { token: "radius-3xl", className: "rounded-3xl", scale: "2.2×" },
    { token: "radius-4xl", className: "rounded-4xl", scale: "2.6×" },
] as const;

const TRACKING = [
    { token: "tracking-tighter", className: "tracking-tighter" },
    { token: "tracking-tight", className: "tracking-tight" },
    { token: "tracking-normal", className: "tracking-normal" },
    { token: "tracking-wide", className: "tracking-wide" },
    { token: "tracking-wider", className: "tracking-wider" },
    { token: "tracking-widest", className: "tracking-widest" },
] as const;

const ICON_SIZES = [
    { token: "icon-tiny", className: "icon-tiny", size: "20px" },
    { token: "icon-small", className: "icon-small", size: "26px" },
    { token: "icon-medium", className: "icon-medium", size: "44px" },
    { token: "icon-large", className: "icon-large", size: "68px" },
] as const;

const SHADOWS = [
    { token: "shadow-2xs", className: "shadow-2xs" },
    { token: "shadow-xs", className: "shadow-xs" },
    { token: "shadow-sm", className: "shadow-sm" },
    { token: "shadow", className: "shadow" },
    { token: "shadow-md", className: "shadow-md" },
    { token: "shadow-lg", className: "shadow-lg" },
    { token: "shadow-xl", className: "shadow-xl" },
    { token: "shadow-2xl", className: "shadow-2xl" },
] as const;

const SPACING_STEPS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16] as const;

function Section({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium">{title}</h2>
                {description ? (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                ) : null}
            </div>
            {children}
        </section>
    );
}

function TokenMeta({ token, hint }: { token: string; hint?: string }) {
    return (
        <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate font-mono text-xs">{token}</span>
            {hint ? (
                <span className="truncate text-xs text-muted-foreground">
                    {hint}
                </span>
            ) : null}
        </div>
    );
}

function ColorSwatch({
    token,
    className,
    label,
}: {
    token: string;
    className: string;
    label?: string;
}) {
    return (
        <div className="flex flex-col gap-2">
            <div
                className={`flex h-16 items-end rounded-lg border border-border p-2 ${className}`}
            >
                <span className="text-xs font-medium opacity-90">Aa</span>
            </div>
            <TokenMeta token={token} hint={label} />
        </div>
    );
}

export default function DesignTokensPage() {
    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-12 p-8 pb-24">
            <header className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-medium">Design Tokens</h1>
                    <p className="text-sm text-muted-foreground">
                        Live preview of tokens from{" "}
                        <code className="font-mono text-foreground">
                            src/styles/theme.css
                        </code>
                        . Toggle theme to compare light and dark values.
                    </p>
                </div>
                <ThemeToggle />
            </header>

            <Section
                title="Core colors"
                description="Semantic surface and content colors."
            >
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {CORE_COLORS.map((color) => (
                        <ColorSwatch key={color.token} {...color} />
                    ))}
                </div>
            </Section>

            <Section title="Chart colors">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                    {CHART_COLORS.map((color) => (
                        <ColorSwatch key={color.token} {...color} />
                    ))}
                </div>
            </Section>

            <Section title="Sidebar colors">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                    {SIDEBAR_COLORS.map((color) => (
                        <ColorSwatch key={color.token} {...color} />
                    ))}
                </div>
            </Section>

            <Section
                title="Class colors"
                description="WoW class colors — darkened in light mode for contrast."
            >
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {CLASS_COLORS.map((color) => (
                        <ColorSwatch key={color.token} {...color} />
                    ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 rounded-lg border border-border bg-card p-4">
                    {CLASS_COLORS.map((color) => (
                        <span
                            key={color.token}
                            className="text-sm font-medium"
                            style={{ color: `var(--${color.token})` }}
                        >
                            {color.label}
                        </span>
                    ))}
                </div>
            </Section>

            <Section
                title="Radius"
                description="Derived from --radius (0.5rem)."
            >
                <div className="flex flex-wrap items-end gap-6">
                    {RADII.map((radius) => (
                        <div
                            key={radius.token}
                            className="flex flex-col items-center gap-2"
                        >
                            <div
                                className={`size-16 border border-border bg-primary ${radius.className}`}
                            />
                            <TokenMeta
                                token={radius.token}
                                hint={radius.scale}
                            />
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Typography">
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
                        <TokenMeta token="font-sans" hint="Inter, system-ui" />
                        <p className="font-sans text-lg">The quick brown fox</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
                        <TokenMeta token="font-serif" hint="Georgia, serif" />
                        <p className="font-serif text-lg">
                            The quick brown fox
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
                        <TokenMeta token="font-mono" hint="monospace" />
                        <p className="font-mono text-lg">The quick brown fox</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">
                        Letter spacing
                    </p>
                    {TRACKING.map((track) => (
                        <div
                            key={track.token}
                            className="flex items-baseline justify-between gap-4"
                        >
                            <span className={`text-base ${track.className}`}>
                                Letter spacing sample
                            </span>
                            <TokenMeta token={track.token} />
                        </div>
                    ))}
                </div>
            </Section>

            <Section
                title="Icon sizes"
                description="Custom icon-* utility mapped to --icon-size-*."
            >
                <div className="flex flex-wrap items-end gap-8">
                    {ICON_SIZES.map((icon) => (
                        <div
                            key={icon.token}
                            className="flex flex-col items-center gap-2"
                        >
                            <div
                                className={`rounded-md bg-primary ${icon.className}`}
                            />
                            <TokenMeta token={icon.token} hint={icon.size} />
                        </div>
                    ))}
                </div>
            </Section>

            <Section
                title="Spacing"
                description="Base --spacing is 0.25rem. Bars show n × spacing."
            >
                <div className="flex flex-col gap-2">
                    {SPACING_STEPS.map((step) => (
                        <div key={step} className="flex items-center gap-3">
                            <span className="w-10 shrink-0 font-mono text-xs text-muted-foreground">
                                {step}
                            </span>
                            <div
                                className="h-3 rounded-sm bg-primary"
                                style={{
                                    width: `calc(var(--spacing) * ${step})`,
                                }}
                            />
                            <span className="font-mono text-xs text-muted-foreground">
                                {step * 0.25}rem
                            </span>
                        </div>
                    ))}
                </div>
            </Section>

            <Section
                title="Shadows"
                description="Currently transparent (shadow-opacity: 0)."
            >
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {SHADOWS.map((shadow) => (
                        <div
                            key={shadow.token}
                            className={`flex h-20 items-end rounded-lg border border-border bg-card p-3 ${shadow.className}`}
                        >
                            <TokenMeta token={shadow.token} />
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
