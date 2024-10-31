import './Library.css'
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';
//import {motion} from 'framer-motion'

const Library = () => {
    const { language } = useLanguage(); // Get language from context
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLectures = async () => {
            setLoading(true);
            try {
                // Make an API call to fetch lectures for the selected language
                const response = await axios.get(`http://localhost:3001/lectures/${language}`);
                setLectures(response.data); // Store the lectures data
            } catch (error) {
                console.error('Error fetching lectures:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLectures();
    }, [language])

    return (
        <div className="library">
            <h1>Lectures in {language}</h1>
            <br></br>
            {loading ? (
                <p>Loading lectures...</p>
            ) : lectures.length > 0 ? (
                <ul className="lecture-list">
                    {lectures.map((lecture) => (
                        <li key={lecture.id} className="lecture-item">
                            <h2>{lecture.name}</h2>
                            <p>{lecture.text}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No lectures available for this language.</p>
            )}
        </div>
    )
}

export default Library
