import { useEffect, useState } from 'react';
import './Flashcard.css';
import { motion } from 'framer-motion';

const Flashcard = ({ currentWord, currentQuestion, prevQuestion }) => {
    const [flashcardFace, setFlashcardFace] = useState(true);

    useEffect(() => {
        if (currentWord) {
            setFlashcardFace(true);
        }
    }, [currentWord]);

    if (!currentWord) {
        return <p>Loading...</p>;
    }

    return (
        <motion.div
            key={currentWord?.id}
            initial={{ x: currentQuestion > prevQuestion ? 50 : -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2 }}
            className="flashcard"
            onClick={() => setFlashcardFace(prev => !prev)}
        >
            {flashcardFace ? (
                <div className="flashcard-front">
                    <h1>{currentWord?.word || 'No word available'}</h1>
                </div>
            ) : (
                <div className="flashcard-back">
                    <h1>{currentWord?.translations?.English || 'No translation available'}</h1>
                </div>
            )}
        </motion.div>
    );
};

export default Flashcard;
