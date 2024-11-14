import './Shelf.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../book/Book';
import BookAdd from '../bookAdd/BookAdd';
import { useLanguage } from '../../context/LanguageContext';

const Shelf = ({ setLectureId }) => {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage(); // Get setLanguage from context

    useEffect(() => {
        const fetchLectures = async () => {
            setLoading(true);
            try {
                // Make an API call to fetch lectures for the selected language
                const response = await axios.get(`http://localhost:3001/lectures/language/${language}`);
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
            {loading ? (
                <p>Loading lectures...</p>
            ) : lectures.length > 0 ? (
                <>
                    <BookAdd></BookAdd>
                    {lectures.map((lecture) => (
                        <Book key={lecture.id}
                                LectureData = {lecture}>
                        </Book>
                    ))}
                </>
            ) : (
                <BookAdd></BookAdd>
            )}
        </div>
    )
}

export default Shelf
