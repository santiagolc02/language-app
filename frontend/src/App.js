import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Language from './components/language/Language';

function App() {
	const [languages, setLanguages] = useState([]);
	const [language, setLanguage] = useState('none');

	useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get('http://localhost:3001/languages/'); // Replace with your actual API endpoint
                setLanguages(response.data);
            } catch (error) {
                console.error('Error fetching the languages:', error);
            }
        };

        fetchLanguages();
    }, []);

	return (
		<div className="app">
			<div className='app-container'>
				<h1>Choose a language...</h1>
				<br></br>
				<div className='app-flags'>
				{languages.map((item) => (
					<Language key={item.code} languageData={item} setLanguage={setLanguage}></Language>
				))}
				</div>
				<p>Selected Language: {language}</p>
			</div>
		</div>
	);
}

export default App;
