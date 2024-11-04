import './Navbar.css'
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const { language } = useLanguage(); // Get setLanguage from context
    const navigate = useNavigate(); // Hook for navigation

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className="navbar">
            <div className="navbar-buttons">
                <button className='navbar-button'>Lectures</button>
                <button className='navbar-button'>Vocabulary</button>
                <button className='navbar-button'>Coming soon</button>
            </div>
            
            
        </div>
    )
}

export default Navbar
