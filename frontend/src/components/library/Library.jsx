import { useState, useEffect } from 'react';
import axios from 'axios';
import './Library.css'
import Navbar from '../navbar/Navbar';
import Shelf from '../shelf/Shelf';
import BookModal from '../bookModal/BookModal';
import BookDesc from '../bookDesc/BookDesc';
import FlashcardsConfig from '../flashcardsConfig/FlashcardsConfig';
import FlashcardsQuiz from '../flashcardsQuiz/FlashcardsQuiz';
import { useBookModal } from '../../context/ModalContext';
import { useLanguage } from '../../context/LanguageContext';
import VocabWord from '../vocabWord/VocabWord';
import { motion } from 'framer-motion';

const Library = () => {
    // Luctures
    const { language } = useLanguage(); // Get setLanguage from context
    const { showBookModal } = useBookModal(); // Get setLanguage from context
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [libraryState, setLibraryState] = useState("lectures");
    
    // Vocabulary(and Flashcards)
    const [noviceWords, setNoviceWords] = useState([]);
    const [intermediateWords, setIntermediateWords] = useState([]);
    const [expertWords, setExpertWords] = useState([]);

    // Flashcards
    const [flashcardState, setFlashcardState] = useState('config');
    const [flashcardsConfig, setFlashcardsConfig] = useState({
        novice: false,
        intermediate: false,
        expert: false,
    });
    const [totalQuestions, setTotalQuestions] = useState();
    const [quizWords, setQuizWords] = useState([]);

    useEffect(() => {
        fetchLectures();
    }, [])

    useEffect(() => { // Reset quiz when exiting quiz tab
        setFlashcardState('config');
    }, [libraryState])

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
            setNoviceWords(noviceWords);
            setIntermediateWords(intermediateWords);
            setExpertWords(expertWords);
        } catch (error) {
            console.error('Error fetching the words:', error);
        }
    };

    const handleCreateQuizWords = () => {
        if (flashcardsConfig.novice) {
            setNoviceWords(prev => {
                const shuffled = shuffleArray(prev); // Shuffle the array
                setQuizWords(shuffled.slice(0, totalQuestions)); // Populate quizWords
                return shuffled; // Update noviceWords with shuffled array
            });
        } else if (flashcardsConfig.intermediate) {
            setIntermediateWords(prev => {
                const shuffled = shuffleArray(prev); // Shuffle the array
                setQuizWords(shuffled.slice(0, totalQuestions)); // Populate quizWords
                return shuffled; // Update intermediateWords with shuffled array
            });
        } else if (flashcardsConfig.expert) {
            setExpertWords(prev => {
                const shuffled = shuffleArray(prev); // Shuffle the array
                setQuizWords(shuffled.slice(0, totalQuestions)); // Populate quizWords
                return shuffled; // Update expertWords with shuffled array
            });
        } else {
            alert('Please select a mastery level'); // Default case
        }
    };
    
    // Helper function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate random index
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array; // Return shuffled array
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
                    <motion.div
                        key={libraryState}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}>
                        {(() => {
                            switch (libraryState) {
                                case 'lectures':
                                    return (
                                        <div>
                                            <div className="library-middle">
                                                <h1 style={{ fontSize: '1.2rem' }}>
                                                    Lectures in {language}
                                                </h1>
                                            </div>
                                            <Shelf lectures={lectures} loading={loading} />
                                        </div>
                                    );
                                case 'vocabulary':
                                    return (
                                        <div>
                                            <h1 style={{ fontSize: '1.2rem' }}>
                                                Vocabulary in {language} ({noviceWords.length + intermediateWords.length + expertWords.length})
                                            </h1>
                                            <div className="library-middle">
                                                {/* <input type='search'></input> */}
                                            </div>
                                            <div className="library-vocabulary">
                                                <div className="library-vocabulary-left">
                                                    <div>
                                                        <h2>Novice {`(${noviceWords.length})`}</h2>
                                                    </div>
                                                    <br />
                                                    <div className="library-vocabulary-words">
                                                        {noviceWords.map((item, index) => (
                                                            <VocabWord key={index} item={item} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="library-vocabulary-middle">
                                                    <div>
                                                        <h2>Intermediate {`(${intermediateWords.length})`}</h2>
                                                    </div>
                                                    <br />
                                                    <div className="library-vocabulary-words">
                                                        {intermediateWords.map((item, index) => (
                                                            <VocabWord key={index} item={item} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="library-vocabulary-right">
                                                    <div>
                                                        <h2>Expert {`(${expertWords.length})`}</h2>
                                                    </div>
                                                    <br />
                                                    <div className="library-vocabulary-words">
                                                        {expertWords.map((item, index) => (
                                                            <VocabWord key={index} item={item} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );

                                case 'flashcards':
                                    return (
                                        <div className='flashcards-main'>
                                            <h1 style={{ fontSize: '1.2rem' }}>Flashcards in {language}</h1>
                                            {(() => {
                                                switch (flashcardState) {
                                                    case "config":
                                                        return <FlashcardsConfig 
                                                        flashcardsConfig={flashcardsConfig} 
                                                        setFlashcardsConfig={setFlashcardsConfig}
                                                        setFlashcardState= {setFlashcardState}
                                                        totalQuestions={totalQuestions}
                                                        setTotalQuestions={setTotalQuestions}
                                                        handleCreateQuizWords={handleCreateQuizWords}>
                                                        </FlashcardsConfig>;
                                                    case "quiz":
                                                        return <FlashcardsQuiz
                                                        setFlashcardState={setFlashcardState}
                                                        totalQuestions={totalQuestions}
                                                        quizWords={quizWords}
                                                        ></FlashcardsQuiz>;
                                                    default:
                                                    return <div>No specific flashcard state selected.</div>;
                                                }
                                                })()}
                                        </div>
                                    );

                                default:
                                    return (
                                        <div>
                                            <h1 style={{ fontSize: '1.2rem' }}>Select a library state</h1>
                                        </div>
                                    );
                            }
                        })()}
                    </motion.div>
                </div>
                <div className="library-right">
                    <BookDesc></BookDesc>
                </div>
            </div>
        </>
    )
}

export default Library
