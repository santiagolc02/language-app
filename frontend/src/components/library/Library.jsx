import './Library.css'
import Navbar from '../navbar/Navbar';
import Shelf from '../shelf/Shelf';
import { useLanguage } from '../../context/LanguageContext';

const Library = () => {
    const { language } = useLanguage(); // Get setLanguage from context

    return (
        <div className="library">
            <Navbar></Navbar>
            <div className="library-text-flag">
                <h1 style={{marginLeft: '1.2vw', backgroundColor: `rgb(20, 20, 20)`}}>Lectures in {language}</h1>
                <img src={`/assets/${language}.png`} 
                className='library-flag' alt={`${language}`} />
            </div>
            <br></br>
            <Shelf></Shelf>
        </div>
    )
}

export default Library
