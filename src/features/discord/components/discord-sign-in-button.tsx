import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/styles/utils";

const DiscordSignInButton = () => {
    return (
        <a
            href="/auth/discord"
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
        >
            Sign in with Discord
        </a>
    );
};

DiscordSignInButton.displayName = "DiscordSignInButton";

export { DiscordSignInButton };
