import { useState, useEffect } from 'react';
import axios from 'axios';
import './Library.css'
import Navbar from '../navbar/Navbar';
import Shelf from '../shelf/Shelf';
import BookModal from '../bookModal/BookModal';
import BookDesc from '../bookDesc/BookDesc';
import { useBookModal } from '../../context/ModalContext';
import { useLanguage } from '../../context/LanguageContext';

const Library = () => {
    const { language } = useLanguage(); // Get setLanguage from context
    const { showBookModal } = useBookModal(); // Get setLanguage from context
    const [lectures, setLectures] = useState([])
    const [loading, setLoading] = useState(true);
    const [libraryState, setLibraryState] = useState("Lectures");

    useEffect(() => {
        fetchLectures()
    }, [])

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

    const updateLectures = () => {
        fetchLectures();
    }

    return (
        <>
            {showBookModal && (
            <BookModal updateLectures={updateLectures}/>
            )}
            <div className="library">
                <div className="library-left">
                    <div className="library-left-upper">
                        <Navbar></Navbar>
                        <div className="library-text-flag">
                            <h1 style={{fontSize: '1.2rem'}}>Lectures in {language}</h1>
                        </div>
                    </div>
                    <Shelf lectures={lectures} loading={loading}></Shelf>
                </div>
                <div className="library-right">
                    <BookDesc></BookDesc>
                </div>
            </div>
        </>
    )
}

export default Library
