import './Navbar.css'
import { useLanguage } from '../../context/LanguageContext';
import { Routes, Route, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const { language } = useLanguage(); // Get setLanguage from context
    const navigate = useNavigate(); // Hook for navigation

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className="navbar">
            <img src={`/assets/${language}.png`} 
            className='navbar-flag' alt={`${language}`} 
            onClick={handleClick} />
        </div>
    )
}

export default Navbar
