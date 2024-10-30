import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Language from './components/language/Language';

function App() {
	const [languages, setLanguages] = useState([]);
	const [language, setLanguage] = useState('');

	useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get('http://localhost:3001/languages/'); // Replace with your actual API endpoint
                setLanguages(response.data);
				console.log(languages)
            } catch (error) {
                console.error('Error fetching the languages:', error);
            }
        };

        fetchLanguages();
    }, [languages]);

	return (
		<div className="app">
			<div className='app-container'>
				<h1>Choose a language...</h1>
				<br></br>
				<div className='app-flags'>
				{languages.map(item => (
					<Language props={item}></Language>
				))}
				</div>
			</div>
		</div>
	);
}

export default App;
