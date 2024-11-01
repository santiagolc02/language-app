import './Shelf.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../book/Book';
import { useLanguage } from '../../context/LanguageContext';

const Shelf = () => {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage(); // Get setLanguage from context

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
        <div className="shelf">
            <h1>Lectures in {language}</h1>
            <br />
            {loading ? (
                <p>Loading lectures...</p>
            ) : lectures.length > 0 ? (
                lectures.map((lecture) => (
                    <Book key={lecture.id}
                            LectureData = {lecture}>
                    </Book>
                ))
            ) : (
                <p>No lectures available for this language.</p>
            )}
        </div>
    )
}

export default Shelf
