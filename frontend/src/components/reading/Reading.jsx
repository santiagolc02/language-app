import { useState, useEffect } from 'react';
import './Reading.css';
import { useLanguage } from '../../context/LanguageContext';
import { useLectureId } from '../../context/LectureContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Word from '../word/Word';

const Reading = () => {
    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedGender, setSelectedGender] = useState("Masculine");
    const [selectedMastery, setSelectedMastery] = useState("Beginner");
    const [selectedType, setSelectedType] = useState("Noun");
    const [englishText, setEnglishText] = useState("");
    const [spanishText, setSpanishText] = useState("");

    const [reading, setReading] = useState({});
    const [processedText, setProcessedText] = useState([])
    const [dbWords, setDbWords] = useState([]);
    const [enums, setEnums] = useState([])
    const { lectureId, setLectureId } = useLectureId();
    const { language } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLecture = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/lectures/id/${lectureId}`);
                setReading(response.data);
                console.log(reading);
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

    const handleWordClick = (word) => {
        const wordFound = dbWords.find(dbWord => dbWord.word === word.toLowerCase());
        setSelectedWord(wordFound ? {...wordFound, word:word, inDatabase:true}: {word, inDatabase:false});
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
                                onWordClick={handleWordClick} 
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
                            <div className="reading-right-top">
                                <div className="reading-right-word">
                                    <h1>{selectedWord.word}</h1>
                                </div>
                                <br></br>
                                <p>Mastery: {selectedWord.mastery}</p>
                                <p>Word Type: {selectedWord.word_type}</p>
                                <p>Translations: {JSON.stringify(selectedWord.translations)}</p>
                                <p>Gender: {selectedWord.gender}</p>
                            </div>
                            </>
                        ) : (
                            <>
                                <div className="reading-right-word">
                                    <h1>{selectedWord.word}</h1>
                                </div>
                                <br></br>
                                {/* <p style={{textAlign: 'center'}}>Register word: "{selectedWord.word.toLowerCase()}"</p> */}
                                <div className="reading-right-selects">
                                    <select className='reading-right-select' value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                                        {enums.genders.map((gender, index) => (
                                            <option key={index} value={gender.enumlabel}>
                                                {gender.enumlabel}
                                            </option>
                                        ))}
                                    </select>
                                    <select className='reading-right-select' value={selectedMastery} onChange={(e) => setSelectedMastery(e.target.value)}>
                                        {enums.masteries.map((mastery, index) => (
                                            <option key={index} value={mastery.enumlabel}>
                                                {mastery.enumlabel}
                                            </option>
                                        ))}
                                    </select>
                                    <select className='reading-right-select' value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                                        {enums.types.map((type, index) => (
                                            <option key={index} value={type.enumlabel}>
                                                {type.enumlabel}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="reading-right-translations">
                                    <div className="reading-right-translation">
                                        <p>English:</p>
                                        <input className='reading-right-translation-input' value={englishText} onChange={(e) => setEnglishText(e.target.value)}></input>
                                    </div>
                                    <div className="reading-right-translation">
                                        <p>Spanish:</p>
                                        <input className='reading-right-translation-input' value={spanishText} onChange={(e)=> setSpanishText(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="reading-right-submit">
                                    <i class="bi bi-cloud-arrow-up" onClick={handleWordRegistration}></i>
                                </div>
                            </>
                        )
                    ) : (
                        <>
                            <p>Select a word to see details</p>
                        </>
                    )}
                </div>
                <div className="reading-right-middle">
                    <iframe
                        width="550"
                        height="340"
                        src={`https://www.youtube.com/embed/sTl4KWGWWYg`}
                        frameBorder="0"
                        allowFullScreen
                        style={{
                            width: '80%',
                            height: '100%',
                            borderRadius: '10px'
                        }}
                    ></iframe>
                </div>
                <div className="reading-right-bottom">
                    <h1>Coming soon...</h1>
                </div>
            </div>
        </div>
    );
};

export default Reading;
