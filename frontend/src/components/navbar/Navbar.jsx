import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = ({ libraryState, setLibraryState }) => {
    const navigate = useNavigate(); // Hook for navigation
    const { language } = useLanguage(); // Get setLanguage from context
    

    const handleBackClick = () => {
        navigate('/');
    }

    return (
        <div className="navbar">
            <div className="navbar-buttons">
                <button className={`${libraryState === 'lectures' ? 'navbar-button-selected' : 'navbar-button'}`} 
                onClick={() => setLibraryState('lectures')}>Lectures</button>
                <button className={`${libraryState === 'vocabulary' ? 'navbar-button-selected' : 'navbar-button'}`} 
                onClick={() => setLibraryState('vocabulary')}>Vocabulary</button>
                <button className={`${libraryState === 'flashcards' ? 'navbar-button-selected' : 'navbar-button'}`} 
                onClick={() => setLibraryState('flashcards')}>Flashcards</button>
            </div>
            <img src={`/assets/${language}.png`} 
            className='navbar-flag' alt={`${language}`} 
            onClick={handleBackClick}/>

        </div>
    )
}

export default Navbar
