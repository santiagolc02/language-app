import { useState, useEffect } from 'react';
import axios from 'axios';
import './Library.css'
import Navbar from '../navbar/Navbar';
import Shelf from '../shelf/Shelf';
import BookModal from '../bookModal/BookModal';
import BookDesc from '../bookDesc/BookDesc';
import { useBookModal } from '../../context/ModalContext';
import { useLanguage } from '../../context/LanguageContext';
import VocabWord from '../vocabWord/VocabWord';
import { motion } from 'framer-motion';


const Library = () => {
    const { language } = useLanguage(); // Get setLanguage from context
    const { showBookModal } = useBookModal(); // Get setLanguage from context
    const [lectures, setLectures] = useState([])
    const [loading, setLoading] = useState(true);
    const [libraryState, setLibraryState] = useState("lectures");
    //const [vocabulary, setVocabulary] = useState([]);
    const [leftColumn, setLeftColumn] = useState([]);
    const [rightColumn, setRightColumn] = useState([]);
    const [middleColumn, setMiddleColumn] = useState([]);

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

    useEffect(() => {
        fetchWords()
    }, [])

    const fetchWords = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/words/${language}`);
            const words = response.data;
    
            // Distribute words into columns based on their mastery level
            const noviceWords = [];
            const intermediateWords = [];
            const expertWords = [];
    
            words.forEach((word) => {
                switch (word.mastery) {
                    case 'Novice':
                        noviceWords.push(word);
                        break;
                    case 'Intermediate':
                        intermediateWords.push(word);
                        break;
                    case 'Expert':
                        expertWords.push(word);
                        break;
                    default:
                        console.warn(`Unknown mastery level for word: ${word.word}`);
                }
            });
    
            // Update state with the distributed words
            setLeftColumn(noviceWords);
            setMiddleColumn(intermediateWords);
            setRightColumn(expertWords);
        } catch (error) {
            console.error('Error fetching the words:', error);
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
                    <Navbar libraryState={libraryState} 
                    setLibraryState={setLibraryState}></Navbar>

                    {libraryState === 'lectures' ? (
                        <motion.div key="lectures" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <div className="library-middle">
                                <h1 style={{fontSize: '1.2rem'}}>Lectures in {language}</h1>
                            </div>
                            <Shelf lectures={lectures} loading={loading}></Shelf>
                        </motion.div>
                    ) : (
                        <motion.div key="vocabulary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            {/* <div className="library-middle">
                                <input></input>
                            </div> */}
                            <div className="library-vocabulary">
                                <div className="library-vocabulary-left">
                                    <div>
                                        <h2>Novice {`(${leftColumn.length})`}</h2>
                                    </div>
                                    <br />
                                    <div className="library-vocabulary-words">
                                        {leftColumn.map((item, index) => (
                                            <VocabWord key={index} item={item} />
                                        ))}
                                    </div>
                                </div>
                                <div className="library-vocabulary-middle">
                                    <div>
                                        <h2>Familiar {`(${middleColumn.length})`}</h2>
                                    </div>
                                    <br />
                                    <div className="library-vocabulary-words">
                                        {middleColumn.map((item, index) => (
                                            <VocabWord key={index} item={item} />
                                        ))}
                                    </div>
                                </div>
                                <div className="library-vocabulary-right">
                                    <div>
                                        <h2>Expert {`(${rightColumn.length})`}</h2>
                                    </div>
                                    <br />
                                    <div className="library-vocabulary-words">
                                        {rightColumn.map((item, index) => (
                                            <VocabWord key={index} item={item} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
                <div className="library-right">
                    <BookDesc></BookDesc>
                </div>
            </div>
        </>
    )
}

export default Library
