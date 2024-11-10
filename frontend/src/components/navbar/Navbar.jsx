import './Navbar.css'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleBackClick = () => {
        navigate('/');
    }

    return (
        <div className="navbar">
            <div className="navbar-buttons">
                <i className="bi bi-arrow-left" onClick={handleBackClick}></i>
                <button className='navbar-button'>Lectures</button>
                <button className='navbar-button'>Vocabulary</button>
                <button className='navbar-button'>Coming soon</button>
            </div>
            
            
        </div>
    )
}

export default Navbar
