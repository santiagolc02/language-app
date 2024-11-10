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
                console.log(enums);
            } catch (error) {
                console.error('Error fetching the lecture:', error);
            }
        };

        fetchEnums();
    }, [selectedWord])
    

    //const words = reading.text ? reading.text.match(/[\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)?|[.,!?;:](?=\s|$)/gu): [];
    //const words = reading.text ? reading.text.match(/\S+/g) : [];
    //const words = reading.text ? reading.text.split(/[\s.,!?;:()]+/) : [];
    const processText = (text) => {
        if (!text) return [];
        
        // Universal pattern that matches:
        // 1. Words in any language (including contractions and hyphenations)
        // 2. All punctuation and whitespace
        // \p{L} - any kind of letter from any language
        // \p{M} - marks that combine with other characters (like accents)
        // \p{P} - any kind of punctuation
        // \s - any whitespace
        const pattern = /([\p{L}\p{M}]+(?:[''][\p{L}\p{M}]+)*(?:-[\p{L}\p{M}]+)*)|([.,!?;:"'()¿¡\p{P}\s]+)/gu;
        
        const matches = Array.from(text.matchAll(pattern));
        return matches.map(match => ({
            content: match[0],
            isWord: Boolean(match[1]) // true if it matched a word, false if it matched punctuation/space
        }));
    };

    const handleWordClick = (word) => {
        const wordFound = dbWords.find(dbWord => dbWord.word === word.toLowerCase());
        setSelectedWord(wordFound ? {...wordFound, word:word, inDatabase:true}: {word, inDatabase:false});
    }

    const handleWordRegistration = async() => {
        try {
            // Prepare the data to be sent to the backend
            const newWord = {
                word: selectedWord.word.toLowerCase(),
                mastery: selectedMastery,
                translations: `{"English": "${englishText}", "Spanish": "${spanishText}"}`,
                word_type: selectedType,
                gender: selectedGender,
                language: language // assuming 'language' is relevant for the word
            };
    
            // Send a POST request to register the word
            await axios.post(`http://localhost:3001/words/${language}/word`, newWord);

            setSelectedGender("");
            setSelectedMastery("");
            setSelectedType("");
            setEnglishText("");
            setSpanishText("");
            setSelectedWord(null)
    
            // Optionally, you can update the local state to show success feedback
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
                    {processText(reading.text).map((item, index) => (
                        item.isWord ? (
                            <Word 
                            key={index} 
                            word={item.content} 
                            onWordClick={handleWordClick} 
                            dbWords={dbWords} />

                        ) : (
                            <span key={index}>{item.content}</span>
                        )
                    ))}
                </div>
            </div>
            <div className="reading-right">
                    {selectedWord ? (
                        selectedWord.inDatabase ? (
                            <>
                                <div className="reading-right-word">
                                    <h1>{selectedWord.word}</h1>
                                </div>
                                <br></br>
                                <p>Mastery: {selectedWord.mastery}</p>
                                <p>Word Type: {selectedWord.word_type}</p>
                                <p>Translations: {JSON.stringify(selectedWord.translations)}</p>
                                <p>Gender: {selectedWord.gender}</p>
                            </>
                        ) : (
                            <>
                                <div className="reading-right-word">
                                    <h1>{selectedWord.word}</h1>
                                </div>
                                <br></br>
                                <p style={{textAlign: 'center'}}>Register word: "{selectedWord.word.toLowerCase()}"</p>
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
                                        <img src={`./assets/english.png`} alt='' className='reading-right-flag'></img>
                                        <input className='reading-right-translation-input' value={englishText} onChange={(e) => setEnglishText(e.target.value)}></input>
                                    </div>
                                    <div className="reading-right-translation">
                                        <img src={`./assets/spanish.png`} alt='' className='reading-right-flag'></img>
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
        </div>
    );
};

export default Reading;
