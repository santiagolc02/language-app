import React from 'react';
import './WordTooltip.css';
import { motion } from 'framer-motion';

const Tooltip = ({ position, content, onClose }) => {
    const translations = content?.translations || {}; 

    // Destructure with fallback values in case translations are missing
    const { English = 'Not available', Spanish = 'Not available' } = translations;

    return (
        <>
            <div className="word-tooltip-overlay" onMouseDown={onClose}>
                <motion.div
                    key="tooltip" // Important for AnimatePresence to track the component
                    initial={{ scale: 1, y: -25, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="word-tooltip"
                    style={{
                        position: 'absolute',
                        left: `${position.x}px`,
                        top: `${position.y}px`
                    }}
                    onMouseDown={(e) => e.stopPropagation()}>
                    <div className="tooltip-content">
                        <>
                            {content.word_type === "Noun" ? (
                                <h2>{content.word.charAt(0).toUpperCase() + content.word.slice(1)}</h2>
                            ) : (
                                <h2>{content.word}</h2>
                            )}
                            <br />
                            <p><strong>Spanish:</strong> {Spanish}</p>
                            <p><strong>English:</strong> {English}</p>
                        </>  
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Tooltip;