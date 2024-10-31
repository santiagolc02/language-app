import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Language from './components/language/Language';
import Lecture from './components/lecture/Lecture';
import { useLanguage } from './context/LanguageContext';

function App() {
    const [languageList, setLanguageList] = useState([]);
    const { setLanguage } = useLanguage(); // Get setLanguage from context
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get('http://localhost:3001/languages/'); // API endpoint for languages
                setLanguageList(response.data);
            } catch (error) {
                console.error('Error fetching the languages:', error);
            }
        };

        fetchLanguages();
    }, []);

    // Handle language selection and navigation
    const handleLanguageClick = (name) => {
		setLanguage(name); // Set the selected language in context
        navigate('/lectures'); // Navigate to the Lectures page
    };

    return (
            <div className="app">
                <Routes>
                    <Route path="/" element={  // Route for the home page
                        <div className="app-container">
                            <h1>Choose a language...</h1>
							<br></br>
							<br></br>
                            <div className="app-flags">
                                {languageList.map((item) => (
                                    <Language 
                                        key={item.code} 
                                        languageData={item} 
                                        onClick={() => handleLanguageClick(item.name)}  // Pass the click handler
                                    />
                                ))}
                            </div>
                        </div>
                    } />
                    <Route path="/lectures" element={<Lecture />} /> {/* Route for the Lectures page */}
                </Routes>
            </div>
    );
}

export default App;
