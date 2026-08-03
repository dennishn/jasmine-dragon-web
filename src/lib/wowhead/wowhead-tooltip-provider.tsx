import Script from "next/script";

/**
 * Loads Wowhead after the page is idle (`lazyOnload`).
 * Running earlier mutates <a> children before React hydrates → mismatch.
 */
const WowheadTooltipProvider = () => {
    return (
        <>
            <Script id="wowhead-tooltip-config" strategy="afterInteractive">
                {`window.whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: false};`}
            </Script>
            <Script
                src="https://wow.zamimg.com/js/tooltips.js"
                strategy="lazyOnload"
            />
        </>
    );
};

export default WowheadTooltipProvider;
