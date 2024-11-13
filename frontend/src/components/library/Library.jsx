import './Library.css'
import Navbar from '../navbar/Navbar';
import Shelf from '../shelf/Shelf';
import BookDesc from '../bookDesc/BookDesc';
import { useLanguage } from '../../context/LanguageContext';

const Library = () => {
    const { language } = useLanguage(); // Get setLanguage from context

    return (
        <div className="library">
            <div className="library-left">
                <div className="library-left-upper">
                    <Navbar></Navbar>
                    <div className="library-text-flag">
                        <h1 style={{fontSize: '1.2rem'}}>Lectures</h1>
                    </div>
                </div>
                <Shelf></Shelf>
            </div>
            <div className="library-right">
                <BookDesc></BookDesc>
            </div>
        </div>
    )
}

export default Library
