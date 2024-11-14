import React, { createContext, useContext, useState } from 'react';

// Create the Language Context
const ModalContext = createContext();

// Provider component to wrap around your app
export const ModalProvider = ({ children }) => {
    const [showBookModal, setShowBookModal] = useState(false);

    return (
        <ModalContext.Provider value={{ showBookModal, setShowBookModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useBookModal = () => useContext(ModalContext);
