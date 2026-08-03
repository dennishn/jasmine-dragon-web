"use client";

import {
    startTransition,
    useEffect,
    useEffectEvent,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxStatus,
} from "@/components/ui/combobox";
import { Spinner } from "@/components/ui/spinner";
import {
    type BattleNetItemSearchHit,
    type BattleNetItemSearchResponse,
    mapSearchResults,
} from "@/lib/battle-net/item-search-types";
import { WowheadTooltip } from "@/lib/wowhead/wowhead-tooltip";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 300;

type BattleNetItemSearchProps = {
    onValueChange?: (item: BattleNetItemSearchHit | null) => void;
    placeholder?: string;
};

declare global {
    interface Window {
        $WowheadPower?: {
            refreshLinks?: () => void;
        };
    }
}

function BattleNetItemSearch({
    onValueChange,
    placeholder = "Search items…",
}: BattleNetItemSearchProps) {
    const inputId = useId();
    const abortRef = useRef<AbortController | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [searchResults, setSearchResults] = useState<
        BattleNetItemSearchHit[]
    >([]);
    const [selectedValue, setSelectedValue] =
        useState<BattleNetItemSearchHit | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isDebouncing, setIsDebouncing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const trimmedSearchValue = searchValue.trim();
    const isSearching = isDebouncing || isLoading;

    const items = useMemo(() => {
        if (
            !selectedValue ||
            searchResults.some((item) => item.id === selectedValue.id)
        ) {
            return searchResults;
        }
        return [...searchResults, selectedValue];
    }, [searchResults, selectedValue]);

    const refreshWowheadLinks = useEffectEvent(() => {
        window.$WowheadPower?.refreshLinks?.();
    });

    useEffect(() => {
        if (searchResults.length === 0 && !selectedValue) {
            return;
        }
        const frame = requestAnimationFrame(() => {
            refreshWowheadLinks();
        });
        return () => cancelAnimationFrame(frame);
    }, [searchResults, selectedValue]);

    useEffect(() => {
        return () => {
            abortRef.current?.abort();
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    function runSearch(query: string) {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;
        setIsDebouncing(false);
        setIsLoading(true);

        void (async () => {
            setError(null);

            try {
                const url = new URL(
                    "/api/battle-net/items/search",
                    window.location.origin,
                );
                url.searchParams.set("q", query);

                const response = await fetch(url, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    const body = (await response.json().catch(() => null)) as {
                        error?: string;
                    } | null;
                    throw new Error(
                        body?.error ?? `Search failed (${response.status})`,
                    );
                }

                const payload =
                    (await response.json()) as BattleNetItemSearchResponse;

                if (controller.signal.aborted) {
                    return;
                }

                // Explore Blizzard payload shape in DevTools.
                // eslint-disable-next-line no-console -- intentional playground/debug logging
                console.log("[battle-net] item search response", payload);

                const hits = mapSearchResults(payload);
                // eslint-disable-next-line no-console -- intentional playground/debug logging
                console.log("[battle-net] mapped items", hits);

                startTransition(() => {
                    setSearchResults(hits);
                    setError(null);
                });
            } catch (searchError) {
                if (controller.signal.aborted) {
                    return;
                }
                const message =
                    searchError instanceof Error
                        ? searchError.message
                        : "Search failed";
                startTransition(() => {
                    setSearchResults([]);
                    setError(message);
                });
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        })();
    }

    function scheduleSearch(query: string) {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (query.length < MIN_QUERY_LENGTH) {
            abortRef.current?.abort();
            setSearchResults([]);
            setError(null);
            setIsDebouncing(false);
            return;
        }

        setIsDebouncing(true);
        debounceRef.current = setTimeout(() => {
            runSearch(query);
        }, DEBOUNCE_MS);
    }

    function getStatus() {
        if (isSearching) {
            return (
                <>
                    <Spinner />
                    Searching…
                </>
            );
        }

        if (error) {
            return error;
        }

        if (trimmedSearchValue.length < MIN_QUERY_LENGTH) {
            return selectedValue
                ? null
                : `Type at least ${MIN_QUERY_LENGTH} characters…`;
        }

        if (searchResults.length === 0) {
            return `No matches for “${trimmedSearchValue}”.`;
        }

        return null;
    }

    function getEmptyMessage() {
        if (
            trimmedSearchValue.length < MIN_QUERY_LENGTH ||
            isSearching ||
            searchResults.length > 0 ||
            error
        ) {
            return null;
        }
        return "Try a different search term.";
    }

    const status = getStatus();
    const emptyMessage = getEmptyMessage();

    return (
        <Combobox
            items={items}
            value={selectedValue}
            itemToStringLabel={(item) => item.name}
            isItemEqualToValue={(item, value) => item.id === value.id}
            filter={null}
            autoHighlight
            onOpenChangeComplete={(open) => {
                if (!open && selectedValue) {
                    setSearchResults([selectedValue]);
                }
            }}
            onValueChange={(next) => {
                setSelectedValue(next);
                onValueChange?.(next);
                setSearchValue("");
                setError(null);
                if (next) {
                    // eslint-disable-next-line no-console -- intentional playground/debug logging
                    console.log("[battle-net] selected item", next);
                }
            }}
            onInputValueChange={(nextSearchValue, { reason }) => {
                setSearchValue(nextSearchValue);

                if (nextSearchValue === "") {
                    abortRef.current?.abort();
                    if (debounceRef.current) {
                        clearTimeout(debounceRef.current);
                    }
                    setSearchResults([]);
                    setError(null);
                    setIsDebouncing(false);
                    return;
                }

                if (reason === "item-press") {
                    return;
                }

                scheduleSearch(nextSearchValue.trim());
            }}
        >
            <ComboboxInput
                id={inputId}
                placeholder={placeholder}
                showClear
                className="w-full"
            />
            <ComboboxContent aria-busy={isSearching || undefined}>
                <ComboboxStatus>{status}</ComboboxStatus>
                <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
                <ComboboxList>
                    {(item: BattleNetItemSearchHit) => (
                        <ComboboxItem key={item.id} value={item}>
                            <WowheadTooltip
                                itemId={item.id}
                                iconSize="tiny"
                                onClick={(event) => {
                                    event.preventDefault();
                                }}
                            >
                                {item.name}
                            </WowheadTooltip>
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}

export { BattleNetItemSearch };
export type { BattleNetItemSearchProps };
