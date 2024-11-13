import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
    const navigate = useNavigate(); // Hook for navigation
    const { language } = useLanguage(); // Get setLanguage from context

    const handleBackClick = () => {
        navigate('/');
    }

    return (
        <div className="navbar">
            <div className="navbar-buttons">
                {/* <i className="bi bi-arrow-left" onClick={handleBackClick}></i> */}
                <button className='navbar-button'>Lectures</button>
                <button className='navbar-button'>Vocabulary</button>
                {/* <button className='navbar-button'>Coming soon</button> */}
            </div>
            <img src={`/assets/${language}.png`} 
            className='navbar-flag' alt={`${language}`} 
            onClick={handleBackClick}/>

        </div>
    )
}

export default Navbar
