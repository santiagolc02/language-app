import { useState, useEffect } from 'react';
import './Reading.css';
import { useLectureId } from '../../context/LectureContext';
import axios from 'axios';
import Word from '../word/Word';

const Reading = () => {
    const [reading, setReading] = useState({});
    const { lectureId } = useLectureId();

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

    return (
        <div className="reading">
            <div className="reading-left">
                <h1>{reading.name}</h1>
                <br></br>
                <br></br>
                <div className="reading-text-main">
                    {words.map((word, index) => (
                        <Word key={index} word={word} />
                    ))}
                </div>
            </div>
            <div className="reading-info">
                {/* Additional content for reading-info */}
            </div>
        </div>
    );
};

export default Reading;
