import './Library.css'
import Navbar from '../navbar/Navbar';
import Shelf from '../shelf/Shelf';
import { useLanguage } from '../../context/LanguageContext';

const Library = () => {
    const { language } = useLanguage(); // Get setLanguage from context

    return (
        <div className="library">
            <Navbar></Navbar>
            <h1 style={{marginLeft: '1.2vw'}}>Lectures in {language}</h1>
            <Shelf></Shelf>
            
        </div>
    )
}

export default Library
