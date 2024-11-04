import { useState, useEffect } from 'react';
import './Reading.css';
import { useLanguage } from '../../context/LanguageContext';
import { useLectureId } from '../../context/LectureContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Word from '../word/Word';

const Reading = () => {
    const [reading, setReading] = useState({});
    const [dbWords, setDbWords] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    const { lectureId, setLectureId } = useLectureId();
    const { language } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLecture = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/lectures/id/${lectureId}`);
                setReading(response.data);
            } catch (error) {
                console.error('Error fetching the lecture:', error);
            }
        };

        const fetchWords = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/words/${language}`);
                setDbWords(response.data);
            } catch (error) {
                console.error('Error fetching the words:', error);
            }
        };

        fetchLecture();
        fetchWords();
    }, [lectureId]);

    const words = reading.text ? reading.text.split(/[\s.,!?;:()]+/) : [];

    const handleWordClick = (word) => {
        const wordInfo = dbWords.find(dbWord => dbWord.word === word.toLowerCase());
        setSelectedWord(wordInfo ? {...wordInfo, word:word, inDatabase:true}: {word, inDatabase:false});
    }

    const handleBackClick = () => {
        setLectureId("null");
        navigate('/library');
    }

    return (
        <div className="reading">
            <div className="reading-left">
                <div className="reading-left-top">
                    <i className="bi bi-arrow-left" onClick={handleBackClick}></i>
                    <h1>{reading.name}</h1>
                    <img src={`/assets/${language}.png`} alt='' className='reading-img'></img>
                </div>
                <br />
                <br />
                <div className="reading-text-bottom">
                    {words.map((word, index) => (
                        <Word key={index} word={word} onWordClick={handleWordClick} dbWords={dbWords} />
                    ))}
                </div>
            </div>
            <div className="reading-info">
                <div className="reading-info-word">
                    {selectedWord ? (
                        selectedWord.inDatabase ? (
                            <>
                                <h1>{selectedWord.word}</h1>
                                <br></br>
                                <p>Mastery: {selectedWord.mastery}</p>
                                <p>Word Type: {selectedWord.word_type}</p>
                                <p>Translations: {JSON.stringify(selectedWord.translations)}</p>
                                <p>Gender: {selectedWord.gender}</p>
                            </>
                        ) : (
                            <>
                                <h1>{selectedWord.word}</h1>
                                <br></br>
                                <p>Not in database</p>
                            </>
                        )
                    ) : (
                        <>
                            <p>Select a word to see details</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reading;
