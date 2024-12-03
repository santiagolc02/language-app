import { useState, useEffect } from 'react';
import './Reading.css';
import { useLanguage } from '../../context/LanguageContext';
import { useLectureId } from '../../context/LectureContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Word from '../word/Word';
import WordTooltip from '../wordToolTip/WordTooltip';

const Reading = () => {
    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedGender, setSelectedGender] = useState("None");
    const [selectedMastery, setSelectedMastery] = useState("Beginner");
    const [selectedType, setSelectedType] = useState("Noun");
    const [englishText, setEnglishText] = useState("");
    const [spanishText, setSpanishText] = useState("");

    const [reading, setReading] = useState({});
    const [processedText, setProcessedText] = useState([])
    const [dbWords, setDbWords] = useState([]);
    const [enums, setEnums] = useState([])

    const [tooltip, setTooltip] = useState({
        visible: false,
        content: selectedWord,
        position: { x: 0, y: 0 },
    });

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
    }, [lectureId, selectedWord]);

    useEffect(() => {
        const fetchEnums = async () => {
            try {
                const [genders, masteries, types] = await Promise.all([
                    await axios.get(`http://localhost:3001/enum/genders/`),
                    await axios.get(`http://localhost:3001/enum/masteries/`),
                    await axios.get(`http://localhost:3001/enum/wordTypes/`)
                ])
                
                setEnums({
                    genders: genders.data,
                    masteries: masteries.data,
                    types: types.data
                });
            } catch (error) {
                console.error('Error fetching the lecture:', error);
            }
        };

        fetchEnums();
    }, [selectedWord])
    
    useEffect(() => {
        if (reading.text) {
            const result = [];
            let currentIndex = 0;
            let currentWord = '';

            const isInRegex = (char) => /[\p{L}\u0027\u2019\u002D]/u.test(char);

            const addWord = () => {
                if (currentWord) {
                    result.push({ text: currentWord, type: 'word', id: currentIndex });
                    currentWord = '';
                }
            };

            while (currentIndex < reading.text.length) {
                const char = reading.text[currentIndex];
                if (isInRegex(char)) {
                    currentWord += char;
                } else {
                    addWord();
                    if (char === '\n') {
                        result.push({ text: char, type: 'newline', id: currentIndex });
                    } else {
                        result.push({ text: char, type: 'symbol', id: currentIndex });
                    }
                }
                currentIndex++;
            }
            addWord();

            console.log('Processed Text:', result); // Should only log once when `reading.text` updates
            setProcessedText(result);
        }
    }, [reading.text]); // Only run when

    const getYtCode = (videoUrl) => {
        if (!videoUrl || typeof videoUrl !== 'string') {
            console.error('Invalid video URL:', videoUrl);
            return ''; // Return an empty string or handle the error as needed
        }
        const videoId = videoUrl.split('watch?v=')[1]?.split('&')[0];
        return videoId || ''; // Ensure a valid ID or an empty string
    };

    const handleWordClick = (word, e) => {
        const wordFound = dbWords.find(dbWord => dbWord.word === word.toLowerCase());

        // Set the selected word state
        setSelectedWord(
            wordFound 
                ? { ...wordFound, word, inDatabase: true } 
                : { word, inDatabase: false }
        );

        // Get the clicked word's position
        const rect = e.target.getBoundingClientRect();
        // Set the tooltip state
        setTooltip({
            visible: true,
            content: wordFound 
                ? { ...wordFound, word, inDatabase: true } 
                : { word, inDatabase: false },
            position: {
                x: rect.right + window.scrollX + 8,  // Horizontal position (with scroll offset)
                y: rect.bottom + window.scrollY - 60 // Vertical position (below the word, with scroll offset)
        },
    });
    }

    const handleWordRegistration = async() => {
        try {
            const newWord = {
                word: selectedWord.word.toLowerCase(),
                mastery: selectedMastery,
                translations: `{"English": "${englishText}", "Spanish": "${spanishText}"}`,
                word_type: selectedType,
                gender: selectedGender,
                language: language // assuming 'language' is relevant for the word
            };
    
            await axios.post(`http://localhost:3001/words/${language}/word`, newWord);

            // Reset all state
            setSelectedGender("");
            setSelectedMastery("");
            setSelectedType("");
            setEnglishText("");
            setSpanishText("");
            setSelectedWord(null)
    
            console.log("Word registered successfully!");
        } catch (error) {
            console.error("Error registering the word:", error);
        }
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
                    {processedText.map((item, index) =>  {
                        if (item.type === 'symbol' && item.text === '\n') {
                            return <br key={index}></br>
                        } else {
                            return (
                                <Word 
                                key={index} 
                                word={item.text} 
                                type={item.type} 
                                onWordClick={(word, e) => handleWordClick(word, e)} 
                                dbWords={dbWords} />
                            )
                        }
                    }
                    )}
                </div>
            </div>
            <div className="reading-right">
                <div className="reading-right-top">
                    {selectedWord ? (
                        selectedWord.inDatabase ? (
                            <>
                                {tooltip.visible && (
                                    <WordTooltip
                                        position={tooltip.position}
                                        content={tooltip.content}
                                        onClose={() => setTooltip({ ...tooltip, visible: false })}
                                    />
                                )}
                            </>
                                
                            
                        ) : (
                            <>
                                <div className="reading-right-word">
                                    <h1>{selectedWord.word}</h1>
                                </div>
                                <div className="reading-right-selects">
                                    <select className='reading-right-select' 
                                    value={selectedGender} 
                                    onChange={(e) => setSelectedGender(e.target.value)}>
                                        {enums.genders.map((gender, index) => (
                                            <option key={index} value={gender.enumlabel}>
                                                {gender.enumlabel}
                                            </option>
                                        ))}
                                    </select>
                                    <select className='reading-right-select' 
                                    value={selectedMastery} 
                                    onChange={(e) => setSelectedMastery(e.target.value)}>
                                        {enums.masteries.map((mastery, index) => (
                                            <option key={index} value={mastery.enumlabel}>
                                                {mastery.enumlabel}
                                            </option>
                                        ))}
                                    </select>
                                    <select className='reading-right-select' 
                                    value={selectedType} 
                                    onChange={(e) => setSelectedType(e.target.value)}>
                                        {enums.types.map((type, index) => (
                                            <option key={index} value={type.enumlabel}>
                                                {type.enumlabel}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="reading-right-translations">
                                    <div className="reading-right-translation">
                                        <input
                                            id="englishText"
                                            className="reading-right-translation-input"
                                            value={englishText}
                                            onChange={(e) => setEnglishText(e.target.value)}
                                            placeholder=" " /* Required for :not(:placeholder-shown) */
                                            required
                                        />
                                        <label className="reading-right-translation-label">English:</label>
                                    </div>
                                    <div className="reading-right-translation">
                                        <input
                                            id="spanishText"
                                            className="reading-right-translation-input"
                                            value={spanishText}
                                            onChange={(e) => setSpanishText(e.target.value)}
                                            placeholder=" " /* Required for :not(:placeholder-shown) */
                                            required
                                        />
                                        <label className="reading-right-translation-label">Spanish:</label>
                                    </div>
                                </div>
                                <div className="reading-right-submit">
                                    <i class="bi bi-cloud-arrow-up" onClick={handleWordRegistration}></i>
                                </div>
                            </>
                        )
                    ) : (
                        <>
                            <h3>Select a word to see details</h3>
                        </>
                    )}
                </div>
                <div className="reading-right-middle">
                    {reading.video_url ? (
                        <iframe
                            title='Youtube video'
                            src={`https://www.youtube.com/embed/${getYtCode(reading.video_url)}`}
                            frameBorder="0"
                            allowFullScreen
                            style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                borderRadius: '20px'
                            }}
                        ></iframe>
                    ) : (
                        <h3>No Youtube video</h3>
                    )}
                </div>
                <div className="reading-right-bottom">
                    <h3>Coming soon</h3>
                </div>
            </div>
        </div>
    );
};

export default Reading;
