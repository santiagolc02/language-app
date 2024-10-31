import './Lecture.css'
//import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Lecture = () => {
    const { language } = useLanguage(); // Get language from context

    return (
        <div className="lecture">
            <h1>{language}</h1>
        </div>
    )
}

export default Lecture
