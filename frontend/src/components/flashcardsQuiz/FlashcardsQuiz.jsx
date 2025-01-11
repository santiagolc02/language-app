import { motion } from 'framer-motion';
import './FlashcardsQuiz.css';
import { useEffect, useState } from 'react';
import Flashcard from '../flashcard/Flashcard';

function FlashcardsQuiz({ setFlashcardState, totalQuestions, quizWords }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [prevQuestion, setPrevQuestion] = useState(-1);
    const [currentWord, setCurrentWord] = useState([]);

    useEffect(() => {
        setCurrentWord(quizWords[currentQuestion]);
    }, []);
    
    const handleIncrement = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion((prev) => {
                setPrevQuestion(prev);
                const next = prev + 1;
                setCurrentWord(quizWords[next]);
                return next;
            });
        }
    };
    
    const handleDecrement = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => {
                setPrevQuestion(prev);
                const prevIndex = prev - 1;
                setCurrentWord(quizWords[prevIndex]);
                return prevIndex;
            });
        }
    };

    const handleReturn = () => {
        setFlashcardState('config');
    };

    return (
        <motion.div
            className="flashcards-quiz"
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            <div className="flashcards-quiz-progressbar-div">
                <div className='flashcards-quiz-progressbar-whole' onClick={handleReturn}>
                    <div className='flashcards-quiz-progressbar-progress' 
                    style={{ width: `${((currentQuestion + 1)/totalQuestions)*100}%` }}></div>
                </div>
                {/* {quizWords.map(word => word.word).join(' ')} */}
            </div>
            <div className="flashcards-quiz-flashcard-div">
                <Flashcard currentWord={currentWord} currentQuestion={currentQuestion} prevQuestion={prevQuestion}></Flashcard>
            </div>
            <div className="flashcards-quiz-arrows-div">
                <div className='flashcards-quiz-arrows-numbers'>
                    <div className='flashcards-quiz-arrow' onClick={handleDecrement}>
                        <i class="bi bi-arrow-left-circle"></i>
                    </div>
                    <div className='flashcards-quiz-fraction'>
                        <h1>{currentQuestion + 1} / {totalQuestions}</h1>
                    </div>
                    <div className='flashcards-quiz-arrow' onClick={handleIncrement}>
                        <i class="bi bi-arrow-right-circle"></i>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default FlashcardsQuiz;
