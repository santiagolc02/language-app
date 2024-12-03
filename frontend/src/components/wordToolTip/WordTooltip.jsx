import React from 'react';
import './WordTooltip.css';

const Tooltip = ({ position, content, onClose }) => {
    const translations = content?.translations || {}; 

    // Destructure with fallback values in case translations are missing
    const { English = 'Not available', Spanish = 'Not available' } = translations;

    return (
        <div
            className="word-tooltip"
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
            <div className="tooltip-content">
                <>
                    {/* <p><strong>Word:</strong> {content.word}</p> */}
                    <p><strong>English:</strong> {English}</p>
                    <p><strong>Spanish:</strong> {Spanish}</p>
                </>  
            </div>
            <button className="tooltip-close" onClick={onClose}>Close</button>
        </div>
    );
};

export default Tooltip;