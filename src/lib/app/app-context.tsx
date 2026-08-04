"use client";

import { createContext, useContext, useState } from "react";
import type { Team } from "../api/constants";

type AppContextType = {
    pageTitle: string;
    selectedTeam: Team | null;
    setPageTitle: (title: string) => void;
    setSelectedTeam: (team: Team | null) => void;
};

const initialState: AppContextType = {
    pageTitle: "Overview",
    selectedTeam: null,
    setPageTitle: () => {},
    setSelectedTeam: () => {},
};

const AppContext = createContext<AppContextType>(initialState);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [pageTitle, setPageTitle] = useState(initialState.pageTitle);
    const [selectedTeam, setSelectedTeam] = useState(initialState.selectedTeam);

    const value = {
        pageTitle,
        selectedTeam,
        setPageTitle,
        setSelectedTeam,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }

    return context;
};

export { AppProvider, useAppContext };
