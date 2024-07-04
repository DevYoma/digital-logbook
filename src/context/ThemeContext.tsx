import { createContext, useContext, useState } from "react";

type ChildProp = {
    children: React.ReactNode;
}

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }: ChildProp) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useUserTheme = () => {
    const userTheme = useContext(ThemeContext);

    if (!userTheme) {
        throw new Error('useUserTheme must be used within a ThemeProvider');
    }

    return userTheme;
}

// website landing page default color => BLACK