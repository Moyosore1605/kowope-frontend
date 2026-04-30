import { createContext, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeSwitcher = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};