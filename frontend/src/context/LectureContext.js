import React, { createContext, useContext, useState } from 'react';

// Create the Language Context
const LectureContext = createContext();

// Provider component to wrap around your app
export const LectureIdProvider = ({ children }) => {
    const [lectureId, setLectureId] = useState('null');

    return (
        <LectureContext.Provider value={{ lectureId, setLectureId }}>
            {children}
        </LectureContext.Provider>
    );
};

export const useLectureId = () => useContext(LectureContext);
