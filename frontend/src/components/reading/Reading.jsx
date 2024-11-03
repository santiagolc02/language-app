import { useState, useEffect } from 'react';
import './Reading.css';
import { useLanguage } from '../../context/LanguageContext';
import { useLectureId } from '../../context/LectureContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Word from '../word/Word';

const Reading = () => {
    const [reading, setReading] = useState({});
    //const [words, setWords] = useState([]);
    const [word, setWord] = useState("");
    const { lectureId, setLectureId } = useLectureId();
    const { language } = useLanguage();
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchLecture = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/lectures/id/${lectureId}`);
                setReading(response.data);
            } catch (error) {
                console.error('Error fetching the lecture:', error);
            }
        };

        fetchLecture();
    }, [lectureId]);

    // If reading.text exists, split it into words
    const words = reading.text ? reading.text.split(/[\s.,!?;:()]+/) : [];

    const handleClick = () => {
        setLectureId("null")
        navigate('/library');

    }

    return (
        <div className="reading">
            <div className="reading-left">
                <div className="reading-left-top">
                    <i class="bi bi-arrow-left" onClick={handleClick}></i>
                    <h1>{reading.name}</h1>
                    <img src={`/assets/${language}.png`} alt='' className='reading-img'></img>
                </div>
                <br></br>
                <br></br>
                <div className="reading-text-bottom">
                    {words.map((word, index) => (
                        <Word key={index} word={word} setWord={setWord}/>
                    ))}
                </div>
            </div>
            <div className="reading-info">
                <div className="reading-info-word">
                    <h1>{word}</h1>
                </div>
            </div>
        </div>
    );
};

export default Reading;
