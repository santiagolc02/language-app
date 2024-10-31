import React, { createContext, useContext, useState } from 'react';

// Create the Language Context
const LanguageContext = createContext();

// Provider component to wrap around your app
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('none');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook to use the LanguageContext easily
export const useLanguage = () => useContext(LanguageContext);
