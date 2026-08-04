"use client";

import { useAppContext } from "./app-context";

const AppPageTitle = () => {
    const { pageTitle } = useAppContext();

    return <h1 className="text-sm">{pageTitle}</h1>;
};

export { AppPageTitle };
