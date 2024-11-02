import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Flag from './components/flag/Flag';
import Library from './components/library/Library';
import Reading from './components/reading/Reading';
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
        navigate('/library'); // Navigate to the Lectures page
    };

    return (
            <div className="app">
                <Routes>
                    <Route path="/" element={
                        <div className="app-container">
                            <h1>Choose a language...</h1>
							<br></br>
							<br></br>
                            <div className="app-flags">
                                {languageList.map((item) => (
                                    <Flag 
                                        key={item.code} 
                                        languageData={item} 
                                        onClick={() => handleLanguageClick(item.name)}  // Pass the click handler
                                    />
                                ))}
                            </div>
                        </div>
                    } />
                    <Route path="/Library" element={<Library />} /> {/* Route for the Lectures page */}
                    <Route path="/Reading" element={<Reading />} /> {/* Route for the Reading page */}
                </Routes>
            </div>
    );
}

export default App;
