import { useState, useEffect } from 'react';
import axios from 'axios';
import './BookModal.css'
import { useBookModal } from '../../context/ModalContext';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

const BookModal = ({ updateLectures }) => {
    const { setShowBookModal } = useBookModal(); // Get setLanguage from context
    const [lectureName, setLectureName] = useState("");
    const [lectureText, setLectureText] = useState("");
    const [lectureLevel, setLectureLevel] = useState("A1");
    const [levels, setLevels] = useState([]);
    const [lectureLink, setLectureLink] = useState("");
    const { language } = useLanguage();

    useEffect(() => {
        const fetchLevels = async () => {
            try {
                const response = await axios.get('http://localhost:3001/enum/levels/');
                setLevels(response.data);
                console.log(levels)
            } catch (error) {
                console.error('Error fetching the levels:', error);
            }
        };

        fetchLevels();
    }, []);

    const handleLectureRegistration = async(e) => {
        e.preventDefault()
        try {
            const newLecture = {
                name: lectureName,
                text: lectureText,
                language,
                level: lectureLevel,
                videoUrl: lectureLink
            };
            await axios.post(`http://localhost:3001/lectures/${language}/add`, newLecture);

            // Reset all state
            setLectureName("");
            setLectureText("");
            setLectureLevel("");
            setLectureLink("");
            setShowBookModal(false);
            updateLectures();
    
            console.log("Lecture registered successfully!");
        } catch (error) {
            console.error("Error registering the lecture:", error);
        }
    }

    const closeModal = () => {
        setShowBookModal(false)
    };

    const handleClick = () => {
        updateLectures();
    }

    return (
        <div className="book-modal-overlay" onMouseDown={closeModal}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} 
            className="book-modal" onMouseDown={(e) => e.stopPropagation()}>
                <h1 className="book-modal-title">New lecture in {language.toLowerCase()}: {lectureName}</h1>
                <br />
                <form className='book-modal-form' onSubmit={handleLectureRegistration}>
                    <label className='book-modal-label'>Title</label>
                    <input className='book-modal-name' 
                        type="text" 
                        value={lectureName} 
                        onChange={(e) => setLectureName(e.target.value)}>
                    </input>
                    <br />

                    <label className='book-modal-label'>Text</label>
                    <textarea className='book-modal-textarea' 
                        value={lectureText} 
                        onChange={(e) => setLectureText(e.target.value)}>
                    </textarea>
                    <br />

                    <label className='book-modal-label'>Level</label>
                    <select className='book-modal-select' value={lectureLevel} onChange={(e) => setLectureLevel(e.target.value)}>
                        {levels.map((level, index) => (
                            <option key={index} value={level.enumlabel} className='book-modal-select-text'>
                                {level.enumlabel}
                            </option>
                        ))}
                    </select>
                    <br />

                    <label className='book-modal-label'>Youtube Link</label>
                    <input className='book-modal-link'
                        value={lectureLink} 
                        onChange={(e) => setLectureLink(e.target.value)}>
                    </input>
                    <br />
                    <button type='submit' className='book-modal-button' onClick={handleClick}>Submit</button>
                </form>
            </motion.div>
        </div>
    )
}

export default BookModal
