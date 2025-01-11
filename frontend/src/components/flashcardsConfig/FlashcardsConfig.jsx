import { useState, useEffect } from "react";
import "./FlashcardsConfig.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useLanguage } from '../../context/LanguageContext';

const Flashcards = ({ flashcardsConfig, setFlashcardsConfig, setFlashcardState, totalQuestions, setTotalQuestions, handleCreateQuizWords }) => {
	const [quizWords, setQuizWords] = useState([]);
	const { language } = useLanguage(); // Get setLanguage from context

	useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/words/${language}`);
                setQuizWords(response.data);
            } catch (error) {
                console.error('Error fetching the words:', error);
            }
        };

        fetchWords();
    }, []); // Re-fetch words whenever the language changes.

    const handleCheckboxChange = (key) => {
        setFlashcardsConfig(() => ({
            novice: key === "novice",
            intermediate: key === "intermediate",
            expert: key === "expert",
        }));
    };

    const handleClick = () => {
        if (totalQuestions == null) {
            alert('A number must be entered');
            return;
        } else {
			handleCreateQuizWords() // Triggered in Library.jsx
            setFlashcardState('quiz');
        }
    };

    const handleCountChange = (e) => {
        setTotalQuestions(e.target.value);
    };

    return (
        <motion.div
            className="flashcards"
            key="config"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* <h1>Select options</h1> */}
            <div className="checkbox-group spacing-4">
                {/* Novice Checkbox */}
                <label htmlFor="novice" className="checkbox-label spacing-4">
                    <input
                        id="novice"
                        type="checkbox"
                        checked={flashcardsConfig.novice}
                        onChange={() => handleCheckboxChange("novice")}
                        className="peer hidden"
                    />
                    <div
                        className={`checkbox ${flashcardsConfig.novice ? "checked" : ""} transition`}
                    >
                        {flashcardsConfig.novice && (
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                className="icon"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 12.6111L8.92308 17.5L20 6.5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>
                    Novice
                </label>

                {/* Intermediate Checkbox */}
                <label htmlFor="intermediate" className="checkbox-label spacing-4">
                    <input
                        id="intermediate"
                        type="checkbox"
                        checked={flashcardsConfig.intermediate}
                        onChange={() => handleCheckboxChange("intermediate")}
                        className="peer hidden"
                    />
                    <div
                        className={`checkbox ${flashcardsConfig.intermediate ? "checked" : ""} transition`}
                    >
                        {flashcardsConfig.intermediate && (
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                className="icon"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 12.6111L8.92308 17.5L20 6.5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                        )}
                    </div>
                    Intermediate
                </label>

                {/* Expert Checkbox */}
                <label htmlFor="expert" className="checkbox-label spacing-4">
                    <input
                        id="expert"
                        type="checkbox"
                        checked={flashcardsConfig.expert}
                        onChange={() => handleCheckboxChange("expert")}
                        className="peer hidden"
                    />
                    <div
                        className={`checkbox ${flashcardsConfig.expert ? "checked" : ""} transition`}
                    >
                        {flashcardsConfig.expert && (
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                className="icon"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 12.6111L8.92308 17.5L20 6.5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>
                    Expert
                </label>
            </div>
            <input
                type="number"
                value={totalQuestions}
                onChange={handleCountChange}
            ></input>
            <button onClick={handleClick}>Click me</button>
        </motion.div>
    );
};

export default Flashcards;
